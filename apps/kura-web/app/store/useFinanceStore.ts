// src/store/useFinanceStore.ts
import { create } from 'zustand';

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: 'checking' | 'saving' | 'credit' | 'crypto';
  logo: string;
}

export interface Transaction {
  id: string | number;
  accountId: string; // 💡 1. 新增關聯的帳戶 ID
  amount: string;
  date: string;
  merchant: string;
  category: string;
  type: 'credit' | 'deposit' | 'transfer';
}

interface FinanceState {
  accounts: Account[];
  transactions: Transaction[];
  isAiOptedIn: boolean;
  toggleAiOptIn: () => void;
  setAccounts: (accounts: Account[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  accounts: [
    { id: '1', name: 'BofA Checking', balance: 12450.00, type: 'checking', logo: 'https://www.google.com/s2/favicons?domain=bankofamerica.com&sz=128' },
    { id: '2', name: 'Sapphire Preferred', balance: 4200.50, type: 'credit', logo: 'https://www.google.com/s2/favicons?domain=chase.com&sz=128' },
    { id: '3', name: 'Marcus Savings', balance: 27849.50, type: 'saving', logo: 'https://www.google.com/s2/favicons?domain=marcus.com&sz=128' },
  ],
  transactions: [
    // 💡 2. 為每筆交易綁定對應的 accountId
    { id: 1, accountId: '2', amount: '124.50', date: 'April 5, 2026', merchant: 'Whole Foods', category: 'Groceries', type: 'credit' },
    { id: 2, accountId: '2', amount: '45.00', date: 'April 4, 2026', merchant: 'Uber Eats', category: 'Dining', type: 'credit' },
    { id: 3, accountId: '2', amount: '12.99', date: 'April 3, 2026', merchant: 'Netflix', category: 'Entertainment', type: 'credit' },
    { id: 4, accountId: '1', amount: '8.50', date: 'April 2, 2026', merchant: 'Blue Bottle Coffee', category: 'Dining', type: 'credit' },
    { id: 5, accountId: '1', amount: '2500.00', date: 'April 1, 2026', merchant: 'Company Payroll', category: 'Income', type: 'deposit' },
    { id: 6, accountId: '2', amount: '85.20', date: 'March 30, 2026', merchant: 'Shell Station', category: 'Transport', type: 'credit' },
    { id: 7, accountId: '3', amount: '120.00', date: 'March 28, 2026', merchant: 'Interest Paid', category: 'Income', type: 'deposit' },
  ],
  isAiOptedIn: false,

  toggleAiOptIn: () => set((state) => ({ isAiOptedIn: !state.isAiOptedIn })),
  setAccounts: (accounts) => set({ accounts }),
  setTransactions: (transactions) => set({ transactions }),
}));