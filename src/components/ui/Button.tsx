import { cn } from '@/lib/utils'
import Link from 'next/link'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  isLoading?: boolean
  children: React.ReactNode
}

// Updated variants with proper hover states (darken on hover, not lighten)
const variants = {
  primary: 'bg-brand-primary text-white hover:bg-black active:bg-black',
  secondary: 'bg-brand-accent text-white hover:bg-brand-primary-light active:bg-brand-primary',
  accent: 'bg-brand-accent text-white hover:bg-brand-primary-light active:bg-brand-primary',
  outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white active:bg-black',
  ghost: 'text-brand-primary hover:bg-brand-primary/10 active:bg-brand-primary/20',
}

// Updated sizes with proper touch targets (min 44px height)
const sizes = {
  sm: 'px-5 py-2.5 text-xs min-h-[36px]',
  md: 'px-6 py-3 text-sm min-h-[44px]',
  lg: 'px-8 py-4 text-base min-h-[52px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = cn(
      // Base styles
      'inline-flex items-center justify-center font-semibold uppercase tracking-wider',
      // Transitions
      'transition-all duration-200 ease-out',
      // Border radius (consistent with design system)
      'rounded-md',
      // Focus states (improved visibility)
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
      // Disabled states
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      // Variant and size
      variants[variant],
      sizes[size],
      className
    )

    if (href) {
      return (
        <Link href={href} className={baseStyles}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={baseStyles} disabled={disabled || isLoading} {...props}>
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
