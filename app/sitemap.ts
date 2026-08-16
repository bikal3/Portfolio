// app/sitemap.ts
import type { MetadataRoute } from 'next'

// Route handlers must opt into static rendering under `output: 'export'`.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://bikal3.com.np',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
