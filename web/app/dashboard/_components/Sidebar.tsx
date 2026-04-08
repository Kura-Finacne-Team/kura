// src/app/dashboard/_components/Sidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname() || '';

  // 判斷當前路由以切換高亮狀態
  const isBanking = pathname === '/dashboard';
  const isInvestment = pathname.includes('/dashboard/investment');
  const isBudget = pathname.includes('/dashboard/budget');

  return (
    <nav className="relative z-10 group w-20 hover:w-56 border-r border-[#1A1A24] bg-[#0B0B0F] py-6 px-3 flex flex-col gap-2 shrink-0 transition-all duration-300 ease-in-out overflow-hidden h-full">
      
      {/* 1. Banking (首頁) */}
      <Link 
        href="/dashboard"
        className={`flex items-center p-3 rounded-xl transition-colors w-full relative ${
          isBanking 
            ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' 
            : 'text-gray-400 hover:bg-[#1A1A24] hover:text-white'
        }`}
      >
        <div className="w-8 flex justify-center items-center shrink-0">
          <span className="text-xl">🏦</span>
        </div>
        <span className="ml-3 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Banking
        </span>
      </Link>

      {/* 2. Investment (投資組合) */}
      <Link 
        href="/dashboard/investment"
        className={`flex items-center p-3 rounded-xl transition-colors w-full relative ${
          isInvestment 
            ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' 
            : 'text-gray-400 hover:bg-[#1A1A24] hover:text-white'
        }`}
      >
        <div className="w-8 flex justify-center items-center shrink-0">
          <span className="text-xl">📈</span>
        </div>
        <span className="ml-3 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Investment
        </span>
      </Link>

      {/* 3. Budget (預算規劃 - 預留) */}
      <Link 
        href="/dashboard/budget"
        className={`flex items-center p-3 rounded-xl transition-colors w-full relative ${
          isBudget 
            ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' 
            : 'text-gray-400 hover:bg-[#1A1A24] hover:text-white'
        }`}
      >
        <div className="w-8 flex justify-center items-center shrink-0">
          <span className="text-xl">👛</span>
        </div>
        <span className="ml-3 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Budget
        </span>
      </Link>

      {/* Kura AI (底部懸浮) */}
      <button className="flex items-center p-3 rounded-xl text-gray-400 hover:bg-[#1A1A24] hover:text-white transition-colors w-full relative mt-auto border border-transparent hover:border-[#1A1A24]">
        <div className="w-8 flex justify-center items-center shrink-0">
          <span className="text-xl text-[#A78BFA]">✨</span>
        </div>
        <span className="ml-3 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Kura AI
        </span>
      </button>

    </nav>
  );
}