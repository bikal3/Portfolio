// components/sections/About.tsx
import SectionLabel from '@/components/ui/SectionLabel'

export default function About() {
  return (
    <section id="about" className="py-12 border-b border-border-subtle">
      <SectionLabel>About</SectionLabel>
      <div className="space-y-4 text-sm text-text-body leading-relaxed max-w-2xl">
        <p>
          I am a researcher and MS candidate in Geography Information Science at
          Clark University. My work focuses on geospatial analysis, remote
          sensing, and the application of data science methods to understand
          urban systems, environmental change, and human settlement patterns.
        </p>
        <p>
          Previously I worked as a data analyst and backend developer, building
          dashboards and data pipelines. I am passionate about making
          geospatial research accessible and reproducible.
        </p>
      </div>
    </section>
  )
}
