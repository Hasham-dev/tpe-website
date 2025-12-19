import { SITE_CONFIG, SERVICES, FAQS } from './constants'

export interface LocalBusinessSchema {
  '@context': string
  '@type': string
  name: string
  description?: string
  url: string
  telephone: string
  email: string
  address: {
    '@type': string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    '@type': string
    latitude: string
    longitude: string
  }
  image?: string
  priceRange?: string
  areaServed?: string[]
  aggregateRating?: {
    '@type': string
    ratingValue: string
    reviewCount: string
  }
}

export interface OrganizationSchema {
  '@context': string
  '@type': string
  name: string
  url: string
  logo: string
  description: string
  telephone: string
  email: string
  address: {
    '@type': string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  sameAs: string[]
}

export interface FAQPageSchema {
  '@context': string
  '@type': string
  mainEntity: Array<{
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }>
}

export interface EventSchema {
  '@context': string
  '@type': string
  name: string
  description?: string
  startDate?: string
  endDate?: string
  location?: {
    '@type': string
    name?: string
    address?: {
      '@type': string
      streetAddress?: string
      addressLocality?: string
      addressRegion?: string
      postalCode?: string
      addressCountry?: string
    }
  }
  organizer?: {
    '@type': string
    name: string
    url: string
  }
  offers?: {
    '@type': string
    url?: string
    price?: string
    priceCurrency?: string
    availability?: string
  }
}

/**
 * Generate LocalBusiness schema for SEO
 */
export function generateLocalBusinessSchema(
  overrides?: Partial<LocalBusinessSchema>
): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: 'https://theperfectevent.com',
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
      latitude: '33.8033',
      longitude: '-118.1611',
    },
    image: 'https://theperfectevent.com/images/og-image.jpg',
    priceRange: '$$$',
    areaServed: SITE_CONFIG.locations,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
    },
    ...overrides,
  }
}

/**
 * Generate Organization schema for SEO
 */
export function generateOrganizationSchema(
  overrides?: Partial<OrganizationSchema>
): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: 'https://theperfectevent.com',
    logo: 'https://theperfectevent.com/images/logo.png',
    description: SITE_CONFIG.description,
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
    sameAs: [
      SITE_CONFIG.socialLinks.facebook,
      SITE_CONFIG.socialLinks.instagram,
      SITE_CONFIG.socialLinks.youtube,
    ],
    ...overrides,
  }
}

/**
 * Generate FAQPage schema for SEO
 */
export function generateFAQPageSchema(
  customFAQs?: Array<{ question: string; answer: string }>
): FAQPageSchema {
  const faqsToUse = customFAQs || FAQS

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsToUse.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate Event schema for SEO
 */
export function generateEventSchema(options: {
  name: string
  description?: string
  startDate?: string
  endDate?: string
  locationName?: string
  locationAddress?: string
  locationCity?: string
  locationState?: string
  locationZip?: string
  price?: string
  priceUrl?: string
}): EventSchema {
  const schema: EventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: options.name,
    description: options.description,
    startDate: options.startDate,
    endDate: options.endDate,
    organizer: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: 'https://theperfectevent.com',
    },
  }

  if (options.locationName || options.locationAddress) {
    schema.location = {
      '@type': 'Place',
      name: options.locationName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: options.locationAddress,
        addressLocality: options.locationCity,
        addressRegion: options.locationState,
        postalCode: options.locationZip,
        addressCountry: 'US',
      },
    }
  }

  if (options.price || options.priceUrl) {
    schema.offers = {
      '@type': 'Offer',
      url: options.priceUrl,
      price: options.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    }
  }

  return schema
}

/**
 * Generate Service schema for individual service pages
 */
export function generateServiceSchema(serviceId: string) {
  const service = SERVICES.find((s) => s.id === serviceId)

  if (!service) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: 'https://theperfectevent.com',
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
    },
    areaServed: SITE_CONFIG.locations.map((location) => ({
      '@type': 'City',
      name: location,
    })),
    image: `https://theperfectevent.com${service.image}`,
  }
}

/**
 * Convert schema object to JSON-LD script tag string
 */
export function schemaToJsonLd(schema: any): string {
  return JSON.stringify(schema)
}
