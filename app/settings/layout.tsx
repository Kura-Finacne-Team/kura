"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import TopNav from '@/components/TopNav';
import AppSidebar from '@/components/AppSidebar';
import { useAppStore } from '@/store/useAppStore';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authStatus = useAppStore((state) => state.authStatus);
  const router = useRouter();

  React.useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/');
    }
  }, [authStatus, router]);

  if (authStatus === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-[var(--kura-bg)]">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--kura-primary)]/20 mb-4">
              <div className="w-8 h-8 border-2 border-[var(--kura-primary)] border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-[var(--kura-text-secondary)]">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (authStatus !== 'authenticated') {
    return null;
  }

  return (
    <div className="flex h-full w-full">
      <AppSidebar />
      <main className="relative z-30 flex-1 overflow-y-auto bg-[var(--kura-bg)] w-full">
        <TopNav />
        {children}
      </main>
    </div>
  );
}
