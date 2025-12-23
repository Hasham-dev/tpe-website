import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Contact } from '@/components/sections/Contact'
import { SITE_CONFIG } from '@/lib/constants'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | Get Your Free Event Quote | The Perfect Event',
  description: 'Contact The Perfect Event at 877-345-7500. Free consultations for weddings, corporate events, and festivals. Serving Los Angeles, Orange County, San Diego & beyond. Response within 24 hours.',
  keywords: [
    'contact event planner',
    'event planning consultation',
    'wedding planner contact',
    'corporate event quote',
    'Los Angeles event company',
  ],
  openGraph: {
    title: 'Contact The Perfect Event | Free Consultation',
    description: 'Get in touch for a free event consultation. Call 877-345-7500 or fill out our form. Response within 24 hours.',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact The Perfect Event | Free Consultation',
    description: 'Get in touch for a free event consultation. Call 877-345-7500.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="dark" spacing="md">
        <Container size="md">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Let&apos;s Create Something Amazing
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to bring your event vision to life? Get in touch with our team and let&apos;s start planning your perfect event.
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Information Cards */}
      <Section background="white" spacing="md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Phone */}
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="bg-brand-cream rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="w-14 h-14 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-brand-primary mb-2">Call Us</h3>
              <p className="text-brand-accent font-medium">{SITE_CONFIG.phone}</p>
              <p className="text-sm text-gray-600 mt-2">Mon-Fri: 9am-6pm PST</p>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="bg-brand-cream rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="w-14 h-14 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-brand-primary mb-2">Email Us</h3>
              <p className="text-brand-accent font-medium text-sm break-all">{SITE_CONFIG.email}</p>
              <p className="text-sm text-gray-600 mt-2">Response within 24 hours</p>
            </a>

            {/* Office */}
            <a
              href="https://maps.google.com/?q=3133+E+South+St,+Long+Beach,+CA+90805"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-cream rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="w-14 h-14 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-brand-primary mb-2">Visit Us</h3>
              <p className="text-sm text-gray-600">{SITE_CONFIG.address}</p>
              <p className="text-sm text-brand-accent mt-2">Get Directions</p>
            </a>

            {/* Office Hours */}
            <div className="bg-brand-cream rounded-xl p-6 text-center">
              <div className="w-14 h-14 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-brand-primary mb-2">Office Hours</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Monday - Friday</p>
                <p className="font-medium text-brand-accent">9:00 AM - 6:00 PM</p>
                <p className="mt-2">Saturday - Sunday</p>
                <p className="font-medium">By Appointment</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Section */}
      <Section background="white" spacing="none">
        <Container>
          <div className="rounded-2xl overflow-hidden shadow-xl mb-12">
            <div className="bg-gray-200 h-[400px] flex items-center justify-center relative">
              {/* Map Placeholder - Replace with actual Google Maps embed */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-brand-accent mx-auto mb-4" />
                  <p className="text-brand-primary font-semibold text-lg">
                    3133 E South St
                  </p>
                  <p className="text-gray-600">Long Beach, CA 90805</p>
                  <a
                    href="https://maps.google.com/?q=3133+E+South+St,+Long+Beach,+CA+90805"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-6 py-2 bg-brand-accent text-white rounded-sm hover:bg-brand-secondary transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              {/* Uncomment to use actual Google Maps embed
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.8976!2d-118.1633!3d33.8033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQ4JzEyLjAiTiAxMTjCsDA5JzQ3LjkiVw!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Perfect Event Office Location"
              />
              */}
            </div>
          </div>
        </Container>
      </Section>

      {/* Service Areas */}
      <Section background="accent" spacing="md">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-brand-primary mb-4">
              We Serve All of Southern California
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Based in Long Beach, we proudly serve events throughout Southern California and beyond
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {SITE_CONFIG.locations.map((location) => (
              <div
                key={location}
                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-medium text-brand-primary">{location}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-6 text-sm">
            We also travel nationwide for the right opportunity
          </p>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Contact />

      {/* FAQ Teaser */}
      <Section background="white" spacing="md">
        <Container size="sm">
          <div className="bg-brand-cream rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-serif text-brand-primary mb-4">
              Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Check out our frequently asked questions or reach out to us directly. We&apos;re here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#faq"
                className="inline-flex items-center justify-center px-8 py-3 bg-brand-accent text-white rounded-sm hover:bg-brand-secondary transition-colors font-semibold uppercase tracking-wider"
              >
                View FAQs
              </a>
              <a
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-brand-primary text-brand-primary rounded-sm hover:bg-brand-primary hover:text-white transition-colors font-semibold uppercase tracking-wider"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
