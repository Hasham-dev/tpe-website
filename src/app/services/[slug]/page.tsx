import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SERVICES_DATA, getServiceBySlug, getRelatedServices } from '@/lib/services'

interface ServicePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.title} - Event Services`,
    description: service.longDescription,
    openGraph: {
      title: `${service.title} | The Perfect Event`,
      description: service.description,
      images: [service.image],
    },
    keywords: [
      service.title.toLowerCase(),
      'event planning',
      'Southern California',
      'event production',
      'full service events',
    ],
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  const relatedServices = getRelatedServices(service.id, 3)

  return (
    <>
      {/* Hero Section */}
      <Section background="default" spacing="none" className="relative">
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
          <Container className="relative h-full flex flex-col justify-center">
            <Breadcrumb
              items={[
                { label: 'Services', href: '/services' },
                { label: service.title },
              ]}
              className="mb-6 text-white/80"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 max-w-3xl">
              {service.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {service.description}
            </p>
          </Container>
        </div>
      </Section>

      {/* Main Content */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-serif font-bold text-brand-primary mb-6">
                  About This Service
                </h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  {service.longDescription}
                </p>

                <h3 className="text-2xl font-serif font-bold text-brand-primary mb-6">
                  What&apos;s Included
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-brand-accent flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing Hint */}
                <div className="bg-brand-accent/10 border-l-4 border-brand-accent p-6 rounded-r-lg mb-12">
                  <h3 className="text-xl font-bold text-brand-primary mb-2">
                    Pricing Information
                  </h3>
                  <p className="text-gray-700">{service.pricingHint}</p>
                  <Button href="/quote" variant="accent" size="sm" className="mt-4">
                    Get Custom Quote
                  </Button>
                </div>

                {/* FAQs */}
                <h3 className="text-2xl font-serif font-bold text-brand-primary mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-6">
                  {service.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                      <h4 className="text-lg font-bold text-brand-primary mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-brand-primary text-white p-8 rounded-xl mb-8 sticky top-24">
                <MessageCircle className="w-12 h-12 mb-4 text-brand-secondary" />
                <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
                <p className="text-white/90 mb-6">
                  Tell us about your event and receive a personalized proposal within 24-48 hours.
                </p>
                <Button href="/quote" variant="secondary" size="lg" className="w-full mb-4">
                  Get Free Quote
                </Button>
                <Button
                  href="tel:877-345-7500"
                  variant="outline"
                  size="lg"
                  className="w-full border-white text-white hover:bg-white hover:text-brand-primary"
                >
                  Call 877-345-7500
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <Section background="accent" spacing="lg">
          <Container>
            <h2 className="text-3xl font-serif font-bold text-brand-primary mb-8 text-center">
              Related Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.id}
                  href={`/services/${relatedService.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedService.image}
                      alt={relatedService.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-serif font-bold text-white">
                        {relatedService.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedService.description}
                    </p>
                    <div className="flex items-center text-brand-accent font-semibold text-sm group-hover:text-brand-secondary transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Final CTA */}
      <Section background="dark" spacing="md">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Let&apos;s Create Something Perfect
            </h2>
            <p className="text-xl text-white/90 mb-8">
              With over 17 years of experience and 600+ events annually, we have the expertise to make your vision a reality.
            </p>
            <Button href="/quote" variant="secondary" size="lg">
              Start Planning Today
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
