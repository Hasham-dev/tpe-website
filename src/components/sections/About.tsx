import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

const highlights = [
  'Founded in 2007 with a vision for full-service events',
  'Own and operate all services in-house',
  'Nearly 200 dedicated employees',
  '600+ events produced annually',
  'Complete accountability with one point of contact',
]

export function About() {
  return (
    <Section id="about" background="white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/images/about/story.jpg"
                alt="The Perfect Event team"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-brand-primary text-white p-6 rounded-xl shadow-xl">
              <div className="text-4xl font-bold text-brand-accent-light">17+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <SectionHeader
              subtitle="About Us"
              title="Our Story of Success"
              align="left"
              className="mb-8"
            />

            <div className="prose prose-lg text-gray-600 mb-8">
              <p>
                An event company that combines meticulous planning with awe-inspiring design and concept...
                and it <strong>OWNS</strong> all of the services and equipment necessary for the event itself.
              </p>
              <p>
                Mix it all together and the end result is <strong>The Perfect Event</strong>. Founded in 2007,
                the company was designed to be a true One Stop Shop for all of its clients. Tireless effort
                and sensational growth have resulted in the realization of this vision.
              </p>
            </div>

            {/* Highlights List */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <Button href="/#team">
              Meet Our Team
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
