/**
 * 零知識認證流程
 *
 * 整合 keyDerivation + srpClient，提供完整的 ZK 登入/註冊流程。
 * 外部只需呼叫：
 *   - zkLogin(email, password)    → SRP 零知識登入
 *   - zkVerifyRegistration(...)   → 驗證碼註冊 + SRP 初始化
 *   - clearCryptoSession()        → 登出時清除 Data Key
 *
 * Data Key 解密後存放於模組層級記憶體，
 * 頁面重整或登出後即消失（類似 Proton 的 session key）。
 */

import { deriveKeysFromPassword, generateDataKeyHex, generateSalt, sealDataKey, unsealDataKey } from './keyDerivation';
import {
  computeVerifier,
  srpFullLogin,
  getSRPSalts,
} from './srpClient';
import {
  verifyRegistration as apiVerifyRegistration,
  resetPassword as apiResetPassword,
  changePassword as apiChangePassword,
} from '@/lib/authApi';
import type { BackendUserProfile } from '@/lib/authApi';

// ─────────────────────────────────────────
// Crypto Session（記憶體中，登出後清除）
// ─────────────────────────────────────────

interface CryptoSession {
  dataKeyHex: string; // 解密後的 Data Key（永遠不落地）
  dekWrapKey: CryptoKey; // 由 AMK 派生的 DEK Wrap Key（Web Crypto，不可匯出）
}

let cryptoSession: CryptoSession | null = null;
const CRYPTO_OPERATION_ERROR_MESSAGE =
  'Account cryptography operation failed. Please retry with an updated browser.';

export function getCryptoSession(): CryptoSession | null {
  return cryptoSession;
}

export function clearCryptoSession(): void {
  cryptoSession = null;
}

function isCryptoOperationError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return [
    'OperationError',
    'DataError',
    'InvalidAccessError',
    'NotSupportedError',
  ].includes(error.name);
}

function assertDataKeyHex32(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(normalized)) {
    throw new Error('Data Key must be a 32-byte hex string.');
  }
  return normalized;
}

// ─────────────────────────────────────────
// ZK 登入（SRP 版）
// ─────────────────────────────────────────

/**
 * SRP 零知識登入：
 * 1. 取得 salt → 推導 AMK 衍生金鑰（DEK Wrap Key + authKeyHex，password 不傳後端）
 * 2. SRP 握手驗證（M1/M2 互相確認）
 * 3. 解密 encryptedDataKey → 存入 cryptoSession
 */
export async function zkLogin(email: string, password: string): Promise<{ user: BackendUserProfile }> {
  const normalizedEmail = email.toLowerCase().trim();

  // 步驟 1：取得 salt，並確認此帳號已啟用 SRP
  const salts = await getSRPSalts(normalizedEmail);
  if (!salts.srpEnabled) {
    throw new Error('Your account requires a security upgrade. Please reset your password to continue.');
  }

  const { srpSalt, kekSalt } = salts;

  // 步驟 2：推導金鑰（純前端，password 不離開此函式）
  const { dekWrapKey, authKeyHex } = await deriveKeysFromPassword(password, srpSalt, kekSalt);

  // 步驟 3：執行完整 SRP 握手
  const { user, encryptedDataKey } = await srpFullLogin(normalizedEmail, authKeyHex);
  if (!encryptedDataKey?.trim()) {
    throw new Error('Account crypto state is incomplete. Missing encryptedDataKey.');
  }

  try {
    // 步驟 4：解密 Data Key 並存入 session
    const dataKeyHex = assertDataKeyHex32(await unsealDataKey(encryptedDataKey, dekWrapKey));
    cryptoSession = { dataKeyHex, dekWrapKey };
    return { user };
  } catch (error) {
    if (isCryptoOperationError(error)) {
      throw new Error(CRYPTO_OPERATION_ERROR_MESSAGE);
    }
    throw error;
  }
}

// ─────────────────────────────────────────
// 註冊確認（驗證碼 + SRP）
// ─────────────────────────────────────────

export async function zkVerifyRegistration(
  email: string,
  password: string,
  verificationCode: string,
): Promise<{ user: BackendUserProfile }> {
  const normalizedEmail = email.toLowerCase().trim();
  try {
    const { srpSalt, srpVerifier, encryptedDataKey, kekSalt, plainDataKey, dekWrapKey } =
      await buildRegistrationSrpPayload(normalizedEmail, password);
    const response = await apiVerifyRegistration(
      normalizedEmail,
      verificationCode,
      srpSalt,
      srpVerifier,
      encryptedDataKey,
      kekSalt,
    );

    cryptoSession = { dataKeyHex: plainDataKey, dekWrapKey };
    return { user: response.user };
  } catch (error) {
    if (isCryptoOperationError(error)) {
      throw new Error(CRYPTO_OPERATION_ERROR_MESSAGE);
    }
    throw error;
  }
}

// ─────────────────────────────────────────
// ZK 密碼重設與變更
// ─────────────────────────────────────────

/**
 * ZK 忘記密碼 (Password Reset)：
 * 用戶輸入 email、驗證碼與新密碼。
 * 因為沒有舊密碼，無法解開舊的 Data Key。
 * 必須生成全新的 SRP Verifier 與全新的 Data Key。舊的加密資料將遺失。
 */
export async function zkResetPassword(email: string, code: string, newPassword: string): Promise<void> {
  const normalizedEmail = email.toLowerCase().trim();
  const srpSalt = generateSalt();
  const kekSalt = generateSalt();

  try {
    // 步驟 1：推導新金鑰
    const { dekWrapKey, authKeyHex } = await deriveKeysFromPassword(newPassword, srpSalt, kekSalt);
    const { srpVerifier } = await computeVerifier(normalizedEmail, authKeyHex, srpSalt);

    // 步驟 2：生成全新 Data Key 並加密（完全在前端生成，後端無法看到明文）
    const plainDataKey = assertDataKeyHex32(generateDataKeyHex(32));
    const encryptedDataKey = await sealDataKey(plainDataKey, dekWrapKey);

    // 步驟 3：上傳至後端
    await apiResetPassword(normalizedEmail, code, srpSalt, srpVerifier, encryptedDataKey, kekSalt, false);

    // 步驟 4：重設密碼後，需重新登入以建立 session
    clearCryptoSession();
  } catch (error) {
    if (isCryptoOperationError(error)) {
      throw new Error(CRYPTO_OPERATION_ERROR_MESSAGE);
    }
    throw error;
  }
}

/**
 * ZK 更改密碼 (Change Password)：
 * 用戶已登入，輸入新密碼。
 * 因為目前已登入，所以 cryptoSession 中有明文的 Data Key。
 * 重新推導新的 DEK Wrap Key，並將現有 Data Key 重新加密上傳，不遺失資料。
 */
export async function zkChangePassword(email: string, resetCode: string, newPassword: string): Promise<void> {
  if (!cryptoSession) {
    throw new Error('No active crypto session. Please log in again.');
  }

  const normalizedEmail = email.toLowerCase().trim();
  const srpSalt = generateSalt();
  const kekSalt = generateSalt();

  try {
    // 步驟 1：推導新金鑰
    const { dekWrapKey, authKeyHex } = await deriveKeysFromPassword(newPassword, srpSalt, kekSalt);
    const { srpVerifier } = await computeVerifier(normalizedEmail, authKeyHex, srpSalt);

    // 步驟 2：使用新的 DEK Wrap Key 重新加密現有明文 Data Key
    const encryptedDataKey = await sealDataKey(assertDataKeyHex32(cryptoSession.dataKeyHex), dekWrapKey);

    // 步驟 3：上傳至後端
    // preserveData=true 是語意宣告；真正能否保留資料取決於此處是否提供了新 KEK re-wrap 後的 encryptedDataKey。
    await apiChangePassword(normalizedEmail, resetCode, srpSalt, srpVerifier, encryptedDataKey, kekSalt);

    // 步驟 4：更新記憶體中的 session DEK Wrap Key
    cryptoSession.dekWrapKey = dekWrapKey;
  } catch (error) {
    if (isCryptoOperationError(error)) {
      throw new Error(CRYPTO_OPERATION_ERROR_MESSAGE);
    }
    throw error;
  }
}

// ─────────────────────────────────────────
// 內部工具
// ─────────────────────────────────────────

async function buildRegistrationSrpPayload(email: string, password: string): Promise<{
  srpSalt: string;
  srpVerifier: string;
  encryptedDataKey: string;
  kekSalt: string;
  plainDataKey: string;
  dekWrapKey: CryptoKey;
}> {
  const srpSalt = generateSalt();
  const kekSalt = generateSalt();
  const { dekWrapKey, authKeyHex } = await deriveKeysFromPassword(password, srpSalt, kekSalt);
  const { srpVerifier } = await computeVerifier(email, authKeyHex, srpSalt);
  // 註冊流程未登入，不可呼叫需要授權的 /srp/generate-data-key。
  // Data Key 必須在前端本地生成，保持零知識。
  const plainDataKey = assertDataKeyHex32(generateDataKeyHex(32));
  const encryptedDataKey = await sealDataKey(plainDataKey, dekWrapKey);

  return { srpSalt, srpVerifier, encryptedDataKey, kekSalt, plainDataKey, dekWrapKey };
}


