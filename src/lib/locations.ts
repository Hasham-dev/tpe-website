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

export interface LocationFAQ {
  question: string
  answer: string
}

export interface Location {
  slug: string
  name: string
  fullName: string
  description: string
  metaDescription: string
  keywords: string[]
  nearbyAreas: string[]
  testimonial?: Testimonial
  faqs?: LocationFAQ[]
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
    faqs: [
      {
        question: 'What areas of Los Angeles do you serve?',
        answer: 'We serve all of Los Angeles County including Downtown LA, Beverly Hills, Santa Monica, Pasadena, Hollywood, West Hollywood, Westwood, Century City, and surrounding areas.',
      },
      {
        question: 'Do you help with venue selection in Los Angeles?',
        answer: 'Yes! Our venue booking service helps you find the perfect location for your event. We have extensive knowledge of venues throughout LA and can recommend options based on your vision, guest count, and budget.',
      },
      {
        question: 'How far in advance should I book for an LA event?',
        answer: 'We recommend booking 6-12 months in advance for weddings and large events, and 2-4 months for corporate events. Popular dates in Los Angeles book quickly.',
      },
    ],
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
    faqs: [
      {
        question: 'What cities in Orange County do you serve?',
        answer: 'We provide full event services throughout Orange County including Newport Beach, Irvine, Anaheim, Huntington Beach, Costa Mesa, Laguna Beach, Mission Viejo, Fullerton, and all surrounding communities.',
      },
      {
        question: 'Do you offer venue booking assistance in Orange County?',
        answer: 'Absolutely! We help couples and corporate clients find the perfect venue throughout OC, from beachfront locations to elegant ballrooms and unique outdoor spaces.',
      },
      {
        question: 'What types of events do you produce in Orange County?',
        answer: 'We specialize in weddings, corporate events, galas, fundraisers, private parties, and university events. Our team has produced hundreds of events at venues across Orange County.',
      },
    ],
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
    faqs: [
      {
        question: 'Do you travel to San Diego for events?',
        answer: 'Yes! We regularly produce events throughout San Diego County. Our team handles all logistics, equipment transportation, and coordination for seamless event production in the San Diego area.',
      },
      {
        question: 'What San Diego neighborhoods do you serve?',
        answer: 'We serve all of San Diego County including Downtown, La Jolla, Coronado, Del Mar, Carlsbad, Encinitas, Mission Valley, the Gaslamp Quarter, and beyond.',
      },
      {
        question: 'Can you help find venues in San Diego?',
        answer: 'Absolutely! Our venue booking service includes San Diego. We can recommend waterfront venues, urban spaces, vineyard settings, and more based on your event vision.',
      },
    ],
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
    testimonial: {
      id: 5,
      name: 'Robert & Maria G.',
      initials: 'R&M',
      event: 'Wedding',
      location: 'Temecula',
      color: 'bg-purple-500',
      rating: 5,
      text: "Planning a wine country wedding in Temecula felt overwhelming until we found The Perfect Event. They handled everything from transportation to lighting, and our guests are still talking about how beautiful it was!",
    },
    faqs: [
      {
        question: 'Do you provide services in the Inland Empire?',
        answer: 'Yes! We serve the entire Inland Empire including Riverside, San Bernardino, Temecula, Corona, Ontario, Rancho Cucamonga, Murrieta, Redlands, and surrounding communities.',
      },
      {
        question: 'Can you help with Temecula wine country weddings?',
        answer: 'Absolutely! We have extensive experience with Temecula wine country events. Our venue booking service can help you find the perfect winery or vineyard setting for your celebration.',
      },
      {
        question: 'What services do you offer in the Inland Empire?',
        answer: 'We offer complete event production including coordination, entertainment, lighting, sound, photography, transportation, and more. All services available throughout the IE.',
      },
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
    testimonial: {
      id: 6,
      name: 'Amanda & Chris W.',
      initials: 'A&C',
      event: 'Wedding',
      location: 'Santa Barbara',
      color: 'bg-teal-500',
      rating: 5,
      text: "Our Santa Barbara coastal wedding was absolutely perfect. The Perfect Event coordinated every detail from our beachfront ceremony to the vineyard reception. Their team made our dream wedding a reality!",
    },
    faqs: [
      {
        question: 'Do you plan events in Santa Barbara?',
        answer: 'Yes! We provide full event production services throughout Santa Barbara County including Montecito, Goleta, Carpinteria, Solvang, Santa Ynez Valley, and the entire Central Coast.',
      },
      {
        question: 'Can you help with Santa Barbara vineyard weddings?',
        answer: 'Absolutely! Santa Barbara wine country is one of our specialties. We can help with venue selection, coordinate with local vendors, and handle all production for your vineyard celebration.',
      },
      {
        question: 'What makes Santa Barbara events unique?',
        answer: 'Santa Barbara offers stunning coastal backdrops, Mediterranean architecture, world-class vineyards, and year-round beautiful weather. We help you take full advantage of this incredible setting.',
      },
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
    testimonial: {
      id: 7,
      name: 'Jessica & Mark L.',
      initials: 'J&M',
      event: 'Wedding',
      location: 'Paso Robles',
      color: 'bg-amber-500',
      rating: 5,
      text: "The Perfect Event traveled to Paso Robles for our wine country wedding and it was flawless. Their attention to detail and professionalism made all the difference. We couldn't have asked for a better team!",
    },
    faqs: [
      {
        question: 'Do you serve San Luis Obispo County?',
        answer: 'Yes! We provide complete event services throughout SLO County including San Luis Obispo, Paso Robles, Pismo Beach, Avila Beach, Morro Bay, Arroyo Grande, Atascadero, and Cambria.',
      },
      {
        question: 'Can you plan Paso Robles wine country events?',
        answer: 'Absolutely! Paso Robles wine country is perfect for weddings and corporate retreats. We handle venue coordination, all production services, and guest transportation from anywhere in California.',
      },
      {
        question: 'How do logistics work for Central Coast events?',
        answer: 'Our team travels with all necessary equipment for your event. We coordinate transportation, lodging for our crew, and handle every detail so your Central Coast celebration is seamless.',
      },
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
    testimonial: {
      id: 8,
      name: 'Nicole & James P.',
      initials: 'N&J',
      event: 'Destination Wedding',
      location: 'Catalina Island',
      color: 'bg-cyan-500',
      rating: 5,
      text: "Our Catalina Island destination wedding was magical! The Perfect Event handled every logistic challenge - ferry coordination, equipment transport, everything. Our guests said it was the best wedding they'd ever attended!",
    },
    faqs: [
      {
        question: 'How do you handle Catalina Island event logistics?',
        answer: 'We coordinate everything including ferry bookings for guests, equipment transportation by boat, golf cart rentals, and accommodation blocks. Our team has extensive Catalina experience and handles all island-specific challenges.',
      },
      {
        question: 'What Catalina Island events do you produce?',
        answer: 'We specialize in destination weddings, corporate retreats, the annual Catalina Wine Mixer festival, and private celebrations. We work throughout the island including Avalon, Two Harbors, and private venues.',
      },
      {
        question: 'How far in advance should I book a Catalina event?',
        answer: 'We recommend 12-18 months for weddings due to limited island accommodations and venue availability. Corporate events should book 6-9 months ahead. Early planning is essential for Catalina.',
      },
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
    testimonial: {
      id: 9,
      name: 'Michelle & Brian K.',
      initials: 'M&B',
      event: 'Corporate Retreat',
      location: 'Scottsdale',
      color: 'bg-orange-500',
      rating: 5,
      text: "We brought The Perfect Event from California for our Scottsdale corporate retreat and it was the best decision. Their production quality and professionalism exceeded our expectations. Already booked them for next year!",
    },
    faqs: [
      {
        question: 'Do you provide event services in Arizona?',
        answer: 'Yes! We bring our full-service event production to Arizona including Phoenix, Scottsdale, Tempe, Tucson, Sedona, Flagstaff, Mesa, Chandler, and throughout the state.',
      },
      {
        question: 'What types of Arizona events do you handle?',
        answer: 'We produce corporate events, destination weddings, galas, conferences, and private celebrations. Scottsdale and Sedona are particularly popular for destination events.',
      },
      {
        question: 'How do logistics work for Arizona events?',
        answer: 'Our team travels with all equipment needed for your event. We coordinate transportation, accommodate our crew locally, and ensure seamless production just as if your event were in Southern California.',
      },
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
