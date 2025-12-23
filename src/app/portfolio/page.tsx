import type { Metadata } from 'next'
import PortfolioContent from './PortfolioContent'

export const metadata: Metadata = {
  title: 'Event Portfolio & Case Studies | 600+ Events Yearly | The Perfect Event',
  description: 'Explore our portfolio of 600+ annual events. From intimate weddings to large-scale festivals, see how we bring visions to life across Southern California.',
  keywords: [
    'event portfolio',
    'wedding portfolio',
    'event case studies',
    'corporate event examples',
    'festival production portfolio',
  ],
  openGraph: {
    title: 'Event Portfolio | The Perfect Event',
    description: 'Explore our featured events and case studies. From intimate weddings to large-scale festivals.',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Portfolio | The Perfect Event',
    description: 'Explore our featured events and case studies.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/portfolio',
  },
}

export default function PortfolioPage() {
  return <PortfolioContent />
}
