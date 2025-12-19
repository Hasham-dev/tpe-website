'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { BlogCard } from '@/components/ui/BlogCard'
import { BLOG_POSTS, BLOG_CATEGORIES, getBlogPostsByCategory } from '@/lib/blog-posts'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = getBlogPostsByCategory(selectedCategory)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1) // Reset to first page when category changes
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-brand-cream pt-32 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl text-brand-primary mb-6">
              The Perfect Event Blog
            </h1>
            <p className="text-xl text-gray-700">
              Expert insights, planning tips, and industry trends from Southern California&apos;s premier event production company.
            </p>
          </div>
        </Container>
      </Section>

      {/* Category Filter */}
      <Section className="bg-white border-b border-gray-200 py-6">
        <Container>
          <div className="flex flex-wrap justify-center gap-3">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-sm font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-brand-accent text-white shadow-md'
                    : 'bg-white text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* Blog Posts Grid */}
      <Section className="py-16">
        <Container>
          {currentPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-sm border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-sm font-semibold transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-brand-accent text-white'
                            : 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-sm border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                    aria-label="Next page"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No posts found in this category.</p>
            </div>
          )}
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-brand-primary text-white py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl mb-6">Ready to Plan Your Event?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Let our expert team bring your vision to life with full-service event production.
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-4 bg-brand-accent text-white font-semibold uppercase tracking-wider rounded-sm hover:bg-brand-secondary transition-all duration-300"
            >
              Get Your Free Quote
            </a>
          </div>
        </Container>
      </Section>
    </>
  )
}
