export interface Testimonial {
  id: number
  name: string
  initials: string
  event: string
  location: string
  color: string
  rating: number
  text: string
}

export interface Location {
  slug: string
  name: string
  fullName: string
  description: string
  metaDescription: string
  keywords: string[]
  nearbyAreas: string[]
  featuredVenues?: string[]
  testimonial?: Testimonial
  coordinates?: {
    lat: number
    lng: number
  }
}

export const LOCATIONS: Location[] = [
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    fullName: 'Los Angeles, CA',
    description: 'Premier event planning and production services throughout Los Angeles County. From Downtown LA to the Westside, we bring your vision to life with comprehensive event solutions.',
    metaDescription: 'Professional event planning in Los Angeles, CA. Full-service wedding, corporate, and festival production with entertainment, lighting, sound, and coordination. 17+ years serving LA.',
    keywords: [
      'event planning Los Angeles',
      'Los Angeles wedding planner',
      'corporate events LA',
      'LA event production',
      'Downtown LA events',
      'Westside event planner',
      'Los Angeles DJ services',
      'LA event coordination',
    ],
    nearbyAreas: [
      'Downtown Los Angeles',
      'Beverly Hills',
      'Santa Monica',
      'Pasadena',
      'Hollywood',
      'West Hollywood',
      'Westwood',
      'Century City',
    ],
    featuredVenues: [
      'The Ebell of Los Angeles',
      'Union Station',
      'The Ace Hotel',
      'Vibiana',
      'The Line LA',
      'The Westin Bonaventure',
    ],
    testimonial: {
      id: 2,
      name: 'Jennifer M.',
      initials: 'JM',
      event: 'Corporate Gala',
      location: 'Los Angeles',
      color: 'bg-blue-500',
      rating: 5,
      text: "We've worked with many event companies, but The Perfect Event stands out. Their professionalism and ability to handle everything in-house made our annual gala our most successful yet.",
    },
    coordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
  },
  {
    slug: 'orange-county',
    name: 'Orange County',
    fullName: 'Orange County, CA',
    description: 'Full-service event planning across Orange County. From elegant Newport Beach weddings to corporate events in Irvine, we deliver exceptional experiences throughout OC.',
    metaDescription: 'Orange County event planning experts. Wedding, corporate, and private event production in Irvine, Newport Beach, Anaheim, and beyond. Comprehensive event services.',
    keywords: [
      'Orange County event planner',
      'OC wedding planning',
      'Irvine corporate events',
      'Newport Beach weddings',
      'Anaheim event production',
      'Orange County DJ',
      'Huntington Beach events',
      'Costa Mesa event planner',
    ],
    nearbyAreas: [
      'Newport Beach',
      'Irvine',
      'Anaheim',
      'Huntington Beach',
      'Costa Mesa',
      'Laguna Beach',
      'Mission Viejo',
      'Fullerton',
    ],
    featuredVenues: [
      'Pelican Hill Resort',
      'The Resort at Pelican Hill',
      'Hotel Irvine',
      'Segerstrom Center',
      'Disneyland Hotel',
      'Hyatt Regency Huntington Beach',
    ],
    testimonial: {
      id: 1,
      name: 'Sarah & Michael T.',
      initials: 'S&M',
      event: 'Wedding',
      location: 'Orange County',
      color: 'bg-rose-500',
      rating: 5,
      text: "The Perfect Event truly lived up to their name. From our first meeting to the last dance, every detail was handled with care and precision. Our wedding day was absolutely magical!",
    },
    coordinates: {
      lat: 33.7175,
      lng: -117.8311,
    },
  },
  {
    slug: 'san-diego',
    name: 'San Diego',
    fullName: 'San Diego, CA',
    description: 'Event planning excellence in San Diego County. We specialize in creating unforgettable events from La Jolla to Downtown San Diego, with comprehensive production services.',
    metaDescription: 'San Diego event planning and production company. Weddings, corporate events, and celebrations with full-service coordination, entertainment, AV, and more.',
    keywords: [
      'San Diego event planner',
      'San Diego wedding planning',
      'corporate events San Diego',
      'La Jolla event production',
      'Downtown San Diego events',
      'San Diego DJ services',
      'Coronado wedding planner',
      'San Diego event coordination',
    ],
    nearbyAreas: [
      'Downtown San Diego',
      'La Jolla',
      'Coronado',
      'Del Mar',
      'Carlsbad',
      'Encinitas',
      'Mission Valley',
      'Gaslamp Quarter',
    ],
    featuredVenues: [
      'Hotel del Coronado',
      'Paradise Point Resort',
      'The US Grant',
      'The Guild Hotel',
      'Fairmont Grand Del Mar',
      'Pendry San Diego',
    ],
    testimonial: {
      id: 4,
      name: 'David & Lisa C.',
      initials: 'D&L',
      event: 'Anniversary Party',
      location: 'San Diego',
      color: 'bg-emerald-500',
      rating: 5,
      text: "Our 25th anniversary party was everything we dreamed of and more. The coordination, the entertainment, the lighting - everything was perfect!",
    },
    coordinates: {
      lat: 32.7157,
      lng: -117.1611,
    },
  },
  {
    slug: 'inland-empire',
    name: 'Inland Empire',
    fullName: 'Inland Empire, CA',
    description: 'Professional event services throughout the Inland Empire. Serving Riverside, San Bernardino, and surrounding areas with complete event production capabilities.',
    metaDescription: 'Inland Empire event planning services. Full-service weddings, corporate events, and celebrations in Riverside, San Bernardino, Temecula, and beyond.',
    keywords: [
      'Inland Empire event planner',
      'Riverside event planning',
      'San Bernardino events',
      'Temecula wedding planner',
      'IE event production',
      'Inland Empire DJ',
      'Corona event services',
      'Ontario event coordination',
    ],
    nearbyAreas: [
      'Riverside',
      'San Bernardino',
      'Temecula',
      'Corona',
      'Ontario',
      'Rancho Cucamonga',
      'Murrieta',
      'Redlands',
    ],
    featuredVenues: [
      'Pechanga Resort Casino',
      'Ponte Winery',
      'Mount Palomar Winery',
      'Mission Inn Hotel & Spa',
      'Embassy Suites Temecula',
      'DoubleTree Ontario',
    ],
    coordinates: {
      lat: 33.9806,
      lng: -117.3755,
    },
  },
  {
    slug: 'santa-barbara',
    name: 'Santa Barbara',
    fullName: 'Santa Barbara, CA',
    description: 'Elegant event planning in Santa Barbara and the Central Coast. From beachfront weddings to vineyard celebrations, we create unforgettable experiences.',
    metaDescription: 'Santa Barbara event planning and wedding services. Full-service production for coastal weddings, vineyard events, and corporate gatherings on the Central Coast.',
    keywords: [
      'Santa Barbara event planner',
      'Santa Barbara wedding planning',
      'Central Coast events',
      'Santa Barbara vineyard weddings',
      'beach wedding Santa Barbara',
      'Montecito event planning',
      'Santa Barbara DJ services',
      'coastal event production',
    ],
    nearbyAreas: [
      'Montecito',
      'Goleta',
      'Carpinteria',
      'Summerland',
      'Solvang',
      'Santa Ynez',
      'Buellton',
      'Lompoc',
    ],
    featuredVenues: [
      'Bacara Resort & Spa',
      'Rosewood Miramar Beach',
      'Four Seasons The Biltmore',
      'Santa Barbara Zoo',
      'Sunstone Villa & Winery',
      'El Capitan Canyon',
    ],
    coordinates: {
      lat: 34.4208,
      lng: -119.6982,
    },
  },
  {
    slug: 'san-luis-obispo',
    name: 'San Luis Obispo',
    fullName: 'San Luis Obispo, CA',
    description: 'Event planning services in San Luis Obispo County. Creating beautiful events from Pismo Beach to Paso Robles wine country with comprehensive production services.',
    metaDescription: 'San Luis Obispo event planning company. Weddings, corporate events, and celebrations in SLO, Pismo Beach, Paso Robles, and the Central Coast.',
    keywords: [
      'San Luis Obispo event planner',
      'SLO wedding planning',
      'Paso Robles events',
      'Pismo Beach weddings',
      'Central Coast event production',
      'SLO event coordination',
      'Paso Robles vineyard weddings',
      'Avila Beach events',
    ],
    nearbyAreas: [
      'San Luis Obispo',
      'Paso Robles',
      'Pismo Beach',
      'Avila Beach',
      'Morro Bay',
      'Arroyo Grande',
      'Atascadero',
      'Cambria',
    ],
    featuredVenues: [
      'Dolphin Bay Resort',
      'Inn at Avila Beach',
      'The Cliffs Resort',
      'Greengate Ranch',
      'Hammersky Vineyards',
      'Madonna Inn',
    ],
    coordinates: {
      lat: 35.2828,
      lng: -120.6596,
    },
  },
  {
    slug: 'catalina-island',
    name: 'Catalina Island',
    fullName: 'Catalina Island, CA',
    description: 'Exclusive event planning on Catalina Island. Specializing in destination weddings and special events with seamless logistics and transportation coordination. We service the entire island.',
    metaDescription: 'Catalina Island event planning and destination wedding services. Full-service production for island events including coordination, entertainment, and transportation.',
    keywords: [
      'Catalina Island event planner',
      'Catalina wedding planning',
      'Catalina Island destination wedding',
      'Avalon event production',
      'island wedding California',
      'Catalina Wine Mixer',
      'Catalina event coordination',
      'destination wedding Catalina',
    ],
    nearbyAreas: [
      'Avalon',
      'Two Harbors',
      'Descanso Beach',
      'Hamilton Cove',
    ],
    coordinates: {
      lat: 33.3950,
      lng: -118.4158,
    },
  },
  {
    slug: 'arizona',
    name: 'Arizona',
    fullName: 'Arizona',
    description: 'Comprehensive event planning services across Arizona. From Phoenix to Scottsdale, Tucson to Sedona, we bring Southern California quality to the Southwest.',
    metaDescription: 'Arizona event planning and production services. Professional weddings, corporate events, and celebrations in Phoenix, Scottsdale, Tucson, and throughout AZ.',
    keywords: [
      'Arizona event planner',
      'Phoenix event planning',
      'Scottsdale wedding planner',
      'Tucson events',
      'Sedona wedding planning',
      'Arizona event production',
      'Phoenix corporate events',
      'Scottsdale event coordination',
    ],
    nearbyAreas: [
      'Phoenix',
      'Scottsdale',
      'Tempe',
      'Tucson',
      'Sedona',
      'Flagstaff',
      'Mesa',
      'Chandler',
    ],
    featuredVenues: [
      'The Phoenician',
      'Arizona Biltmore',
      'Sanctuary Camelback',
      'Four Seasons Scottsdale',
      'The Wigwam',
      'El Conquistador Tucson',
    ],
    coordinates: {
      lat: 33.4484,
      lng: -112.0740,
    },
  },
]

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((location) => location.slug === slug)
}

export function getAllLocationSlugs(): string[] {
  return LOCATIONS.map((location) => location.slug)
}
