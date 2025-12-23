import { cn } from '@/lib/utils'

interface ShimmerProps {
  variant?: 'light' | 'dark'
  className?: string
}

/**
 * Shimmer loading animation component
 * Used for loading states in image galleries and cards
 */
export function Shimmer({ variant = 'light', className }: ShimmerProps) {
  const baseColors = variant === 'light'
    ? 'from-gray-200 via-gray-100 to-gray-200'
    : 'from-gray-800 via-gray-700 to-gray-800'

  const shimmerColor = variant === 'light'
    ? 'via-white/40'
    : 'via-white/10'

  return (
    <div className={cn(`absolute inset-0 bg-gradient-to-br ${baseColors}`, className)}>
      <div className={cn(
        'absolute inset-0 bg-gradient-to-r from-transparent to-transparent shimmer-animation',
        shimmerColor
      )} />
    </div>
  )
}
