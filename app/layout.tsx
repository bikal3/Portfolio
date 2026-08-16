// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import BackToTop from '@/components/BackToTop'
import Footer from '@/components/Footer'
import profileImg from '@/data/profile.webp'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const SITE_URL = 'https://bikal3.com.np'
const DESCRIPTION =
  'Spatial Data Analyst and Data Scientist specializing in GIS, remote sensing, deep learning, and geospatial research.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Bikal Shrestha',
  description: DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  // og:image / twitter:image and their dimensions come from the
  // `opengraph-image` and `twitter-image` file conventions in this directory,
  // so the declared size can never drift from the actual file.
  openGraph: {
    title: 'Bikal Shrestha — Spatial Data Analyst & Data Scientist',
    description: DESCRIPTION,
    url: '/',
    siteName: 'Bikal Shrestha',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bikal Shrestha — Spatial Data Analyst & Data Scientist',
    description: DESCRIPTION,
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Bikal Shrestha',
  url: SITE_URL,
  image: `${SITE_URL}${profileImg.src}`,
  jobTitle: 'Spatial Data Analyst & Data Scientist',
  email: 'mailto:bikal3.bs@gmail.com',
  description: DESCRIPTION,
  sameAs: [
    'https://github.com/bikal3',
    'https://linkedin.com/in/shresthabikal/',
  ],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Clark University' },
    { '@type': 'CollegeOrUniversity', name: 'Coventry University' },
  ],
  knowsAbout: [
    'Geographic Information Science',
    'Remote Sensing',
    'Deep Learning',
    'Machine Learning',
    'Data Analytics',
    'Climate Modeling',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-text-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main-content"
          data-hide-when-menu-open
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-md focus:border focus:border-accent focus:bg-surface focus:px-4 focus:py-2 focus:text-xs focus:text-accent"
        >
          Skip to content
        </a>
        <div className="max-w-5xl mx-auto flex min-h-screen">
          <Navbar />
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 pt-20 pb-12 px-5 md:pt-12 md:px-10 min-w-0"
          >
            {children}
            <Footer />
          </main>
          <BackToTop />
        </div>
      </body>
    </html>
  )
}
