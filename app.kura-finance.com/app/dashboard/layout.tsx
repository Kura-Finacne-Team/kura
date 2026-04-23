"use client";

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import TopNav from '@/components/TopNav';
import Sidebar from './_components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authStatus = useAppStore((state) => state.authStatus);
  const router = useRouter();

  // 若未認證則導回首頁
  React.useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/');
    }
  }, [authStatus, router]);

  // 檢查認證期間顯示載入狀態
  if (authStatus === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8B5CF6]/20 mb-4">
            <div className="w-8 h-8 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // 僅在已認證時渲染 dashboard
  if (authStatus !== 'authenticated') {
    return null;
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* 頂部導覽列 - 固定於頂部 */}
      <TopNav />
      
      {/* 含側邊欄的主要內容區域 */}
      <div className="flex flex-1 overflow-hidden w-full">
        {/* 側邊欄 - 固定且不可捲動 */}
        <Sidebar />
        
        {/* 主內容 - 可捲動 */}
        <main className="relative z-30 flex-1 overflow-y-auto bg-gradient-to-br from-[#0B0B0F] to-[#1A1A24]/30 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}