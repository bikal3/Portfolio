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
                {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
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
