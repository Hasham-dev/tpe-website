'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const galleryImages = [
  { src: '/images/gallery/wedding-1.jpg', alt: 'Wedding reception', category: 'Wedding' },
  { src: '/images/gallery/corporate-1.jpg', alt: 'Corporate event', category: 'Corporate' },
  { src: '/images/gallery/festival-1.jpg', alt: 'Festival stage', category: 'Festival' },
  { src: '/images/gallery/university-1.jpg', alt: 'University event', category: 'University' },
  { src: '/images/gallery/wedding-2.jpg', alt: 'Wedding ceremony', category: 'Wedding' },
  { src: '/images/gallery/corporate-2.jpg', alt: 'Corporate gala', category: 'Corporate' },
  { src: '/images/gallery/festival-2.jpg', alt: 'Festival crowd', category: 'Festival' },
  { src: '/images/gallery/private-1.jpg', alt: 'Private party', category: 'Private' },
]

const categories = ['All', 'Wedding', 'Corporate', 'Festival', 'University', 'Private']

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <Section id="gallery" background="default">
      <Container>
        <SectionHeader
          subtitle="Our Work"
          title="Gallery"
          description="Browse through some of our favorite moments from events we've produced."
        />

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full transition-all',
                activeCategory === category
                  ? 'bg-brand-primary text-white'
                  : 'bg-white text-brand-primary hover:bg-brand-primary/10'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setLightboxImage(image.src)}
              className={cn(
                'relative overflow-hidden rounded-lg group',
                index === 0 && 'md:col-span-2 md:row-span-2'
              )}
            >
              <div className={cn(
                'relative',
                index === 0 ? 'h-[400px]' : 'h-[200px]'
              )}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    View
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/portfolio" variant="outline">
            View Full Portfolio
          </Button>
        </div>
      </Container>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={() => setLightboxImage(null)}
          >
            <X size={32} />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={lightboxImage}
              alt="Gallery image"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </Section>
  )
}
