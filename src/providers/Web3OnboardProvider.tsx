'use client'

import { Web3OnboardProvider as Provider } from '@web3-onboard/react'
import { onboard } from '@/lib/web3onboard'

export function Web3OnboardProvider({ children }: { children: React.ReactNode }) {
  return <Provider web3Onboard={onboard}>{children}</Provider>
} 