import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'

// Debug log for the WalletConnect project ID
declare const process: { env: { [key: string]: string | undefined } };
console.log('WalletConnect Project ID:', process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID);

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '';
if (!projectId) {
  console.warn('⚠️ WalletConnect Project ID is missing! Check your .env.local file.');
}

// Initialize wallet modules
const injected = injectedModule()
const walletConnect = walletConnectModule({
  projectId
})
const coinbase = coinbaseModule()

// Define supported chains with public RPC endpoints
const chains = [
  {
    id: 1,
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: 'https://rpc.ankr.com/eth'
  },
  {
    id: 137,
    token: 'MATIC',
    label: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-rpc.com'
  },
  {
    id: 42161,
    token: 'ETH',
    label: 'Arbitrum One',
    rpcUrl: 'https://arb1.arbitrum.io/rpc'
  },
  {
    id: 8453,
    token: 'ETH',
    label: 'Base',
    rpcUrl: 'https://mainnet.base.org'
  }
]

// Initialize Web3-Onboard
export const onboard = Onboard({
  wallets: [injected, walletConnect, coinbase],
  chains,
  appMetadata: {
    name: 'Web3-Onboard Template',
    icon: '<svg>...</svg>', // Add your app icon here
    description: 'A modern Web3 wallet connection template',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
    ]
  },
  theme: 'dark',
  accountCenter: {
    desktop: {
      position: 'topRight',
      enabled: true,
      minimal: false
    },
    mobile: {
      position: 'topRight',
      enabled: true,
      minimal: true
    }
  }
}) 