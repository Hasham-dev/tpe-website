'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpen?: number | null
  variant?: 'default' | 'card' | 'minimal'
  showIcon?: boolean
  className?: string
}

const variants = {
  default: 'bg-white rounded-xl shadow-sm',
  card: 'bg-brand-cream rounded-xl hover:shadow-md transition-shadow',
  minimal: 'border-b border-gray-200 last:border-0',
}

/**
 * Accordion component for FAQ sections
 * Supports multiple visual variants and optional question icons
 */
export function Accordion({
  items,
  defaultOpen = 0,
  variant = 'default',
  showIcon = false,
  className,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => (
        <AccordionItemComponent
          key={index}
          item={item}
          isOpen={openIndex === index}
          onClick={() => toggle(index)}
          variant={variant}
          showIcon={showIcon}
        />
      ))}
    </div>
  )
}

interface AccordionItemComponentProps {
  item: AccordionItem
  isOpen: boolean
  onClick: () => void
  variant: 'default' | 'card' | 'minimal'
  showIcon: boolean
}

function AccordionItemComponent({
  item,
  isOpen,
  onClick,
  variant,
  showIcon,
}: AccordionItemComponentProps) {
  return (
    <div className={cn(variants[variant], 'overflow-hidden')}>
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full p-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4 flex-1">
          {showIcon && (
            <HelpCircle className="w-6 h-6 text-brand-accent flex-shrink-0 mt-0.5" />
          )}
          <h3 className="text-lg font-semibold text-brand-primary pr-4">
            {item.question}
          </h3>
        </div>
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
        <p className={cn(
          'px-6 pb-6 text-gray-600 leading-relaxed',
          showIcon && 'pl-16'
        )}>
          {item.answer}
        </p>
      </div>
    </div>
  )
}

const faqListVariants = {
  default: 'border-b border-gray-200 pb-6 last:border-0',
  card: 'bg-brand-cream rounded-xl p-6 hover:shadow-md transition-shadow',
}

/**
 * Simple FAQ list without accordion behavior
 * All items are expanded by default
 */
export function FAQList({
  items,
  showIcon = false,
  variant = 'default',
  className,
}: {
  items: AccordionItem[]
  showIcon?: boolean
  variant?: 'default' | 'card'
  className?: string
}) {
  return (
    <div className={cn(variant === 'card' ? 'space-y-4' : 'space-y-6', className)}>
      {items.map((item, index) => (
        <div key={index} className={faqListVariants[variant]}>
          <div className="flex items-start gap-4">
            {showIcon && (
              <HelpCircle className="w-6 h-6 text-brand-accent flex-shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className={cn(
                'text-lg text-brand-primary mb-2',
                variant === 'card' ? 'font-semibold' : 'font-bold'
              )}>
                {item.question}
              </h4>
              <p className="text-gray-700">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
