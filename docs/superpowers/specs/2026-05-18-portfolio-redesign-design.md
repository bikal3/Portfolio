# Portfolio Redesign — Design Spec

**Date:** 2026-05-18
**Reference:** https://isaac.earth/

---

## Overview

Rebuild the existing vanilla HTML/CSS/JS portfolio as a modern Next.js application. The new portfolio targets an academic audience, features a modern dark aesthetic, and includes a fully hosted blog powered by MDX files.

---

## Audience & Purpose

- **Audience:** Academic researchers, faculty, and peers
- **Primary goal:** Showcase research work, projects, and academic credentials
- **Secondary goal:** Host personal blog posts directly on the site (no external platform)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Blog content | MDX (`.mdx` files in `content/blog/`) |
| Language | TypeScript |
| Deployment | Vercel (free tier, auto-deploy from GitHub) |

---

## Visual Design

- **Style:** Modern Dark — dark background (`#0f0f0f`), teal/green accents (`#6ee7b7`), clean sans-serif (Inter)
- **Typography:** Inter for all text; teal uppercase labels for section headings
- **Color palette:**
  - Background: `#0f0f0f`
  - Surface: `#161616` (cards, code blocks)
  - Border: `#1a1a1a` / `#222`
  - Body text: `#ccc` / `#aaa`
  - Muted text: `#666` / `#888`
  - Accent: `#6ee7b7` (teal)
  - White: `#fff` (headings, names)
- **Layout:** Single scrollable page with sticky dark navbar and anchor navigation; blog at `/blog`

---

## Site Structure

```
app/
├── page.tsx                ← Single-page portfolio (all sections)
├── blog/
│   ├── page.tsx            ← Blog post list
│   └── [slug]/page.tsx     ← Individual blog post
└── layout.tsx              ← Root layout (Navbar, Footer)

content/
└── blog/
    └── *.mdx               ← Blog posts as MDX files

components/
├── Navbar.tsx              ← Sticky top nav with anchor links
├── sections/
│   ├── Hero.tsx            ← Name, role, bio, social links
│   ├── About.tsx           ← Bio paragraph
│   ├── Projects.tsx        ← Project cards with tech badges
│   ├── EducationExperience.tsx ← Two-column Education + Experience grid
│   └── BlogPreview.tsx     ← Latest 3 posts with "View all →"
└── ui/                     ← Shared primitives (Badge, SectionLabel, etc.)

data/
└── portfolio.ts            ← Projects, education, experience as typed TS objects

public/                     ← Images and static assets
```

---

## Sections (Main Page)

All sections live on a single scrollable page (`app/page.tsx`) with anchor IDs for navbar links.

### Navbar
- Sticky, dark (`#0f0f0f`), `border-bottom: 1px solid #1f1f1f`
- Left: name ("Bikal Adhikari") in bold white
- Right: anchor links — About · Projects · Education · Experience · Blog
- Active section link highlighted in teal, tracked via `IntersectionObserver` as user scrolls

### Hero (`#hero`)
- Teal uppercase label: "RESEARCHER"
- Large bold name
- 1–2 sentence bio/tagline
- Row of social link buttons: GitHub, LinkedIn, Email

### About (`#about`)
- Teal section label
- 1–3 paragraph bio (hardcoded or from `portfolio.ts`)

### Projects (`#projects`)
- Teal section label
- Cards layout — each card has: title, description, tech stack badges (teal on dark green background)
- Data sourced from `portfolio.ts`

### Education + Experience (`#education`)
- Displayed side-by-side in a two-column grid on desktop, stacked on mobile
- Education column: teal label, list of entries (degree, institution, date range)
- Experience column: teal label, list of entries (role, organization, date range, short description)
- Data sourced from `portfolio.ts`

### Blog Preview (`#blog`)
- Teal section label + "View all →" link to `/blog`
- Latest 3 posts: title, date, reading time
- Posts sourced from MDX frontmatter at build time

---

## Blog System

### Post list (`/blog`)
- Page heading "Blog" with subtitle
- Posts listed in reverse-chronological order
- Each entry: date, reading time, title, excerpt, "Read more →" teal link

### Single post (`/blog/[slug]`)
- "← Back to Blog" teal link
- Post metadata: date, reading time
- Post title (large, bold)
- Divider
- Prose body rendered from MDX
  - Teal left-border for code blocks
  - Standard heading hierarchy
  - Supports React components embedded in MDX

### MDX frontmatter schema
```mdx
---
title: "Post Title"
date: "2026-05-18"
description: "Short excerpt shown on list page"
---
```

### Reading time
Calculated automatically from word count at build time (no runtime dependency).

---

## Data Management

`data/portfolio.ts` exports three typed arrays:

```ts
export const projects: Project[]
export const education: Education[]
export const experience: Experience[]
```

Each type is a simple interface — easy to update without touching components.

---

## Migration from Current Site

| Current | New |
|---|---|
| `assets/js/data.js` | `data/portfolio.ts` |
| `assets/img/*` | `public/*` |
| `style.css` (888 lines) | Tailwind utility classes |
| Bootstrap 4 grid | Tailwind responsive grid |
| Animate.css | Tailwind + CSS transitions |
| Multi-page HTML | Next.js App Router pages |
| Vanilla JS rendering | React components |
| `timeline.js` / `timeline.css` | `Education.tsx` / `Experience.tsx` |

---

## Deployment

- Host: Vercel (free tier)
- Trigger: Push to `main` branch on GitHub → auto-deploy
- Custom domain: configurable in Vercel dashboard
- Build output: Static export (`next build`) — no server required

---

## Out of Scope

- CMS or admin UI for editing content (content managed via files)
- Comments on blog posts
- Search functionality
- Dark/light mode toggle
- Contact form (can be added later)
- Publications or Talks sections
