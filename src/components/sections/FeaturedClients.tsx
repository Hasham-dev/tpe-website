import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

// Client data organized by category
const clients = {
  corporate: [
    { name: 'Google', logo: '/images/clients/google.png', hasLogo: true },
    { name: 'Nike', logo: '/images/clients/nike.png', hasLogo: true },
    { name: 'YouTube', logo: '/images/clients/youtube.png', hasLogo: true },
    { name: 'Lululemon', logo: '/images/clients/lululemon.png', hasLogo: true },
    { name: 'Chevron', logo: '/images/clients/chevron.png', hasLogo: false, color: '#0066B2' },
    { name: 'The Knot', logo: '/images/clients/the-knot.png', hasLogo: false, color: '#00B4C5' },
  ],
  university: [
    { name: 'UCLA', logo: '/images/clients/ucla.png', hasLogo: true },
    { name: 'USC', logo: '/images/clients/usc.png', hasLogo: true },
    { name: 'LMU', logo: '/images/clients/lmu.png', hasLogo: false, color: '#00345B' },
    { name: 'Pepperdine', logo: '/images/clients/pepperdine.png', hasLogo: false, color: '#00205B' },
    { name: 'San Diego State', logo: '/images/clients/sdsu.png', hasLogo: false, color: '#A6192E' },
    { name: 'Cal Poly', logo: '/images/clients/cal-poly.png', hasLogo: false, color: '#154734' },
  ],
  festival: [
    { name: 'Coachella', logo: '/images/clients/coachella.png', hasLogo: false, color: '#000000' },
    { name: 'EDC', logo: '/images/clients/edc.png', hasLogo: false, color: '#FF6B00' },
    { name: 'Stagecoach', logo: '/images/clients/stagecoach.png', hasLogo: false, color: '#8B4513' },
  ],
}

// Logo card component for consistent styling
function ClientCard({ client }: { client: { name: string; logo: string; hasLogo: boolean; color?: string } }) {
  return (
    <div
      className="aspect-[3/2] flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 transition-all duration-300 hover:shadow-md hover:scale-105 grayscale hover:grayscale-0 opacity-80 hover:opacity-100"
      title={client.name}
    >
      {client.hasLogo ? (
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          width={120}
          height={60}
          className="object-contain max-h-10 sm:max-h-12 w-auto"
          loading="lazy"
        />
      ) : (
        // Text-based placeholder for logos that need to be added
        <span
          className="text-sm sm:text-base font-bold tracking-wide text-center"
          style={{ color: client.color }}
        >
          {client.name}
        </span>
      )}
    </div>
  )
}

export function FeaturedClients() {
  return (
    <Section id="clients" background="gray" spacing="lg">
      <Container>
        <SectionHeader
          subtitle="Trusted By"
          title="Trusted by Industry Leaders"
          description="From Fortune 500 companies to world-renowned festivals and prestigious universities, we deliver unforgettable events for the most discerning clients."
        />

        <div className="space-y-12">
          {/* Corporate & Media */}
          <div>
            <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-6 font-medium">
              Corporate & Media
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {clients.corporate.map((client) => (
                <ClientCard key={client.name} client={client} />
              ))}
            </div>
          </div>

          {/* Universities */}
          <div>
            <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-6 font-medium">
              Universities
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {clients.university.map((client) => (
                <ClientCard key={client.name} client={client} />
              ))}
            </div>
          </div>

          {/* Festivals & Events */}
          <div>
            <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-6 font-medium">
              Festivals & Events
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-xl mx-auto">
              {clients.festival.map((client) => (
                <ClientCard key={client.name} client={client} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-4xl font-bold text-brand-primary mb-2">
            200+
          </p>
          <p className="text-gray-500">
            Successful events delivered annually
          </p>
        </div>
      </Container>
    </Section>
  )
}
