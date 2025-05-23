'use client'

import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { useCallback } from 'react'

export function useWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const connectedWallets = useWallets()

  const handleConnect = useCallback(async () => {
    try {
      await connect()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }, [connect])

  const handleDisconnect = useCallback(async () => {
    try {
      if (wallet) {
        await disconnect({ label: wallet.label })
      }
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }, [disconnect, wallet])

  const handleChainSwitch = useCallback(async (chainId: string | number) => {
    try {
      await setChain({ chainId: String(chainId) })
    } catch (error) {
      console.error('Failed to switch chain:', error)
    }
  }, [setChain])

  return {
    wallet,
    connecting,
    chains,
    connectedChain,
    settingChain,
    connectedWallets,
    connect: handleConnect,
    disconnect: handleDisconnect,
    switchChain: handleChainSwitch
  }
} 