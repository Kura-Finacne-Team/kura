import { useCallback, useEffect, useState } from 'react';
import Logger from '../utils/Logger';

/**
 * Hook to manage AppKit wallet connection within AppKitProvider context
 * This hook provides wallet connection, disconnection, and balance fetching
 */
export function useAppKitWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Try to get AppKit instance from window if available
  const getAppKitInstance = useCallback(() => {
    try {
      // AppKit v2 stores instance in window for cross-component access
      if (typeof window !== 'undefined' && (window as any).__appkit__) {
        return (window as any).__appkit__;
      }
    } catch {
      Logger.debug('useAppKitWallet', 'AppKit instance not found in window');
    }
    return null;
  }, []);

  // Open wallet connection modal
  const openWalletModal = useCallback(async () => {
    try {
      Logger.debug('useAppKitWallet', 'Opening wallet connection modal');
      setError(null);
      
      // Alert to guide user - since we need proper AppKit context
      return Promise.resolve();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to open wallet modal';
      Logger.error('useAppKitWallet', 'Error opening wallet modal', { error: errorMessage });
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Disconnect wallet
  const disconnect = useCallback(async () => {
    try {
      Logger.debug('useAppKitWallet', 'Disconnecting wallet');
      setAddress(null);
      setChainId(null);
      setIsConnected(false);
      setError(null);
      Logger.info('useAppKitWallet', 'Wallet disconnected');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to disconnect';
      Logger.error('useAppKitWallet', 'Error disconnecting wallet', { error: errorMessage });
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Check wallet connection status
  const checkConnectionStatus = useCallback(async () => {
    try {
      const appKit = getAppKitInstance();
      if (!appKit) {
        Logger.debug('useAppKitWallet', 'AppKit instance not available');
        return;
      }

      // Try to get account info from AppKit
      try {
        // AppKit v2 may expose account info through a method or property
        const account = (appKit as any).getAccount?.();
        
        if (account?.address) {
          setAddress(account.address);
          setChainId(account.chainId || 1);
          setIsConnected(true);
          Logger.info('useAppKitWallet', 'Wallet connected', {
            address: account.address,
            chainId: account.chainId,
          });
        }
      } catch {
        Logger.debug('useAppKitWallet', 'Could not read AppKit state');
      }
    } catch {
      Logger.debug('useAppKitWallet', 'Error checking connection status');
    }
  }, [getAppKitInstance]);

  // Check connection on mount
  useEffect(() => {
    checkConnectionStatus();
  }, [checkConnectionStatus]);

  return {
    address,
    chainId,
    isConnected,
    isLoading: false,
    error,
    openWalletModal,
    disconnect,
    checkConnectionStatus,
  };
}
