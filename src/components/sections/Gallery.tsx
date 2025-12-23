'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, FolderOpen, Images, ImageOff } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Lightbox } from '@/components/ui/Lightbox'
import { useDriveFolders, useFolderImages, DriveFolder, DriveImage } from '@/hooks/useDriveImages'

// Shimmer placeholder component
function ShimmerPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer-animation" />
    </div>
  )
}

// Dark shimmer for modal/lightbox
function DarkShimmerPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer-animation" />
    </div>
  )
}

// Image component with fallback support and blur loading
function DriveImageWithFallback({
  image,
  alt,
  fill = true,
  className = '',
  sizes,
  darkMode = false,
}: {
  image: DriveImage
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  darkMode?: boolean
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
      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
        <ImageOff className="w-8 h-8 text-gray-600" />
      </div>
    )
  }

  return (
    <>
      {isLoading && (darkMode ? <DarkShimmerPlaceholder /> : <ShimmerPlaceholder />)}
      <Image
        src={currentSrc}
        alt={alt}
        fill={fill}
        className={`${className} transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        sizes={sizes}
        unoptimized
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  )
}

// Simple image with fallback for cover images
function CoverImage({
  src,
  fallbackSrc,
  alt,
  className = '',
}: {
  src: string
  fallbackSrc?: string
  alt: string
  className?: string
}) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [fallbackAttempted, setFallbackAttempted] = useState(false)

  const handleError = () => {
    if (!fallbackAttempted && fallbackSrc) {
      setCurrentSrc(fallbackSrc)
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
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <FolderOpen className="w-16 h-16 text-gray-300" />
      </div>
    )
  }

  return (
    <>
      {isLoading && <ShimmerPlaceholder />}
      <Image
        src={currentSrc}
        alt={alt}
        fill
        className={`${className} transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  )
}

// Skeleton component for folder cards
function FolderSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-200 animate-pulse">
      <div className="aspect-[4/3]" />
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-2/3" />
        <div className="h-3 bg-gray-300 rounded w-1/3" />
      </div>
    </div>
  )
}

// Skeleton component for image grid
function ImageSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white/10 animate-pulse aspect-square" />
  )
}

// Fallback folders if Drive API fails
const fallbackFolders = [
  { id: '1', name: 'Weddings', coverSrc: '/images/gallery/wedding-1.jpg' },
  { id: '2', name: 'Corporate', coverSrc: '/images/gallery/corporate-1.jpg' },
  { id: '3', name: 'Festivals', coverSrc: '/images/gallery/festival-1.jpg' },
  { id: '4', name: 'University', coverSrc: '/images/gallery/university-1.jpg' },
]

export function Gallery() {
  const [selectedFolder, setSelectedFolder] = useState<DriveFolder | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const { folders, loading: foldersLoading, error: foldersError } = useDriveFolders()
  const { images, loading: imagesLoading, fetchFolder } = useFolderImages()

  // Handle folder click - fetch images and open modal
  const handleFolderClick = async (folder: DriveFolder) => {
    setSelectedFolder(folder)
    await fetchFolder(folder.id)
  }

  // Close folder modal
  const handleCloseFolder = () => {
    setSelectedFolder(null)
  }

  // Open lightbox
  const handleImageClick = (_image: DriveImage, index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Use Drive folders or fallback
  const displayFolders = folders.length > 0 ? folders : null

  return (
    <Section id="gallery" background="default">
      <Container>
        <SectionHeader
          subtitle="Our Work"
          title="Gallery"
          description="Browse through some of our favorite moments from events we've produced."
        />

        {/* Loading Skeletons */}
        {foldersLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <FolderSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State - Show fallback */}
        {foldersError && !foldersLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fallbackFolders.map((folder) => (
              <div
                key={folder.id}
                className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={folder.coverSrc}
                    alt={folder.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl">{folder.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Folders Grid */}
        {!foldersLoading && displayFolders && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayFolders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => handleFolderClick(folder)}
                className="relative overflow-hidden rounded-2xl group text-left shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3]">
                  {folder.images[0] ? (
                    <CoverImage
                      src={folder.images[0].thumbnailUrl}
                      fallbackSrc={folder.images[0].fallbackUrl}
                      alt={folder.name}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <FolderOpen className="w-16 h-16 text-gray-300" />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  {/* Icon badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Images className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl mb-1 group-hover:text-brand-primary transition-colors">
                      {folder.name}
                    </h3>
                    <p className="text-white/80 text-sm flex items-center gap-1">
                      <span className="inline-block w-8 h-0.5 bg-brand-accent rounded mr-1" />
                      View album
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button href="/gallery" variant="outline">
            View Full Gallery
          </Button>
        </div>
      </Container>

      {/* Folder Modal - Shows images from selected folder */}
      {selectedFolder && (
        <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto">
          <div className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 sticky top-0 bg-black/80 backdrop-blur-sm -mx-4 md:-mx-8 px-4 md:px-8 py-4 z-10">
              <button
                onClick={handleCloseFolder}
                className="flex items-center text-white hover:text-brand-primary transition-colors"
              >
                <ChevronLeft className="w-6 h-6 mr-2" />
                <span className="text-lg font-medium">Back</span>
              </button>
              <h2 className="text-white text-xl font-bold">{selectedFolder.name}</h2>
              <button
                onClick={handleCloseFolder}
                className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Loading Skeletons for images */}
            {imagesLoading && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {[...Array(15)].map((_, i) => (
                  <ImageSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Images Grid */}
            {!imagesLoading && images.length > 0 && (
              <>
                <p className="text-white/50 text-sm mb-4">{images.length} photos</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => handleImageClick(image, index)}
                      className="relative overflow-hidden rounded-lg group aspect-square bg-white/5"
                    >
                      <DriveImageWithFallback
                        image={image}
                        alt={image.name}
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                        darkMode
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-white/50 rounded-lg transition-all" />
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* No images */}
            {!imagesLoading && images.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-white/40">
                <FolderOpen className="w-20 h-20 mb-4" />
                <p className="text-lg">No images in this album</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </Section>
  )
}
