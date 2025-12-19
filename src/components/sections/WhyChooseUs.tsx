import { Shield, Users, Award, Clock, DollarSign, Heart } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

const features = [
  {
    icon: Shield,
    title: 'Full Liability Insurance',
    description: 'Complete coverage for your peace of mind. We meet or exceed all venue requirements.',
  },
  {
    icon: Users,
    title: '200+ Professional Staff',
    description: 'Experienced coordinators, DJs, photographers, and technicians ready for your event.',
  },
  {
    icon: Award,
    title: 'Industry Leaders',
    description: 'The largest college event company in the country with 17+ years of excellence.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Your dedicated coordinator is always available before and during your event.',
  },
  {
    icon: DollarSign,
    title: 'No Hidden Fees',
    description: 'Transparent pricing with everything included. What you see is what you get.',
  },
  {
    icon: Heart,
    title: 'Passion for Perfection',
    description: 'We treat every event like our own, ensuring unforgettable experiences.',
  },
]

export function WhyChooseUs() {
  return (
    <Section id="features" background="default">
      <Container>
        <SectionHeader
          subtitle="Our Promise"
          title="Why Choose The Perfect Event"
          description="We don&apos;t just plan events – we create unforgettable experiences backed by unmatched expertise and dedication."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow group"
            >
              <div className="w-14 h-14 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                <feature.icon className="w-7 h-7 text-brand-accent group-hover:text-white" />
              </div>
              <h3 className="text-xl font-serif text-brand-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
