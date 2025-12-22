import { MetadataRoute } from 'next'
import { SERVICES, EVENT_TYPES, SITE_CONFIG } from '@/lib/constants'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://theperfectevent.com'

// Location slugs for dynamic pages
const LOCATION_SLUGS = [
  'los-angeles',
  'orange-county',
  'san-diego',
  'inland-empire',
  'santa-barbara',
  'san-luis-obispo',
  'catalina-island',
  'arizona',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/quote`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  // Service pages
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BASE_URL}${service.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Event type pages
  const eventPages: MetadataRoute.Sitemap = EVENT_TYPES.map((event) => ({
    url: `${BASE_URL}${event.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Location pages
  const locationPages: MetadataRoute.Sitemap = LOCATION_SLUGS.map((slug) => ({
    url: `${BASE_URL}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...eventPages, ...locationPages]
}
