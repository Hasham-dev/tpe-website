import type { Metadata } from 'next'
import GalleryPageContent from './GalleryPageContent'

export const metadata: Metadata = {
  title: 'Event Photo Gallery | Weddings, Corporate & Festivals | The Perfect Event',
  description: 'Browse 600+ event photos from weddings, corporate galas, university events, and festivals. See the quality and attention to detail we bring to every Southern California event.',
  keywords: [
    'event photos',
    'wedding gallery',
    'corporate event photos',
    'festival photography',
    'event portfolio',
  ],
  openGraph: {
    title: 'Event Photo Gallery | The Perfect Event',
    description: 'Browse event photos from weddings, corporate events, and festivals across Southern California.',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Photo Gallery | The Perfect Event',
    description: 'Browse event photos from weddings, corporate events, and festivals.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/gallery',
  },
}

export default function GalleryPage() {
  return <GalleryPageContent />
}
