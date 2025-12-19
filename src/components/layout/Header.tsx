'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, Mail, ChevronDown, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import { LOCATIONS } from '@/lib/locations'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLocationsOpen, setIsLocationsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLocationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-brand-primary text-white py-2">
        <Container>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 hover:text-brand-accent-light transition-colors">
                <Phone size={14} />
                {SITE_CONFIG.phone}
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-brand-accent-light transition-colors">
                <Mail size={14} />
                {SITE_CONFIG.email}
              </a>
            </div>
            <div className="text-gray-300">
              {SITE_CONFIG.locations.slice(0, 4).join(' | ')}
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-4'
        )}
      >
        <Container>
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="The Perfect Event"
                width={180}
                height={57}
                className={cn(
                  'transition-all duration-300',
                  isScrolled ? 'h-12 w-auto' : 'h-14 w-auto'
                )}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-5 flex-nowrap">
              {NAV_LINKS.slice(0, -1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-brand-primary hover:text-brand-accent transition-colors animated-underline whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}

              {/* Locations Dropdown */}
              <div
                className="relative group"
                ref={dropdownRef}
                onMouseEnter={() => setIsLocationsOpen(true)}
                onMouseLeave={() => setIsLocationsOpen(false)}
              >
                <button
                  className="!flex items-center gap-1 text-sm font-medium text-brand-primary hover:text-brand-accent transition-colors animated-underline whitespace-nowrap"
                >
                  Locations
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-200 flex-shrink-0",
                    isLocationsOpen && "rotate-180"
                  )} />
                </button>

                {/* Dropdown Menu */}
                <div className={cn(
                  "absolute top-full right-0 pt-2 w-64 z-50 transition-all duration-200",
                  isLocationsOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}>
                  <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    {LOCATIONS.map((location) => (
                      <Link
                        key={location.slug}
                        href={`/locations/${location.slug}`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-brand-cream transition-colors"
                        onClick={() => setIsLocationsOpen(false)}
                      >
                        <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-brand-primary">{location.name}</div>
                          <div className="text-xs text-gray-500">{location.fullName}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Button href="/quote" size="sm">
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden p-2 text-brand-primary"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 xl:hidden transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-[300px] bg-white z-50 xl:hidden transform transition-transform duration-300 shadow-2xl',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-serif text-xl">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-brand-primary"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-6 py-3 text-lg text-brand-primary hover:bg-brand-cream transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Locations Section in Mobile Menu */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="px-6 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Service Areas
              </div>
              {LOCATIONS.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="flex items-center gap-3 px-6 py-2 text-base text-brand-primary hover:bg-brand-cream transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  {location.name}
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t space-y-3">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-3 text-brand-primary"
            >
              <Phone size={18} />
              {SITE_CONFIG.phone}
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-3 text-brand-primary"
            >
              <Mail size={18} />
              {SITE_CONFIG.email}
            </a>
            <Button href="/quote" className="w-full mt-4">
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
