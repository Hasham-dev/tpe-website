'use client'

import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Accordion } from '@/components/ui/Accordion'
import { FAQS } from '@/lib/constants'

export function FAQ() {
  // Convert FAQS format to AccordionItem format
  const faqItems = FAQS.map(faq => ({
    question: faq.question,
    answer: faq.answer,
  }))

  return (
    <Section id="faq" background="default">
      <Container size="md">
        <SectionHeader
          subtitle="Got Questions?"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our services, pricing, and process."
        />

        <Accordion items={faqItems} defaultOpen={0} />

        <p className="text-center text-gray-600 mt-12">
          Still have questions?{' '}
          <a href="/#contact" className="text-brand-accent hover:underline font-medium">
            Contact us
          </a>{' '}
          and we&apos;ll be happy to help.
        </p>
      </Container>
    </Section>
  )
}
