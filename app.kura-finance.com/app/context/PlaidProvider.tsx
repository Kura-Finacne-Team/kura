"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface PlaidContextType {
  isPlaidReady: boolean;
  plaidError: string | null;
}

const PlaidContext = createContext<PlaidContextType>({
  isPlaidReady: false,
  plaidError: null,
});

export function PlaidProvider({ children }: { children: ReactNode }) {
  const [isPlaidReady, setIsPlaidReady] = useState(false);
  const [plaidError, setPlaidError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Plaid is already loaded
    if (typeof window !== 'undefined' && (window as any).Plaid) {
      console.log('[PlaidProvider] Plaid SDK already loaded');
      setIsPlaidReady(true);
      return;
    }

    // Wait for Plaid to load
    const checkPlaidLoaded = () => {
      if ((window as any).Plaid) {
        console.log('[PlaidProvider] Plaid SDK detected');
        setIsPlaidReady(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkPlaidLoaded()) return;

    // Set up polling to check if Plaid loads
    let attempts = 0;
    const maxAttempts = 100; // ~10 seconds at 100ms intervals
    const checkInterval = setInterval(() => {
      attempts++;
      
      if (checkPlaidLoaded()) {
        clearInterval(checkInterval);
        return;
      }

      if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.error('[PlaidProvider] Plaid SDK failed to load after 10 seconds');
        setPlaidError('Plaid SDK failed to load. Please refresh the page.');
      }
    }, 100);

    // Also listen for script load events
    const handleScriptLoad = () => {
      console.log('[PlaidProvider] Script load event detected');
      if ((window as any).Plaid) {
        setIsPlaidReady(true);
        clearInterval(checkInterval);
      }
    };

    window.addEventListener('load', handleScriptLoad);

    return () => {
      clearInterval(checkInterval);
      window.removeEventListener('load', handleScriptLoad);
    };
  }, []);

  return (
    <PlaidContext.Provider value={{ isPlaidReady, plaidError }}>
      {children}
    </PlaidContext.Provider>
  );
}

export function usePlaidReady() {
  const context = useContext(PlaidContext);
  if (!context) {
    throw new Error('usePlaidReady must be used within PlaidProvider');
  }
  return context;
}
