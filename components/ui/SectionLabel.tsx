// components/ui/SectionLabel.tsx
import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  /** Referenced by the parent section's `aria-labelledby`. */
  id?: string
}

export default function SectionLabel({ children, id }: SectionLabelProps) {
  return (
    <h2
      id={id}
      className="text-[11px] text-accent font-semibold tracking-[2px] uppercase mb-4"
    >
      {children}
    </h2>
  )
}
