import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

/**
 * Base skeleton component for loading states
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse bg-gray-200 rounded', className)} />
  )
}

/**
 * Folder card skeleton for gallery loading states
 */
export function FolderSkeleton() {
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

/**
 * Small folder skeleton for compact gallery grids
 */
export function SmallFolderSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-200 animate-pulse p-6">
      <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-2" />
      <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto" />
    </div>
  )
}

/**
 * Image skeleton for image grid loading states
 */
export function ImageSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-lg animate-pulse aspect-square',
      dark ? 'bg-white/10' : 'bg-gray-200'
    )} />
  )
}

/**
 * Grid of folder skeletons
 */
export function FolderSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <FolderSkeleton key={i} />
      ))}
    </div>
  )
}

/**
 * Grid of image skeletons
 */
export function ImageSkeletonGrid({ count = 15, dark = false }: { count?: number; dark?: boolean }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {[...Array(count)].map((_, i) => (
        <ImageSkeleton key={i} dark={dark} />
      ))}
    </div>
  )
}
