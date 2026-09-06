import type { MetadataRoute } from 'next'

import { getPosts } from '@/lib/posts'
import { getProjects } from '@/lib/projects'
import { profile } from '@/lib/resume'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = profile.siteUrl
  const [posts, projects] = await Promise.all([getPosts(), getProjects()])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/projects`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/posts`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.2 }
  ]

  return [
    ...staticRoutes,
    ...projects.map(project => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: project.publishedAt
        ? new Date(project.publishedAt)
        : undefined,
      changeFrequency: 'yearly' as const,
      priority: 0.6
    })),
    ...posts.map(post => ({
      url: `${base}/posts/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
      changeFrequency: 'yearly' as const,
      priority: 0.5
    }))
  ]
}
