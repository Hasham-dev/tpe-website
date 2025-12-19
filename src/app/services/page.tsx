import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SERVICES_DATA } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Our Services - Full-Service Event Production',
  description: 'Discover our comprehensive event services: coordination, venue booking, entertainment, lighting, sound, media production, transportation, security, and finishing touches. Everything under one roof.',
  openGraph: {
    title: 'Our Services - Full-Service Event Production | The Perfect Event',
    description: 'Comprehensive event production services including coordination, entertainment, AV, transportation, and more. One company handles everything.',
    images: ['/images/services/coordination.jpg'],
  },
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="dark" spacing="md" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary opacity-90" />
        <Container className="relative z-10">
          <Breadcrumb
            items={[{ label: 'Services' }]}
            className="mb-8 text-white/80"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              Comprehensive Event Services
            </h1>
            <p className="text-xl text-white/90 mb-8">
              One company. Every service. From planning to production, we own it all so your event is perfect.
            </p>
            <Button href="/#contact" variant="secondary" size="lg">
              Get Free Quote
            </Button>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section background="white" spacing="lg">
        <Container>
          <SectionHeader
            subtitle="What We Offer"
            title="Our Services"
            description="We provide comprehensive event production services, all under one roof. No need to coordinate with multiple vendors - we handle everything."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center text-brand-accent font-semibold group-hover:text-brand-secondary transition-colors">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Choose Our Services */}
      <Section background="accent" spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary mb-6">
              Why Book Multiple Services With Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold text-brand-accent mb-3">01</div>
                <h3 className="text-xl font-bold text-brand-primary mb-2">One Point of Contact</h3>
                <p className="text-gray-700">
                  No juggling multiple vendors. One coordinator manages everything seamlessly.
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-accent mb-3">02</div>
                <h3 className="text-xl font-bold text-brand-primary mb-2">Cost Savings</h3>
                <p className="text-gray-700">
                  Bundle services for better pricing. We own our equipment, so you save money.
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-accent mb-3">03</div>
                <h3 className="text-xl font-bold text-brand-primary mb-2">Perfect Integration</h3>
                <p className="text-gray-700">
                  Our teams work together daily. Everything integrates perfectly on your event day.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="dark" spacing="md">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Ready to Start Planning?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Tell us about your event and receive a personalized proposal within 24-48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/#contact" variant="secondary" size="lg">
                Get Free Quote
              </Button>
              <Button href="tel:877-345-7500" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-primary">
                Call 877-345-7500
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
