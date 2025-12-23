'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FolderOpen, ImageOff } from 'lucide-react'
import { Shimmer } from './Shimmer'
import { cn } from '@/lib/utils'

export interface DriveImageData {
  id: string
  name: string
  thumbnailUrl: string
  fallbackUrl?: string
  url?: string
}

interface DriveImageProps {
  image: DriveImageData
  alt: string
  className?: string
  variant?: 'light' | 'dark'
  fill?: boolean
  sizes?: string
  errorIcon?: 'folder' | 'image'
  priority?: boolean
  unoptimized?: boolean
}

/**
 * Image component with fallback support for Google Drive images
 * Handles loading states, error states, and automatic fallback to alternative URLs
 */
export function DriveImage({
  image,
  alt,
  className = '',
  variant = 'light',
  fill = true,
  sizes,
  errorIcon = 'image',
  priority = false,
  unoptimized = true,
}: DriveImageProps) {
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
    const ErrorIcon = errorIcon === 'folder' ? FolderOpen : ImageOff
    const bgColor = variant === 'dark'
      ? 'bg-gray-800'
      : 'bg-gradient-to-br from-gray-100 to-gray-200'
    const iconColor = variant === 'dark' ? 'text-gray-600' : 'text-gray-300'

    return (
      <div className={cn('w-full h-full flex items-center justify-center', bgColor)}>
        <ErrorIcon className={cn('w-16 h-16', iconColor)} />
      </div>
    )
  }

  return (
    <>
      {isLoading && <Shimmer variant={variant} />}
      <Image
        src={currentSrc}
        alt={alt}
        fill={fill}
        className={cn(
          className,
          'transition-opacity duration-500',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        unoptimized={unoptimized}
        sizes={sizes}
        priority={priority}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}

/**
 * Cover image variant with folder icon for empty states
 */
export function CoverImage({
  src,
  fallbackSrc,
  alt,
  className = '',
  variant = 'light',
}: {
  src: string | null
  fallbackSrc?: string
  alt: string
  className?: string
  variant?: 'light' | 'dark'
}) {
  if (!src) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <FolderOpen className="w-16 h-16 text-gray-300" />
      </div>
    )
  }

  return (
    <DriveImage
      image={{ id: '', name: alt, thumbnailUrl: src, fallbackUrl: fallbackSrc }}
      alt={alt}
      className={className}
      variant={variant}
      errorIcon="folder"
    />
  )
}
