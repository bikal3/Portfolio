// app/robots.ts
import type { MetadataRoute } from 'next'

// Route handlers must opt into static rendering under `output: 'export'`.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://bikal3.com.np/sitemap.xml',
  }
}
