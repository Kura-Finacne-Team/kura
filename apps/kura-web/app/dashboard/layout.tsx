import React from 'react';
import Sidebar from './_components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* 只有進入 Dashboard 才會顯示左側導航 */}
      <Sidebar />
      
      {/* 這裡的 children 會渲染 dashboard/page.tsx 的內容 */}
      <main className="relative z-30 flex-1 overflow-y-auto p-10 bg-gradient-to-br from-[#0B0B0F] to-[#1A1A24]/30">
        {children}
      </main>
    </div>
  );
}