// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-border-subtle mt-12 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p className="text-text-faint text-xs">
          © {new Date().getFullYear()} Bikal Shrestha
        </p>
        <p className="text-text-faint text-xs">
          Built with{' '}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Next.js
          </a>{' '}
          &{' '}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Tailwind CSS
          </a>
        </p>
      </div>
    </footer>
  )
}
