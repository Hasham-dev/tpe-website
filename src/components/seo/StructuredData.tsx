import { SITE_CONFIG, SERVICES } from '@/lib/constants'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://theperfectevent.com'

// Local Business Schema
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EventPlanning',
    '@id': `${BASE_URL}/#organization`,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    image: `${BASE_URL}/images/og-image.jpg`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3133 E South St',
      addressLocality: 'Long Beach',
      addressRegion: 'CA',
      postalCode: '90805',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.8589,
      longitude: -118.1553,
    },
    areaServed: [
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'City', name: 'Orange County' },
      { '@type': 'City', name: 'San Diego' },
      { '@type': 'City', name: 'Santa Barbara' },
      { '@type': 'State', name: 'California' },
      { '@type': 'State', name: 'Arizona' },
    ],
    priceRange: '$$-$$$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '250',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      SITE_CONFIG.socialLinks.facebook,
      SITE_CONFIG.socialLinks.instagram,
      SITE_CONFIG.socialLinks.youtube,
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Event Services',
      itemListElement: SERVICES.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          url: `${BASE_URL}${service.href}`,
        },
        position: index + 1,
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Website Schema
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.tagline,
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    // Note: SearchAction removed - add back when /search page is implemented
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Breadcrumb Schema (for individual pages)
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQ Schema (for FAQ sections)
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Service Schema (for individual service pages)
export function ServiceSchema({
  name,
  description,
  url,
  image,
  features,
}: {
  name: string
  description: string
  url: string
  image?: string
  features?: string[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    image: image || `${BASE_URL}/images/og-image.jpg`,
    provider: {
      '@id': `${BASE_URL}/#organization`,
    },
    areaServed: [
      { '@type': 'State', name: 'California' },
      { '@type': 'State', name: 'Arizona' },
    ],
    ...(features && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${name} Features`,
        itemListElement: features.map((feature, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: feature,
          },
          position: index + 1,
        })),
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Article Schema (for blog posts)
export function ArticleSchema({
  title,
  description,
  url,
  image,
  author,
  publishedAt,
  modifiedAt,
  tags,
}: {
  title: string
  description: string
  url: string
  image: string
  author: string
  publishedAt: string
  modifiedAt?: string
  tags?: string[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: {
      '@type': 'ImageObject',
      url: image.startsWith('http') ? image : `${BASE_URL}${image}`,
    },
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Event Type Schema (for event category pages)
export function EventTypeSchema({
  name,
  description,
  url,
  image,
}: {
  name: string
  description: string
  url: string
  image?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `${name} Event Planning`,
    name: `${name} Event Planning & Production`,
    description,
    url,
    image: image ? (image.startsWith('http') ? image : `${BASE_URL}${image}`) : `${BASE_URL}/images/og-image.jpg`,
    provider: {
      '@id': `${BASE_URL}/#organization`,
    },
    areaServed: [
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'City', name: 'San Diego' },
      { '@type': 'City', name: 'Orange County' },
      { '@type': 'State', name: 'California' },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
