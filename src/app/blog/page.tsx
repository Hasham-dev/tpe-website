import { Metadata } from 'next'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Event Planning Blog | Tips, Trends & Expert Insights',
  description: 'Expert event planning tips, wedding guides, corporate event ideas, and industry trends from Southern California\'s premier event production company. 600+ events annually.',
  keywords: [
    'event planning blog',
    'wedding planning tips',
    'corporate event ideas',
    'event planning guide',
    'party planning tips',
    'event production trends',
    'Southern California events',
  ],
  openGraph: {
    title: 'Event Planning Blog | The Perfect Event',
    description: 'Expert insights, planning tips, and industry trends from Southern California\'s premier event production company.',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Planning Blog | The Perfect Event',
    description: 'Expert insights and planning tips from Southern California\'s premier event production company.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPage() {
  return <BlogContent />
}
