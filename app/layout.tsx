// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Bikal Adhikari',
  description: 'Researcher in Geography Information Science at Clark University.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-text-body antialiased">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 py-12">{children}</main>
      </body>
    </html>
  )
}
