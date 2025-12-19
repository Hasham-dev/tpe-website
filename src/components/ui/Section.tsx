import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
  background?: 'default' | 'white' | 'dark' | 'accent' | 'cream' | 'cream-alt' | 'primary' | 'gray'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
}

const backgrounds = {
  default: 'bg-brand-cream',
  white: 'bg-white',
  dark: 'bg-brand-primary text-white',
  accent: 'bg-brand-accent/10',
  cream: 'bg-brand-cream',
  'cream-alt': 'bg-brand-cream-dark',
  primary: 'bg-brand-primary text-white',
  gray: 'bg-gray-50',
}

const spacings = {
  none: '',
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
}

export function Section({ id, className, children, background = 'default', spacing = 'lg' }: SectionProps) {
  return (
    <section id={id} className={cn(backgrounds[background], spacings[spacing], className)}>
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  subtitle?: string
  title: string
  description?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  dark?: boolean
}

export function SectionHeader({ subtitle, title, description, align = 'center', className, dark = false }: SectionHeaderProps) {
  const alignments = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  return (
    <div className={cn('max-w-3xl mb-12 md:mb-16', alignments[align], className)}>
      {subtitle && (
        <span className={cn(
          'block font-script text-xl md:text-2xl mb-2',
          dark ? 'text-brand-accent-light' : 'text-brand-accent'
        )}>
          {subtitle}
        </span>
      )}
      <h2 className={cn(
        'font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-4',
        dark ? 'text-white' : 'text-brand-primary'
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          'text-lg max-w-2xl leading-relaxed mt-4',
          dark ? 'text-gray-300' : 'text-brand-primary-muted',
          align === 'center' && 'mx-auto'
        )}>
          {description}
        </p>
      )}
    </div>
  )
}
