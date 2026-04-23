/**
 * 前端金鑰推導
 *
 * 使用 Web Crypto API (瀏覽器原生，無需外部套件) 實現：
 * - PBKDF2 推導 Master Key（模擬 Argon2id 的安全性）
 * - HKDF 衍生 KEK（Key Encryption Key）和 Auth Key
 * - AES-GCM 加密/解密 Data Key
 *
 * 備註：生產等級可換成 Argon2id (hash-wasm + WASM)，
 * 但 PBKDF2 with 600,000 iterations 已符合 NIST 建議。
 *
 * 金鑰層次：
 *   password + salt → MasterKey (PBKDF2)
 *   MasterKey → KEK (HKDF, 用於加/解密 DataKey)
 *   MasterKey → AuthKey (HKDF, 未來 SRP 使用)
 *   DataKey → 用於加密財務資料（目前在後端加密，Phase 3 移入 TEE）
 */

const PBKDF2_ITERATIONS = 600_000;
const PBKDF2_HASH = 'SHA-256';

// ─────────────────────────────────────────
// 低階 Web Crypto 工具
// ─────────────────────────────────────────

function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  const buffer = new ArrayBuffer(hex.length / 2);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function bytesToBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

function base64ToBytes(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

// ─────────────────────────────────────────
// 金鑰推導
// ─────────────────────────────────────────

/**
 * 步驟 1：password + salt → MasterKey（CryptoKey，不可匯出）
 * 使用 PBKDF2 with 600k iterations
 */
async function deriveMasterKey(password: string, saltHex: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: hexToBytes(saltHex),
      iterations: PBKDF2_ITERATIONS,
      hash: PBKDF2_HASH,
    },
    keyMaterial,
    { name: 'HKDF', hash: PBKDF2_HASH },
    false,
    ['deriveKey', 'deriveBits'],
  );
}

/**
 * 步驟 2：MasterKey → 子金鑰（HKDF）
 * @param purpose 'kek' 或 'auth'
 */
async function deriveSubKey(
  masterKey: CryptoKey,
  purpose: 'kek' | 'auth',
  kekSalt: string,
): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      hash: PBKDF2_HASH,
      salt: hexToBytes(kekSalt),
      info: enc.encode(`kura-finance-${purpose}-v1`),
    },
    masterKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['wrapKey', 'unwrapKey', 'encrypt', 'decrypt'],
  );
}

// ─────────────────────────────────────────
// Data Key 加密/解密
// ─────────────────────────────────────────

/**
 * 使用 KEK 加密 Data Key（hex 字串）
 * 回傳格式：base64(iv + ciphertext)
 */
async function encryptDataKey(plainDataKeyHex: string, kek: CryptoKey): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    kek,
    enc.encode(plainDataKeyHex),
  );

  // 組合 iv(12 bytes) + ciphertext
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.length);
  return bytesToBase64(combined);
}

/**
 * 使用 KEK 解密 Data Key
 * 輸入格式：base64(iv + ciphertext)
 * 回傳：Data Key hex 字串
 */
async function decryptDataKey(encryptedDataKey: string, kek: CryptoKey): Promise<string> {
  const combined = base64ToBytes(encryptedDataKey);
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);

  const plainBytes = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, kek, ciphertext);
  return new TextDecoder().decode(plainBytes);
}

// ─────────────────────────────────────────
// 公開 API
// ─────────────────────────────────────────

export interface DerivedKeys {
  /** KEK（Key Encryption Key），用於加/解密 Data Key。存在 memory 中，不落地。 */
  kek: CryptoKey;
  /** Auth Key，用於 SRP 計算（hex string）。存在 memory 中，不落地。 */
  authKeyHex: string;
}

/**
 * 主要函式：password + salts → DerivedKeys
 * 在登入/註冊時呼叫，結果存放在 memory（sessionStorage 或 React state）。
 * 密碼本身永遠不離開此函式。
 */
export async function deriveKeysFromPassword(
  password: string,
  srpSalt: string,  // 用於 PBKDF2
  kekSalt: string,  // 用於 KEK 推導
): Promise<DerivedKeys> {
  const masterKey = await deriveMasterKey(password, srpSalt);
  const kek = await deriveSubKey(masterKey, 'kek', kekSalt);

  // 以原始位元組推導 SRP 使用的 Auth key
  const authKeyBits = await crypto.subtle.deriveBits(
    {
      name: 'HKDF',
      hash: PBKDF2_HASH,
      salt: hexToBytes(kekSalt),
      info: new TextEncoder().encode('kura-finance-auth-v1'),
    },
    masterKey,
    256,
  );
  const authKeyHex = bytesToHex(new Uint8Array(authKeyBits));

  return { kek, authKeyHex };
}

/**
 * 產生新的隨機 salt（hex，64 chars = 32 bytes）
 */
export function generateSalt(): string {
  return bytesToHex(crypto.getRandomValues(new Uint8Array(32)));
}

/**
 * 用 KEK 加密後端給的 plainDataKey 並上傳
 */
export async function sealDataKey(plainDataKeyHex: string, kek: CryptoKey): Promise<string> {
  return encryptDataKey(plainDataKeyHex, kek);
}

/**
 * 用 KEK 解密後端存的 encryptedDataKey
 */
export async function unsealDataKey(encryptedDataKey: string, kek: CryptoKey): Promise<string> {
  return decryptDataKey(encryptedDataKey, kek);
}

/**
 * 將 authKeyHex 轉為 SRP 計算用的 bigint
 */
export function authKeyToBigInt(authKeyHex: string): bigint {
  return BigInt(`0x${authKeyHex}`);
}
