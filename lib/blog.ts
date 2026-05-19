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
  if (!fs.existsSync(BLOG_DIR)) return []
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
    (a, b) => new Date(b.date + 'T00:00:00').getTime() - new Date(a.date + 'T00:00:00').getTime()
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (slug.includes('/') || slug.includes('..') || slug.includes('\0')) return null
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
