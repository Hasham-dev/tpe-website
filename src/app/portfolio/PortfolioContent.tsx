'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { PortfolioCard } from '@/components/ui/PortfolioCard'
import { Button } from '@/components/ui/Button'
import { caseStudies, portfolioCategories } from '@/lib/portfolio'
import { cn } from '@/lib/utils'

export default function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredCaseStudies = activeCategory === 'All'
    ? caseStudies
    : caseStudies.filter((study) => study.eventType === activeCategory)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <Section background="cream" className="py-16 md:py-24">
        <Container>
          <SectionHeader
            subtitle="Portfolio"
            title="Our Work Speaks for Itself"
            description="Explore our featured events and see how we bring our clients' visions to life. From intimate weddings to large-scale festivals, every event is a testament to our commitment to excellence."
          />
        </Container>
      </Section>

      {/* Portfolio Grid Section */}
      <Section background="default">
        <Container>
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-6 py-2.5 text-sm font-medium rounded-full transition-all',
                  activeCategory === category
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-white text-brand-primary hover:bg-brand-primary/10 border border-brand-primary/20'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid - Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {filteredCaseStudies.map((caseStudy) => (
              <PortfolioCard
                key={caseStudy.slug}
                caseStudy={caseStudy}
                featured={caseStudy.featured}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg mb-6">
                No case studies found for this category yet.
              </p>
              <Button onClick={() => setActiveCategory('All')} variant="primary">
                View All Projects
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Create Your Perfect Event?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can bring your vision to life with the same level of excellence and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/#contact" variant="primary" size="lg">
                Get Your Free Quote
              </Button>
              <Button href="/#services" variant="outline" size="lg">
                Explore Services
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
