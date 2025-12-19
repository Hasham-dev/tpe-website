'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'Escape') closeLightbox()
  }

  return (
    <>
      {/* Masonry Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className={cn(
              'relative overflow-hidden rounded-lg group cursor-pointer',
              // First image spans 2 columns and is taller
              index === 0 && 'md:col-span-2 md:row-span-2'
            )}
          >
            <div className={cn(
              'relative',
              index === 0 ? 'h-[300px] md:h-[500px]' : 'h-[200px] md:h-[250px]'
            )}>
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading={index < 4 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium text-lg">
                  View Full Size
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Image */}
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
            <Image
              src={images[lightboxIndex]}
              alt={`${alt} ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
