export interface CaseStudy {
  slug: string
  title: string
  eventType: string
  guestCount: number
  location: string
  date: string
  description: string
  challenge: string
  solution: string
  services: string[]
  images: string[] // Local fallback images
  driveFolderId?: string // Google Drive folder ID for dynamic images
  testimonial: {
    quote: string
    author: string
    role: string
  }
  results?: string[]
  featured?: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'pasadena-corporate-gala',
    title: '500-Guest Corporate Gala',
    eventType: 'Corporate',
    guestCount: 500,
    location: 'Luxury Hotel, Pasadena, CA',
    date: 'October 2024',
    description: 'A high-end corporate gala for a Fortune 500 tech company celebrating their 25th anniversary, featuring full production with custom lighting, live entertainment, and seamless coordination.',
    challenge: 'The client needed to transform the venue\'s ballroom into a high-tech, branded environment while maintaining an elegant aesthetic. With 500 VIP guests including international executives, the event required flawless execution, multilingual coordination, and zero room for error.',
    solution: 'We designed a custom lighting package that projected the company\'s brand colors throughout the space using intelligent fixtures and gobos. Our team coordinated with international speakers for AV requirements, provided simultaneous translation equipment, and created a seamless program flow from cocktail reception through awards ceremony and after-party. Our in-house catering team created a custom menu reflecting the company\'s global presence.',
    services: [
      'Full Event Coordination',
      'Custom Lighting Design',
      'Sound & AV Production',
      'Live Entertainment (String Quartet & DJ)',
      'Photography & Videography',
      'Stage & Decor',
      'Transportation (Executive Shuttles)',
      'Security & Crowd Management',
    ],
    images: [
      '/images/gallery/corporate-1.jpg',
      '/images/gallery/corporate-2.jpg',
      '/images/events/corporate.jpg',
    ],
    testimonial: {
      quote: 'The Perfect Event exceeded every expectation. From the initial planning to the final guest departure, everything was flawless. Our international executives were blown away by the production quality and attention to detail. This was the best corporate event we\'ve ever hosted.',
      author: 'Jennifer Martinez',
      role: 'VP of Corporate Events, Tech Corp',
    },
    results: [
      '98% positive feedback from post-event survey',
      'Featured in Corporate Event Magazine',
      'Client signed multi-year contract for future events',
      'Zero technical issues during 6-hour program',
    ],
    featured: true,
  },
  {
    slug: 'catalina-wine-mixer-2024',
    title: 'Catalina Wine Mixer 2024',
    eventType: 'Festival',
    guestCount: 1200,
    location: 'Catalina Island, CA',
    date: 'September 2024',
    description: 'Southern California\'s premier wine and music festival featuring 1,200 guests, multiple stages, and a full day of entertainment on beautiful Catalina Island.',
    challenge: 'Producing a large-scale festival on an island presents unique logistical challenges: all equipment must be transported by boat, power infrastructure is limited, and we needed to create multiple entertainment zones while working within strict environmental guidelines. Weather contingency planning was critical with ocean exposure.',
    solution: 'We coordinated a detailed logistics plan 3 months in advance, chartering dedicated equipment barges and establishing a staging area. Our team installed 2 main stages, 4 beverage stations, and a VIP lounge area. We brought in generator power and distributed it throughout the venue. Our entertainment team curated 8 live acts plus 3 DJs, creating distinct musical zones. We implemented a robust weather monitoring system and had backup plans for every scenario.',
    services: [
      'Festival Production & Coordination',
      'Multi-Stage Setup',
      'Sound Production (2 Main Systems)',
      'Lighting & Effects',
      'Generator & Power Distribution',
      'Transportation & Logistics',
      'Security & Medical Staff',
      'Photography & Videography',
      'VIP Area Management',
    ],
    images: [
      '/images/gallery/festival-1.jpg',
      '/images/gallery/festival-2.jpg',
      '/images/events/festivals.jpg',
    ],
    testimonial: {
      quote: 'The Perfect Event has been producing the Catalina Wine Mixer for 5 years now, and each year they raise the bar. The logistics of producing a festival on an island are immense, but they make it look effortless. Highly professional team.',
      author: 'Robert Chen',
      role: 'Event Director, Catalina Wine Mixer',
    },
    results: [
      '1,200 tickets sold out in 48 hours',
      'Zero safety incidents',
      'Featured in LA Times and OC Register',
      '92% of attendees rated experience as "excellent"',
      'Renewed contract for next 3 years',
    ],
    featured: true,
  },
  {
    slug: 'usc-greek-life-formal',
    title: 'USC Greek Life Formal 2024',
    eventType: 'University',
    guestCount: 400,
    location: 'Luxury Resort, Newport Beach',
    date: 'April 2024',
    description: 'An elegant formal event for USC Greek Life featuring 400 students, complete with transportation, entertainment, and full production at a luxury Newport Beach resort.',
    challenge: 'Coordinating an event for 400 college students requires balancing high energy entertainment with the sophistication expected at a luxury resort. We needed to ensure safe transportation from campus, manage alcohol service responsibly, and create an unforgettable experience within a student budget.',
    solution: 'We created a comprehensive package including round-trip luxury coach transportation from USC campus, a 4-hour open bar with professional bartending and security, and a high-energy DJ performance. Our lighting design transformed the ballroom into a nightclub atmosphere while respecting the venue\'s elegant aesthetic. We stationed security at strategic points and worked closely with resort staff to ensure smooth operations.',
    services: [
      'Event Coordination',
      'Transportation (10 Luxury Coaches)',
      'DJ & Entertainment',
      'Lighting & Effects',
      'Sound Production',
      'Photography & Photo Booth',
      'Security Services',
      'Coordination with Venue & Catering',
    ],
    images: [
      '/images/gallery/university-1.jpg',
      '/images/events/university.jpg',
      '/images/events/high-school.jpg',
    ],
    testimonial: {
      quote: 'The Perfect Event made our formal absolutely incredible. The transportation was seamless, the DJ was amazing, and the lighting made the venue look like a dream. They handled everything professionally and made sure everyone had a safe, amazing time. Best formal ever!',
      author: 'Sarah Thompson',
      role: 'Social Chair, USC Greek Life',
    },
    results: [
      '95% would recommend to other chapters',
      'Zero safety or security incidents',
      'All 400 students transported safely',
      'Chapter booked for following year immediately',
    ],
    featured: false,
  },
  {
    slug: 'santa-barbara-wedding',
    title: 'Oceanfront Wedding in Santa Barbara',
    eventType: 'Wedding',
    guestCount: 200,
    location: 'Oceanfront Resort, Santa Barbara',
    date: 'June 2024',
    description: 'An elegant oceanfront wedding featuring 200 guests, with ceremony on the bluffs and reception under a custom-lit tent overlooking the Pacific Ocean.',
    challenge: 'The couple wanted a seamless indoor-outdoor experience with ceremony on the ocean bluffs and reception in a tent. This required coordinating weather contingencies, managing sound coverage across large outdoor areas with wind considerations, and creating romantic lighting that would transition from sunset through late night. The location\'s strict noise ordinances required creative solutions.',
    solution: 'We designed a comprehensive plan with ceremony sound using directional speakers to minimize sound bleed, and installed a climate-controlled tent with crystal chandeliers and custom uplighting. Our team created a lighting timeline that evolved throughout the evening, starting with natural ambiance during sunset and transitioning to romantic cafe lighting for dinner and vibrant dance floor effects. We coordinated with the venue for all logistics and had a weather backup plan ready to execute within 2 hours if needed.',
    services: [
      'Full Wedding Coordination',
      'Ceremony & Reception Sound',
      'Custom Lighting Design',
      'DJ & MC Services',
      'Live Music Coordination (String Quartet & Jazz Band)',
      'Photography & Videography',
      'Photo Booth',
      'Transportation (Guest Shuttles)',
      'Day-of Coordination',
    ],
    images: [
      '/images/gallery/wedding-1.jpg',
      '/images/gallery/wedding-2.jpg',
      '/images/events/weddings.jpg',
    ],
    testimonial: {
      quote: 'The Perfect Event made our wedding day absolutely magical. From the ceremony sound to the dance party, everything was flawless. Our coordinator was calm, professional, and anticipated our every need. The lighting design was breathtaking as the sun set over the ocean. We can\'t thank them enough for making our dream wedding a reality.',
      author: 'Emily & James Rodriguez',
      role: 'Bride & Groom',
    },
    results: [
      'Guests raved about production quality',
      'Ceremony sound perfect despite ocean winds',
      'Dance floor packed until final song',
      'Featured on wedding blog "California Weddings"',
      '15+ vendor referrals from wedding party',
    ],
    featured: true,
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => study.featured)
}

export function getCaseStudiesByType(eventType: string): CaseStudy[] {
  return caseStudies.filter((study) => study.eventType === eventType)
}

export const portfolioCategories = [
  'All',
  'Wedding',
  'Corporate',
  'Festival',
  'University',
  'Private',
]
