import Image from 'next/image'
import { CheckCircle, Clock, Award, ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function CTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image with lighter gradient overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta-background.jpg"
          alt="Elegant event setting"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay - lighter to show more of the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/85 to-brand-primary/75" />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Main Content */}
          <div className="text-white text-center lg:text-left">
            {/* Badge */}
            <span className="inline-block px-4 py-1.5 bg-brand-accent/20 text-brand-accent rounded-full text-sm font-medium mb-6">
              Free Consultation
            </span>

            {/* Headline - A/B testable with data attribute */}
            <h2
              data-variant="cta-headline-b"
              className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-tight"
            >
              Ready to Create Something Unforgettable?
            </h2>

            {/* Supporting copy */}
            <p className="text-lg text-gray-200 mb-8 max-w-xl mx-auto lg:mx-0">
              From intimate gatherings to large-scale productions—get a custom proposal
              tailored to your vision within 24 hours.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mb-8 text-sm text-gray-300">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0" />
                No Obligation
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-accent flex-shrink-0" />
                24-Hour Response
              </span>
              <span className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-accent flex-shrink-0" />
                200+ Events Annually
              </span>
            </div>

            {/* CTAs with clear hierarchy */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button
                href="/#contact"
                size="lg"
                variant="accent"
                className="shadow-lg group"
              >
                Get Your Free Quote
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                href="tel:877-345-7500"
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-primary"
              >
                <Phone className="mr-2 w-5 h-5" />
                877-345-7500
              </Button>
            </div>
          </div>

          {/* Right: Social Proof Card (desktop only) */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              {/* Header with avatars */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-brand-accent/30 border-2 border-white/50 flex items-center justify-center text-white text-xs font-bold">
                    G
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-accent/50 border-2 border-white/50 flex items-center justify-center text-white text-xs font-bold">
                    N
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-accent/70 border-2 border-white/50 flex items-center justify-center text-white text-xs font-bold">
                    U
                  </div>
                </div>
                <div className="text-white">
                  <p className="font-semibold">Join 200+ Happy Clients</p>
                  <p className="text-sm text-gray-300">From Fortune 500 to intimate celebrations</p>
                </div>
              </div>

              {/* Mini testimonial */}
              <blockquote className="text-gray-200 italic border-l-2 border-brand-accent pl-4">
                &ldquo;TPE made our corporate event absolutely seamless. Their attention to detail
                and professionalism exceeded all expectations.&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-gray-400">
                — Marketing Director, Fortune 500 Company
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
