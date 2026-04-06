// src/app/dashboard/_components/Sidebar.tsx
import React from 'react';

export default function Sidebar() {
  return (
    /* 1. group: 將整個 nav 設為一個群組，讓裡面的文字可以監聽外層的 hover 狀態
      2. w-20 -> hover:w-56: 預設寬度縮窄到 80px，滑鼠移入時展開到 224px
      3. overflow-hidden: 確保收起時，文字不會超出邊界爆掉
      4. transition-all duration-300: 展開/收起時的滑順動畫
    */
    <nav className="relative z-10 group w-20 hover:w-56 border-r border-[#1A1A24] bg-[#0B0B0F] py-6 px-3 flex flex-col gap-2 shrink-0 transition-all duration-300 ease-in-out overflow-hidden">
      
      <button className="flex items-center p-3 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] transition-colors w-full relative">
        <div className="w-8 flex justify-center items-center shrink-0">
          <span className="text-xl">🏦</span>
        </div>
        <span className="ml-3 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Banking
        </span>
      </button>

      <button className="flex items-center p-3 rounded-xl text-gray-400 hover:bg-[#1A1A24] hover:text-white transition-colors w-full relative">
        <div className="w-8 flex justify-center items-center shrink-0">
          <span className="text-xl">📈</span>
        </div>
        <span className="ml-3 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Investment
        </span>
      </button>

      <button className="flex items-center p-3 rounded-xl text-gray-400 hover:bg-[#1A1A24] hover:text-white transition-colors w-full relative">
        <div className="w-8 flex justify-center items-center shrink-0">
          <span className="text-xl">👛</span>
        </div>
        <span className="ml-3 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Budget
        </span>
      </button>

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