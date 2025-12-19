import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { TEAM_MEMBERS } from '@/lib/constants'

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
  'Chief of Pawperations', // Mascot at the end
]

const SORTED_TEAM = [...TEAM_MEMBERS].sort((a, b) => {
  const orderA = positionOrder.indexOf(a.position)
  const orderB = positionOrder.indexOf(b.position)
  // If position not found, put at end
  const indexA = orderA === -1 ? 999 : orderA
  const indexB = orderB === -1 ? 999 : orderB
  return indexA - indexB
})

export function Team() {
  return (
    <Section id="team" background="cream">
      <Container>
        <SectionHeader
          subtitle="Meet the"
          title="Team"
          description="Our dedicated professionals bring passion, expertise, and creativity to every event we produce."
        />

        {/* Team Grid - All members with identical large styling */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {SORTED_TEAM.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        {/* Extended team note */}
        <p className="text-center text-brand-primary-muted text-base mt-16 max-w-xl mx-auto">
          Backed by <span className="font-semibold text-brand-primary">200+</span> talented event staff, DJs, photographers, and production crew ready to make your event perfect.
        </p>
      </Container>
    </Section>
  )
}

interface MemberProps {
  member: typeof TEAM_MEMBERS[0]
}

// Unified Team Card - Large style for everyone
function TeamCard({ member }: MemberProps) {
  return (
    <div className="group text-center w-40 md:w-48">
      {/* Photo - Large with ring accent */}
      <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto mb-5 rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 ring-4 ring-brand-accent/20 group-hover:ring-brand-accent/40">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <h4 className="font-serif text-lg md:text-xl font-medium text-brand-primary mb-1">
        {member.name}
      </h4>
      <p className="text-brand-accent font-medium text-sm md:text-base leading-snug max-w-[180px] mx-auto">
        {member.position}
      </p>
    </div>
  )
}
