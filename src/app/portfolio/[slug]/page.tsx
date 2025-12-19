import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MapPin, Users, Calendar, CheckCircle2, Quote } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { ImageGallery } from '@/components/ui/ImageGallery'
import { caseStudies, getCaseStudy } from '@/lib/portfolio'

interface CaseStudyPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = getCaseStudy(params.slug)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return {
    title: `${caseStudy.title} | Portfolio | The Perfect Event`,
    description: caseStudy.description,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.description,
      images: [caseStudy.images[0]],
      type: 'article',
    },
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = getCaseStudy(params.slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={caseStudy.images[0]}
          alt={caseStudy.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <Container className="relative z-10 text-center text-white">
          <div className="inline-block bg-brand-secondary text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
            {caseStudy.eventType}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            {caseStudy.title}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {caseStudy.description}
          </p>
        </Container>
      </section>

      {/* Event Overview */}
      <Section background="default">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Users className="w-12 h-12 text-brand-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-brand-primary mb-1">
                {caseStudy.guestCount}
              </div>
              <div className="text-gray-600">Guests</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <MapPin className="w-12 h-12 text-brand-primary mx-auto mb-3" />
              <div className="text-xl font-bold text-brand-primary mb-1">
                {caseStudy.location}
              </div>
              <div className="text-gray-600">Location</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Calendar className="w-12 h-12 text-brand-primary mx-auto mb-3" />
              <div className="text-xl font-bold text-brand-primary mb-1">
                {caseStudy.date}
              </div>
              <div className="text-gray-600">Date</div>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4 text-brand-primary">
                The Challenge
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {caseStudy.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4 text-brand-primary">
                Our Solution
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Services Provided */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Services Provided
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseStudy.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <CheckCircle2 className="w-6 h-6 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Photo Gallery */}
      <Section background="cream">
        <Container>
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">
            Event Gallery
          </h2>
          <ImageGallery images={caseStudy.images} alt={caseStudy.title} />
        </Container>
      </Section>

      {/* Client Testimonial */}
      <Section background="default">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Quote className="w-16 h-16 text-brand-secondary/20 mb-6 mx-auto" />
            <blockquote className="text-center">
              <p className="text-2xl md:text-3xl font-serif text-gray-800 mb-8 leading-relaxed italic">
                &quot;{caseStudy.testimonial.quote}&quot;
              </p>
              <footer className="text-gray-600">
                <div className="font-bold text-brand-primary text-lg">
                  {caseStudy.testimonial.author}
                </div>
                <div className="text-sm">{caseStudy.testimonial.role}</div>
              </footer>
            </blockquote>
          </div>
        </Container>
      </Section>

      {/* Results (if available) */}
      {caseStudy.results && caseStudy.results.length > 0 && (
        <Section background="cream">
          <Container>
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Results & Impact
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {caseStudy.results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-6 bg-white rounded-lg shadow-sm"
                >
                  <CheckCircle2 className="w-6 h-6 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">{result}</span>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section background="default">
        <Container>
          <div className="text-center max-w-3xl mx-auto bg-gradient-to-br from-brand-primary to-brand-primary/90 text-white rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Plan Your Perfect Event?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Let&apos;s create an unforgettable experience together. Our team is ready to bring your vision to life with the same excellence and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/#contact"
                variant="accent"
                size="lg"
                className="bg-brand-secondary hover:bg-brand-secondary/90"
              >
                Get Your Free Quote
              </Button>
              <Button
                href="/portfolio"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-primary"
              >
                View More Projects
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
