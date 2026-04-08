import React from 'react';
import Link from 'next/link'; // 使用 Next.js 的 Link 來做路由跳轉

export default function RootHubPage() {
  return (
    <div className="flex-1 flex justify-center items-center p-10">
      <div className="w-full max-w-4xl rounded-3xl border border-[#1A1A24] bg-gradient-to-br from-[#1A1A24]/40 to-[#0B0B0F]/40 backdrop-blur-xl p-16 flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold mb-6 tracking-tight text-white">Your Financial Nexus</h1>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-12">
          Welcome to the Kura Ecosystem. Where do you want to go today?
        </p>
        
        <div className="flex gap-6">
          {/* 點擊後正式進入 /dashboard 路由 */}
          <Link href="/dashboard" className="px-8 py-4 bg-[#8B5CF6] text-white font-semibold rounded-xl hover:bg-[#A78BFA] transition-colors shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            Open Dashboard
          </Link>
          
          <button className="px-8 py-4 bg-[#1A1A24] border border-white/5 text-gray-400 font-semibold rounded-xl cursor-not-allowed">
            Rewards (Soon)
          </button>
        </div>
      </div>
    </div>
  );
}