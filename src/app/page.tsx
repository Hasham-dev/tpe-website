import { Hero } from '@/components/sections/Hero'
import { StatsCounter } from '@/components/sections/StatsCounter'
import { ProblemSolution } from '@/components/sections/ProblemSolution'
import { Services } from '@/components/sections/Services'
import { About } from '@/components/sections/About'
import { EventTypes } from '@/components/sections/EventTypes'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { CTA } from '@/components/sections/CTA'
import { Testimonials } from '@/components/sections/Testimonials'
import { FeaturedClients } from '@/components/sections/FeaturedClients'
import { UpcomingEvents } from '@/components/sections/UpcomingEvents'
import { Gallery } from '@/components/sections/Gallery'
import { Team } from '@/components/sections/Team'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'
import { FAQSchema } from '@/components/seo/StructuredData'
import { FAQS } from '@/lib/constants'

export default function HomePage() {
  return (
    <>
      {/* FAQ Schema for SEO */}
      <FAQSchema faqs={FAQS} />

      {/* Hero with video background */}
      <Hero />

      {/* Animated stats counter */}
      <StatsCounter />

      {/* Problem vs Solution - why one company matters */}
      <ProblemSolution />

      {/* 9 Services grid */}
      <Services />

      {/* Company story */}
      <About />

      {/* 6 Event types */}
      <EventTypes />

      {/* 5-step process */}
      <HowItWorks />

      {/* Why choose us - 6 features */}
      <WhyChooseUs />

      {/* Pricing CTA */}
      <CTA />

      {/* Client testimonials carousel */}
      <Testimonials />

      {/* Client logos */}
      <FeaturedClients />

      {/* Catalina Wine Mixer, Buccaneer Days */}
      <UpcomingEvents />

      {/* Photo gallery with filters */}
      <Gallery />

      {/* Key team members */}
      <Team />

      {/* FAQ accordion */}
      <FAQ />

      {/* Contact form */}
      <Contact />
    </>
  )
}
