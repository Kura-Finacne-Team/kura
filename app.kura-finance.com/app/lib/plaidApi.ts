/**
 * Plaid API Service Layer
 * 对齐 kura-app 实现
 */

import { getBackendBaseUrl } from './authApi';
import { handleFetchError, handleResponseError, logResponse, logSuccess, extractErrorMessage } from './errorHandler';

export interface BackendFinanceAccount {
  id: string;
  name: string;
  balance: number;
  type: 'checking' | 'saving' | 'credit' | 'crypto';
  logo: string;
}

export interface BackendFinanceTransaction {
  id: string;
  accountId: string;
  accountName: string;
  accountType: 'checking' | 'saving' | 'credit' | 'crypto';
  amount: string;
  date: string;
  merchant: string;
  category: string;
  type: 'credit' | 'deposit' | 'transfer';
}

export interface BackendFinanceInvestmentAccount {
  id: string;
  name: string;
  type: 'Broker' | 'Exchange' | 'Web3 Wallet';
  logo: string;
}

export interface BackendFinanceInvestment {
  id: string;
  accountId: string;
  symbol: string;
  name: string;
  holdings: number;
  currentPrice: number;
  change24h: number;
  type: 'crypto' | 'stock';
  logo: string;
}

export interface BackendFinanceSnapshot {
  accounts: BackendFinanceAccount[];
  transactions: BackendFinanceTransaction[];
  investmentAccounts: BackendFinanceInvestmentAccount[];
  investments: BackendFinanceInvestment[];
}

export interface UpdatePlaidAccountOrderPayload {
  accountIds?: string[];
  investmentAccountIds?: string[];
}

interface ApiErrorBody {
  error?: string;
  message?: string;
}

export class PlaidApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'PlaidApiError';
    this.status = status;
  }
}

async function plaidRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getBackendBaseUrl();
  const url = `${baseUrl}${path}`;

  const headers = new Headers(options.headers ?? {});
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }
  // 标识为 Web 客户端
  headers.set('X-Client-Type', 'web');

  try {
    console.debug('[PlaidAPI] Fetching:', {
      method: options.method || 'GET',
      url,
    });

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // 重要: 包含 HttpOnly Cookie
    });

    logResponse(response.status, response.statusText, response.headers.get('content-type'), url, 'PlaidAPI');

    const raw = await response.text();
    let json: (ApiErrorBody & T) | null = null;
    if (raw) {
      try {
        json = JSON.parse(raw) as ApiErrorBody & T;
      } catch {
        json = null;
      }
    }

    if (!response.ok) {
      const { error, message } = extractErrorMessage(json);
      const errorMsg = error || message || `Request failed with status ${response.status}`;
      const { error: apiError } = handleResponseError(response.status, errorMsg, url, 'PlaidAPI');
      throw apiError;
    }

    logSuccess(json, url, 'PlaidAPI');
    return (json as T) ?? ({} as T);
  } catch (error) {
    // 如果已经是 PlaidApiError，直接抛出
    if (error instanceof PlaidApiError) {
      throw error;
    }
    
    const { error: apiError } = handleFetchError(error, url, 'PlaidAPI');
    throw apiError;
  }
}

/**
 * 创建 Plaid Link Token
 * Cookie 会自动发送，无需手动传递 token
 */
export const createPlaidLinkToken = (): Promise<{ link_token: string }> => {
  return plaidRequest<{ link_token: string }>(
    '/api/plaid/create-link-token',
    { method: 'POST' }
  );
};

/**
 * 交换 Plaid Public Token 为 Access Token
 * 用户在 Plaid 完成授权后调用
 * Cookie 会自动发送，无需手动传递 token
 */
export const exchangePlaidPublicToken = (
  payload: { public_token: string; institution_name?: string }
): Promise<{ status: string; message: string }> => {
  return plaidRequest<{ status: string; message: string }>(
    '/api/plaid/exchange-public-token',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
};

/**
 * 获取财务数据快照
 * 包括银行账户、交易、投资账户和投资产品
 * Cookie 会自动发送，无需手动传递 token
 */
export const fetchPlaidFinanceSnapshot = (): Promise<BackendFinanceSnapshot> => {
  return plaidRequest<BackendFinanceSnapshot>(
    '/api/plaid/finance-snapshot',
    { method: 'GET' }
  );
};

/**
 * 断开 Plaid 银行账户连接
 * Cookie 会自动发送，无需手动传递 token
 */
export const disconnectPlaidAccount = (
  accountId: string
): Promise<{ status: string; message: string }> => {
  return plaidRequest<{ status: string; message: string }>(
    '/api/plaid/account',
    {
      method: 'DELETE',
      body: JSON.stringify({ accountId }),
    }
  );
};

/**
 * 更新 Plaid 账户顺序（用于 UI 排序）
 * Cookie 会自动发送，无需手动传递 token
 */
export const updatePlaidAccountOrder = (
  payload: UpdatePlaidAccountOrderPayload
): Promise<{ status: string; message: string }> => {
  return plaidRequest<{ status: string; message: string }>(
    '/api/plaid/account-order',
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    }
  );
};
