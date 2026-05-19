// components/Navbar.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'blog-preview', label: 'Blog' },
] as const

type NavId = (typeof NAV_ITEMS)[number]['id']

export default function Navbar() {
  const [active, setActive] = useState<NavId | null>(null)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    if (!isHome) return

    const observers: IntersectionObserver[] = []

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [isHome])

  return (
    <nav className="sticky top-0 z-50 bg-bg border-b border-[#1f1f1f]">
      <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-bold text-white text-sm hover:text-accent transition-colors"
        >
          Bikal Adhikari
        </Link>
        <div className="hidden sm:flex gap-6">
          {NAV_ITEMS.map(({ id, label }) =>
            isHome ? (
              <a
                key={id}
                href={`#${id}`}
                className={`text-xs transition-colors ${
                  active === id
                    ? 'text-accent'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                {label}
              </a>
            ) : (
              <Link
                key={id}
                href={`/#${id}`}
                className="text-xs text-text-muted hover:text-white transition-colors"
              >
                {label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  )
}
