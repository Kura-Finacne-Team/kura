/**
 * SRP Client (Secure Remote Password)
 *
 * 正確的 tssrp6a client API：
 *   step1(userId, password) → SRPClientSessionStep1  (有 IH)
 *   step1.step2(salt, B)    → SRPClientSessionStep2  (有 A, M1)
 *   step2.step3(M2)         → void  (驗證 server proof)
 *
 * 因為 A 要在 step2 才能得到，登入流程需要兩次 API 呼叫：
 * Phase 1 → 用 step1 + step2(假B) 預先取得 A
 * Phase 2 → 用真實的 B 重新計算 step2，得到真正的 M1
 *
 * 安裝：npm install tssrp6a
 */

import {
  SRPClientSession,
  SRPParameters,
  SRPRoutines,
  SRPClientSessionStep1,
} from 'tssrp6a';
import { getBackendBaseUrl } from '@/lib/authApi';

const SRP_PARAMS = new SRPParameters();
const SRP_ROUTINES = new SRPRoutines(SRP_PARAMS);

// ─────────────────────────────────────────
// 型別
// ─────────────────────────────────────────

export interface SRPChallengeResponse {
  sessionId: string;
  srpSalt: string;
  serverB: string;
  kekSalt: string;
  encryptedDataKey: string;
}

// ─────────────────────────────────────────
// API 請求工具
// ─────────────────────────────────────────

async function srpPost<T>(path: string, body: Record<string, string>): Promise<T> {
  const res = await fetch(`${getBackendBaseUrl()}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Client-Type': 'web' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || 'Request failed');
  return data as T;
}

async function srpGet<T>(path: string): Promise<T> {
  const res = await fetch(`${getBackendBaseUrl()}${path}`, {
    headers: { 'X-Client-Type': 'web' },
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || 'Request failed');
  return data as T;
}

// ─────────────────────────────────────────
// 計算 SRP verifier（設定密碼時使用）
// ─────────────────────────────────────────

export async function computeVerifier(
  email: string,
  authKeyHex: string,
  srpSalt: string,
): Promise<{ srpVerifier: string }> {
  const salt = BigInt(`0x${srpSalt}`);
  const x = await SRP_ROUTINES.computeX(email, salt, authKeyHex);
  const verifier = SRP_ROUTINES.computeVerifier(x);
  return { srpVerifier: verifier.toString(16) };
}

// ─────────────────────────────────────────
// 完整 SRP 登入（一個函式完成）
// ─────────────────────────────────────────

export interface SRPLoginResult {
  serverM2: string;
  token: string;
  user: any;
  encryptedDataKey: string;
  kekSalt: string;
}

/**
 * 完整 SRP 登入流程（修正版）：
 * 1. /srp/challenge（只傳 email）→ 後端返回 sessionId, srpSalt, serverB
 * 2. step1(email, authKeyHex) + step2(srpSalt, serverB) → 取得 A 和 M1
 * 3. /srp/verify（傳 sessionId, clientA, clientM1）→ 後端驗證 + 返回 M2
 * 4. step2.step3(M2) 驗證後端 proof
 *
 * 關鍵修正：只呼叫一次 step1，用真實 B 直接計算，A 和 M1 來自同一次 step2。
 */
export async function srpFullLogin(
  email: string,
  authKeyHex: string,
): Promise<SRPLoginResult> {
  // Step 1: 取得後端的 challenge（不需要先傳 clientA）
  const challenge = await srpPost<SRPChallengeResponse>('/api/auth/srp/challenge', { email });

  // Step 2: 用真實 B 一次計算出正確的 A 和 M1
  const clientSession = new SRPClientSession(SRP_ROUTINES);
  const step1 = await clientSession.step1(email, authKeyHex);
  const step2 = await step1.step2(
    BigInt(`0x${challenge.srpSalt}`),
    BigInt(`0x${challenge.serverB}`),
  );

  // Step 3: 同時傳 clientA + M1（後端在此才需要 A）
  const result = await srpPost<{ serverM2: string; token: string; user: any }>(
    '/api/auth/srp/verify',
    {
      sessionId: challenge.sessionId,
      clientA: step2.A.toString(16),
      clientM1: step2.M1.toString(16),
    },
  );

  // Step 4: 驗證後端 M2（防止 server 偽造）
  await step2.step3(BigInt(`0x${result.serverM2}`));

  return {
    ...result,
    encryptedDataKey: challenge.encryptedDataKey,
    kekSalt: challenge.kekSalt,
  };
}

// ─────────────────────────────────────────
// 工具函式
// ─────────────────────────────────────────

async function srpGetSaltsInternal(email: string): Promise<{ srpSalt: string; kekSalt: string }> {
  return srpPost('/api/auth/srp/salt', { email });
}

/** 取得 email 對應的 salt（外部使用） */
export async function getSRPSalts(email: string): Promise<{ srpSalt: string; kekSalt: string }> {
  return srpPost('/api/auth/srp/salt', { email });
}

/** 設定 SRP（上傳 verifier + encryptedDataKey） */
export async function setupSRP(payload: {
  srpSalt: string;
  srpVerifier: string;
  encryptedDataKey: string;
  kekSalt: string;
}): Promise<void> {
  await srpPost('/api/auth/srp/setup', payload);
}

/** 取得後端產生的新 Data Key（明文，單次使用） */
export async function generateDataKey(): Promise<{ plainDataKey: string }> {
  return srpPost('/api/auth/srp/generate-data-key', {});
}

/** 取得已登入用戶的 encryptedDataKey */
export async function getEncryptedDataKey(): Promise<{ encryptedDataKey: string; kekSalt: string }> {
  return srpGet('/api/auth/srp/data-key');
}
