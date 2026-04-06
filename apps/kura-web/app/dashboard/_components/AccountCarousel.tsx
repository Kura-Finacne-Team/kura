import React from 'react';
import Image from 'next/image';
import { Account } from '../../store/useFinanceStore';

interface AccountCarouselProps {
  accounts: Account[];
  totalBalance: number;
  selectedId: string;
  onAccountSelect: (id: string) => void;
}

export default function AccountCarousel({ accounts, totalBalance, selectedId, onAccountSelect }: AccountCarouselProps) {
  const formattedTotal = `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  return (
    <div className="relative z-40 w-full mb-10 overflow-visible">
      <div className="flex overflow-x-auto overflow-y-visible snap-x snap-mandatory pb-10 pt-8 pl-6 pr-4 hide-scrollbar -space-x-6">
        
        {/* 總覽卡片 */}
        <div 
          onClick={() => onAccountSelect('all')}
          className={`snap-start shrink-0 w-[320px] h-[180px] rounded-3xl p-6 flex flex-col justify-between transition-all duration-150 hover:-translate-y-3 hover:-translate-x-1 hover:rotate-[-2deg] cursor-pointer 
          ${selectedId === 'all' 
            ? 'z-50 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] shadow-[0_10px_40px_rgba(139,92,246,0.4)]' 
            : 'z-40 bg-[#1A1A24] border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]'}`}
        >
          <div className="flex justify-between items-center">
            <div className={`text-xs font-bold tracking-widest uppercase ${selectedId === 'all' ? 'text-white/80' : 'text-white/50'}`}>
              OVERVIEW
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 ${selectedId === 'all' ? 'bg-white/20' : ''}`}>
              <span className="text-xl">✨</span>
            </div>
          </div>
          <div>
            <div className="text-white text-4xl font-bold tracking-tight mb-1">
              {formattedTotal}
            </div>
            <div className={`font-medium ${selectedId === 'all' ? 'text-white/90' : 'text-gray-400'}`}>
              Net Net Worth
            </div>
          </div>
        </div>

        {/* 個別帳戶卡片 */}
        {accounts.map((account, index) => {
          let topLabel = '';
          let displayBalance = '';

          if (account.type === 'checking' || account.type === 'saving') {
            topLabel = 'BALANCE';
            displayBalance = `$${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          } else if (account.type === 'credit') {
            topLabel = 'CREDIT CARD';
            displayBalance = `-$${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          } else if (account.type === 'crypto') {
            topLabel = 'CRYPTO';
            displayBalance = `$${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          }

          const stackLevel = Math.max(10, 40 - ((index + 1) * 10));
          const defaultBg = index % 2 === 0 ? 'bg-[#1A1A24]' : 'bg-[#0B0B0F] border border-white/10';

          return (
            <div 
              key={account.id} 
              onClick={() => onAccountSelect(account.id)}
              style={{ zIndex: selectedId === account.id ? 50 : stackLevel }}
                className={`snap-start shrink-0 w-[320px] h-[180px] rounded-3xl p-6 flex flex-col justify-between transition-all duration-150 hover:-translate-y-3 hover:-translate-x-1 hover:rotate-[-2deg] hover:!z-50 cursor-pointer 
              ${selectedId === account.id 
                ? 'z-50 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] shadow-[0_10px_40px_rgba(139,92,246,0.4)]' 
                : `${defaultBg} shadow-[0_10px_40px_rgba(0,0,0,0.5)]`}`}
            >
              <div className="flex justify-between items-center">
                <div className={`text-xs font-bold tracking-widest uppercase ${selectedId === account.id ? 'text-white/80' : 'text-white/50'}`}>
                  {topLabel}
                </div>
                <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                  <Image src={account.logo} alt={`${account.name} Logo`} width={32} height={32} className="object-contain" />
                </div>
              </div>
              <div>
                <div className="text-white text-4xl font-bold tracking-tight mb-1">
                  {displayBalance}
                </div>
                <div className={`font-medium ${selectedId === account.id ? 'text-white/90' : 'text-gray-400'}`}>
                  {account.name}
                </div>
              </div>
            </div>
          );
        })}

        {/* Plaid 連結按鈕 */}
        <button className="snap-start shrink-0 w-[320px] h-[180px] rounded-3xl border-2 border-dashed border-[#1A1A24] bg-[#0B0B0F]/50 flex flex-col items-center justify-center transition-all duration-150 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/5 group cursor-pointer ml-6 z-0">
          <div className="w-14 h-14 rounded-full bg-[#1A1A24] flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-150 overflow-hidden">
            <Image src="https://www.google.com/s2/favicons?domain=plaid.com&sz=128" alt="Plaid Logo" width={36} height={36} className="object-contain opacity-40 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-gray-400 font-medium group-hover:text-[#8B5CF6] transition-colors">Connect Account</span>
          <span className="text-xs text-gray-600 mt-2 font-mono uppercase tracking-widest">Powered by Plaid</span>
        </button>

      </div>
    </div>
  );
}