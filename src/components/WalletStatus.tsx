'use client'

import React from 'react'
import { useWallet, useWalletAddress, useWalletChain, useWalletBalance } from '@/lib/hooks'

export function WalletStatus() {
  const { wallet, settingChain, error } = useWallet()
  const address = useWalletAddress()
  const chain = useWalletChain()
  const balance = useWalletBalance()

  if (!wallet) {
    return null
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <div className="space-y-4">
        <div>
          <span className="text-sm text-gray-400">Connected Chain:</span>
          <div className="flex items-center space-x-2">
            <p className="text-white font-medium">{chain?.id ? `Chain ID: ${chain.id}` : 'Unknown Chain'}</p>
            {settingChain && (
              <svg className="animate-spin h-4 w-4 text-blue-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
          </div>
        </div>

        <div>
          <span className="text-sm text-gray-400">Wallet Address:</span>
          <p className="text-white font-mono text-sm">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
          </p>
        </div>

        {balance && (
          <div>
            <span className="text-sm text-gray-400">Balance:</span>
            <p className="text-white font-medium">
              {typeof balance === 'string' ? parseFloat(balance).toFixed(4) : '0.0000'} {chain?.id === '137' ? 'MATIC' : 'ETH'}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-2">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
} 