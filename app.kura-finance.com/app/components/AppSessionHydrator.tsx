"use client";

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useFinanceStore } from '@/store/useFinanceStore';

export default function AppSessionHydrator() {
  const authToken = useAppStore((state) => state.authToken);
  const authStatus = useAppStore((state) => state.authStatus);
  const hydrateFromStorage = useAppStore((state) => state.hydrateFromStorage);
  const hydrateUserProfile = useAppStore((state) => state.hydrateUserProfile);
  const clearAuthSession = useAppStore((state) => state.clearAuthSession);
  const hydratePlaidFinanceData = useFinanceStore((state) => state.hydratePlaidFinanceData);
  const clearPlaidFinanceData = useFinanceStore((state) => state.clearPlaidFinanceData);

  // 首次載入時從儲存狀態初始化認證
  useEffect(() => {
    if (authStatus === 'loading' && !authToken) {
      void hydrateFromStorage();
    }
  }, [authStatus, authToken, hydrateFromStorage]);

  useEffect(() => {
    if (authStatus !== 'loading') {
      return;
    }

    if (!authToken) {
      clearAuthSession();
      return;
    }

    void (async () => {
      await hydrateUserProfile();
      const latestState = useAppStore.getState();
      if (latestState.authStatus === 'authenticated' && latestState.authToken) {
        try {
          await hydratePlaidFinanceData();
        } catch {
          // 即使 Plaid API 暫時不可用，也維持 UI 可用。
        }
      }
    })();
  }, [authStatus, authToken, clearAuthSession, hydrateUserProfile, hydratePlaidFinanceData]);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      clearPlaidFinanceData();
    }
  }, [authStatus, clearPlaidFinanceData]);

  return null;
}