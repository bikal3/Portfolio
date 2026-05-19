// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Bikal Shrestha',
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
        <div className="max-w-5xl mx-auto flex min-h-screen">
          <Navbar />
          <main className="flex-1 py-12 px-10 min-w-0">{children}</main>
        </div>
      </body>
    </html>
  )
}
