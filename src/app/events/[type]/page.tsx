import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { PageHero, TestimonialCard } from '@/components/ui'
import { PageCTA } from '@/components/sections'
import { getEventBySlug, getAllEventSlugs } from '@/lib/events'
import { EventTypeSchema, BreadcrumbSchema } from '@/components/seo/StructuredData'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://theperfectevent.com'

interface EventPageProps {
  params: {
    type: string
  }
}

export async function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({
    type: slug,
  }))
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = getEventBySlug(params.type)

  if (!event) {
    return {
      title: 'Event Type Not Found',
    }
  }

  return {
    title: `${event.title} Event Planning & Production | Southern California`,
    description: event.longDescription,
    openGraph: {
      title: `${event.title} Event Planning | The Perfect Event`,
      description: event.description,
      images: [{ url: event.image, width: 1200, height: 630, alt: `${event.title} Events` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.title} Event Planning | The Perfect Event`,
      description: event.description,
      images: [event.image],
    },
    keywords: [
      `${event.title.toLowerCase()} event planning`,
      `${event.title.toLowerCase()} Los Angeles`,
      `${event.title.toLowerCase()} San Diego`,
      `${event.title.toLowerCase()} Orange County`,
      'event production Southern California',
      'full service events',
      'event coordinator',
    ],
    alternates: {
      canonical: `/events/${event.slug}`,
    },
  }
}

export default function EventTypePage({ params }: EventPageProps) {
  const event = getEventBySlug(params.type)

  if (!event) {
    notFound()
  }

  const eventUrl = `${BASE_URL}/events/${event.slug}`

  return (
    <>
      {/* Structured Data for SEO */}
      <EventTypeSchema
        name={event.title}
        description={event.longDescription}
        url={eventUrl}
        image={event.image}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: BASE_URL },
          { name: 'Event Types', url: `${BASE_URL}/#events` },
          { name: event.title, url: eventUrl },
        ]}
      />

      {/* Hero Section */}
      <PageHero
        title={event.title}
        description={event.description}
        image={event.image}
        height="lg"
        gradient="left"
        breadcrumbs={[
          { label: 'Event Types', href: '/#events' },
          { label: event.title },
        ]}
      >
        <Button href="/quote" variant="secondary" size="lg">
          Get Free Quote
        </Button>
      </PageHero>

      {/* Stats Section */}
      {event.stats && (
        <Section background="white" spacing="md">
          <Container>
            <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
              {event.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-brand-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* About Section */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary mb-6">
              About {event.title} Events
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {event.longDescription}
            </p>
          </div>
        </Container>
      </Section>

      {/* What We Provide */}
      <Section background="accent" spacing="lg">
        <Container>
          <SectionHeader
            subtitle="Comprehensive Services"
            title="What We Provide"
            description={`Everything you need for an unforgettable ${event.title.toLowerCase()} event.`}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {event.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Gallery Section */}
      {event.gallery.length > 0 && (
        <Section background="white" spacing="lg">
          <Container>
            <SectionHeader
              subtitle="Past Events"
              title="Our Work"
              description="See examples of our previous events and get inspired for yours."
            />
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {event.gallery.map((item, index) => (
                <div
                  key={index}
                  className="group relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-semibold text-lg">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Testimonial Section */}
      <Section background="accent" spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <TestimonialCard testimonial={event.testimonial} />
          </div>
        </Container>
      </Section>

      {/* Process Section */}
      <Section background="white" spacing="lg">
        <Container>
          <SectionHeader
            subtitle="How It Works"
            title="Our Process"
            description="From first contact to final celebration, we guide you every step of the way."
          />
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-2xl font-bold text-brand-accent mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-brand-primary mb-2">Contact Us</h3>
              <p className="text-gray-600 text-sm">
                Share your vision, date, and requirements
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-2xl font-bold text-brand-accent mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-brand-primary mb-2">Get Proposal</h3>
              <p className="text-gray-600 text-sm">
                Receive detailed quote within 24-48 hours
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-2xl font-bold text-brand-accent mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-brand-primary mb-2">Plan Together</h3>
              <p className="text-gray-600 text-sm">
                Work with your coordinator to perfect every detail
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-2xl font-bold text-brand-accent mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold text-brand-primary mb-2">Celebrate</h3>
              <p className="text-gray-600 text-sm">
                Relax and enjoy your perfect event
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <PageCTA
        title={`Ready to Plan Your ${event.title} Event?`}
        description={`With over 17 years of experience and 600+ events annually, we have the expertise to make your ${event.title.toLowerCase()} event unforgettable.`}
        primaryAction={{ label: 'Get Free Quote', href: '/quote' }}
      />
    </>
  )
}
