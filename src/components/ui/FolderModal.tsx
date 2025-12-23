'use client'

import { useState } from 'react'
import { X, ChevronLeft, FolderOpen } from 'lucide-react'
import { Lightbox, LightboxImage } from '@/components/ui/Lightbox'
import { DriveImage } from '@/components/ui/DriveImage'
import { ImageSkeleton } from '@/components/ui/Skeleton'

export interface FolderImage {
  id: string
  name: string
  thumbnailUrl: string
  fallbackUrl?: string
}

interface FolderModalProps {
  isOpen: boolean
  folderName: string
  images: FolderImage[]
  loading: boolean
  onClose: () => void
  hoverAccentClass?: string
}

export function FolderModal({
  isOpen,
  folderName,
  images,
  loading,
  onClose,
  hoverAccentClass = 'hover:text-brand-accent',
}: FolderModalProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (!isOpen) return null

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Convert to Lightbox format
  const lightboxImages: LightboxImage[] = images.map((img) => ({
    id: img.id,
    name: img.name,
    url: img.thumbnailUrl,
    thumbnailUrl: img.thumbnailUrl,
  }))

  return (
    <>
      <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 md:px-8 pb-4 md:pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 sticky top-0 bg-black/80 backdrop-blur-sm -mx-4 md:-mx-8 px-4 md:px-8 py-4 z-10">
            <button
              onClick={onClose}
              className={`flex items-center text-white ${hoverAccentClass} transition-colors`}
            >
              <ChevronLeft className="w-6 h-6 mr-2" />
              <span className="text-lg font-medium">Back</span>
            </button>
            <h2 className="text-white text-xl font-bold">{folderName}</h2>
            <button
              onClick={onClose}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Loading Skeletons */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {[...Array(15)].map((_, i) => (
                <ImageSkeleton key={i} dark />
              ))}
            </div>
          )}

          {/* Images Grid */}
          {!loading && images.length > 0 && (
            <>
              <p className="text-white/50 text-sm mb-4">{images.length} photos</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => handleImageClick(index)}
                    className="relative overflow-hidden rounded-lg group aspect-square bg-white/5"
                  >
                    <DriveImage
                      image={image}
                      alt={image.name}
                      variant="dark"
                      className="object-cover transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-white/50 rounded-lg transition-all" />
                  </button>
                ))}
              </div>
            </>
          )}

          {/* No images */}
          {!loading && images.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-white/40">
              <FolderOpen className="w-20 h-20 mb-4" />
              <p className="text-lg">No images in this album</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </>
  )
}
