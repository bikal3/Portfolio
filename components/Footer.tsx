// components/Footer.tsx

// No year here on purpose: this is a static export, so `getFullYear()` would be
// frozen to whenever the site was last built and read stale every January.
export default function Footer() {
  return (
    <footer className="mt-12 py-8">
      <p className="text-text-faint text-xs">© Bikal Shrestha</p>
    </footer>
  )
}
