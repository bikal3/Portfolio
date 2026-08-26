// components/ThemeToggle.tsx
'use client'

import { useEffect } from 'react'

/*
 * No React state for the label or icon. Both variants ship in the HTML and
 * globals.css hides the wrong one based on the data-theme the inline script in
 * layout.tsx sets before first paint, so there is nothing to hydrate, nothing
 * to flash, and no server/client mismatch to reconcile.
 */
export default function ThemeToggle() {
  // A stored choice wins forever; until one exists, keep tracking the OS so a
  // system switch while the page is open does not leave a stale label behind.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      try {
        if (localStorage.theme) return
      } catch {
        return
      }
      document.documentElement.dataset.theme = mq.matches ? 'dark' : 'light'
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const root = document.documentElement
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
    root.dataset.theme = next
    // Overrides the `color-scheme: light dark` in globals.css, which is what
    // every light-dark() token resolves against.
    root.style.colorScheme = next
    try {
      localStorage.theme = next
    } catch {
      // Private mode or blocked storage: the switch still applies, it just
      // will not survive a reload.
    }
  }

  return (
    <button
      onClick={toggle}
      className="theme-toggle flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-xs"
    >
      <span data-when="dark" className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" className="w-4 h-4 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5m-15 0H3m15.364-6.364-1.06 1.06M6.697 17.303l-1.061 1.06m12.728 0-1.06-1.06M6.697 6.697l-1.061-1.06M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
        </svg>
        Light theme
      </span>
      <span data-when="light" className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" className="w-4 h-4 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
        Dark theme
      </span>
    </button>
  )
}
