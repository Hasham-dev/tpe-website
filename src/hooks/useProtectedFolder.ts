'use client'

import { useState, useEffect, useCallback } from 'react'
import type { DriveImage, ProtectedFolder, VerifyPasswordResult } from '@/types'

const SESSION_STORAGE_PREFIX = 'law_gallery_auth_'

interface UseProtectedFoldersResult {
  folders: ProtectedFolder[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

interface UseProtectedFolderAuthResult {
  isAuthenticated: (folderName: string) => boolean
  verifyPassword: (folderName: string, password: string) => Promise<VerifyPasswordResult>
  clearAuth: (folderName: string) => void
  getAuthToken: (folderName: string) => string | null
}

interface UseFolderImagesResult {
  images: DriveImage[]
  loading: boolean
  error: string | null
  fetchImages: (folderId: string) => Promise<void>
}

// Hook to fetch protected folders list
export function useProtectedFolders(): UseProtectedFoldersResult {
  const [folders, setFolders] = useState<ProtectedFolder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFolders = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/drive/protected-folders')

      if (!response.ok) {
        throw new Error('Failed to fetch folders')
      }

      const data = await response.json()
      setFolders(data.folders || [])
    } catch (err) {
      console.error('Error fetching protected folders:', err)
      setError('Failed to load folders')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  return { folders, loading, error, refetch: fetchFolders }
}

// Hook for folder authentication
export function useProtectedFolderAuth(): UseProtectedFolderAuthResult {
  const getStorageKey = (folderName: string) => {
    return `${SESSION_STORAGE_PREFIX}${folderName.replace(/\s+/g, '_').toLowerCase()}`
  }

  const isAuthenticated = useCallback((folderName: string): boolean => {
    if (typeof window === 'undefined') return false
    const token = sessionStorage.getItem(getStorageKey(folderName))
    return !!token
  }, [])

  const getAuthToken = useCallback((folderName: string): string | null => {
    if (typeof window === 'undefined') return null
    return sessionStorage.getItem(getStorageKey(folderName))
  }, [])

  const verifyPassword = useCallback(async (
    folderName: string,
    password: string
  ): Promise<VerifyPasswordResult> => {
    try {
      const response = await fetch('/api/drive/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ folderName, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store token in session storage
        sessionStorage.setItem(getStorageKey(folderName), data.token)
        return { success: true }
      }

      return {
        success: false,
        error: data.error || 'Incorrect password',
        remainingAttempts: data.remainingAttempts,
      }
    } catch {
      return {
        success: false,
        error: 'Failed to verify password. Please try again.',
      }
    }
  }, [])

  const clearAuth = useCallback((folderName: string): void => {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem(getStorageKey(folderName))
  }, [])

  return { isAuthenticated, verifyPassword, clearAuth, getAuthToken }
}

// Hook to fetch images from a folder (reuse from existing hook structure)
export function useProtectedFolderImages(): UseFolderImagesResult {
  const [images, setImages] = useState<DriveImage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchImages = useCallback(async (folderId: string) => {
    try {
      setLoading(true)
      setError(null)
      setImages([])

      const response = await fetch(`/api/drive/folder/${folderId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch images')
      }

      const data = await response.json()
      setImages(data.images || [])
    } catch (err) {
      console.error('Error fetching folder images:', err)
      setError('Failed to load images')
    } finally {
      setLoading(false)
    }
  }, [])

  return { images, loading, error, fetchImages }
}
