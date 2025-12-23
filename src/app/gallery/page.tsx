import type { Metadata } from 'next'
import GalleryPageContent from './GalleryPageContent'

export const metadata: Metadata = {
  title: 'Gallery | The Perfect Event',
  description: 'Browse through our event photos. View our public gallery showcasing weddings, corporate events, and festivals, or access student-specific galleries.',
  openGraph: {
    title: 'Gallery | The Perfect Event',
    description: 'Browse through our event photos and discover the quality and attention to detail we bring to every event.',
    type: 'website',
  },
}

export default function GalleryPage() {
  return <GalleryPageContent />
}
