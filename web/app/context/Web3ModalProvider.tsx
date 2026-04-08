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

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

// Get the actual URL from the browser at runtime (client-side only)
const getWalletMetadataUrl = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  // Fallback to production URL if window is not available
  return process.env.NEXT_PUBLIC_APP_URL || 'https://kura-web-642134687769.us-central1.run.app';
}

const createWagmiConfig = () => {
  const connectors = walletConnectProjectId
    ? [
        walletConnect({
          projectId: walletConnectProjectId,
          showQrModal: true,
          metadata: {
            name: 'Kura',
            description: 'Kura wallet connection',
            url: getWalletMetadataUrl(),
            icons: ['https://walletconnect.com/walletconnect-logo.png'],
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