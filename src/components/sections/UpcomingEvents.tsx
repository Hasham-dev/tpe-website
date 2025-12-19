'use client'

import Image from 'next/image'
import { Calendar, MapPin, Ticket, ArrowRight } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

const upcomingEvents = [
  {
    id: 'catalina-wine-mixer',
    title: 'Catalina Wine Mixer',
    date: 'Summer 2025',
    location: 'Catalina Island, CA',
    description: 'The biggest event in California wine country. Join us for an unforgettable weekend of wine, music, and celebration on beautiful Catalina Island.',
    image: '/images/events/catalina-wine-mixer.jpg',
    ticketUrl: 'https://www.eventbrite.com/e/catalina-wine-mixer-2024-tickets-777091500597',
    featured: true,
  },
  {
    id: 'buccaneer-days',
    title: 'Buccaneer Days',
    date: 'Coming 2025',
    location: 'Catalina Island, CA',
    description: 'A legendary island tradition featuring live entertainment, food, and family-friendly activities.',
    image: '/images/events/buccaneer-days.jpg',
    ticketUrl: 'https://www.visitcatalinaisland.com/bucc-days/',
    featured: false,
  },
]

export function UpcomingEvents() {
  return (
    <Section id="upcoming-events" background="accent">
      <Container>
        <SectionHeader
          subtitle="Join Us"
          title="Upcoming Ticketed Events"
          description="Experience The Perfect Event firsthand at our signature public events."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-[250px]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                {event.featured && (
                  <span className="absolute top-4 left-4 bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured Event
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif text-brand-primary mb-3">
                  {event.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">
                  {event.description}
                </p>
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-accent font-semibold hover:text-brand-primary transition-colors"
                >
                  <Ticket className="w-5 h-5" />
                  Get Tickets
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
