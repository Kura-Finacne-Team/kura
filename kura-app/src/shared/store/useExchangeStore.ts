import { create } from 'zustand';
import { InvestmentAccount, Investment } from './useFinanceStore';
import { 
  fetchExchangeBalances as fetchExchangeBalancesApi,
  getConnectedExchangeAccounts,
  ExchangeBalance,
} from '../api/exchangeApi';
import Logger from '../utils/Logger';

export interface ExchangeAccount {
  id: string;
  exchange: 'binance' | 'kraken' | 'coinbase' | 'okx' | 'huobi' | 'bybit' | 'kucoin' | 'bitget' | 'gateio';
  accountName: string;
  createdAt: string;
  lastSyncedAt: string | null;
  userId: string;
}

interface ExchangeStoreState {
  // Exchange 專用數據
  exchangeAccounts: ExchangeAccount[];
  exchangeInvestmentAccounts: InvestmentAccount[]; // InvestmentAccount 形式
  exchangeInvestments: Investment[]; // Investment 形式
  exchangeBalances: Record<string, ExchangeBalance[]>; // 原始余額數據
  isLoading: Record<string, boolean>; // 按 exchangeAccountId 追蹤加載狀態
  error: string | null;
  lastSyncedTime: Record<string, number | null>; // 按 exchangeAccountId 追蹤同步時間

  // Actions
  addExchangeAccount: (account: ExchangeAccount) => void;
  removeExchangeAccount: (exchangeAccountId: string) => void;
  hydrateExchangeAccounts: (token: string) => Promise<void>;
  setExchangeData: (
    exchangeAccountId: string,
    investmentAccount: InvestmentAccount,
    investments: Investment[]
  ) => void;
  fetchExchangeBalances: (exchangeAccountId: string, token: string) => Promise<void>;
  setLoading: (exchangeAccountId: string, loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAll: () => void;

  // Selectors
  getTotalExchangeValue: () => number;
  getExchangeAccountIds: () => string[];
  getExchangesByType: (exchange: string) => InvestmentAccount[];
}

/**
 * 將 ExchangeBalance 轉換為 Investment 物件
 */
function balanceToInvestment(
  balance: ExchangeBalance,
  accountId: string,
  exchange: string
): Investment {
  return {
    id: `${accountId}-${balance.symbol}`,
    accountId,
    symbol: balance.symbol,
    name: balance.symbol, // Will be enriched with coin name if available
    holdings: balance.total,
    currentPrice: balance.usdPrice,
    change24h: balance.change24h,
    usdValue: balance.usdValue,
    type: 'crypto',
    logo: `https://www.google.com/s2/favicons?domain=${exchange}.com&sz=128`,
  };
}

export const useExchangeStore = create<ExchangeStoreState>((set, get) => ({
  // Initial State
  exchangeAccounts: [],
  exchangeInvestmentAccounts: [],
  exchangeInvestments: [],
  exchangeBalances: {},
  isLoading: {},
  error: null,
  lastSyncedTime: {},

  // Actions
  addExchangeAccount: (account: ExchangeAccount) => {
    Logger.info('ExchangeStore', '➕ Added exchange account:', {
      exchange: account.exchange,
      accountId: account.id,
      accountName: account.accountName,
    });

    set((state) => ({
      exchangeAccounts: [...state.exchangeAccounts, account],
    }));
  },

  removeExchangeAccount: (exchangeAccountId: string) => {
    Logger.warn('ExchangeStore', '➖ Removing exchange account:', { exchangeAccountId });

    set((state) => ({
      exchangeAccounts: state.exchangeAccounts.filter(
        (acc) => acc.id !== exchangeAccountId
      ),
      exchangeInvestmentAccounts: state.exchangeInvestmentAccounts.filter(
        (inv) => inv.id !== exchangeAccountId
      ),
      exchangeInvestments: state.exchangeInvestments.filter(
        (inv) => inv.accountId !== exchangeAccountId
      ),
      lastSyncedTime: {
        ...state.lastSyncedTime,
        [exchangeAccountId]: null,
      },
    }));

    Logger.info('ExchangeStore', '✅ Exchange account removed');
  },

  hydrateExchangeAccounts: async (token: string) => {
    try {
      Logger.debug('ExchangeStore', 'Hydrating exchange accounts from backend');

      const accounts = await getConnectedExchangeAccounts(token);

      Logger.debug('ExchangeStore', 'Exchange accounts response received', {
        isArray: Array.isArray(accounts),
        type: typeof accounts,
        count: Array.isArray(accounts) ? accounts.length : 'N/A',
      });

      if (!Array.isArray(accounts)) {
        Logger.warn('ExchangeStore', 'Exchange accounts response is not an array', {
          received: accounts,
        });
        return;
      }

      Logger.info('ExchangeStore', 'Exchange accounts hydrated', {
        count: accounts.length,
        exchanges: accounts.map((a) => a.exchange).join(', '),
      });

      set({ exchangeAccounts: accounts });

      // Also sync to useFinanceStore so exchangeAccounts is available there
      const { useFinanceStore } = await import('./useFinanceStore');
      accounts.forEach((account) => {
        useFinanceStore.getState().addExchangeAccount(account);
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to hydrate exchange accounts';
      Logger.error('ExchangeStore', 'Failed to hydrate exchange accounts', { error: errorMessage });
      // Don't throw - exchange accounts are optional
    }
  },

  setExchangeData: (
    exchangeAccountId: string,
    investmentAccount: InvestmentAccount,
    investments: Investment[]
  ) => {
    Logger.debug('ExchangeStore', '📊 Setting exchange data:', {
      accountId: exchangeAccountId,
      investmentCount: investments.length,
    });

    set((state) => ({
      exchangeInvestmentAccounts: [
        ...state.exchangeInvestmentAccounts.filter(
          (inv) => inv.id !== exchangeAccountId
        ),
        investmentAccount,
      ],
      exchangeInvestments: [
        ...state.exchangeInvestments.filter(
          (inv) => inv.accountId !== exchangeAccountId
        ),
        ...investments,
      ],
      lastSyncedTime: {
        ...state.lastSyncedTime,
        [exchangeAccountId]: Date.now(),
      },
    }));

    Logger.info('ExchangeStore', '✅ Exchange data updated');
  },

  setLoading: (exchangeAccountId: string, loading: boolean) => {
    set((state) => ({
      isLoading: {
        ...state.isLoading,
        [exchangeAccountId]: loading,
      },
    }));
  },

  setError: (error: string | null) => {
    set({ error });
  },

  fetchExchangeBalances: async (exchangeAccountId: string, token: string) => {
    try {
      set((state) => ({
        isLoading: {
          ...state.isLoading,
          [exchangeAccountId]: true,
        },
        error: null,
      }));

      // Validate account exists and is complete
      const exchangeAccount = get().exchangeAccounts.find((acc) => acc.id === exchangeAccountId);
      if (!exchangeAccount) {
        throw new Error(`Exchange account ${exchangeAccountId} not found in store`);
      }

      // Check account completeness
      const missingFields = [];
      if (!exchangeAccount.id) missingFields.push('id');
      if (!exchangeAccount.exchange) missingFields.push('exchange');
      if (!exchangeAccount.accountName) missingFields.push('accountName');
      if (!exchangeAccount.userId) missingFields.push('userId');
      if (!exchangeAccount.createdAt) missingFields.push('createdAt');

      Logger.debug('ExchangeStore', 'Fetching exchange balances', {
        exchangeAccountId,
        complete: missingFields.length === 0,
        missingFields,
      });

      const snapshot = await fetchExchangeBalancesApi(exchangeAccountId, token);

      Logger.debug('ExchangeStore', 'Exchange snapshot received', {
        balancesCount: snapshot.balances?.length,
        balancesUsdTotal: snapshot.balancesUsdTotal,
        assetsCount: snapshot.assets?.length,
        assetsUsdTotal: snapshot.assetsUsdTotal,
        positionsCount: snapshot.positions?.length,
        positionsUsdTotal: snapshot.positionsUsdTotal,
        totalUsdValue: snapshot.totalUsdValue,
        accountDisplayName: snapshot.account.displayName,
        timestamp: snapshot.timestamp,
      });

      // Create InvestmentAccount for this exchange
      const investmentAccount: InvestmentAccount = {
        id: exchangeAccountId,
        name: snapshot.account.displayName || `${snapshot.account.exchange || 'Unknown'} Account`,
        type: 'Exchange',
        logo: `https://www.google.com/s2/favicons?domain=${snapshot.account.exchange || 'exchange'}.com&sz=128`,
      };

      // Convert balances (總持倉) to Investment array
      const investments = (snapshot.balances || []).map((balance) =>
        balanceToInvestment(balance, exchangeAccountId, snapshot.account.exchange)
      );

      Logger.info('ExchangeStore', 'Exchange balances converted to investments', {
        exchangeAccountId,
        investmentCount: investments.length,
        balancesCount: snapshot.balances?.length,
        balancesUsdTotal: snapshot.balancesUsdTotal,
        assetsCount: snapshot.assets?.length,
        assetsUsdTotal: snapshot.assetsUsdTotal,
        positionsCount: snapshot.positions?.length,
        positionsUsdTotal: snapshot.positionsUsdTotal,
        totalUsdValue: snapshot.totalUsdValue,
      });

      set((state) => {
        // Update exchange account last sync time
        const updatedAccounts = state.exchangeAccounts.map((account) =>
          account.id === exchangeAccountId
            ? { ...account, lastSyncedAt: snapshot.timestamp }
            : account
        );

        // Remove old investments for this account and add new ones
        const filteredInvestments = state.exchangeInvestments.filter(
          (inv) => inv.accountId !== exchangeAccountId
        );

        return {
          exchangeAccounts: updatedAccounts,
          exchangeBalances: {
            ...state.exchangeBalances,
            [exchangeAccountId]: snapshot.balances, // 總持倉
          },
          exchangeInvestmentAccounts: [
            ...state.exchangeInvestmentAccounts.filter((inv) => inv.id !== exchangeAccountId),
            investmentAccount,
          ],
          exchangeInvestments: [...filteredInvestments, ...investments],
          lastSyncedTime: {
            ...state.lastSyncedTime,
            [exchangeAccountId]: Date.now(),
          },
          isLoading: {
            ...state.isLoading,
            [exchangeAccountId]: false,
          },
        };
      });

      Logger.info('ExchangeStore', 'Exchange balances updated successfully', {
        exchangeAccountId,
        balancesCount: snapshot.balances?.length,
        balancesUsdTotal: snapshot.balancesUsdTotal,
        assetsCount: snapshot.assets?.length,
        assetsUsdTotal: snapshot.assetsUsdTotal,
        positionsCount: snapshot.positions?.length,
        positionsUsdTotal: snapshot.positionsUsdTotal,
        totalUsdValue: snapshot.totalUsdValue,
        investmentCount: investments.length,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch exchange balances';
      const account = get().exchangeAccounts.find(a => a.id === exchangeAccountId);
      
      // Check what fields are missing
      const missingFields = [];
      if (!account) {
        missingFields.push('account-not-found');
      } else {
        if (!account.accountName) missingFields.push('accountName');
        if (!account.userId) missingFields.push('userId');
        if (!account.createdAt) missingFields.push('createdAt');
        if (!account.lastSyncedAt) missingFields.push('lastSyncedAt');
        if (!account.id) missingFields.push('id');
        if (!account.exchange) missingFields.push('exchange');
      }
      
      Logger.error('ExchangeStore', 'Failed to fetch exchange balances', {
        error: errorMessage,
        exchangeAccountId,
        accountMissing: missingFields.length > 0 ? missingFields : 'all-fields-present',
        accountData: account,
      });

      set((state) => ({
        isLoading: {
          ...state.isLoading,
          [exchangeAccountId]: false,
        },
        error: errorMessage,
      }));

      throw error;
    }
  },

  clearAll: () => {
    Logger.warn('ExchangeStore', '🗑️ Clearing all exchange data');
    set({
      exchangeAccounts: [],
      exchangeInvestmentAccounts: [],
      exchangeInvestments: [],
      exchangeBalances: {},
      isLoading: {},
      error: null,
      lastSyncedTime: {},
    });
  },

  // Selectors
  getTotalExchangeValue: () => {
    const { exchangeInvestments } = get();
    return exchangeInvestments.reduce(
      (sum, inv) => sum + inv.holdings * inv.currentPrice,
      0
    );
  },

  getExchangeAccountIds: () => {
    const { exchangeAccounts } = get();
    return exchangeAccounts.map((acc) => acc.id);
  },

  getExchangesByType: (exchange: string) => {
    const { exchangeInvestmentAccounts } = get();
    return exchangeInvestmentAccounts.filter(
      (acc) => acc.name.toLowerCase().includes(exchange.toLowerCase())
    );
  },
}));
