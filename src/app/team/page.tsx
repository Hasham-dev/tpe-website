import type { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { TEAM_MEMBERS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Our Team | The Perfect Event',
  description: 'Meet the dedicated professionals behind The Perfect Event. Our experienced team brings passion, expertise, and creativity to every event we produce.',
  openGraph: {
    title: 'Our Team | The Perfect Event',
    description: 'Meet the dedicated professionals behind The Perfect Event. Our experienced team brings passion, expertise, and creativity to every event we produce.',
    images: ['/images/og-image.jpg'],
  },
}

// Sort team members by hierarchy
const positionOrder = [
  'CEO & Founder',
  'Director of Sales & Business Development',
  'Director of Operations',
  'Director of Entertainment',
  'Media & Tech Director',
  'Production Director',
  'Marketing Director',
  'Operations Manager',
  'Event Director',
  'Assistant Event Director',
  'Chief of Pawperations',
]

const SORTED_TEAM = [...TEAM_MEMBERS].sort((a, b) => {
  const orderA = positionOrder.indexOf(a.position)
  const orderB = positionOrder.indexOf(b.position)
  const indexA = orderA === -1 ? 999 : orderA
  const indexB = orderB === -1 ? 999 : orderB
  return indexA - indexB
})

export default function TeamPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="dark" spacing="md">
        <Container size="md">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Meet Our Team
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Our dedicated professionals bring passion, expertise, and creativity to every event we produce. Get to know the people who make your perfect events happen.
            </p>
          </div>
        </Container>
      </Section>

      {/* Team Grid */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SORTED_TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-brand-cream rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Photo */}
                <div className="relative aspect-square">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h2 className="font-serif text-2xl font-medium text-brand-primary mb-1">
                    {member.name}
                  </h2>
                  <p className="text-brand-accent font-semibold mb-4">
                    {member.position}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Extended team note */}
          <div className="mt-16 text-center">
            <div className="bg-brand-cream rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif text-brand-primary mb-4">
                And Many More
              </h3>
              <p className="text-gray-600">
                Backed by <span className="font-semibold text-brand-accent">200+</span> talented event staff, DJs, photographers, videographers, and production crew ready to make your event perfect.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="accent" spacing="md">
        <Container size="sm">
          <div className="text-center">
            <h2 className="text-3xl font-serif text-brand-primary mb-4">
              Ready to Work With Us?
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Let our experienced team bring your event vision to life. Contact us today to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-3 bg-brand-accent text-white rounded-sm hover:bg-brand-secondary transition-colors font-semibold uppercase tracking-wider"
              >
                Get a Quote
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-brand-primary text-brand-primary rounded-sm hover:bg-brand-primary hover:text-white transition-colors font-semibold uppercase tracking-wider"
              >
                Contact Us
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
