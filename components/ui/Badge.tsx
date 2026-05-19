// components/ui/Badge.tsx
interface BadgeProps {
  label: string
}

export default function Badge({ label }: BadgeProps) {
  return (
    <span className="bg-accent-bg text-accent text-[10px] px-2 py-0.5 rounded">
      {label}
    </span>
  )
}
