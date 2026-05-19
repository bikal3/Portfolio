// components/ui/SectionLabel.tsx
import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-[11px] text-accent font-semibold tracking-[2px] uppercase mb-4">
      {children}
    </p>
  )
}
