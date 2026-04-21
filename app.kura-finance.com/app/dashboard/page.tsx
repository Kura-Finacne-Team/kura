// src/app/dashboard/page.tsx
"use client";

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useFinanceStore } from '../store/useFinanceStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ConnectAccountModal = dynamic(() => import('@/components/ConnectAccountModal'), {
  ssr: false,
});

export default function DashboardPage() {
  const accounts = useFinanceStore(state => state.accounts);
  const transactions = useFinanceStore(state => state.transactions);
  const assetHistory = useFinanceStore(state => state.assetHistory);

  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);

  const openConnectFlow = () => {
    setIsConnectModalOpen(true);
  };

  const totalBalance = useMemo(() => {
    return accounts.reduce((acc, curr) => {
      return curr.type === 'credit' ? acc - curr.balance : acc + curr.balance;
    }, 0);
  }, [accounts]);

  // Get recent transactions (last 5)
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  // Format asset history for chart
  const chartData = useMemo(() => {
    return assetHistory.map(snapshot => ({
      time: new Date(snapshot.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: snapshot.totalAssets,
    }));
  }, [assetHistory]);

  return (
    <div className="w-full pb-8 px-4 sm:px-6 lg:px-8 pt-8 max-w-7xl mx-auto">
      {isConnectModalOpen && (
        <ConnectAccountModal
          isOpen={isConnectModalOpen}
          onClose={() => setIsConnectModalOpen(false)}
        />
      )}

      {/* Top Section - Total Assets & Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 lg:mb-6 w-full">
        
        {/* Total Assets Card */}
        <div className="rounded-2xl bg-[#1A1A24] border border-white/5 p-4 sm:p-5 lg:p-6 flex flex-col justify-between aspect-video min-h-[280px] sm:min-h-[320px] w-full">
          <div>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base font-medium mb-2 sm:mb-3">Total Assets</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
          </div>
          
          {/* Chart */}
          {chartData.length > 0 ? (
            <div className="flex-1 -mx-4 sm:-mx-5 lg:-mx-6 -mb-4 sm:-mb-5 lg:-mb-6 flex items-end mt-2 sm:mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" style={{ fontSize: 'clamp(10px, 2vw, 12px)' }} tick={{ fontSize: 'clamp(10px, 2vw, 12px)' }} />
                  <YAxis stroke="rgba(255,255,255,0.3)" style={{ fontSize: 'clamp(10px, 2vw, 12px)' }} width={40} tick={{ fontSize: 'clamp(10px, 2vw, 12px)' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B0B0F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    formatter={(value) => `$${(value as number).toFixed(2)}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3 mt-auto">
              <div className="flex justify-between text-xs sm:text-sm lg:text-base">
                <span className="text-gray-500">Total Accounts</span>
                <span className="text-white font-medium">{accounts.length}</span>
              </div>
              <button
                onClick={openConnectFlow}
                className="w-full py-2 sm:py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white text-xs sm:text-sm font-medium transition-colors"
              >
                Connect Account
              </button>
            </div>
          )}
        </div>

        {/* Accounts Card */}
        <div className="rounded-2xl bg-[#1A1A24] border border-white/5 p-4 sm:p-5 lg:p-6 flex flex-col justify-between aspect-video min-h-[280px] sm:min-h-[320px] overflow-y-auto w-full">
          <div>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base font-medium mb-2 sm:mb-3">Accounts</p>
            <div className="space-y-1 sm:space-y-2">
              {accounts.map((account) => (
                <div key={account.id} className="flex justify-between items-center py-2 sm:py-2.5 border-b border-white/5 last:border-0 gap-2">
                  {/* Account Logo or Initial */}
                  <div className="w-7 sm:w-8 h-7 sm:h-8 flex-shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {account.logo ? (
                      <Image
                        src={account.logo}
                        alt={account.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Hide image on error
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}
                    {!account.logo && (
                      <span className="text-gray-900 text-[10px] sm:text-xs font-bold">
                        {account.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  {/* Account Name and Balance */}
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <p className="text-white font-medium text-xs sm:text-sm truncate">{account.name}</p>
                    <span className="px-1.5 sm:px-2 py-0.5 rounded bg-white/10 text-gray-400 text-[10px] sm:text-xs font-medium flex-shrink-0 capitalize">
                      {account.type}
                    </span>
                  </div>
                  <p className={`font-mono font-medium text-xs sm:text-sm flex-shrink-0 ${account.type === 'credit' ? 'text-red-400' : 'text-green-400'}`}>
                    ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-white/5">
            <button
              onClick={openConnectFlow}
              className="w-full py-2 sm:py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white text-xs sm:text-sm font-medium transition-colors"
            >
              Connect Account
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section - Investment, Crypto, DeFi Protocol */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 w-full">
        
        {/* Investment Card */}
        <div className="rounded-2xl bg-[#1A1A24] border border-white/5 p-4 sm:p-5 lg:p-6 flex flex-col justify-between aspect-square min-h-[240px] sm:min-h-[280px] w-full">
          <div>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base font-medium mb-2 sm:mb-3">Investment</p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">$0.00</h3>
            <p className="text-gray-500 text-xs sm:text-sm">Portfolio growth pending setup</p>
          </div>
          <button className="w-full py-2 sm:py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs sm:text-sm font-medium transition-colors">
            View Details
          </button>
        </div>

        {/* Crypto Card */}
        <div className="rounded-2xl bg-[#1A1A24] border border-white/5 p-4 sm:p-5 lg:p-6 flex flex-col justify-between aspect-square min-h-[240px] sm:min-h-[280px] w-full">
          <div>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base font-medium mb-2 sm:mb-3">Crypto</p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">$0.00</h3>
            <p className="text-gray-500 text-xs sm:text-sm">Connect your Web3 wallet</p>
          </div>
          <button className="w-full py-2 sm:py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs sm:text-sm font-medium transition-colors">
            Connect Wallet
          </button>
        </div>

        {/* DeFi Protocol Card */}
        <div className="rounded-2xl bg-[#1A1A24] border border-white/5 p-4 sm:p-5 lg:p-6 flex flex-col justify-between aspect-square min-h-[240px] sm:min-h-[280px] w-full">
          <div>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base font-medium mb-2 sm:mb-3">DeFi Protocol</p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">$0.00</h3>
            <p className="text-gray-500 text-xs sm:text-sm">Track your DeFi positions</p>
          </div>
          <button className="w-full py-2 sm:py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs sm:text-sm font-medium transition-colors">
            Add Protocol
          </button>
        </div>

      </div>

      {/* Recent Transactions Section */}
      <div className="w-full">
        <div className="rounded-2xl bg-[#1A1A24] border border-white/5 p-4 sm:p-5 lg:p-6 w-full">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4">Recent Transactions</h3>
          
          {recentTransactions.length === 0 ? (
            <p className="text-gray-500 text-xs sm:text-sm text-center py-8">No transactions yet</p>
          ) : (
            <div className="space-y-0">
              {recentTransactions.map((transaction, index) => (
                <div key={transaction.id} className={`flex justify-between items-center py-2 sm:py-3 ${index !== recentTransactions.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className="flex-1">
                    <p className="text-white font-medium text-xs sm:text-sm">{transaction.merchant}</p>
                    <div className="flex gap-2 sm:gap-3 mt-1">
                      <p className="text-gray-500 text-xs">{transaction.category}</p>
                      <p className="text-gray-500 text-xs">{new Date(transaction.date).toLocaleDateString('en-US')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-mono font-medium text-xs sm:text-sm ${transaction.type === 'credit' ? 'text-red-400' : 'text-green-400'}`}>
                      {transaction.type === 'credit' ? '-' : '+'} ${transaction.amount}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">{transaction.accountName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}