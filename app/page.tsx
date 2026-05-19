// app/page.tsx
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import EducationExperience from '@/components/sections/EducationExperience'
import BlogPreview from '@/components/sections/BlogPreview'

export default function HomePage() {
  return (
    <>
      <About />
      <Projects />
      <EducationExperience />
      <BlogPreview />
    </>
  )
}
