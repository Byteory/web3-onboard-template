'use client'

import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { useCallback, useState } from 'react'

export function useWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const connectedWallets = useWallets()
  const [error, setError] = useState<string | null>(null)

  const handleConnect = useCallback(async () => {
    try {
      setError(null)
      await connect()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to connect wallet')
      console.error('Failed to connect wallet:', error)
    }
  }, [connect])

  const handleDisconnect = useCallback(async () => {
    try {
      setError(null)
      if (wallet) {
        await disconnect({ label: wallet.label })
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to disconnect wallet')
      console.error('Failed to disconnect wallet:', error)
    }
  }, [disconnect, wallet])

  const handleChainSwitch = useCallback(async (chainId: number | string) => {
    try {
      setError(null)
      await setChain({ chainId: String(chainId) })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to switch chain')
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
    error,
    connect: handleConnect,
    disconnect: handleDisconnect,
    switchChain: handleChainSwitch
  }
}

export function useWalletAddress() {
  const { wallet } = useWallet()
  return wallet?.accounts[0].address
}

export function useWalletChain() {
  const { connectedChain } = useWallet()
  return connectedChain
}

export function useWalletBalance() {
  const { wallet } = useWallet()
  return wallet?.accounts[0].balance
} 