export interface Service {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  image: string
  icon?: string
  features: string[]
  pricingHint: string
  relatedServices: string[]
  faqs: {
    question: string
    answer: string
  }[]
}

export const SERVICES_DATA: Service[] = [
  {
    id: 'coordination',
    slug: 'coordination-design',
    title: 'Coordination & Design',
    description: 'Full event planning from concept to execution with meticulous attention to detail.',
    longDescription: 'Our expert event coordinators work with you from the initial concept through final execution, ensuring every detail aligns with your vision. We handle vendor management, timeline creation, budget oversight, and day-of coordination so you can enjoy your event stress-free. With over 17 years of experience producing 600+ events annually, we bring unmatched expertise to every celebration.',
    image: '/images/services/coordination.jpg',
    features: [
      'Dedicated event coordinator assigned to your event',
      'Comprehensive planning timeline and checklist',
      'Vendor recommendations and contract negotiations',
      'Budget management and cost optimization',
      'Event design and theme development',
      'Floor plan and layout design',
      'Day-of coordination and timeline management',
      'On-site problem solving and logistics',
      'Post-event wrap-up and vendor payments',
    ],
    pricingHint: 'Coordination packages start at $3,500. Full-service packages available.',
    relatedServices: ['venue-booking', 'finishing-touches', 'entertainment'],
    faqs: [
      {
        question: 'What is the difference between day-of coordination and full planning?',
        answer: 'Day-of coordination covers the final month before your event and the event day itself. Full planning includes everything from initial concept through execution, typically starting 6-12 months before your event.',
      },
      {
        question: 'How many events does each coordinator handle?',
        answer: 'We limit coordinators to 2-3 events per weekend to ensure personalized attention. Your coordinator will be with you from planning through execution.',
      },
      {
        question: 'Do you provide design services?',
        answer: 'Yes! Our coordination packages include event design consultation, mood boards, and layout planning. We work with you to bring your vision to life.',
      },
    ],
  },
  {
    id: 'venue',
    slug: 'venue-booking',
    title: 'Venue Booking',
    description: 'Access to exclusive venues and expert guidance in selecting the perfect location.',
    longDescription: 'Finding the perfect venue sets the foundation for an unforgettable event. We have established relationships with premier venues throughout Southern California, from beachfront properties to historic estates, luxury hotels to unique industrial spaces. Our venue experts help you navigate options, negotiate contracts, and secure the ideal location for your celebration.',
    image: '/images/services/venue.jpg',
    features: [
      'Access to 200+ exclusive venue partners',
      'Personalized venue recommendations based on your needs',
      'Site visits and walk-throughs with our team',
      'Contract review and negotiation',
      'Venue insurance coordination',
      'Permit assistance for public spaces',
      'Backup venue options and contingency planning',
      'Venue layout and capacity planning',
      'Coordination with venue staff and management',
    ],
    pricingHint: 'Venue booking services included in coordination packages or available separately.',
    relatedServices: ['coordination-design', 'lighting-effects', 'sound-staging'],
    faqs: [
      {
        question: 'Do you charge fees for venue booking?',
        answer: 'Venue booking is included in our full-service packages. For standalone venue booking, we charge a small service fee that is often offset by the discounts we negotiate.',
      },
      {
        question: 'What areas do you cover?',
        answer: 'We have venue relationships throughout Southern California including Los Angeles, Orange County, San Diego, Inland Empire, Santa Barbara, San Luis Obispo, and Catalina Island.',
      },
      {
        question: 'Can you help with outdoor venue permits?',
        answer: 'Absolutely! We handle all permit applications and coordination with local authorities for beach events, park gatherings, and other public space rentals.',
      },
    ],
  },
  {
    id: 'entertainment',
    slug: 'entertainment',
    title: 'Entertainment',
    description: 'DJs, live bands, performers, and interactive entertainment for any occasion.',
    longDescription: 'Entertainment is the heartbeat of any great event. Our roster includes over 50 professional DJs, live bands, musicians, and specialty performers ready to create the perfect atmosphere for your celebration. From elegant cocktail hour musicians to high-energy dance party DJs, we match the right talent to your event style and audience.',
    image: '/images/services/entertainment.jpg',
    features: [
      'Professional DJs with extensive music libraries',
      'Live bands and musicians (jazz, classical, rock, cover bands)',
      'MC and announcement services',
      'Custom music curation and timeline',
      'Ceremony musicians (string quartets, solo artists)',
      'Specialty performers (dancers, acrobats, magicians)',
      'Interactive entertainment (photo booths, games)',
      'Karaoke and open mic setups',
      'Backup equipment and contingency planning',
    ],
    pricingHint: 'DJ services start at $2,500. Live bands from $4,000. Custom packages available.',
    relatedServices: ['sound-staging', 'lighting-effects', 'media-production'],
    faqs: [
      {
        question: 'How do you match us with the right DJ or band?',
        answer: 'We start with a detailed consultation about your music preferences, event style, and guest demographics. We then provide samples and can arrange meetings with specific entertainers before booking.',
      },
      {
        question: 'What if our DJ gets sick?',
        answer: 'Every booking includes a backup entertainer guarantee. If your primary DJ is unavailable, we provide an equally qualified replacement at no additional cost.',
      },
      {
        question: 'Can the DJ take song requests?',
        answer: 'Absolutely! We encourage guest interaction. You can also provide do-not-play lists and must-play songs to ensure your event sounds exactly how you want.',
      },
    ],
  },
  {
    id: 'media',
    slug: 'media-production',
    title: 'Media Production',
    description: 'Professional photography, videography, and photo booth experiences.',
    longDescription: 'Preserve your special moments with our professional media production services. Our team of skilled photographers and videographers capture every emotion, detail, and celebration. From cinematic highlight reels to comprehensive event coverage, we create lasting memories you will cherish forever.',
    image: '/images/services/media.jpg',
    features: [
      'Professional photography (candid, portrait, detail shots)',
      'Cinematic videography and highlight reels',
      'Drone photography and aerial footage',
      'Live streaming capabilities',
      'Photo booth experiences with custom backdrops',
      'Same-day photo printing and sharing',
      'Online galleries with download options',
      'Photo editing and retouching',
      'Custom video editing with music and effects',
      'Multi-camera ceremony and reception coverage',
    ],
    pricingHint: 'Photography packages from $2,000. Videography from $3,000. Photo booth from $800.',
    relatedServices: ['entertainment', 'coordination-design', 'finishing-touches'],
    faqs: [
      {
        question: 'How long until we receive our photos and videos?',
        answer: 'Digital photo galleries are typically delivered within 2-4 weeks. Video highlight reels take 4-6 weeks, with full ceremony and reception videos delivered within 8-12 weeks.',
      },
      {
        question: 'Do we own the rights to our photos?',
        answer: 'Yes! All packages include full digital rights to your photos and videos for personal use. We provide high-resolution files with no watermarks.',
      },
      {
        question: 'What is included in photo booth packages?',
        answer: 'All photo booth packages include unlimited sessions, props, custom backdrops, on-site attendant, instant prints, and digital gallery access for all guests.',
      },
    ],
  },
  {
    id: 'transportation',
    slug: 'transportation',
    title: 'Transportation',
    description: 'Luxury shuttles, party buses, and guest transportation solutions.',
    longDescription: 'Keep your guests safe and your event running smoothly with our comprehensive transportation services. We coordinate everything from airport pickups to shuttle services between venues, ensuring everyone arrives on time and in style. Our fleet includes luxury buses, vans, and party buses equipped with premium amenities.',
    image: '/images/services/transportation.jpg',
    features: [
      'Luxury shuttle buses (24-56 passenger)',
      'Party buses with premium sound systems and lighting',
      'Airport pickup and drop-off coordination',
      'Hotel to venue shuttle services',
      'Multi-stop route planning and scheduling',
      'Professional, licensed drivers',
      'Vehicle tracking and ETA updates',
      'ADA-accessible vehicle options',
      'Backup vehicles on standby',
    ],
    pricingHint: 'Shuttle services from $500. Party buses from $1,200. Custom routes available.',
    relatedServices: ['coordination-design', 'venue-booking', 'entertainment'],
    faqs: [
      {
        question: 'How many shuttles do I need?',
        answer: 'We help you calculate based on your guest count, venue distance, and timeline. Typically we recommend 1 bus per 50 guests for efficient loading and minimal wait times.',
      },
      {
        question: 'What is included in party bus rentals?',
        answer: 'Party buses include premium sound systems, LED lighting, comfortable seating, climate control, and beverages (non-alcoholic). You may bring your own alcohol for guests 21+.',
      },
      {
        question: 'Do you provide drivers?',
        answer: 'Yes! All vehicles come with professional, licensed, and insured drivers. They handle navigation, parking, and timing so you don\'t have to worry about logistics.',
      },
    ],
  },
  {
    id: 'lighting',
    slug: 'lighting-effects',
    title: 'Lighting & Effects',
    description: 'Atmospheric lighting, special effects, and visual production.',
    longDescription: 'Transform any space with our state-of-the-art lighting and effects. From elegant uplighting to dramatic dance floor effects, our lighting designers create the perfect ambiance for your event. We own our equipment, ensuring top quality and reliability for everything from intimate gatherings to large-scale productions.',
    image: '/images/services/lighting.jpg',
    features: [
      'Uplighting in custom colors',
      'Intelligent moving head fixtures',
      'Dance floor lighting effects',
      'Monogram and pattern projections (gobos)',
      'Ambient wash lighting',
      'Pinspot highlighting for centerpieces',
      'Outdoor landscape lighting',
      'Special effects (fog, haze, sparklers, cold sparks)',
      'LED video walls and screens',
      'Custom lighting design and programming',
    ],
    pricingHint: 'Basic uplighting from $800. Full lighting design from $2,500. Custom packages available.',
    relatedServices: ['sound-staging', 'entertainment', 'venue-booking'],
    faqs: [
      {
        question: 'Do you provide lighting design consultations?',
        answer: 'Yes! We offer complimentary design consultations where we assess your venue and create a custom lighting plan to match your vision and budget.',
      },
      {
        question: 'What is the difference between uplighting and pinspots?',
        answer: 'Uplighting washes walls and creates ambient color throughout the space. Pinspots are focused beams that highlight specific elements like centerpieces, cake tables, or floral arrangements.',
      },
      {
        question: 'Are your special effects safe for indoor venues?',
        answer: 'Absolutely! We use venue-safe effects like cold spark machines and water-based haze that won\'t trigger fire alarms or damage surfaces. All effects are approved by venue management.',
      },
    ],
  },
  {
    id: 'sound',
    slug: 'sound-staging',
    title: 'Sound & Staging',
    description: 'Professional audio systems, staging, and power distribution.',
    longDescription: 'Crystal-clear sound is essential for any event. Our professional audio engineers ensure perfect sound coverage whether you are hosting an intimate dinner with speeches or a festival with multiple stages. We provide everything from ceremony microphones to full concert-quality sound systems, all owned and maintained by our team.',
    image: '/images/services/sound.jpg',
    features: [
      'Professional PA systems (small to large format)',
      'Wireless microphones (handheld, lavalier, headset)',
      'Monitor speakers for performers',
      'Mixing consoles and audio processing',
      'Staging and risers (various sizes)',
      'Dance floors (wood, LED, custom graphics)',
      'Power distribution and generators',
      'Audio/visual equipment for presentations',
      'Recording capabilities',
      'On-site audio engineers',
    ],
    pricingHint: 'Basic sound packages from $1,200. Full production from $5,000. Festival pricing available.',
    relatedServices: ['entertainment', 'lighting-effects', 'venue-booking'],
    faqs: [
      {
        question: 'Do you provide sound engineers?',
        answer: 'Yes! All audio packages include professional sound engineers who handle setup, mixing, and troubleshooting throughout your event.',
      },
      {
        question: 'What size events can you accommodate?',
        answer: 'We handle everything from intimate 25-person gatherings to 10,000+ person festivals. We own enough equipment to run multiple stages simultaneously.',
      },
      {
        question: 'Can you accommodate live bands?',
        answer: 'Absolutely! We provide full backline equipment, monitor systems, and mixing capabilities for bands of any size. Our engineers have experience with all genres.',
      },
    ],
  },
  {
    id: 'security',
    slug: 'security',
    title: 'Security',
    description: 'Professional event security and crowd management services.',
    longDescription: 'Keep your guests safe and your event secure with our professional security services. Our trained security personnel provide discreet protection, crowd management, and emergency response. From checking guest lists to handling difficult situations, our team ensures everyone can enjoy the celebration with peace of mind.',
    image: '/images/services/security.jpg',
    features: [
      'Licensed and trained security personnel',
      'Guest list management and ID checking',
      'Crowd control and flow management',
      'VIP and executive protection',
      'Parking lot and perimeter security',
      'Emergency response coordination',
      'Alcohol monitoring and intervention',
      'Conflict de-escalation',
      'Communication via radio systems',
      'Coordination with local law enforcement',
    ],
    pricingHint: 'Security services from $500 per officer. Package rates available for multiple officers.',
    relatedServices: ['coordination-design', 'venue-booking', 'transportation'],
    faqs: [
      {
        question: 'How many security officers do I need?',
        answer: 'We recommend 1 officer per 100 guests for most events. High-profile events, alcohol service, or challenging venues may require additional coverage.',
      },
      {
        question: 'Are your officers licensed?',
        answer: 'Yes! All security personnel are licensed, background-checked, and receive ongoing training in event security, crowd management, and emergency response.',
      },
      {
        question: 'What if something goes wrong?',
        answer: 'Our officers are trained in de-escalation, emergency response, and crisis management. They coordinate with venue staff, local authorities, and emergency services as needed.',
      },
    ],
  },
  {
    id: 'addons',
    slug: 'finishing-touches',
    title: 'Finishing Touches',
    description: 'Decor, rentals, florals, and all the details that make events special.',
    longDescription: 'The little details make the biggest impact. Our finishing touches services include everything from elegant linens and chair covers to stunning floral arrangements and custom signage. We work with the best vendors in Southern California to source rentals and decor that perfectly complement your event theme and style.',
    image: '/images/services/addons.jpg',
    features: [
      'Floral design and arrangements',
      'Linen rentals in all colors and textures',
      'Chair covers and sashes',
      'Table settings and centerpieces',
      'Lounge furniture and seating areas',
      'Draping and fabric installations',
      'Custom signage and displays',
      'Ceremony decor (arches, aisle runners, petals)',
      'Table numbers and place cards',
      'Party favors and welcome bags',
    ],
    pricingHint: 'Finishing touches packages from $1,000. Custom quotes based on specific needs.',
    relatedServices: ['coordination-design', 'venue-booking', 'lighting-effects'],
    faqs: [
      {
        question: 'Do you provide florists?',
        answer: 'We work with premier florists throughout Southern California and can coordinate all floral needs, from bridal bouquets to ceremony installations.',
      },
      {
        question: 'Can we rent furniture and decor items separately?',
        answer: 'Yes! While we specialize in full-service decor packages, individual rental items are available. We coordinate with our rental partners to get you the best pricing.',
      },
      {
        question: 'How far in advance should we decide on decor?',
        answer: 'We recommend finalizing decor details 6-8 weeks before your event to ensure availability of specific items. Color schemes and themes can be decided earlier.',
      },
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES_DATA.find(service => service.slug === slug)
}

export function getRelatedServices(serviceId: string, limit: number = 3): Service[] {
  const service = SERVICES_DATA.find(s => s.id === serviceId)
  if (!service) return []

  return service.relatedServices
    .map(id => SERVICES_DATA.find(s => s.slug === id))
    .filter((s): s is Service => s !== undefined)
    .slice(0, limit)
}
