// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import BackToTop from '@/components/BackToTop'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Bikal Shrestha',
  description: 'Spatial Data Analyst and Data Scientist specializing in GIS, remote sensing, deep learning, and geospatial research.',
  openGraph: {
    title: 'Bikal Shrestha — Spatial Data Analyst & Data Scientist',
    description: 'Spatial Data Analyst and Data Scientist specializing in GIS, remote sensing, deep learning, and geospatial research.',
    url: 'https://bikal3.com.np',
    siteName: 'Bikal Shrestha',
    images: [
      {
        url: 'https://bikal3.com.np/og-image.png',
        width: 800,
        height: 800,
        alt: 'Bikal Shrestha',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bikal Shrestha — Spatial Data Analyst & Data Scientist',
    description: 'Spatial Data Analyst and Data Scientist specializing in GIS, remote sensing, deep learning, and geospatial research.',
    images: ['https://bikal3.com.np/og-image.png'],
  },
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
          <main className="flex-1 pt-20 pb-12 px-5 md:pt-12 md:px-10 min-w-0">
            {children}
            <Footer />
          </main>
          <BackToTop />
        </div>
      </body>
    </html>
  )
}
