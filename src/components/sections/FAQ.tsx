'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { FAQS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section id="faq" background="default">
      <Container size="md">
        <SectionHeader
          subtitle="Got Questions?"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our services, pricing, and process."
        />

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggle(index)}
            />
          ))}
        </div>

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

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full p-6 text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-brand-primary pr-4">
          {question}
        </h3>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-brand-accent flex-shrink-0 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <p className="px-6 pb-6 text-gray-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}
