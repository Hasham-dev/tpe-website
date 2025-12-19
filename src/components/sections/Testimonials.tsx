'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    name: 'Sarah & Michael T.',
    initials: 'S&M',
    event: 'Wedding',
    location: 'Orange County',
    color: 'bg-rose-500',
    rating: 5,
    text: "The Perfect Event truly lived up to their name. From our first meeting to the last dance, every detail was handled with care and precision. Our wedding day was absolutely magical!",
  },
  {
    id: 2,
    name: 'Jennifer M.',
    initials: 'JM',
    event: 'Corporate Gala',
    location: 'Los Angeles',
    color: 'bg-blue-500',
    rating: 5,
    text: "We've worked with many event companies, but The Perfect Event stands out. Their professionalism and ability to handle everything in-house made our annual gala our most successful yet.",
  },
  {
    id: 3,
    name: 'UCLA Student Events',
    initials: 'UCLA',
    event: 'University Festival',
    location: 'Westwood',
    color: 'bg-sky-600',
    rating: 5,
    text: "The Perfect Event has been our go-to partner for years. They understand the unique needs of university events and always deliver beyond expectations.",
  },
  {
    id: 4,
    name: 'David & Lisa C.',
    initials: 'D&L',
    event: 'Anniversary Party',
    location: 'San Diego',
    color: 'bg-emerald-500',
    rating: 5,
    text: "Our 25th anniversary party was everything we dreamed of and more. The coordination, the entertainment, the lighting - everything was perfect!",
  },
  {
    id: 5,
    name: 'USC Greek Life',
    initials: 'USC',
    event: 'Formal Event',
    location: 'Downtown LA',
    color: 'bg-red-700',
    rating: 5,
    text: "Best event company we have ever worked with. They handle everything from A to Z and make our job so easy. The students always have an amazing time!",
  },
  {
    id: 6,
    name: 'Amanda K.',
    initials: 'AK',
    event: 'Quinceañera',
    location: 'Long Beach',
    color: 'bg-purple-500',
    rating: 5,
    text: "They made my daughter's quinceañera absolutely perfect. The DJ was amazing, the lighting was beautiful, and the photo booth was a huge hit!",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <Section id="testimonials" background="accent">
      <Container>
        <SectionHeader
          subtitle="What People Say"
          title="Client Testimonials"
          description="Don't just take our word for it. Here's what our clients have to say about their experience with The Perfect Event."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-brand-accent hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-brand-accent hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
            <Quote className="w-12 h-12 text-brand-accent/20 mb-6" />

            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              &ldquo;{testimonials[currentIndex].text}&rdquo;
            </p>

            <div className="flex items-center gap-4">
              {/* Initials Avatar */}
              <div className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm",
                testimonials[currentIndex].color
              )}>
                {testimonials[currentIndex].initials}
              </div>
              <div>
                <h4 className="font-semibold text-brand-primary">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-gray-500">
                  {testimonials[currentIndex].event} • {testimonials[currentIndex].location}
                </p>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all',
                  index === currentIndex ? 'bg-brand-accent w-8' : 'bg-gray-300'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
