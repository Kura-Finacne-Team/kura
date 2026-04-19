// src/app/dashboard/page.tsx
"use client";

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useFinanceStore } from '../store/useFinanceStore';

const ConnectAccountModal = dynamic(() => import('@/components/ConnectAccountModal'), {
  ssr: false,
});

export default function DashboardPage() {
  const accounts = useFinanceStore(state => state.accounts);

  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);

  const openConnectFlow = () => {
    setIsConnectModalOpen(true);
  };

  const totalBalance = useMemo(() => {
    return accounts.reduce((acc, curr) => {
      return curr.type === 'credit' ? acc - curr.balance : acc + curr.balance;
    }, 0);
  }, [accounts]);

  return (
    <div className="w-full pb-10">
      {isConnectModalOpen && (
        <ConnectAccountModal
          isOpen={isConnectModalOpen}
          onClose={() => setIsConnectModalOpen(false)}
        />
      )}

      {/* Top Section - Total Assets & Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Total Assets Card */}
        <div className="rounded-2xl bg-[#1A1A24] border border-white/5 p-8 flex flex-col justify-between h-80">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-2">Total Assets</p>
            <h2 className="text-4xl font-bold text-white">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Accounts</span>
              <span className="text-white font-medium">{accounts.length}</span>
            </div>
            <button
              onClick={openConnectFlow}
              className="w-full mt-4 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white text-sm font-medium transition-colors"
            >
              Connect Account
            </button>
          </div>
        </div>

        {/* Accounts Card */}
        <div className="rounded-2xl bg-[#1A1A24] border border-white/5 p-8 flex flex-col justify-between h-80 overflow-y-auto">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-4">Accounts</p>
            <div className="space-y-3">
              {accounts.slice(0, 4).map((account) => (
                <div key={account.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-white font-medium text-sm">{account.name}</p>
                    <p className="text-gray-500 text-xs">{account.type}</p>
                  </div>
                  <p className={`font-mono font-medium ${account.type === 'credit' ? 'text-red-400' : 'text-green-400'}`}>
                    ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section - Investment, Crypto, DeFi Protocol */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Investment Card */}
        <div className="rounded-2xl bg-[#1A1A24] border border-white/5 p-8 flex flex-col justify-between h-80">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-2">Investment</p>
            <h3 className="text-3xl font-bold text-white mb-4">$0.00</h3>
            <p className="text-gray-500 text-sm">Portfolio growth pending setup</p>
          </div>
          <button className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm font-medium transition-colors">
            View Details
          </button>
        </div>

        {/* Crypto Card */}
        <div className="rounded-2xl bg-[#1A1A24] border border-white/5 p-8 flex flex-col justify-between h-80">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-2">Crypto</p>
            <h3 className="text-3xl font-bold text-white mb-4">$0.00</h3>
            <p className="text-gray-500 text-sm">Connect your Web3 wallet</p>
          </div>
          <button className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm font-medium transition-colors">
            Connect Wallet
          </button>
        </div>

        {/* DeFi Protocol Card */}
        <div className="rounded-2xl bg-[#1A1A24] border border-white/5 p-8 flex flex-col justify-between h-80">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-2">DeFi Protocol</p>
            <h3 className="text-3xl font-bold text-white mb-4">$0.00</h3>
            <p className="text-gray-500 text-sm">Track your DeFi positions</p>
          </div>
          <button className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm font-medium transition-colors">
            Add Protocol
          </button>
        </div>

      </div>
    </div>
  );
}