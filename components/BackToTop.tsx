// components/BackToTop.tsx
'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      data-hide-when-menu-open
      className="fixed bottom-6 right-6 z-50 md:hidden bg-surface border border-border-strong text-text-muted hover:text-accent hover:border-accent transition-all rounded-full p-2.5 shadow-lg"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
    </button>
  )
}
