import { Quote } from 'lucide-react'
import { StarRating } from './StarRating'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
  showQuoteIcon?: boolean
  className?: string
}

/**
 * Testimonial card component
 * Displays customer testimonial with rating, quote, and author info
 */
export function TestimonialCard({
  testimonial,
  showQuoteIcon = true,
  className
}: TestimonialCardProps) {
  return (
    <div className={cn('bg-white rounded-2xl shadow-xl p-8 md:p-12', className)}>
      {showQuoteIcon && (
        <Quote className="w-12 h-12 text-brand-accent/20 mb-6" />
      )}

      <StarRating rating={testimonial.rating} className="mb-6" />

      <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <TestimonialAuthor testimonial={testimonial} />
    </div>
  )
}

/**
 * Testimonial author info component
 * Can be used standalone or within TestimonialCard
 */
export function TestimonialAuthor({
  testimonial,
  className
}: {
  testimonial: Testimonial
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className={cn(
        'w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm',
        testimonial.color
      )}>
        {testimonial.initials}
      </div>
      <div>
        <h4 className="font-semibold text-brand-primary">{testimonial.name}</h4>
        <p className="text-sm text-gray-500">
          {testimonial.event} • {testimonial.location}
        </p>
      </div>
    </div>
  )
}
