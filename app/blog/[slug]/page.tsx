// app/blog/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Bikal Adhikari`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
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
          {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
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
