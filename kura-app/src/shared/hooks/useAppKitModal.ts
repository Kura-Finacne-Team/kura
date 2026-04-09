/**
 * Hook for AppKit modal operations
 * Encapsulates all Reown AppKit logic in one place
 * Used by ConnectAccountModal and AppKitConnectButton
 */

import { useCallback, useEffect } from 'react';
import { useAppKit } from '@reown/appkit-react-native';
import Logger from '../utils/Logger';

interface UseAppKitModalReturn {
  openWallet: () => void;
}

export function useAppKitModal(): UseAppKitModalReturn {
  const { open: openAppKit } = useAppKit();

  // Listen for AppKit errors on mount
  useEffect(() => {
    const handleError = (error: any) => {
      Logger.error('useAppKitModal', 'AppKit error event', { error });
      console.error('[useAppKitModal] AppKit error:', error);
    };

    // Try to listen for error events if available
    window?.addEventListener?.('error', handleError);
    return () => {
      window?.removeEventListener?.('error', handleError);
    };
  }, []);

  const openWallet = useCallback(async () => {
    try {
      Logger.debug('useAppKitModal', 'Opening AppKit wallet modal');
      console.log('[useAppKitModal] Attempting to open wallet modal');
      
      const result = await openAppKit();
      Logger.info('useAppKitModal', 'Wallet modal opened', { result });
      console.log('[useAppKitModal] Modal opened successfully');
    } catch (err) {
      const fullError = err instanceof Error ? {
        message: err.message,
        stack: err.stack,
        name: err.name
      } : err;
      
      Logger.error('useAppKitModal', 'Failed to open wallet modal', { error: fullError });
      console.error('[useAppKitModal] Error details:', fullError);
    }
  }, [openAppKit]);

  return {
    openWallet,
  };
}
