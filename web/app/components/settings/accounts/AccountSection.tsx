import React from 'react';
import Image from 'next/image';
import { AccountListItem } from './types';

interface AccountSectionProps {
  title: string;
  emptyText: string;
  accounts: AccountListItem[];
  disconnectingId: string | null;
  onDisconnectClick: (account: AccountListItem) => void;
}

export default function AccountSection({
  title,
  emptyText,
  accounts,
  disconnectingId,
  onDisconnectClick,
}: AccountSectionProps) {
  return (
    <section className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</h3>
      {accounts.length === 0 ? (
        <div className="p-4 rounded-xl bg-[#1A1A24] border border-white/5 text-sm text-gray-500">{emptyText}</div>
      ) : (
        accounts.map((acc) => (
          <div key={acc.id} className="flex justify-between items-center p-4 rounded-xl bg-[#1A1A24] border border-white/5">
            <div className="flex items-center gap-3 min-w-0">
              <Image src={acc.logo} alt={acc.name} width={32} height={32} className="w-8 h-8 rounded-full bg-white p-1 object-contain" />
              <div className="min-w-0">
                <div className="text-white font-medium text-sm truncate">{acc.name}</div>
                <div className="text-xs text-gray-500">{acc.subtitle}</div>
              </div>
            </div>
            <button
              onClick={() => onDisconnectClick(acc)}
              disabled={disconnectingId === acc.id}
              className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {disconnectingId === acc.id ? 'Disconnecting...' : 'Disconnect'}
            </button>
          </div>
        ))
      )}
    </section>
  );
}
