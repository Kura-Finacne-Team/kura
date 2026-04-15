// src/context/Web3ModalProvider.tsx
'use client'

import React, { ReactNode, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, http, WagmiProvider, type State } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { mainnet, arbitrum, polygon } from 'wagmi/chains' // 引入你想要支援的區塊鏈
import AppSessionHydrator from '@/components/AppSessionHydrator'

// 1. 設定 React Query
const queryClient = new QueryClient()

// Reown (formerly WalletConnect) Project ID
const reownProjectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

// Get the actual URL from the browser at runtime (client-side only)
const getWalletMetadataUrl = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  // Must use environment variable if window is not available
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    throw new Error('NEXT_PUBLIC_APP_URL environment variable is not set.');
  }
  return appUrl;
}

const createWagmiConfig = () => {
  const connectors = reownProjectId
    ? [
        walletConnect({
          projectId: reownProjectId,
          showQrModal: true,
          metadata: {
            name: 'Kura',
            description: 'Kura wallet connection',
            url: getWalletMetadataUrl(),
            icons: ['https://reown.com/logo.png'],
          },
        }),
        injected(),
      ]
    : [injected()]

  return createConfig({
    chains: [mainnet, arbitrum, polygon],
    connectors,
    transports: {
      [mainnet.id]: http(),
      [arbitrum.id]: http(),
      [polygon.id]: http(),
    },
    ssr: false,
  })
}

// 6. 建立 Provider 元件
export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  const config = useMemo(() => createWagmiConfig(), [])
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <AppSessionHydrator />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}