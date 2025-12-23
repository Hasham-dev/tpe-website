'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Sparkles, Music, Camera, Bus, Lightbulb, Speaker, Shield, Heart, MapPin } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

const SERVICES = [
  {
    id: 'coordination',
    title: 'Coordination & Design',
    description: 'Full event planning from concept to execution',
    image: '/images/services/coordination.jpg',
    href: '/services/coordination',
    icon: Sparkles,
    featured: true,
  },
  {
    id: 'venue-booking',
    title: 'Venue Booking',
    description: 'Expert venue sourcing & booking',
    image: '/images/services/venue.jpg',
    href: '/services/venue-booking',
    icon: MapPin,
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    description: 'DJs, live bands & performers',
    image: '/images/services/entertainment.jpg',
    href: '/services/entertainment',
    icon: Music,
    featured: true,
  },
  {
    id: 'media',
    title: 'Media',
    description: 'Photo, video & photo booths',
    image: '/images/services/media.jpg',
    href: '/services/media',
    icon: Camera,
  },
  {
    id: 'transportation',
    title: 'Transportation',
    description: 'Luxury shuttles & party buses',
    image: '/images/services/transportation.jpg',
    href: '/services/transportation',
    icon: Bus,
  },
  {
    id: 'lighting',
    title: 'Full Service A/V',
    description: 'Complete audio-visual production',
    image: '/images/services/lighting.jpg',
    href: '/services/lighting',
    icon: Lightbulb,
    featured: true,
  },
  {
    id: 'sound',
    title: 'Sound & Staging',
    description: 'Professional audio systems',
    image: '/images/services/sound.jpg',
    href: '/services/sound',
    icon: Speaker,
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Professional event security',
    image: '/images/services/security.jpg',
    href: '/services/security',
    icon: Shield,
  },
  {
    id: 'addons',
    title: 'Finishing Touches',
    description: 'Decor, rentals & florals',
    image: '/images/services/addons.jpg',
    href: '/services/finishing-touches',
    icon: Heart,
  },
]

export function Services() {
  return (
    <Section id="services" background="white">
      <Container>
        <SectionHeader
          subtitle="What We Offer"
          title="Our Services"
          description="Everything you need for a perfect event, all under one roof."
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              className={cn(
                // Bento grid sizing
                service.featured ? 'col-span-2 row-span-2' : 'col-span-2 md:col-span-2',
              )}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

interface ServiceCardProps {
  service: typeof SERVICES[0]
  index: number
  className?: string
}

function ServiceCard({ service, index, className }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <Link
      href={service.href}
      className={cn(
        'group relative overflow-hidden rounded-xl',
        'transform transition-all duration-500 hover:scale-[1.02]',
        className
      )}
    >
      {/* Background Image */}
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 group-hover:from-black/90 transition-all duration-500" />

      {/* Glassmorphism card at bottom */}
      <div className="absolute inset-x-3 bottom-3 z-10">
        <div className="backdrop-blur-md bg-white/10 rounded-lg p-4 border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/30">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-brand-accent-light" />
                <h3 className="text-white font-semibold text-sm md:text-base leading-tight">
                  {service.title}
                </h3>
              </div>
              <p className="text-white/70 text-xs md:text-sm line-clamp-1">
                {service.description}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-brand-accent group-hover:scale-110 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/20 to-transparent" />
      </div>
    </Link>
  )
}
