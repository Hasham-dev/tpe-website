'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronDown, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SITE_CONFIG, STATS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    // Try to play video on mount and when tab becomes visible
    const attemptPlay = () => {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setVideoLoaded(true)
        }).catch(() => {
          // Autoplay blocked - video will show poster
        })
      }
    }

    // Attempt play after a short delay to ensure video is ready
    const timer = setTimeout(attemptPlay, 100)

    // Handle visibility change (tab switching)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        attemptPlay()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  const scrollToNext = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleVideoLoad = () => {
    setVideoLoaded(true)
    // Ensure video plays (some browsers need explicit play call)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, video will show but not play
      })
    }
  }

  const handleVideoError = () => {
    setVideoError(true)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background (Desktop) - with fallback */}
      <div className="absolute inset-0 hidden md:block">
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
              videoLoaded ? "opacity-100" : "opacity-0"
            )}
            poster="/images/hero-poster.jpg"
            onCanPlay={handleVideoLoad}
            onError={handleVideoError}
          >
            <source src="/videos/hero-event.mp4" type="video/mp4" />
          </video>
        )}
        {/* Fallback Image (shown while video loads or if video fails) */}
        <Image
          src="/images/hero-poster.jpg"
          alt="Event production"
          fill
          priority
          className={cn(
            "object-cover transition-opacity duration-1000",
            videoLoaded && !videoError ? "opacity-0" : "opacity-100"
          )}
        />
      </div>

      {/* Image Background (Mobile) */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/hero-mobile.jpg"
          alt="Event production"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Animated particles/sparkles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-accent-light/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-brand-accent-light/20 rounded-full animate-pulse delay-700" />
      </div>

      {/* Content */}
      <Container className="relative z-10 text-center text-white pt-20">
        <div className={cn(
          'transform transition-all duration-1000',
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        )}>
          {/* Subtitle */}
          <p className="text-brand-accent-light font-script text-2xl md:text-3xl mb-4">
            Welcome to
          </p>

          {/* Main Heading - using consistent typography */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 tracking-tight">
            Southern California&apos;s Premier
            <br />
            <span className="text-brand-accent-light">Full-Service Event</span>
            <br />
            Production Company
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            {SITE_CONFIG.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Button href="/quote" size="lg" variant="accent">
              Get Your Free Quote
            </Button>
            <Button href="/portfolio" size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-primary">
              View Our Work
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-brand-accent-light">
                  {stat.label === 'Star Rating' ? (
                    <span className="flex items-center justify-center gap-1">
                      {stat.value}
                      <Star className="w-6 h-6 fill-brand-accent-light text-brand-accent-light" />
                    </span>
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce cursor-pointer z-10 hover:text-brand-accent-light transition-colors"
        aria-label="Scroll to services"
      >
        <ChevronDown size={40} />
      </button>
    </section>
  )
}
