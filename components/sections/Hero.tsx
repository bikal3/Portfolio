// components/sections/Hero.tsx
export default function Hero() {
  return (
    <section id="hero" className="py-16 border-b border-border-subtle">
      <p className="text-[11px] text-accent font-semibold tracking-[2px] uppercase mb-4">
        Researcher
      </p>
      <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
        Bikal Adhikari
      </h1>
      <p className="text-text-body text-sm leading-relaxed max-w-xl mb-8">
        MS candidate in Geography Information Science at Clark University.
        Building geospatial tools and analyses at the intersection of remote
        sensing, data science, and urban research.
      </p>
      <div className="flex gap-3 flex-wrap">
        <a
          href="https://github.com/bikal3"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-surface border border-border-strong text-text-muted text-xs px-4 py-2 rounded hover:text-white hover:border-accent transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/bikal-adhikari"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-surface border border-border-strong text-text-muted text-xs px-4 py-2 rounded hover:text-white hover:border-accent transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="mailto:badhikari@clarku.edu"
          className="bg-surface border border-border-strong text-text-muted text-xs px-4 py-2 rounded hover:text-white hover:border-accent transition-colors"
        >
          Email
        </a>
      </div>
    </section>
  )
}
