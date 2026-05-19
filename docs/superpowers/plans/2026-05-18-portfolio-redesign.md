# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing vanilla HTML/CSS/JS portfolio as a Next.js 14 App Router site with Tailwind CSS, MDX blog, and a modern dark aesthetic targeting academic audiences.

**Architecture:** Single scrollable homepage with anchor-linked sections (About, Projects, Education+Experience, Blog Preview), plus a dedicated `/blog` route for listing and reading MDX posts. Data for projects/education/experience lives in a typed TypeScript file; blog posts are `.mdx` files with frontmatter parsed at build time.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, next-mdx-remote, gray-matter, reading-time, @tailwindcss/typography, Jest + React Testing Library, Vercel deployment.

---

## File Map

Files created or modified per task:

| File | Purpose |
|---|---|
| `package.json`, `tsconfig.json`, `next.config.ts` | Project scaffold (Task 1) |
| `tailwind.config.ts`, `app/globals.css` | Dark theme + Inter font (Task 2) |
| `jest.config.ts`, `jest.setup.ts` | Test infrastructure (Task 3) |
| `data/portfolio.ts` | Typed project/education/experience data (Task 4) |
| `lib/blog.ts` | MDX file reading, frontmatter parsing, reading time (Task 5) |
| `__tests__/lib/blog.test.ts` | Tests for blog utility (Task 5) |
| `components/ui/SectionLabel.tsx` | Teal uppercase section label (Task 6) |
| `components/ui/Badge.tsx` | Tech stack badge (Task 6) |
| `components/Navbar.tsx` | Sticky nav with IntersectionObserver active state (Task 7) |
| `app/layout.tsx` | Root layout with Navbar, Inter font (Task 8) |
| `components/sections/Hero.tsx` | Hero section (Task 9) |
| `components/sections/About.tsx` | About section (Task 10) |
| `components/sections/Projects.tsx` | Projects cards section (Task 11) |
| `components/sections/EducationExperience.tsx` | Two-column Education + Experience (Task 12) |
| `components/sections/BlogPreview.tsx` | Latest 3 posts preview (Task 13) |
| `app/page.tsx` | Main page assembly (Task 14) |
| `app/blog/page.tsx` | Blog index page (Task 15) |
| `app/blog/[slug]/page.tsx` | Single blog post page (Task 16) |
| `content/blog/hello-world.mdx` | Sample blog post (Task 17) |
| `.gitignore` | Add `.superpowers/` (Task 18) |

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/` directory structure

- [ ] **Step 1: Run create-next-app in the portfolio directory**

```bash
cd /Users/bikal/Documents/durupo-project/portfolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```

When prompted "The directory contains files that could conflict. Continue?", select **Yes**. When prompted about Turbopack, say **No** (keep standard webpack for stability).

Expected output ends with: `Success! Created portfolio`

- [ ] **Step 2: Verify the scaffold**

```bash
ls app/ components/ public/
```

Expected: `app/` contains `layout.tsx`, `page.tsx`, `globals.css`. `components/` and `public/` exist.

- [ ] **Step 3: Start dev server to confirm baseline works**

```bash
npm run dev
```

Open http://localhost:3000 — should show the default Next.js welcome page. Kill the server with Ctrl+C.

- [ ] **Step 4: Commit scaffold**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts .eslintrc.json .gitignore
git add app/ components/ public/
git commit -m "feat: scaffold Next.js 14 App Router project"
```

---

## Task 2: Configure Tailwind Dark Theme + Global CSS

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts with dark theme config**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f0f',
        surface: '#161616',
        'border-subtle': '#1a1a1a',
        'border-strong': '#222222',
        'text-body': '#cccccc',
        'text-muted': '#888888',
        'text-faint': '#666666',
        accent: '#6ee7b7',
        'accent-bg': '#0d2818',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': '#cccccc',
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-code': '#6ee7b7',
            '--tw-prose-pre-bg': '#161616',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
```

- [ ] **Step 2: Replace app/globals.css**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0f0f0f;
  color: #cccccc;
}

/* Blog prose: teal left border on code blocks */
.prose :where(pre):not(:where([class~="not-prose"] *)) {
  background-color: #161616;
  border-left: 3px solid #6ee7b7;
  border-radius: 0 4px 4px 0;
}

.prose :where(code):not(:where([class~="not-prose"] *))::before,
.prose :where(code):not(:where([class~="not-prose"] *))::after {
  content: '';
}
```

- [ ] **Step 3: Install @tailwindcss/typography**

```bash
npm install -D @tailwindcss/typography
```

Expected: `added 1 package`

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css package.json package-lock.json
git commit -m "feat: configure dark Tailwind theme and global styles"
```

---

## Task 3: Set Up Jest + React Testing Library

**Files:**
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Modify: `package.json` (add test scripts)

- [ ] **Step 1: Install testing dependencies**

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest
```

Expected: `added N packages`

- [ ] **Step 2: Create jest.config.ts**

```ts
// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathPattern: '__tests__',
}

export default createJestConfig(config)
```

- [ ] **Step 3: Create jest.setup.ts**

```ts
// jest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Add test scripts to package.json**

Open `package.json` and add to the `"scripts"` section:

```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 5: Verify Jest runs**

```bash
npm test -- --passWithNoTests
```

Expected: `Test Suites: 0 passed, 0 total` (no tests yet, passes cleanly)

- [ ] **Step 6: Commit**

```bash
git add jest.config.ts jest.setup.ts package.json package-lock.json
git commit -m "feat: add Jest + React Testing Library"
```

---

## Task 4: Create Portfolio Data Layer

**Files:**
- Create: `data/portfolio.ts`

- [ ] **Step 1: Create data/portfolio.ts with types and migrated data**

```ts
// data/portfolio.ts

export interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
  image?: string
}

export interface Education {
  degree: string
  institution: string
  dates: string
}

export interface Experience {
  role: string
  organization: string
  dates: string
  description: string
}

export const projects: Project[] = [
  {
    title: 'Spatial Analysis of Building Density Across Rwanda',
    description:
      'Visualizes building coverage percentage across administrative zones in Rwanda using a color gradient from low to high density. Useful for urban planning, resource allocation, and understanding regional population distribution.',
    technologies: ['Python', 'Dask-GeoPandas', 'AWS S3', 'Source Cooperative'],
    image: '/img/rwanda.png',
  },
  {
    title: 'Burn Severity Map of Oakbar, California',
    description:
      'Maps wildfire impact on a forested area using five burn severity classes derived from LANDSAT-8 imagery. A critical tool for post-fire recovery planning and reforestation efforts.',
    technologies: ['Google Earth Engine', 'LANDSAT-8', 'NDVI', 'EVI'],
    image: '/img/burn_severity.png',
  },
  {
    title: 'ATL Flight Delay Analysis',
    description:
      'Reveals that 25% of airlines cause 80% of delays at Atlanta Airport, with Carrier Delays as the dominant factor. Estimates an average delay of ~9 minutes and highlights key patterns in air traffic punctuality.',
    technologies: ['Tableau', 'Tableau Prep', 'Excel'],
    image: '/img/tableau.png',
  },
  {
    title: 'GPS Technology on Public Transportation',
    description:
      'Research and implementation of GPS technology for public transportation in Nepal, addressing infrastructure challenges including inconsistent network coverage and limited technological literacy among stakeholders.',
    technologies: ['Node.js', 'Arduino', 'Oracle', 'Java', 'IoT'],
  },
]

export const education: Education[] = [
  {
    degree: 'MS in Geography Information Science',
    institution: 'Clark University',
    dates: 'Aug 2024 – May 2026',
  },
  {
    degree: 'MS in Data Analytics',
    institution: 'Clark University',
    dates: 'Jan 2020 – Dec 2023',
  },
  {
    degree: 'BSc in Geography Information Science',
    institution: 'Softwarica College of IT and E-commerce',
    dates: 'July 2016 – Aug 2020',
  },
]

export const experience: Experience[] = [
  {
    role: 'Data Analyst / Backend Developer',
    organization: 'Softwarica College of IT and E-commerce',
    dates: 'July 2020 – July 2021',
    description:
      'Cleaned millions of records from 250 Moodle database tables using SQL and Tableau Prep. Built executive, marketing, and performance dashboards in Tableau. Designed and developed an Android app and backend APIs using Flutter and Node.js.',
  },
  {
    role: 'Teaching Assistant',
    organization: 'Softwarica College of IT and E-commerce',
    dates: 'June 2019 – July 2020',
    description:
      'Supervised ~40 undergraduate students per semester on research projects. Executed innovative projects including a three-wheel electric car and an online transaction vending machine.',
  },
  {
    role: 'Staff Manager',
    organization: 'Hotel Pokhara Peace',
    dates: 'Jan 2017 – Sept 2019',
    description:
      'Managed daily operations and staff coordination. Developed an internal web presence using HTML, CSS, and JavaScript.',
  },
]
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: no output (no errors)

- [ ] **Step 3: Commit**

```bash
git add data/portfolio.ts
git commit -m "feat: add typed portfolio data layer with migrated content"
```

---

## Task 5: TDD Blog Utility (lib/blog.ts)

**Files:**
- Create: `lib/blog.ts`
- Create: `__tests__/lib/blog.test.ts`

- [ ] **Step 1: Install blog dependencies**

```bash
npm install next-mdx-remote gray-matter reading-time
npm install -D @types/reading-time
```

Expected: `added N packages`

- [ ] **Step 2: Write the failing tests first**

```ts
// __tests__/lib/blog.test.ts
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import fs from 'fs'
import matter from 'gray-matter'
import readingTime from 'reading-time'

jest.mock('fs')
jest.mock('gray-matter')
jest.mock('reading-time')

const mockReaddirSync = jest.mocked(fs.readdirSync)
const mockReadFileSync = jest.mocked(fs.readFileSync)
const mockExistsSync = jest.mocked(fs.existsSync)
const mockMatter = jest.mocked(matter)
const mockReadingTime = jest.mocked(readingTime)

const fakeStats = { text: '3 min read', minutes: 3, time: 180000, words: 600 }

describe('getAllPosts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockReadingTime.mockReturnValue(fakeStats)
  })

  it('returns posts sorted by date descending', async () => {
    mockReaddirSync.mockReturnValue(['old-post.mdx', 'new-post.mdx'] as any)
    mockReadFileSync.mockReturnValue('raw' as any)
    mockMatter
      .mockReturnValueOnce({ data: { title: 'Old', date: '2026-03-01', description: 'Old desc' }, content: 'body' } as any)
      .mockReturnValueOnce({ data: { title: 'New', date: '2026-05-01', description: 'New desc' }, content: 'body' } as any)

    const posts = await getAllPosts()
    expect(posts[0].date).toBe('2026-05-01')
    expect(posts[1].date).toBe('2026-03-01')
  })

  it('derives slug from filename without .mdx extension', async () => {
    mockReaddirSync.mockReturnValue(['my-research-post.mdx'] as any)
    mockReadFileSync.mockReturnValue('raw' as any)
    mockMatter.mockReturnValue({ data: { title: 'My Post', date: '2026-05-01', description: 'Desc' }, content: 'body' } as any)

    const posts = await getAllPosts()
    expect(posts[0].slug).toBe('my-research-post')
  })

  it('filters out non-.mdx files', async () => {
    mockReaddirSync.mockReturnValue(['post.mdx', 'README.md', '.DS_Store'] as any)
    mockReadFileSync.mockReturnValue('raw' as any)
    mockMatter.mockReturnValue({ data: { title: 'Post', date: '2026-05-01', description: 'Desc' }, content: 'body' } as any)

    const posts = await getAllPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0].slug).toBe('post')
  })

  it('includes readingTime from reading-time library', async () => {
    mockReaddirSync.mockReturnValue(['post.mdx'] as any)
    mockReadFileSync.mockReturnValue('raw' as any)
    mockMatter.mockReturnValue({ data: { title: 'Post', date: '2026-05-01', description: 'Desc' }, content: 'body' } as any)

    const posts = await getAllPosts()
    expect(posts[0].readingTime).toBe('3 min read')
  })
})

describe('getPostBySlug', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockReadingTime.mockReturnValue(fakeStats)
  })

  it('returns null when file does not exist', async () => {
    mockExistsSync.mockReturnValue(false)
    const post = await getPostBySlug('nonexistent')
    expect(post).toBeNull()
  })

  it('returns post with all fields when file exists', async () => {
    mockExistsSync.mockReturnValue(true)
    mockReadFileSync.mockReturnValue('raw' as any)
    mockMatter.mockReturnValue({
      data: { title: 'Found', date: '2026-05-01', description: 'Found desc' },
      content: 'Post body here',
    } as any)

    const post = await getPostBySlug('found-post')
    expect(post).not.toBeNull()
    expect(post!.slug).toBe('found-post')
    expect(post!.title).toBe('Found')
    expect(post!.date).toBe('2026-05-01')
    expect(post!.description).toBe('Found desc')
    expect(post!.content).toBe('Post body here')
    expect(post!.readingTime).toBe('3 min read')
  })
})
```

- [ ] **Step 3: Run tests — verify they fail**

```bash
npm test -- __tests__/lib/blog.test.ts
```

Expected: FAIL — `Cannot find module '@/lib/blog'`

- [ ] **Step 4: Create lib/blog.ts to make tests pass**

```ts
// lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  readingTime: string
}

export interface Post extends PostMeta {
  content: string
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
    const { data, content } = matter(raw)
    const { text } = readingTime(content)

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
      readingTime: text,
    }
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  const { text } = readingTime(content)

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    readingTime: text,
    content,
  }
}
```

- [ ] **Step 5: Run tests — verify they pass**

```bash
npm test -- __tests__/lib/blog.test.ts
```

Expected:
```
PASS __tests__/lib/blog.test.ts
  getAllPosts
    ✓ returns posts sorted by date descending
    ✓ derives slug from filename without .mdx extension
    ✓ filters out non-.mdx files
    ✓ includes readingTime from reading-time library
  getPostBySlug
    ✓ returns null when file does not exist
    ✓ returns post with all fields when file exists

Test Suites: 1 passed, 1 total
```

- [ ] **Step 6: Commit**

```bash
git add lib/blog.ts __tests__/lib/blog.test.ts package.json package-lock.json
git commit -m "feat: add blog utility with TDD (getAllPosts, getPostBySlug)"
```

---

## Task 6: Create Shared UI Components

**Files:**
- Create: `components/ui/SectionLabel.tsx`
- Create: `components/ui/Badge.tsx`

- [ ] **Step 1: Create SectionLabel.tsx**

```tsx
// components/ui/SectionLabel.tsx
interface SectionLabelProps {
  children: React.ReactNode
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-[11px] text-accent font-semibold tracking-[2px] uppercase mb-4">
      {children}
    </p>
  )
}
```

- [ ] **Step 2: Create Badge.tsx**

```tsx
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
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output

- [ ] **Step 4: Commit**

```bash
git add components/ui/
git commit -m "feat: add SectionLabel and Badge shared UI components"
```

---

## Task 7: Create Navbar

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create components/Navbar.tsx**

```tsx
// components/Navbar.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'blog-preview', label: 'Blog' },
] as const

type NavId = (typeof NAV_ITEMS)[number]['id']

export default function Navbar() {
  const [active, setActive] = useState<NavId | null>(null)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    if (!isHome) return

    const observers: IntersectionObserver[] = []

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [isHome])

  return (
    <nav className="sticky top-0 z-50 bg-bg border-b border-[#1f1f1f]">
      <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-bold text-white text-sm hover:text-accent transition-colors"
        >
          Bikal Adhikari
        </Link>
        <div className="hidden sm:flex gap-6">
          {NAV_ITEMS.map(({ id, label }) =>
            isHome ? (
              <a
                key={id}
                href={`#${id}`}
                className={`text-xs transition-colors ${
                  active === id
                    ? 'text-accent'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                {label}
              </a>
            ) : (
              <Link
                key={id}
                href={`/#${id}`}
                className="text-xs text-text-muted hover:text-white transition-colors"
              >
                {label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add sticky Navbar with IntersectionObserver active state"
```

---

## Task 8: Update Root Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Bikal Adhikari',
  description: 'Researcher in Geography Information Science',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-text-body antialiased">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 py-12">{children}</main>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Start dev server and verify navbar renders**

```bash
npm run dev
```

Open http://localhost:3000 — dark background should appear, navbar visible at top. Kill with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: update root layout with Inter font and Navbar"
```

---

## Task 9: Create Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create components/sections/Hero.tsx**

```tsx
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
          href="mailto:your@email.com"
          className="bg-surface border border-border-strong text-text-muted text-xs px-4 py-2 rounded hover:text-white hover:border-accent transition-colors"
        >
          Email
        </a>
      </div>
    </section>
  )
}
```

**Note:** Replace `your@email.com`, GitHub URL, and LinkedIn URL with real values before deploying.

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section"
```

---

## Task 10: Create About Section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create components/sections/About.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: add About section"
```

---

## Task 11: Create Projects Section

**Files:**
- Create: `components/sections/Projects.tsx`

- [ ] **Step 1: Create components/sections/Projects.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Projects.tsx
git commit -m "feat: add Projects section with tech badge cards"
```

---

## Task 12: Create Education + Experience Section

**Files:**
- Create: `components/sections/EducationExperience.tsx`

- [ ] **Step 1: Create components/sections/EducationExperience.tsx**

```tsx
// components/sections/EducationExperience.tsx
import SectionLabel from '@/components/ui/SectionLabel'
import { education, experience } from '@/data/portfolio'

export default function EducationExperience() {
  return (
    <section id="education" className="py-12 border-b border-border-subtle">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
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
                <p className="text-text-faint text-xs mt-0.5 mb-1">{item.dates}</p>
                <p className="text-text-muted text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/EducationExperience.tsx
git commit -m "feat: add two-column Education + Experience section"
```

---

## Task 13: Create Blog Preview Section

**Files:**
- Create: `components/sections/BlogPreview.tsx`

- [ ] **Step 1: Create components/sections/BlogPreview.tsx**

```tsx
// components/sections/BlogPreview.tsx
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { getAllPosts } from '@/lib/blog'

export default async function BlogPreview() {
  const posts = await getAllPosts()
  const latest = posts.slice(0, 3)

  return (
    <section id="blog-preview" className="py-12">
      <div className="flex justify-between items-center mb-4">
        <SectionLabel>Latest Posts</SectionLabel>
        <Link
          href="/blog"
          className="text-xs text-accent hover:underline"
        >
          View all →
        </Link>
      </div>

      {latest.length === 0 ? (
        <p className="text-text-muted text-xs">No posts yet.</p>
      ) : (
        <div className="flex flex-col">
          {latest.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`py-3 group ${
                i < latest.length - 1 ? 'border-b border-border-subtle' : ''
              }`}
            >
              <p className="text-white text-sm font-medium group-hover:text-accent transition-colors">
                {post.title}
              </p>
              <p className="text-text-faint text-[10px] mt-1">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}{' '}
                · {post.readingTime}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/BlogPreview.tsx
git commit -m "feat: add BlogPreview section showing latest 3 posts"
```

---

## Task 14: Assemble Main Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx**

```tsx
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
```

- [ ] **Step 2: Create placeholder blog content directory so BlogPreview doesn't crash**

```bash
mkdir -p content/blog
```

- [ ] **Step 3: Start dev server and verify full page renders**

```bash
npm run dev
```

Open http://localhost:3000. You should see: dark navbar → Hero → About → Projects → Education+Experience → Blog Preview (showing "No posts yet."). Check that section labels are teal. Kill with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx content/
git commit -m "feat: assemble main portfolio page with all sections"
```

---

## Task 15: Create Blog Index Page

**Files:**
- Create: `app/blog/page.tsx`

- [ ] **Step 1: Create app/blog/page.tsx**

```tsx
// app/blog/page.tsx
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Bikal Adhikari',
  description: 'Thoughts on research, geospatial analysis, and academia.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">Blog</h1>
        <p className="text-text-muted text-sm">
          Thoughts on research, geospatial analysis, and academia.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-text-muted text-sm">No posts yet — check back soon.</p>
      ) : (
        <div className="flex flex-col">
          {posts.map((post, i) => (
            <div
              key={post.slug}
              className={`py-5 ${
                i < posts.length - 1 ? 'border-b border-border-subtle' : ''
              }`}
            >
              <p className="text-text-faint text-xs mb-2">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}{' '}
                · {post.readingTime}
              </p>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-white text-base font-semibold mb-2 hover:text-accent transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-text-muted text-sm leading-relaxed mb-3">
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-xs text-accent hover:underline"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat: add blog index page at /blog"
```

---

## Task 16: Create Blog Post Page

**Files:**
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create app/blog/[slug]/page.tsx**

```tsx
// app/blog/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return { title: `${post.title} — Bikal Adhikari`, description: post.description }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <div>
      <Link
        href="/blog"
        className="text-xs text-accent hover:underline block mb-8"
      >
        ← Back to Blog
      </Link>

      <div className="mb-8">
        <p className="text-text-faint text-xs mb-3">
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}{' '}
          · {post.readingTime}
        </p>
        <h1 className="text-3xl font-extrabold text-white leading-tight">
          {post.title}
        </h1>
        <div className="mt-6 h-px bg-border-subtle" />
      </div>

      <article className="prose prose-invert prose-sm max-w-none">
        <MDXRemote source={post.content} />
      </article>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/blog/[slug]/
git commit -m "feat: add blog post page with MDX rendering"
```

---

## Task 17: Add Sample Blog Post

**Files:**
- Create: `content/blog/hello-world.mdx`

- [ ] **Step 1: Create content/blog/hello-world.mdx**

```mdx
---
title: "Hello World — Starting My Research Blog"
date: "2026-05-18"
description: "An introduction to this blog — what I plan to write about and why."
---

Welcome to my research blog. I'll be writing here about geospatial analysis,
remote sensing, and lessons learned during my MS research at Clark University.

## What to Expect

Posts will cover:

- **Technical write-ups** — walkthroughs of analyses in Python, Google Earth Engine, and Tableau
- **Research notes** — thoughts on papers I'm reading or methods I'm exploring
- **Project reflections** — what went wrong, what worked, and why

## Why Write?

Writing forces clarity. I find that explaining an idea to an imagined reader
reveals the gaps in my understanding faster than any other method.

If something here is useful to you, that's a bonus.
```

- [ ] **Step 2: Start dev server and verify the full blog flow**

```bash
npm run dev
```

Check the following:
1. http://localhost:3000 → Blog Preview shows "Hello World" post
2. http://localhost:3000/blog → Blog index shows the post with date and reading time
3. http://localhost:3000/blog/hello-world → Post renders with correct title, MDX prose, "← Back to Blog" link

Kill with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add content/blog/hello-world.mdx
git commit -m "feat: add sample blog post"
```

---

## Task 18: Clean Up and Finalize

**Files:**
- Modify: `.gitignore`
- Delete: old HTML/CSS/JS files

- [ ] **Step 1: Add .superpowers/ to .gitignore**

Open `.gitignore` and add at the bottom:

```
# Superpowers brainstorm sessions
.superpowers/
```

- [ ] **Step 2: Copy project images to public/**

```bash
cp assets/img/rwanda.png public/img/rwanda.png 2>/dev/null || true
cp assets/img/burn_severity.png public/img/burn_severity.png 2>/dev/null || true
cp assets/img/tableau.png public/img/tableau.png 2>/dev/null || true
mkdir -p public/img
cp assets/img/*.png public/img/ 2>/dev/null || true
cp assets/img/*.svg public/img/ 2>/dev/null || true
```

- [ ] **Step 3: Remove old HTML/CSS/JS files**

```bash
rm -f index.html about.html work.html contact.html timeline.html legal.html 404.html style.css
rm -rf assets/js/script.js assets/js/nav.js assets/js/timeline.js assets/js/timeline.css
rm -rf assets/js/data.js
```

- [ ] **Step 4: Run full test suite**

```bash
npm test
```

Expected: all tests pass

- [ ] **Step 5: Run production build**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no errors. Build output in `.next/`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove old HTML/CSS/JS files, copy images to public/, update .gitignore"
```

---

## Task 19: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Connect to Vercel**

1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy**

Expected: Vercel builds and deploys. You get a live URL like `https://portfolio-xyz.vercel.app`.

- [ ] **Step 3: Verify live site**

Open the Vercel URL and check:
- Dark navbar renders
- All sections visible on homepage
- `/blog` lists the sample post
- `/blog/hello-world` renders the MDX post

- [ ] **Step 4: (Optional) Add custom domain**

In Vercel dashboard → Project → Settings → Domains → Add your domain.

---

## Self-Review Checklist

**Spec coverage:**
- [x] Next.js 14 App Router — Task 1
- [x] Tailwind dark theme (`#0f0f0f`, teal `#6ee7b7`) — Task 2
- [x] MDX blog with frontmatter — Tasks 5, 17
- [x] Reading time — Task 5
- [x] Sticky navbar with IntersectionObserver active state — Task 7
- [x] Hero with name, role label, social links — Task 9
- [x] About section — Task 10
- [x] Projects as cards with tech badges — Task 11
- [x] Education + Experience two-column layout — Task 12
- [x] Blog preview (latest 3) with "View all →" — Task 13
- [x] Single-page assembly — Task 14
- [x] Blog index page `/blog` — Task 15
- [x] Blog post page `/blog/[slug]` — Task 16
- [x] Prose rendering with teal code blocks — Task 2 (globals.css) + Task 16
- [x] Vercel deployment — Task 19
- [x] Data migrated from data.js — Task 4
- [x] Images migrated from assets/img — Task 18
