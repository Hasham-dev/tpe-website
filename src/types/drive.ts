/**
 * Centralized types for Google Drive integration
 */

export interface DriveImage {
  id: string
  name: string
  url: string
  thumbnailUrl: string
  fallbackUrl: string
  mimeType: string
  size?: string
  folder?: string
}

export interface DriveFolder {
  id: string
  name: string
  images: DriveImage[]
  subfolders: DriveFolder[]
}

export interface ProtectedFolder {
  id: string
  name: string
  coverUrl: string | null
}

export interface VerifyPasswordResult {
  success: boolean
  error?: string
  remainingAttempts?: number
}
