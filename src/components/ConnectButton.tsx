'use client'

import React from 'react'
import { useWallet } from '@/lib/hooks'

export function ConnectButton() {
  const { wallet, connecting, error, connect, disconnect } = useWallet()

  if (wallet) {
    return (
      <div className="space-y-2">
        <button
          onClick={disconnect}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Disconnect Wallet
        </button>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <button
        onClick={connect}
        disabled={connecting}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {connecting ? (
          <span className="flex items-center space-x-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Connecting...</span>
          </span>
        ) : (
          'Connect Wallet'
        )}
      </button>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
} 