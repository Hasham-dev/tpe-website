import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { QuoteWizard } from '@/components/ui/QuoteWizard'

export const metadata: Metadata = {
  title: 'Get Your Free Event Quote in 24 Hours | The Perfect Event',
  description: 'Request a free, no-obligation quote for your wedding, corporate event, or celebration. Transparent pricing with detailed proposals delivered within 24 hours. Serving all of Southern California.',
  keywords: [
    'event quote',
    'wedding planning quote',
    'corporate event pricing',
    'event cost estimate',
    'free event consultation',
  ],
  openGraph: {
    title: 'Get Your Free Event Quote | The Perfect Event',
    description: 'Request a free quote for your event. Detailed proposals within 24 hours, no obligation.',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Your Free Event Quote | The Perfect Event',
    description: 'Request a free quote for your event. Response within 24 hours.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/quote',
  },
}

export default function QuotePage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="dark" spacing="md">
        <Container size="md">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Get Your Custom Quote
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Answer a few quick questions and receive a personalized proposal for your event within 24 hours.
            </p>
          </div>
        </Container>
      </Section>

      {/* Quote Wizard Section */}
      <Section background="white" spacing="lg">
        <Container>
          <QuoteWizard />
        </Container>
      </Section>

      {/* Why Choose Us Section */}
      <Section background="accent" spacing="md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-brand-primary mb-2">
                No Obligation
              </h3>
              <p className="text-gray-600">
                Get a detailed quote with no commitment required. We are here to help you make the best decision.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-brand-primary mb-2">
                24-Hour Response
              </h3>
              <p className="text-gray-600">
                We respond to all quote requests within 24 hours with a comprehensive, personalized proposal.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-brand-primary mb-2">
                Transparent Pricing
              </h3>
              <p className="text-gray-600">
                All our quotes include detailed breakdowns with no hidden fees. What you see is what you get.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Signals */}
      <Section background="white" spacing="md">
        <Container>
          <div className="bg-brand-cream rounded-2xl p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif text-brand-primary mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-gray-600 mb-8">
                Join Google, Nike, UCLA, USC, and hundreds of other clients who trust us with their most important events.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-4xl font-bold text-brand-accent mb-1">600+</p>
                  <p className="text-sm text-gray-600">Events Per Year</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-brand-accent mb-1">200+</p>
                  <p className="text-sm text-gray-600">Team Members</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-brand-accent mb-1">17+</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-brand-accent mb-1">4.9</p>
                  <p className="text-sm text-gray-600">Star Rating</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
