// components/sections/Projects.tsx
import SectionLabel from '@/components/ui/SectionLabel'
import Badge from '@/components/ui/Badge'
import { projects } from '@/data/portfolio'

export default function Projects() {
  return (
    <section id="projects" className="py-12 border-b border-border-subtle">
      <SectionLabel>Projects</SectionLabel>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-surface border border-border-strong rounded-md p-4"
          >
            <h3 className="text-white text-sm font-semibold mb-2">
              {project.title}
            </h3>
            <p className="text-text-muted text-xs leading-relaxed mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} label={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
