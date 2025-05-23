import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Web3OnboardProvider } from '@/providers/Web3OnboardProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web3-Onboard Template',
  description: 'A modern Web3 wallet connection template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white min-h-screen">
        <Web3OnboardProvider>
          {children}
        </Web3OnboardProvider>
      </body>
    </html>
  )
} 