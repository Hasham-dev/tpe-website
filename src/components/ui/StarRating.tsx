import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}

/**
 * Star rating display component
 * Shows filled/unfilled stars based on rating value
 */
export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  className
}: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizes[size],
            i < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </div>
  )
}
