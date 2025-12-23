'use client'

import { useState, useEffect, useCallback } from 'react'
import type { DriveImage, DriveFolder } from '@/types'

// Re-export types for backward compatibility
export type { DriveImage, DriveFolder }

interface UseDriveFoldersResult {
  folders: DriveFolder[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseFolderImagesResult {
  images: DriveImage[];
  subfolders: DriveFolder[];
  loading: boolean;
  error: string | null;
  fetchFolder: (folderId: string) => Promise<void>;
}

/**
 * Hook to fetch top-level folders with cover images
 * This is fast - only loads folder list + 1 cover image per folder
 */
export function useDriveFolders(): UseDriveFoldersResult {
  const [folders, setFolders] = useState<DriveFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFolders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/drive/folders');
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch folders');
      }

      setFolders(data.folders);
    } catch (err) {
      console.error('Error fetching drive folders:', err);
      setError(err instanceof Error ? err.message : 'Failed to load folders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  return {
    folders,
    loading,
    error,
    refetch: fetchFolders,
  };
}

/**
 * Hook to fetch images from a specific folder (on-demand)
 * Called when user clicks on a folder
 */
export function useFolderImages(): UseFolderImagesResult {
  const [images, setImages] = useState<DriveImage[]>([]);
  const [subfolders, setSubfolders] = useState<DriveFolder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFolder = useCallback(async (folderId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/drive/folder/${folderId}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch folder');
      }

      setImages(data.images);
      setSubfolders(data.subfolders || []);
    } catch (err) {
      console.error('Error fetching folder images:', err);
      setError(err instanceof Error ? err.message : 'Failed to load images');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    images,
    subfolders,
    loading,
    error,
    fetchFolder,
  };
}
