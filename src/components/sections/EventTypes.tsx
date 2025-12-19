'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { EVENT_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function EventTypes() {
  return (
    <Section id="events" background="default">
      <Container>
        <SectionHeader
          subtitle="What We Do"
          title="Planning an Event?"
          description="From intimate gatherings to large-scale festivals, we have the expertise and resources to make your event unforgettable."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENT_TYPES.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

interface EventCardProps {
  event: typeof EVENT_TYPES[0]
  index: number
}

function EventCard({ event, index }: EventCardProps) {
  return (
    <Link
      href={event.href}
      className="group card card-hover"
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Number Badge */}
        <div className="absolute top-4 left-4 w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-serif text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {event.description}
        </p>
        <div className="flex items-center gap-2 text-brand-accent font-medium">
          <span className="text-sm">Learn More</span>
          <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  )
}
