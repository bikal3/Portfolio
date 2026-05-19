// app/page.tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import EducationExperience from '@/components/sections/EducationExperience'
import BlogPreview from '@/components/sections/BlogPreview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <EducationExperience />
      <BlogPreview />
    </>
  )
}
