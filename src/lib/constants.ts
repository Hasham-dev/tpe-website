export const SITE_CONFIG = {
  name: 'The Perfect Event',
  tagline: "Southern California's Premier Full-Service Event Production Company",
  description: 'One company. Every service. From planning to production, we own it all so your event is perfect.',
  phone: '877-345-7500',
  email: 'sales@theperfectevent.com',
  address: '3133 E South St, Long Beach, CA 90805',
  socialLinks: {
    facebook: 'https://facebook.com/ThePerfectEventInc',
    instagram: 'https://www.instagram.com/theperfectevent.inc',
    youtube: 'https://www.youtube.com/channel/UCLsx2RXCMHYKPkAuZX8cMjw/videos',
  },
  locations: [
    'Los Angeles',
    'Orange County',
    'San Diego',
    'Inland Empire',
    'Santa Barbara',
    'San Luis Obispo',
    'Catalina Island',
    'Arizona',
  ],
}

export const STATS = [
  { value: '600+', label: 'Events Per Year' },
  { value: '200+', label: 'Team Members' },
  { value: '17+', label: 'Years Experience' },
  { value: '4.9', label: 'Star Rating' },
]

export const SERVICES = [
  {
    id: 'coordination',
    title: 'Coordination & Design',
    description: 'Full event planning from concept to execution with meticulous attention to detail.',
    image: '/images/services/coordination.jpg',
    href: '/services/coordination-design',
  },
  {
    id: 'venue-booking',
    title: 'Venue Booking',
    description: 'Expert venue sourcing and booking assistance to find the perfect location for your event.',
    image: '/images/services/venue.jpg',
    href: '/services/venue-booking',
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    description: 'DJs, live bands, performers, and interactive entertainment for any occasion.',
    image: '/images/services/entertainment.jpg',
    href: '/services/entertainment',
  },
  {
    id: 'media',
    title: 'Media',
    description: 'Professional photography, videography, and photo booth experiences.',
    image: '/images/services/media.jpg',
    href: '/services/media-production',
  },
  {
    id: 'transportation',
    title: 'Transportation',
    description: 'Luxury shuttles, party buses, and guest transportation solutions.',
    image: '/images/services/transportation.jpg',
    href: '/services/transportation',
  },
  {
    id: 'lighting',
    title: 'Full Service A/V',
    description: 'Complete audio-visual production including lighting, effects, and visual displays.',
    image: '/images/services/lighting.jpg',
    href: '/services/lighting-effects',
  },
  {
    id: 'sound',
    title: 'Sound & Staging',
    description: 'Professional audio systems, staging, and power distribution.',
    image: '/images/services/sound.jpg',
    href: '/services/sound-staging',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Professional event security and crowd management services.',
    image: '/images/services/security.jpg',
    href: '/services/security',
  },
  {
    id: 'addons',
    title: 'Finishing Touches',
    description: 'Decor, rentals, florals, and all the details that make events special.',
    image: '/images/services/addons.jpg',
    href: '/services/finishing-touches',
  },
]

export const EVENT_TYPES = [
  // First row: Corporate, University, High School
  {
    id: 'corporate',
    title: 'Corporate',
    description: 'Let us handle the work this time so you can focus on your clients and employees.',
    image: '/images/events/corporate.jpg',
    href: '/events/corporate',
  },
  {
    id: 'university',
    title: 'University',
    description: 'We are the largest college event company in the country. No one does it better.',
    image: '/images/events/university.jpg',
    href: '/events/university',
  },
  {
    id: 'high-school',
    title: 'High School',
    description: 'Bring the "WOW" factor to all of your proms and events.',
    image: '/images/events/high-school.jpg',
    href: '/events/high-school',
  },
  // Second row: Weddings, Festivals, Private Parties
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'On one of the most important days of your life, we provide a full service program.',
    image: '/images/events/weddings.jpg',
    href: '/events/weddings',
  },
  {
    id: 'festivals',
    title: 'Festivals',
    description: 'Our wide range of personnel and equipment allows us to facilitate all your festival needs.',
    image: '/images/events/festivals.jpg',
    href: '/events/festivals',
  },
  {
    id: 'private',
    title: 'Private Parties',
    description: 'We can help you with events of all ranges, themes, and sizes.',
    image: '/images/events/private.jpg',
    href: '/events/private-parties',
  },
]

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Tell Us About Your Event',
    description: 'Share your vision, date, and requirements through our simple inquiry form.',
  },
  {
    number: '02',
    title: 'Receive Custom Proposal',
    description: 'Get a detailed, personalized proposal within 24-48 hours.',
  },
  {
    number: '03',
    title: 'Meet Your Coordinator',
    description: 'Connect with your dedicated event coordinator to refine every detail.',
  },
  {
    number: '04',
    title: 'We Handle Everything',
    description: 'Relax while our team manages all vendors, logistics, and execution.',
  },
  {
    number: '05',
    title: 'Enjoy Your Perfect Event',
    description: 'Experience a flawless event and create memories that last a lifetime.',
  },
]

export const FAQS = [
  {
    question: 'How much does event planning cost?',
    answer: 'Event costs vary based on guest count, services needed, and event type. We offer packages starting from $2,500 for basic DJ services up to full-service production packages. Contact us for a personalized quote tailored to your specific needs and budget.',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking 6-12 months in advance for weddings and large events, and 2-3 months for corporate events or smaller gatherings. Popular dates fill quickly, so earlier is always better to secure your preferred date.',
  },
  {
    question: 'Do you travel outside Southern California?',
    answer: 'Yes! While we\'re based in Southern California, we regularly produce events throughout Arizona and can travel anywhere in the US for the right opportunity. Travel fees may apply for events outside our primary service area.',
  },
  {
    question: 'What\'s included in your full-service packages?',
    answer: 'Our full-service packages include event coordination, entertainment (DJ/live music), lighting & effects, sound production, photography, videography, transportation, security, and finishing touches like decor and rentals. Everything under one roof.',
  },
  {
    question: 'Can I book individual services?',
    answer: 'Absolutely! While we specialize in full-service production, you can book any individual service separately. Many clients come to us for specific needs like DJ services, lighting, or photography while using other vendors for different aspects.',
  },
  {
    question: 'What happens if I need to reschedule?',
    answer: 'We understand plans change. We offer flexible rescheduling policies depending on how far in advance you notify us. Deposits can typically be transferred to a new date within 12 months. Full terms are outlined in our service agreement.',
  },
  {
    question: 'Do you have insurance?',
    answer: 'Yes, we carry comprehensive general liability insurance and can provide certificates of insurance for your venue. Our coverage meets or exceeds requirements for all major venues in Southern California.',
  },
  {
    question: 'How do payments work?',
    answer: 'We typically require a 25-50% deposit to secure your date, with the remaining balance due 2 weeks before the event. We accept all major credit cards, checks, and bank transfers. Payment plans are available for larger events.',
  },
]

export const TEAM_MEMBERS = [
  {
    name: 'Dan Wilson',
    position: 'CEO & Founder',
    image: '/images/team/dan-wilson.png',
    bio: 'Founded The Perfect Event in 2007 with a vision to create a true one-stop shop for event production.',
  },
  {
    name: 'Maddy Scanlon',
    position: 'Director of Sales & Business Development',
    image: '/images/team/maddy-scanlon.jpg',
    bio: 'Leading our sales team to help clients bring their event visions to life.',
  },
  {
    name: 'Tony Warian',
    position: 'Director of Operations',
    image: '/images/team/tony-warian.jpg',
    bio: 'Ensuring seamless execution of hundreds of events each year.',
  },
  {
    name: 'Michael Basic',
    position: 'Director of Entertainment',
    image: '/images/team/michael-basic.png',
    bio: 'Curating unforgettable entertainment experiences for every event.',
  },
  {
    name: 'Hasham Vakani',
    position: 'Media & Tech Director',
    image: '/images/team/hasham-vakani.png',
    bio: 'Driving innovation in media production and technology solutions.',
  },
  {
    name: 'Marshmello',
    position: 'Chief of Pawperations',
    image: '/images/team/marshmello.png',
    bio: 'Office morale booster and unofficial team mascot.',
  },
  {
    name: 'Gary Jones',
    position: 'Production Director',
    image: '/images/team/gary-jones.jpg',
    bio: 'Overseeing all production aspects to deliver flawless events.',
  },
  {
    name: 'Noel Elgrably',
    position: 'Operations Manager',
    image: '/images/team/noel-elgrably.jpg',
    bio: 'Managing day-to-day operations and logistics coordination.',
  },
  {
    name: 'Charity Christie-Foster',
    position: 'Event Director',
    image: '/images/team/charity-christie-foster.png',
    bio: 'Creating memorable experiences through expert event direction.',
  },
  {
    name: 'Jacquelyn Kleist',
    position: 'Marketing Director',
    image: '/images/team/jacquelyn-kleist.jpg',
    bio: 'Building brand awareness and driving marketing initiatives.',
  },
  {
    name: 'Nikki Saks',
    position: 'Event Director',
    image: '/images/team/nikki-saks.png',
    bio: 'Bringing creative vision to life for clients across Southern California.',
  },
  {
    name: 'Juliana Chopelas',
    position: 'Event Director',
    image: '/images/team/juliana-chopelas.jpeg',
    bio: 'Dedicated to making every event exceed expectations.',
  },
  {
    name: 'Lily Ballard',
    position: 'Assistant Event Director',
    image: '/images/team/lily-ballard.png',
    bio: 'Supporting event execution with attention to every detail.',
  },
  {
    name: 'Charlotte Thompson',
    position: 'Assistant Event Director',
    image: '/images/team/charlotte_thompson.jpeg',
    bio: 'Supporting event execution with attention to every detail.',
  },
  {
    name: 'Sascha Smith',
    position: 'Assistant Event Director',
    image: '/images/team/sascha_smith.jpeg',
    bio: 'Supporting event execution with attention to every detail.',
  },
]

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'Our Story' },
  { href: '/#events', label: 'Event Types' },
  { href: '/team', label: 'Team' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
]
