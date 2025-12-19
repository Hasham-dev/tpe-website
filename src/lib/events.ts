export interface EventType {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  image: string
  features: string[]
  gallery: {
    image: string
    caption: string
  }[]
  testimonial: {
    name: string
    initials: string
    event: string
    location: string
    color: string
    rating: number
    text: string
  }
  stats?: {
    value: string
    label: string
  }[]
}

export const EVENTS_DATA: EventType[] = [
  {
    id: 'weddings',
    slug: 'weddings',
    title: 'Weddings',
    description: 'On one of the most important days of your life, we provide a full service program.',
    longDescription: 'Your wedding day should be a perfect reflection of your love story. As Southern California\'s premier wedding production company, we handle every detail from ceremony to reception, allowing you to be fully present for each precious moment. With over 17 years of experience and hundreds of weddings produced annually, we bring unmatched expertise, creativity, and professionalism to your celebration. From intimate beach ceremonies to grand ballroom receptions, we create unforgettable experiences that you and your guests will cherish forever.',
    image: '/images/events/weddings.jpg',
    features: [
      'Complete wedding day coordination and timeline management',
      'Ceremony and reception venue booking assistance',
      'Professional DJ or live band entertainment',
      'Professional photography and videography',
      'Elegant lighting design and uplighting',
      'Premium sound systems for ceremony and reception',
      'Guest transportation and shuttle coordination',
      'Floral design and centerpiece arrangements',
      'Custom monogram and specialty lighting',
      'Photo booth experiences with props and prints',
      'Dance floor and staging rentals',
      'Professional security and crowd management',
    ],
    gallery: [
      { image: '/images/gallery/wedding-1.jpg', caption: 'Elegant ballroom reception' },
      { image: '/images/gallery/wedding-2.jpg', caption: 'Outdoor ceremony setup' },
    ],
    testimonial: {
      name: 'Sarah & Michael T.',
      initials: 'S&M',
      event: 'Wedding',
      location: 'Orange County',
      color: 'bg-rose-500',
      rating: 5,
      text: 'The Perfect Event truly lived up to their name. From our first meeting to the last dance, every detail was handled with care and precision. Our wedding day was absolutely magical!',
    },
    stats: [
      { value: '300+', label: 'Weddings Yearly' },
      { value: '4.9/5', label: 'Average Rating' },
      { value: '100%', label: 'On-Time Guarantee' },
    ],
  },
  {
    id: 'corporate',
    slug: 'corporate',
    title: 'Corporate Events',
    description: 'Let us handle the work this time so you can focus on your clients and employees.',
    longDescription: 'Make a lasting impression with professionally produced corporate events that reflect your brand and values. From company galas and product launches to team building events and conferences, we handle all logistics so you can focus on connecting with your clients and employees. Our corporate event specialists understand the importance of professionalism, punctuality, and seamless execution. We work with major corporations throughout Southern California, delivering events that strengthen culture, celebrate achievements, and drive business objectives.',
    image: '/images/events/corporate.jpg',
    features: [
      'Full event planning and project management',
      'Professional AV and presentation equipment',
      'Stage design and branded backdrops',
      'Corporate entertainment (bands, speakers, performers)',
      'Live streaming and virtual event capabilities',
      'Professional photography and videography',
      'Event registration and check-in systems',
      'Networking reception coordination',
      'Catering and beverage service management',
      'Executive transportation services',
      'On-site event support staff',
      'Post-event analytics and reporting',
    ],
    gallery: [
      { image: '/images/gallery/corporate-1.jpg', caption: 'Annual company gala' },
      { image: '/images/gallery/corporate-2.jpg', caption: 'Product launch event' },
    ],
    testimonial: {
      name: 'Jennifer M.',
      initials: 'JM',
      event: 'Corporate Gala',
      location: 'Los Angeles',
      color: 'bg-blue-500',
      rating: 5,
      text: 'We\'ve worked with many event companies, but The Perfect Event stands out. Their professionalism and ability to handle everything in-house made our annual gala our most successful yet.',
    },
    stats: [
      { value: '150+', label: 'Corporate Events Yearly' },
      { value: '50+', label: 'Fortune 500 Clients' },
      { value: '24/7', label: 'Support Available' },
    ],
  },
  {
    id: 'festivals',
    slug: 'festivals',
    title: 'Festivals & Public Events',
    description: 'Our wide range of personnel and equipment allows us to facilitate all your festival needs.',
    longDescription: 'From community festivals to large-scale public events, we have the equipment, expertise, and personnel to produce memorable experiences for thousands of attendees. Our festival production team handles everything from multi-stage setups to crowd management, vendor coordination to emergency planning. We own our equipment, ensuring reliability and quality for events of any scale. With experience producing some of Southern California\'s largest festivals, we bring professional production values to community celebrations.',
    image: '/images/events/festivals.jpg',
    features: [
      'Multi-stage audio and lighting production',
      'Festival-grade sound systems and line arrays',
      'Large format LED video walls and screens',
      'Power distribution and generator services',
      'Crowd control barriers and security fencing',
      'Professional security and crowd management',
      'VIP and backstage area management',
      'Vendor and exhibitor coordination',
      'Ticketing and entry management systems',
      'Emergency medical coordination',
      'Waste management and site cleanup',
      'Permits and city coordination assistance',
    ],
    gallery: [
      { image: '/images/gallery/festival-1.jpg', caption: 'Main stage production' },
      { image: '/images/gallery/festival-2.jpg', caption: 'Festival lighting design' },
    ],
    testimonial: {
      name: 'Buccaneer Days Festival',
      initials: 'BD',
      event: 'Annual Community Festival',
      location: 'Long Beach',
      color: 'bg-orange-500',
      rating: 5,
      text: 'The Perfect Event has been our production partner for years. Their ability to scale production for large crowds while maintaining quality is unmatched. They make our festival possible.',
    },
    stats: [
      { value: '50+', label: 'Festivals Yearly' },
      { value: '100K+', label: 'Attendees Served' },
      { value: '10', label: 'Simultaneous Stages' },
    ],
  },
  {
    id: 'university',
    slug: 'university',
    title: 'University Events',
    description: 'We are the largest college event company in the country. No one does it better.',
    longDescription: 'As the largest university event production company in the nation, we understand the unique needs of college celebrations. From Greek life formals and homecoming dances to campus-wide festivals and orientation events, we create memorable experiences that students talk about for years. Our dedicated university division works with schools throughout California and beyond, providing reliable, professional, and budget-conscious event production. We understand student culture, campus regulations, and how to create safe, inclusive environments where students can celebrate responsibly.',
    image: '/images/events/university.jpg',
    features: [
      'Greek life formals and semi-formals',
      'Homecoming and welcome week events',
      'Spring concerts and music festivals',
      'Graduation celebrations and send-offs',
      'Professional DJ entertainment',
      'Concert-quality sound and lighting',
      'Safe space management and security',
      'Alcohol-free event planning',
      'Budget-friendly package options',
      'Campus compliance and regulation adherence',
      'Student organization coordination',
      'Multi-day event production',
    ],
    gallery: [
      { image: '/images/gallery/university-1.jpg', caption: 'Homecoming dance' },
    ],
    testimonial: {
      name: 'UCLA Student Events',
      initials: 'UCLA',
      event: 'University Festival',
      location: 'Westwood',
      color: 'bg-sky-600',
      rating: 5,
      text: 'The Perfect Event has been our go-to partner for years. They understand the unique needs of university events and always deliver beyond expectations.',
    },
    stats: [
      { value: '200+', label: 'University Events Yearly' },
      { value: '30+', label: 'Campus Partners' },
      { value: '15+', label: 'Years Serving Students' },
    ],
  },
  {
    id: 'high-school',
    slug: 'high-school',
    title: 'High School Events',
    description: 'Bring the "WOW" factor to all of your proms and events.',
    longDescription: 'Create unforgettable memories for students with professionally produced high school events. From prom and homecoming to grad nights and winter formals, we bring the excitement and sophistication that students dream about while maintaining the safety and supervision that parents and administrators require. Our high school event specialists understand school budgets, campus policies, and age-appropriate entertainment. We create energetic, inclusive environments where every student can celebrate major milestones in style.',
    image: '/images/events/high-school.jpg',
    features: [
      'Prom and homecoming dance production',
      'Grad night and senior celebrations',
      'Winter formal and spring fling events',
      'Professional DJ with clean music playlists',
      'Age-appropriate entertainment and activities',
      'Elegant lighting and decor transformations',
      'Photo booth experiences with props',
      'Red carpet and grand entrance setups',
      'Chaperone and admin coordination',
      'School compliance and safety protocols',
      'Budget-friendly pricing for schools',
      'Inclusive environment for all students',
    ],
    gallery: [
      { image: '/images/events/high-school.jpg', caption: 'Prom night celebration' },
    ],
    testimonial: {
      name: 'Long Beach Unified School District',
      initials: 'LBUSD',
      event: 'High School Prom',
      location: 'Long Beach',
      color: 'bg-indigo-500',
      rating: 5,
      text: 'The Perfect Event makes prom planning easy for our staff and magical for our students. They handle all the details professionally and always stay within our budget.',
    },
    stats: [
      { value: '100+', label: 'High School Events Yearly' },
      { value: '10K+', label: 'Students Served' },
      { value: '100%', label: 'Safe Event Record' },
    ],
  },
  {
    id: 'private',
    slug: 'private-parties',
    title: 'Private Parties',
    description: 'We can help you with events of all ranges, themes, and sizes.',
    longDescription: 'Celebrate life\'s special moments with professionally produced private parties. Whether you\'re planning a milestone birthday, anniversary celebration, retirement party, or family reunion, we bring creativity, expertise, and comprehensive services to make your vision a reality. From intimate backyard gatherings to lavish celebrations, our team handles every detail so you can enjoy the party. No event is too small or too unique - we love bringing creative visions to life and making ordinary spaces extraordinary.',
    image: '/images/events/private.jpg',
    features: [
      'Milestone birthday parties (Sweet 16, 21st, 30th, 50th)',
      'Anniversary and vow renewal celebrations',
      'Retirement and farewell parties',
      'Bar/Bat Mitzvahs and Quinceañeras',
      'Holiday parties and themed celebrations',
      'Family reunions and community gatherings',
      'Professional DJ and entertainment',
      'Custom lighting and decor',
      'Photo booth experiences',
      'Catering coordination',
      'Rental coordination (furniture, linens, decor)',
      'Backyard party production',
    ],
    gallery: [
      { image: '/images/gallery/private-1.jpg', caption: 'Milestone birthday celebration' },
    ],
    testimonial: {
      name: 'Amanda K.',
      initials: 'AK',
      event: 'Quinceañera',
      location: 'Long Beach',
      color: 'bg-purple-500',
      rating: 5,
      text: 'They made my daughter\'s quinceañera absolutely perfect. The DJ was amazing, the lighting was beautiful, and the photo booth was a huge hit!',
    },
    stats: [
      { value: '150+', label: 'Private Parties Yearly' },
      { value: '10-500', label: 'Guest Range' },
      { value: '4.9/5', label: 'Client Satisfaction' },
    ],
  },
]

export function getEventBySlug(slug: string): EventType | undefined {
  return EVENTS_DATA.find(event => event.slug === slug)
}

export function getAllEventSlugs(): string[] {
  return EVENTS_DATA.map(event => event.slug)
}
