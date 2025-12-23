import Image from 'next/image'
import { Container } from './Container'
import { Section } from './Section'
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  title: string
  description?: string
  image: string
  breadcrumbs?: BreadcrumbItem[]
  badge?: string
  height?: 'sm' | 'md' | 'lg'
  gradient?: 'left' | 'bottom' | 'full'
  children?: React.ReactNode
  contentAlign?: 'center' | 'bottom' | 'left'
  titleClassName?: string
}

const heights = {
  sm: 'h-[400px] md:h-[450px]',
  md: 'h-[450px] md:h-[500px]',
  lg: 'h-[500px] md:h-[600px]',
}

const gradients = {
  left: 'bg-gradient-to-r from-black/80 via-black/50 to-transparent',
  bottom: 'bg-gradient-to-t from-black/90 via-black/50 to-black/30',
  full: 'bg-gradient-to-r from-black/80 via-black/50 to-black/30',
}

/**
 * Reusable page hero component
 * Used for consistent hero sections across service, event, blog, and location pages
 */
export function PageHero({
  title,
  description,
  image,
  breadcrumbs,
  badge,
  height = 'md',
  gradient = 'full',
  children,
  contentAlign = 'left',
  titleClassName,
}: PageHeroProps) {
  const contentClass = contentAlign === 'bottom'
    ? 'justify-end pb-12'
    : contentAlign === 'center'
    ? 'justify-center items-center text-center'
    : 'justify-center'

  return (
    <Section background="default" spacing="none" className="relative">
      <div className={cn('relative', heights[height])}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className={cn('absolute inset-0', gradients[gradient])} />

        <Container className={cn('relative h-full flex flex-col', contentClass)}>
          {breadcrumbs && (
            <Breadcrumb items={breadcrumbs} className="mb-6 text-white/80" />
          )}

          {badge && (
            <span className="inline-block px-4 py-1 bg-brand-accent text-white text-sm font-semibold uppercase tracking-wider rounded-sm mb-4 w-fit">
              {badge}
            </span>
          )}

          <h1 className={cn(
            'text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 max-w-3xl',
            titleClassName
          )}>
            {title}
          </h1>

          {description && (
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8">
              {description}
            </p>
          )}

          {children}
        </Container>
      </div>
    </Section>
  )
}
