import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface CTAAction {
  label: string
  href: string
}

interface PageCTAProps {
  title?: string
  description?: string
  primaryAction?: CTAAction
  secondaryAction?: CTAAction
  phone?: string
  background?: 'dark' | 'primary'
  className?: string
}

interface SidebarCTAProps extends Omit<PageCTAProps, 'background'> {
  icon?: LucideIcon
}

/**
 * Reusable page CTA section
 * Used for consistent call-to-action sections at the bottom of pages
 */
export function PageCTA({
  title = "Let's Create Something Perfect",
  description = "With over 17 years of experience and 600+ events annually, we have the expertise to make your vision a reality.",
  primaryAction = { label: 'Start Planning Today', href: '/quote' },
  secondaryAction,
  phone = '877-345-7500',
  background = 'dark',
  className,
}: PageCTAProps) {
  return (
    <Section background={background} spacing="lg" className={className}>
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={primaryAction.href} variant="secondary" size="lg">
              {primaryAction.label}
            </Button>
            {secondaryAction ? (
              <Button
                href={secondaryAction.href}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-primary"
              >
                {secondaryAction.label}
              </Button>
            ) : (
              <Button
                href={`tel:${phone}`}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-primary"
              >
                Call {phone}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

/**
 * Compact CTA variant for sidebars
 */
export function SidebarCTA({
  title = 'Ready to Get Started?',
  description = 'Tell us about your event and receive a personalized proposal within 24-48 hours.',
  primaryAction = { label: 'Get Free Quote', href: '/quote' },
  phone = '877-345-7500',
  icon: Icon,
  className,
}: SidebarCTAProps) {
  return (
    <div className={cn('bg-brand-primary text-white p-8 rounded-xl', className)}>
      {Icon && <Icon className="w-12 h-12 mb-4 text-brand-secondary" />}
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-white/90 mb-6">{description}</p>
      <Button href={primaryAction.href} variant="secondary" size="lg" className="w-full mb-4">
        {primaryAction.label}
      </Button>
      <Button
        href={`tel:${phone}`}
        variant="outline"
        size="lg"
        className="w-full border-white text-white hover:bg-white hover:text-brand-primary"
      >
        Call {phone}
      </Button>
    </div>
  )
}
