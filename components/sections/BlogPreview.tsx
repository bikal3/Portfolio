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
        {latest.length > 0 && (
          <Link
            href="/blog"
            className="text-xs text-accent hover:underline"
          >
            View all →
          </Link>
        )}
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
                {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
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
