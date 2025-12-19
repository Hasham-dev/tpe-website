import type { Metadata } from 'next'
import PortfolioContent from './PortfolioContent'

export const metadata: Metadata = {
  title: 'Portfolio | The Perfect Event',
  description: 'Explore our featured events and case studies. From intimate weddings to large-scale festivals, see how we bring our clients\' visions to life with excellence and attention to detail.',
  openGraph: {
    title: 'Portfolio | The Perfect Event',
    description: 'Explore our featured events and case studies. From intimate weddings to large-scale festivals, every event is a testament to our commitment to excellence.',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return <PortfolioContent />
}
