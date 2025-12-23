'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FolderOpen, Images, Lock, GraduationCap } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { FolderModal } from '@/components/ui/FolderModal'
import { useDriveFolders, useFolderImages, DriveFolder } from '@/hooks/useDriveImages'
import { useProtectedFolders } from '@/hooks/useProtectedFolder'

// Shimmer placeholder component
function ShimmerPlaceholder() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer-animation" />
    </div>
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

export default function GalleryPageContent() {
  const [selectedFolder, setSelectedFolder] = useState<DriveFolder | null>(null)

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
      <FolderModal
        isOpen={!!selectedFolder}
        folderName={selectedFolder?.name || ''}
        images={images}
        loading={imagesLoading}
        onClose={handleCloseFolder}
      />
    </div>
  )
}
