'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DriveImage } from '@/hooks/useDriveImages'

interface DriveImageGalleryProps {
  folderId: string
  alt: string
  fallbackImages?: string[]
}

// Shimmer placeholder component
function ShimmerPlaceholder() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer-animation" />
    </div>
  )
}

// Dark shimmer for lightbox
function DarkShimmerPlaceholder() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer-animation" />
    </div>
  )
}

// Image component with fallback support and loading state
function DriveImageWithFallback({
  image,
  alt,
  className = '',
  darkMode = false,
  priority = false,
}: {
  image: DriveImage
  alt: string
  className?: string
  darkMode?: boolean
  priority?: boolean
}) {
  const [currentSrc, setCurrentSrc] = useState(image.thumbnailUrl)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [fallbackAttempted, setFallbackAttempted] = useState(false)

  const handleError = () => {
    if (!fallbackAttempted && image.fallbackUrl) {
      setCurrentSrc(image.fallbackUrl)
      setFallbackAttempted(true)
    } else if (!hasError) {
      setHasError(true)
      setIsLoading(false)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <ImageOff className="w-8 h-8 text-gray-400" />
      </div>
    )
  }

  return (
    <>
      {isLoading && (darkMode ? <DarkShimmerPlaceholder /> : <ShimmerPlaceholder />)}
      <Image
        src={currentSrc}
        alt={alt}
        fill
        className={`${className} transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
      />
    </>
  )
}

// Skeleton for loading state
function ImageSkeleton({ large = false }: { large?: boolean }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-gray-200',
        large ? 'h-[300px] md:h-[500px]' : 'h-[200px] md:h-[250px]'
      )}
    >
      <ShimmerPlaceholder />
    </div>
  )
}

export function DriveImageGallery({ folderId, alt, fallbackImages = [] }: DriveImageGalleryProps) {
  const [images, setImages] = useState<DriveImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/drive/folder/${folderId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch images')
        }
        const data = await response.json()
        setImages(data.images || [])
      } catch (err) {
        console.error('Error fetching folder images:', err)
        setError('Failed to load images')
      } finally {
        setLoading(false)
      }
    }

    if (folderId) {
      fetchImages()
    }
  }, [folderId])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const nextImage = () => {
    if (lightboxIndex !== null && images.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (lightboxIndex !== null && images.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'Escape') closeLightbox()
  }

  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 md:row-span-2">
          <ImageSkeleton large />
        </div>
        {[...Array(4)].map((_, i) => (
          <ImageSkeleton key={i} />
        ))}
      </div>
    )
  }

  // Error state - fall back to static images
  if (error || images.length === 0) {
    if (fallbackImages.length > 0) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fallbackImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setLightboxIndex(index)}
              className={cn(
                'relative overflow-hidden rounded-lg group cursor-pointer',
                index === 0 && 'md:col-span-2 md:row-span-2'
              )}
            >
              <div
                className={cn(
                  'relative',
                  index === 0 ? 'h-[300px] md:h-[500px]' : 'h-[200px] md:h-[250px]'
                )}
              >
                <Image
                  src={image}
                  alt={`${alt} ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
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
      )
    }
    return (
      <div className="text-center py-12 text-gray-500">
        <ImageOff className="w-12 h-12 mx-auto mb-4" />
        <p>No images available</p>
      </div>
    )
  }

  return (
    <>
      {/* Masonry Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => openLightbox(index)}
            className={cn(
              'relative overflow-hidden rounded-lg group cursor-pointer',
              index === 0 && 'md:col-span-2 md:row-span-2'
            )}
          >
            <div
              className={cn(
                'relative',
                index === 0 ? 'h-[300px] md:h-[500px]' : 'h-[200px] md:h-[250px]'
              )}
            >
              <DriveImageWithFallback
                image={image}
                alt={`${alt} ${index + 1}`}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={index < 4}
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
      {lightboxIndex !== null && images[lightboxIndex] && (
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
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <DriveImageWithFallback
              key={images[lightboxIndex].id}
              image={images[lightboxIndex]}
              alt={`${alt} ${lightboxIndex + 1}`}
              className="object-contain"
              darkMode
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
