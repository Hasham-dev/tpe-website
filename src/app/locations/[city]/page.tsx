import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, Mail, CheckCircle2, Star, ArrowRight, HelpCircle } from 'lucide-react'
import { getLocationBySlug, getAllLocationSlugs, LOCATIONS } from '@/lib/locations'
import { SERVICES } from '@/lib/constants'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Section, SectionHeader } from '@/components/ui/Section'
import { FAQSchema } from '@/components/seo/StructuredData'

interface LocationPageProps {
  params: {
    city: string
  }
}

export async function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({
    city: slug,
  }))
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = getLocationBySlug(params.city)

  if (!location) {
    return {
      title: 'Location Not Found',
    }
  }

  const title = `Event Planning in ${location.name} | The Perfect Event`
  const description = location.metaDescription

  return {
    title,
    description,
    keywords: location.keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      url: `https://theperfectevent.com/locations/${location.slug}`,
      siteName: 'The Perfect Event',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `The Perfect Event - ${location.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `/locations/${location.slug}`,
    },
  }
}

export default function LocationPage({ params }: LocationPageProps) {
  const location = getLocationBySlug(params.city)

  if (!location) {
    notFound()
  }

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://theperfectevent.com/locations/${location.slug}`,
    name: `The Perfect Event - ${location.name}`,
    description: location.description,
    url: `https://theperfectevent.com/locations/${location.slug}`,
    telephone: '877-345-7500',
    email: 'sales@theperfectevent.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressRegion: location.fullName.includes('CA') ? 'California' : 'Arizona',
      addressCountry: 'US',
    },
    geo: location.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    } : undefined,
    areaServed: location.nearbyAreas.map(area => ({
      '@type': 'City',
      name: area,
    })),
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-brand-primary text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-background.jpg"
            alt={`Event planning in ${location.name}`}
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/80 via-brand-primary/70 to-brand-primary" />

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-brand-secondary" />
              <span className="text-brand-secondary font-medium">{location.fullName}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Event Planning in <span className="text-brand-secondary">{location.name}</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              {location.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/#contact" size="lg" variant="accent">
                Get Your Free Quote
              </Button>
              <Button
                href={`tel:877-345-7500`}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-primary"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 877-345-7500
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Available */}
      <Section background="white">
        <Container>
          <SectionHeader
            subtitle="What We Offer"
            title={`Our Services in ${location.name}`}
            description="Comprehensive event production services tailored to your needs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{service.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 mb-3">{service.description}</p>
                  <div className="flex items-center text-brand-accent font-medium group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonial */}
      {location.testimonial && (
        <Section background="cream">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary mb-4">
                  What Our {location.name} Clients Say
                </h2>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(location.testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  &ldquo;{location.testimonial.text}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold ${location.testimonial.color}`}>
                    {location.testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-primary">
                      {location.testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {location.testimonial.event} • {location.testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Service Areas */}
      <Section background="cream">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              subtitle="Coverage Area"
              title={`We Serve All of ${location.name}`}
              description="Our team provides exceptional event services throughout the entire region."
            />

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {location.nearbyAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0" />
                    <span className="text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      {location.faqs && location.faqs.length > 0 && (
        <>
          <FAQSchema faqs={location.faqs} />
          <Section background="white">
            <Container>
              <div className="max-w-4xl mx-auto">
                <SectionHeader
                  subtitle="Common Questions"
                  title={`${location.name} Event Planning FAQs`}
                  description="Answers to frequently asked questions about our services in this area."
                />

                <div className="space-y-4">
                  {location.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-brand-cream rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <HelpCircle className="w-6 h-6 text-brand-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-brand-primary mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        </>
      )}

      {/* CTA Section */}
      <Section background="primary">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
              Ready to Plan Your Perfect Event in {location.name}?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Get a personalized quote for your event within 24-48 hours. No obligation, just expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/#contact" size="lg" variant="accent">
                Get Your Free Quote
              </Button>
              <Button
                href={`mailto:sales@theperfectevent.com`}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-primary"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Other Locations */}
      <Section background="white">
        <Container>
          <SectionHeader
            subtitle="Explore More"
            title="We Also Serve"
            description="Discover all our service areas across Southern California and beyond."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LOCATIONS.filter(loc => loc.slug !== location.slug).map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group bg-brand-cream rounded-xl p-6 text-center hover:bg-brand-accent hover:shadow-lg transition-all duration-300"
              >
                <MapPin className="w-8 h-8 text-brand-accent mx-auto mb-3 group-hover:text-white transition-colors" />
                <h3 className="font-semibold text-brand-primary group-hover:text-white transition-colors">
                  {loc.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 group-hover:text-white/80 transition-colors">
                  {loc.fullName}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
