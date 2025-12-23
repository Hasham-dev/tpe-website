'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ChevronLeft, FolderOpen, Lock, ImageOff, ArrowLeft } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { PasswordDialog } from '@/components/ui/PasswordDialog'
import { useProtectedFolderAuth, useProtectedFolderImages } from '@/hooks/useProtectedFolder'
import { DriveImage } from '@/hooks/useDriveImages'

interface FolderInfo {
  id: string
  name: string
  coverUrl: string | null
}

// Shimmer placeholder
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

// Image with loading state
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

// Image skeleton
function ImageSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-200 animate-pulse aspect-square" />
  )
}

export default function ProtectedGalleryContent({ folderId }: { folderId: string }) {
  const [folderInfo, setFolderInfo] = useState<FolderInfo | null>(null)
  const [folderLoading, setFolderLoading] = useState(true)
  const [folderError, setFolderError] = useState<string | null>(null)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<DriveImage | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const { isAuthenticated, verifyPassword } = useProtectedFolderAuth()
  const { images, loading: imagesLoading, fetchImages } = useProtectedFolderImages()

  // Fetch folder info on mount
  useEffect(() => {
    async function fetchFolderInfo() {
      try {
        setFolderLoading(true)
        const response = await fetch('/api/drive/protected-folders')
        if (!response.ok) throw new Error('Failed to fetch folders')

        const data = await response.json()
        const folder = data.folders?.find((f: FolderInfo) => f.id === folderId)

        if (folder) {
          setFolderInfo(folder)
          // Check if already authenticated
          if (isAuthenticated(folder.name)) {
            setIsUnlocked(true)
            fetchImages(folderId)
          } else {
            setShowPasswordDialog(true)
          }
        } else {
          setFolderError('Gallery not found')
        }
      } catch {
        setFolderError('Failed to load gallery')
      } finally {
        setFolderLoading(false)
      }
    }

    fetchFolderInfo()
  }, [folderId, isAuthenticated, fetchImages])

  // Handle password submit
  const handlePasswordSubmit = async (password: string) => {
    if (!folderInfo) return { success: false, error: 'No folder selected' }

    const result = await verifyPassword(folderInfo.name, password)

    if (result.success) {
      setShowPasswordDialog(false)
      setIsUnlocked(true)
      await fetchImages(folderId)
    }

    return result
  }

  // Lightbox handlers
  const handleImageClick = (image: DriveImage, index: number) => {
    setLightboxImage(image)
    setLightboxIndex(index)
  }

  const handlePrevImage = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1)
      setLightboxImage(images[lightboxIndex - 1])
    }
  }

  const handleNextImage = () => {
    if (lightboxIndex < images.length - 1) {
      setLightboxIndex(lightboxIndex + 1)
      setLightboxImage(images[lightboxIndex + 1])
    }
  }

  // Loading state
  if (folderLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (folderError || !folderInfo) {
    return (
      <div className="min-h-screen pt-20">
        <Section background="cream" className="py-16">
          <Container>
            <div className="text-center">
              <FolderOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-serif font-bold text-brand-primary mb-4">
                {folderError || 'Gallery Not Found'}
              </h1>
              <p className="text-gray-600 mb-8">
                The gallery you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
              <Button href="/gallery" variant="primary">
                Back to Gallery
              </Button>
            </div>
          </Container>
        </Section>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <Section background="cream" className="py-12 md:py-16">
        <Container>
          <Link
            href="/gallery"
            className="inline-flex items-center text-brand-primary hover:text-brand-accent transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Gallery
          </Link>

          <SectionHeader
            subtitle="Protected Gallery"
            title={folderInfo.name}
            description={isUnlocked ? 'Browse your event photos below.' : 'Enter your password to access this gallery.'}
          />
        </Container>
      </Section>

      {/* Password Dialog */}
      <PasswordDialog
        isOpen={showPasswordDialog && !isUnlocked}
        folderName={folderInfo.name}
        onSubmit={handlePasswordSubmit}
        onClose={() => {
          // Redirect back to gallery if they close without entering password
          window.location.href = '/gallery'
        }}
      />

      {/* Images Section - Only show when unlocked */}
      {isUnlocked && (
        <Section background="default">
          <Container>
            {/* Loading Skeletons */}
            {imagesLoading && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(15)].map((_, i) => (
                  <ImageSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Images Grid */}
            {!imagesLoading && images.length > 0 && (
              <>
                <p className="text-gray-500 text-sm mb-6">{images.length} photos</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => handleImageClick(image, index)}
                      className="relative overflow-hidden rounded-lg group aspect-square bg-gray-100 shadow-md hover:shadow-xl transition-shadow"
                    >
                      <DriveImageWithFallback
                        image={image}
                        alt={image.name}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* No images */}
            {!imagesLoading && images.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <FolderOpen className="w-20 h-20 mx-auto mb-4" />
                <p className="text-lg">No photos in this album yet</p>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* Locked state message */}
      {!isUnlocked && !showPasswordDialog && (
        <Section background="default">
          <Container>
            <div className="text-center py-20">
              <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-6">This gallery is password protected.</p>
              <Button onClick={() => setShowPasswordDialog(true)} variant="primary">
                Enter Password
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black z-[60] flex items-center justify-center"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full z-10 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X size={28} />
          </button>

          {/* Navigation */}
          {lightboxIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full transition-colors"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full rotate-180 transition-colors"
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

          <div className="relative max-w-6xl max-h-[90vh] w-full h-full p-4">
            <DriveImageWithFallback
              key={lightboxImage.id}
              image={lightboxImage}
              alt="Gallery image"
              className="object-contain"
              darkMode
            />
          </div>
        </div>
      )}
    </div>
  )
}
