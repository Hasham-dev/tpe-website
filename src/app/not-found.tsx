import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Section background="white" spacing="lg">
      <Container size="md">
        <div className="text-center py-12">
          <h1 className="text-8xl md:text-9xl font-serif text-brand-accent mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-serif text-brand-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or no longer exists.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/">
              Go Home
            </Button>
            <Button variant="outline" href="/contact">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
