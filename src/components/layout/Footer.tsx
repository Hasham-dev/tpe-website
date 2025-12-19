import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SITE_CONFIG, NAV_LINKS, SERVICES } from '@/lib/constants'
import { LOCATIONS } from '@/lib/locations'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-primary text-white">
      {/* Main Footer */}
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/logo-white.png"
                  alt="The Perfect Event"
                  width={200}
                  height={64}
                  className="h-16 w-auto"
                />
              </Link>
              <p className="text-gray-300 mb-6">
                {SITE_CONFIG.description}
              </p>
              <div className="flex gap-4">
                <a
                  href={SITE_CONFIG.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-brand-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={SITE_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-brand-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={SITE_CONFIG.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-brand-accent transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-brand-accent-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Our Services</h3>
              <ul className="space-y-3">
                {SERVICES.slice(0, 6).map((service) => (
                  <li key={service.id}>
                    <Link
                      href={service.href}
                      className="text-gray-300 hover:text-brand-accent-light transition-colors"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Service Areas</h3>
              <ul className="space-y-3">
                {LOCATIONS.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/locations/${location.slug}`}
                      className="text-gray-300 hover:text-brand-accent-light transition-colors flex items-center gap-2"
                    >
                      <MapPin size={16} className="flex-shrink-0" />
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="flex items-start gap-3 text-gray-300 hover:text-brand-accent-light transition-colors"
                  >
                    <Phone size={20} className="mt-0.5 flex-shrink-0" />
                    {SITE_CONFIG.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-start gap-3 text-gray-300 hover:text-brand-accent-light transition-colors"
                  >
                    <Mail size={20} className="mt-0.5 flex-shrink-0" />
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <MapPin size={20} className="mt-0.5 flex-shrink-0" />
                  {SITE_CONFIG.address}
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>&copy; {currentYear} The Perfect Event. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
