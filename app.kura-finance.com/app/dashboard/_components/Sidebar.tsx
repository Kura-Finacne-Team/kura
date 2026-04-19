// src/app/dashboard/_components/Sidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <Link 
      href={href}
      className={`px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
        isActive 
          ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' 
          : 'text-gray-400 hover:bg-[#1A1A24] hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname() || '';

  // 判斷當前路由以切換高亮狀態
  const isHome = pathname === '/dashboard';
  const isAccounts = pathname.includes('/dashboard/accounts');
  const isTransactions = pathname.includes('/dashboard/transactions');
  const isInvestment = pathname.includes('/dashboard/investment');
  const isDefiProtocol = pathname.includes('/dashboard/defi-protocol');
  const isBudget = pathname.includes('/dashboard/budget');
  const isImpermanentLoss = pathname.includes('/dashboard/impermanent-loss');
  const isTaxCalculator = pathname.includes('/dashboard/tax-calculator');

  return (
    <nav className="relative z-10 w-56 border-r border-[#1A1A24] bg-[#0B0B0F] py-6 px-3 flex flex-col gap-0 shrink-0 transition-all duration-300 ease-in-out overflow-y-auto h-full">
      
      {/* Home */}
      <NavLink href="/dashboard" label="Home" isActive={isHome} />
      
      {/* Divider */}
      <div className="my-4 border-t border-gray-800" />

      {/* Main Section */}
      <div className="space-y-1 mb-4">
        <NavLink href="/dashboard/accounts" label="Accounts" isActive={isAccounts} />
        <NavLink href="/dashboard/transactions" label="Transactions" isActive={isTransactions} />
        <NavLink href="/dashboard/investment" label="Investment" isActive={isInvestment} />
        <NavLink href="/dashboard/defi-protocol" label="DeFi Protocol" isActive={isDefiProtocol} />
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-800" />

      {/* Secondary Section */}
      <div className="space-y-1">
        <NavLink href="/dashboard/budget" label="Budget" isActive={isBudget} />
        <NavLink href="/dashboard/impermanent-loss" label="Impermanent Loss" isActive={isImpermanentLoss} />
        <NavLink href="/dashboard/tax-calculator" label="Tax Calculator" isActive={isTaxCalculator} />
      </div>

    </nav>
  );
}