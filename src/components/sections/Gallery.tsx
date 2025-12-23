'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FolderOpen, Images } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FolderModal } from '@/components/ui/FolderModal'
import { useDriveFolders, useFolderImages, DriveFolder } from '@/hooks/useDriveImages'

// Shimmer placeholder component
function ShimmerPlaceholder() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer-animation" />
    </div>
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
        onLoad={() => setIsLoading(false)}
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

// Fallback folders if Drive API fails
const fallbackFolders = [
  { id: '1', name: 'Weddings', coverSrc: '/images/gallery/wedding-1.jpg' },
  { id: '2', name: 'Corporate', coverSrc: '/images/gallery/corporate-1.jpg' },
  { id: '3', name: 'Festivals', coverSrc: '/images/gallery/festival-1.jpg' },
  { id: '4', name: 'University', coverSrc: '/images/gallery/university-1.jpg' },
]

export function Gallery() {
  const [selectedFolder, setSelectedFolder] = useState<DriveFolder | null>(null)

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

      {/* Folder Modal */}
      <FolderModal
        isOpen={!!selectedFolder}
        folderName={selectedFolder?.name || ''}
        images={images}
        loading={imagesLoading}
        onClose={handleCloseFolder}
        hoverAccentClass="hover:text-brand-primary"
      />
    </Section>
  )
}
