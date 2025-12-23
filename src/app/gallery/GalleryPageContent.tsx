'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ChevronLeft, FolderOpen, Images, ImageOff, Lock, GraduationCap, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { useDriveFolders, useFolderImages, DriveFolder, DriveImage } from '@/hooks/useDriveImages'
import { useProtectedFolders } from '@/hooks/useProtectedFolder'

// Shimmer placeholder component
function ShimmerPlaceholder() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer-animation" />
    </div>
  )
}

// Dark shimmer for modal/lightbox
function DarkShimmerPlaceholder() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer-animation" />
    </div>
  )
}

// Image component with fallback support and blur loading
function DriveImageWithFallback({
  image,
  alt,
  className = '',
  darkMode = false,
}: {
  image: DriveImage
  alt: string
  className?: string
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
        fill
        className={`${className} transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
        onError={handleError}
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}

// Cover image with shimmer
function CoverImage({
  src,
  fallbackSrc,
  alt,
  className = '',
}: {
  src: string | null
  fallbackSrc?: string
  alt: string
  className?: string
}) {
  const [currentSrc, setCurrentSrc] = useState(src || '')
  const [hasError, setHasError] = useState(!src)
  const [isLoading, setIsLoading] = useState(!!src)
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

  if (hasError || !src) {
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
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}

// Skeleton for folder cards
function FolderSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-200 animate-pulse">
      <div className="aspect-[4/3]" />
      <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-2/3" />
        <div className="h-3 bg-gray-300 rounded w-1/3" />
      </div>
    </div>
  )
}

// Small skeleton for student galleries
function SmallFolderSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-200 animate-pulse p-6">
      <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-2" />
      <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto" />
    </div>
  )
}

// Image skeleton
function ImageSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white/10 animate-pulse aspect-square" />
  )
}

export default function GalleryPageContent() {
  const [selectedFolder, setSelectedFolder] = useState<DriveFolder | null>(null)
  const [lightboxImage, setLightboxImage] = useState<DriveImage | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)

  // Public gallery folders
  const { folders, loading: foldersLoading, error: foldersError } = useDriveFolders()
  const { images, loading: imagesLoading, fetchFolder } = useFolderImages()

  // Protected student folders
  const { folders: protectedFolders, loading: protectedLoading } = useProtectedFolders()

  // Handle folder click
  const handleFolderClick = async (folder: DriveFolder) => {
    setSelectedFolder(folder)
    await fetchFolder(folder.id)
  }

  // Close folder modal
  const handleCloseFolder = () => {
    setSelectedFolder(null)
  }

  // Lightbox handlers
  const handleImageClick = (image: DriveImage, index: number) => {
    setLightboxImage(image)
    setLightboxIndex(index)
    setZoomLevel(1)
  }

  const handleCloseLightbox = () => {
    setLightboxImage(null)
    setZoomLevel(1)
  }

  const handlePrevImage = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1)
      setLightboxImage(images[lightboxIndex - 1])
      setZoomLevel(1)
    }
  }

  const handleNextImage = () => {
    if (lightboxIndex < images.length - 1) {
      setLightboxIndex(lightboxIndex + 1)
      setLightboxImage(images[lightboxIndex + 1])
      setZoomLevel(1)
    }
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5))
  }

  const handleResetZoom = () => {
    setZoomLevel(1)
  }

  const handleDownload = async () => {
    if (!lightboxImage) return
    try {
      const response = await fetch(lightboxImage.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = lightboxImage.name || 'image.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch {
      window.open(lightboxImage.url, '_blank')
    }
  }

  const displayFolders = folders.length > 0 ? folders : null

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <Section background="cream" className="py-16 md:py-24">
        <Container>
          <SectionHeader
            subtitle="Our Work"
            title="Photo Gallery"
            description="Browse through photos from our events. From intimate weddings to large-scale festivals, see the moments we've helped create."
          />
        </Container>
      </Section>

      {/* Student Galleries Section */}
      <Section background="default" className="border-b border-gray-200">
        <Container>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">Student Galleries</h2>
              <p className="text-gray-600 text-sm">Access your university event photos with your password</p>
            </div>
          </div>

          {/* Loading state */}
          {protectedLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <SmallFolderSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Protected folders grid */}
          {!protectedLoading && protectedFolders.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {protectedFolders.map((folder) => (
                <Link
                  key={folder.id}
                  href={`/gallery/protected/${folder.id}`}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary/80 p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="absolute top-3 right-3 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{folder.name}</h3>
                  <p className="text-white/70 text-xs">View Photos</p>
                </Link>
              ))}
            </div>
          )}

          {/* No protected folders */}
          {!protectedLoading && protectedFolders.length === 0 && (
            <p className="text-gray-500 text-center py-8">No student galleries available.</p>
          )}
        </Container>
      </Section>

      {/* Main Public Gallery */}
      <Section background="default">
        <Container>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center">
              <Images className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">Public Gallery</h2>
              <p className="text-gray-600 text-sm">Browse our featured event photos</p>
            </div>
          </div>

          {/* Loading Skeletons */}
          {foldersLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <FolderSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {foldersError && !foldersLoading && (
            <div className="text-center py-12 text-gray-500">
              <FolderOpen className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">Unable to load gallery. Please try again later.</p>
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
                      <h3 className="text-white font-bold text-xl mb-1 group-hover:text-brand-accent transition-colors">
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
        </Container>
      </Section>

      {/* Folder Modal */}
      {selectedFolder && (
        <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto">
          <div className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 sticky top-0 bg-black/80 backdrop-blur-sm -mx-4 md:-mx-8 px-4 md:px-8 py-4 z-10">
              <button
                onClick={handleCloseFolder}
                className="flex items-center text-white hover:text-brand-accent transition-colors"
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

            {/* Loading Skeletons */}
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
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black z-[60] flex items-center justify-center"
          onClick={handleCloseLightbox}
        >
          {/* Top Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full p-1">
              <button
                className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleZoomOut()
                }}
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>
              <span className="text-white/70 text-sm min-w-[3rem] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleZoomIn()
                }}
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>
              <button
                className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleResetZoom()
                }}
                title="Reset Zoom"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Download Button */}
            <button
              className="text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full transition-colors bg-black/50 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation()
                handleDownload()
              }}
              title="Download Image"
            >
              <Download size={20} />
            </button>

            {/* Close Button */}
            <button
              className="text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full transition-colors bg-black/50 backdrop-blur-sm"
              onClick={handleCloseLightbox}
              title="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          {lightboxIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full transition-colors bg-black/30 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation()
                handlePrevImage()
              }}
            >
              <ChevronLeft size={32} />
            </button>
          )}
          {lightboxIndex < images.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full rotate-180 transition-colors bg-black/30 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation()
                handleNextImage()
              }}
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm font-medium">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Image Container with Zoom */}
          <div
            className="relative max-w-6xl max-h-[90vh] w-full h-full p-4 overflow-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full h-full transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <Image
                key={lightboxImage.id}
                src={lightboxImage.url}
                alt="Gallery image"
                fill
                className="object-contain"
                unoptimized
                sizes="(max-width: 1536px) 100vw, 1536px"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
