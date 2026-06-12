// components/sections/EducationExperience.tsx
import SectionLabel from '@/components/ui/SectionLabel'
import { education, experience } from '@/data/portfolio'

export default function EducationExperience() {
  return (
    <section id="education" className="py-12 border-b border-border-subtle">
      <div className="flex flex-col gap-10">
        {/* Education column */}
        <div>
          <SectionLabel>Education</SectionLabel>
          <div className="flex flex-col gap-4">
            {education.map((item) => (
              <div key={item.degree}>
                <p className="text-white text-sm font-semibold">{item.degree}</p>
                <p className="text-text-muted text-xs mt-0.5">{item.institution}</p>
                <p className="text-text-faint text-xs mt-0.5">{item.dates}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience column */}
        <div>
          <SectionLabel>Experience</SectionLabel>
          <div className="flex flex-col gap-5">
            {experience.map((item) => (
              <div key={item.role}>
                <p className="text-white text-sm font-semibold">{item.role}</p>
                <p className="text-text-muted text-xs mt-0.5">{item.organization}</p>
                <p className="text-text-faint text-xs mt-0.5 mb-2">{item.dates}</p>
                <ul className="flex flex-col gap-1">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-xs text-text-muted leading-relaxed">
                      <span className="text-accent mt-0.5 shrink-0">›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
