"use client";

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useFinanceStore } from '@/store/useFinanceStore';
import { useAppStore } from '@/store/useAppStore';

const ConnectAccountModal = dynamic(() => import('@/components/ConnectAccountModal'), {
  ssr: false,
});

function formatCurrency(value: number): string {
  return `$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getAccountDisplayName(name: string, mask?: string): string {
  return mask ? `${name} • •${mask}` : name;
}

export default function AccountsPage() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const accounts = useFinanceStore((state) => state.accounts);
  const isLoadingPlaidData = useFinanceStore((state) => state.isLoadingPlaidData);
  const isBalanceHidden = useAppStore((state) => state.isBalanceHidden);

  const availableBalance = useMemo(() => {
    return accounts.reduce((sum, account) => {
      const rawBalance = Number(account.balance) || 0;
      if (account.type === 'credit') {
        return sum - Math.abs(rawBalance);
      }
      return sum + rawBalance;
    }, 0);
  }, [accounts]);

  const fundingAccount = useMemo(() => {
    return accounts.find((account) => account.type === 'checking') ?? accounts.find((account) => account.type === 'saving');
  }, [accounts]);

  const rows = useMemo(() => {
    return accounts.map((account) => {
      const balanceText = account.type === 'credit' ? `-${formatCurrency(account.balance)}` : formatCurrency(account.balance);
      const maskedBalance = isBalanceHidden ? '••••••' : balanceText;

      const autoTransferRule =
        account.type === 'credit'
          ? fundingAccount
            ? `Autopay from ${getAccountDisplayName(fundingAccount.name, fundingAccount.mask)}`
            : 'Add checking account'
          : '+ Create rule';

      const autoTransferSubtext = account.type === 'credit' && fundingAccount ? 'Daily' : '';

      return {
        ...account,
        displayName: getAccountDisplayName(account.name, account.mask),
        maskedBalance,
        autoTransferRule,
        autoTransferSubtext,
      };
    });
  }, [accounts, fundingAccount, isBalanceHidden]);

  return (
    <div className="w-full pb-24 px-6 sm:px-10 lg:px-16 pt-8 max-w-6xl mx-auto">
      {isConnectModalOpen && (
        <ConnectAccountModal isOpen={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} />
      )}

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Accounts</h1>
          <div className="mt-3 flex items-center gap-5 text-sm text-[var(--kura-text-secondary)]">
            <button type="button" className="pb-2 border-b border-[var(--kura-primary)] text-[var(--kura-text)]">
              Mercury accounts
            </button>
            <button type="button" className="pb-2 border-b border-transparent hover:text-[var(--kura-text)] transition-colors">
              Linked accounts
            </button>
            <button type="button" className="pb-2 border-b border-transparent hover:text-[var(--kura-text)] transition-colors">
              Auto transfer rules
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-sm">
            Transfer funds
          </Button>
          <Button variant="secondary" onClick={() => setIsConnectModalOpen(true)}>
            Add account
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs text-[var(--kura-text-secondary)] uppercase tracking-wide mb-1">Available</p>
        <p className="text-4xl font-medium">{isBalanceHidden ? '••••••' : `${availableBalance < 0 ? '-' : ''}${formatCurrency(availableBalance)}`}</p>
      </div>

      <div className="rounded-2xl border border-[var(--kura-border)] bg-[var(--kura-surface)] overflow-hidden">
        <div className="grid grid-cols-[1.6fr_0.6fr_1fr] gap-4 px-4 py-3 text-xs uppercase tracking-wide text-[var(--kura-text-secondary)] border-b border-[var(--kura-border)]">
          <div>Account</div>
          <div>Balance</div>
          <div>Auto transfer rules</div>
        </div>

        {isLoadingPlaidData ? (
          <div className="px-4 py-6 text-sm text-[var(--kura-text-secondary)]">Loading accounts...</div>
        ) : rows.length === 0 ? (
          <div className="px-4 py-8 text-sm text-[var(--kura-text-secondary)] flex items-center justify-between gap-3">
            <span>No accounts connected yet.</span>
            <Button size="sm" onClick={() => setIsConnectModalOpen(true)}>
              Connect account
            </Button>
          </div>
        ) : (
          rows.map((row) => (
            <div key={row.id} className="grid grid-cols-[1.6fr_0.6fr_1fr] gap-4 px-4 py-3 items-center border-b border-[var(--kura-border-light)] last:border-b-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[var(--kura-bg-lighter)] border border-[var(--kura-border)] overflow-hidden flex items-center justify-center">
                  {row.logo ? (
                    <Image src={row.logo} alt={row.displayName} width={28} height={28} className="w-7 h-7 object-cover" />
                  ) : (
                    <span className="text-xs font-semibold">{row.displayName.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{row.displayName}</p>
                  <p className="text-xs text-[var(--kura-text-secondary)] capitalize">{row.type}</p>
                </div>
              </div>

              <p className={`text-sm font-mono ${row.type === 'credit' ? 'text-red-400' : 'text-emerald-400'}`}>
                {row.maskedBalance}
              </p>

              <div className="text-sm">
                <p className={row.type === 'credit' ? 'text-[var(--kura-text)]' : 'text-[var(--kura-primary)]'}>{row.autoTransferRule}</p>
                {row.autoTransferSubtext ? (
                  <p className="text-xs text-[var(--kura-text-secondary)]">{row.autoTransferSubtext}</p>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsConnectModalOpen(true)}
        className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--kura-text-secondary)] hover:text-[var(--kura-text)] transition-colors"
      >
        <span className="w-6 h-6 rounded-full border border-[var(--kura-border)] inline-flex items-center justify-center">+</span>
        Create account
      </button>
    </div>
  );
}
