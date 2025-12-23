'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react'

export interface LightboxImage {
  id: string
  name: string
  url: string
  thumbnailUrl: string
}

interface LightboxProps {
  images: LightboxImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onIndexChange: (index: number) => void
}

export function Lightbox({ images, currentIndex, isOpen, onClose, onIndexChange }: LightboxProps) {
  const [zoomLevel, setZoomLevel] = useState(1)

  const currentImage = images[currentIndex]

  const handlePrevImage = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1)
      setZoomLevel(1)
    }
  }, [currentIndex, onIndexChange])

  const handleNextImage = useCallback(() => {
    if (currentIndex < images.length - 1) {
      onIndexChange(currentIndex + 1)
      setZoomLevel(1)
    }
  }, [currentIndex, images.length, onIndexChange])

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3))
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 0.5))
  const handleResetZoom = () => setZoomLevel(1)

  const handleDownload = async () => {
    if (!currentImage) return
    try {
      const response = await fetch(currentImage.thumbnailUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = currentImage.name || 'image.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch {
      window.open(currentImage.thumbnailUrl, '_blank')
    }
  }

  const handleClose = () => {
    setZoomLevel(1)
    onClose()
  }

  if (!isOpen || !currentImage) return null

  return (
    <div
      className="fixed inset-0 bg-black z-[60] flex items-center justify-center"
      onClick={handleClose}
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
          onClick={handleClose}
          title="Close"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      {currentIndex > 0 && (
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
      {currentIndex < images.length - 1 && (
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
        {currentIndex + 1} / {images.length}
      </div>

      {/* Image Container with Zoom */}
      <div
        className="relative max-w-6xl max-h-[90vh] w-full h-full p-4 overflow-hidden flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-full h-full transition-transform duration-200 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <Image
            key={currentImage.id}
            src={currentImage.thumbnailUrl}
            alt={currentImage.name || 'Gallery image'}
            fill
            className="object-contain"
            unoptimized
            sizes="(max-width: 1536px) 100vw, 1536px"
            priority
          />
        </div>
      </div>
    </div>
  )
}
