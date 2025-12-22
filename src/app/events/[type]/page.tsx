import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CheckCircle, Star, Quote } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { EVENTS_DATA, getEventBySlug, getAllEventSlugs } from '@/lib/events'
import { cn } from '@/lib/utils'
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
    title: `${event.title} Event Planning & Production`,
    description: event.longDescription,
    openGraph: {
      title: `${event.title} Event Planning | The Perfect Event`,
      description: event.description,
      images: [event.image],
    },
    keywords: [
      `${event.title.toLowerCase()} event planning`,
      `${event.title.toLowerCase()} Southern California`,
      'event production',
      'full service events',
      'event coordinator',
    ],
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
      <Section background="default" spacing="none" className="relative">
        <div className="relative h-[500px] md:h-[600px]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <Container className="relative h-full flex flex-col justify-center">
            <Breadcrumb
              items={[
                { label: 'Event Types', href: '/#events' },
                { label: event.title },
              ]}
              className="mb-6 text-white/80"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 max-w-3xl">
              {event.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8">
              {event.description}
            </p>
            <div>
              <Button href="/quote" variant="secondary" size="lg">
                Get Free Quote
              </Button>
            </div>
          </Container>
        </div>
      </Section>

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
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <Quote className="w-12 h-12 text-brand-accent/20 mb-6" />

              <div className="flex items-center gap-1 mb-6">
                {[...Array(event.testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                &ldquo;{event.testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm',
                    event.testimonial.color
                  )}
                >
                  {event.testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-brand-primary">
                    {event.testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {event.testimonial.event} • {event.testimonial.location}
                  </p>
                </div>
              </div>
            </div>
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
      <Section background="dark" spacing="lg">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Ready to Plan Your {event.title} Event?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              With over 17 years of experience and 600+ events annually, we have the expertise to make your {event.title.toLowerCase()} event unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/quote" variant="secondary" size="lg">
                Get Free Quote
              </Button>
              <Button
                href="tel:877-345-7500"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-primary"
              >
                Call 877-345-7500
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
