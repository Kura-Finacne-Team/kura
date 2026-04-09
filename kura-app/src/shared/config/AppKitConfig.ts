// src/AppKitConfig.ts - AppKit initialization with WalletConnect support
import '@walletconnect/react-native-compat'

import { createAppKit } from '@reown/appkit-react-native'
import { EthersAdapter } from '@reown/appkit-ethers-react-native'
import { mainnet, polygon } from 'viem/chains'
import { storageAdapter } from './StorageAdapter'

const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID

if (!projectId) {
  throw new Error(
    'WALLETCONNECT_PROJECT_ID environment variable is not defined. ' +
    'Please obtain it from https://dashboard.reown.com/ and set it in your environment variables.'
  )
}

const ethersAdapter = new EthersAdapter()

/**
 * AppKit Configuration
 * Supports EVM chains: Ethereum and Polygon
 * Enables wallet detection and QR code connection via WalletConnect
 */
export const appKit = createAppKit({
  projectId,
  networks: [mainnet, polygon],
  defaultNetwork: mainnet,
  adapters: [ethersAdapter],
  storage: storageAdapter,

  metadata: {
    name: 'Kura Finance',
    description: 'Web3 financial portfolio & investment tracker',
    url: 'https://kura-finance.app',
    icons: ['https://assets.reown.com/reown-studio/b6bfe22e-dbc4-4b7e-92c4-704c99fbc51c/image-3.png'],
    redirect: {
      native: 'kura://',
      universal: 'https://kura-finance.app'
    }
  }
})