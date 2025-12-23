'use client'

import { useState, useCallback } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseFetchOptions {
  initialLoading?: boolean
}

interface UseFetchReturn<T> extends FetchState<T> {
  execute: (url: string, options?: RequestInit) => Promise<T | null>
  reset: () => void
  setData: (data: T | null) => void
}

/**
 * Generic fetch hook for API calls
 * Handles loading, error, and success states
 */
export function useFetch<T>(options: UseFetchOptions = {}): UseFetchReturn<T> {
  const { initialLoading = false } = options

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: initialLoading,
    error: null,
  })

  const execute = useCallback(async (url: string, fetchOptions?: RequestInit): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url, fetchOptions)

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const data = await response.json()

      // Check for API-level success flag
      if (data.success === false) {
        throw new Error(data.message || data.error || 'Request failed')
      }

      setState({ data, loading: false, error: null })
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setState({ data: null, loading: false, error: errorMessage })
      console.error('Fetch error:', err)
      return null
    }
  }, [])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  const setData = useCallback((data: T | null) => {
    setState(prev => ({ ...prev, data }))
  }, [])

  return {
    ...state,
    execute,
    reset,
    setData,
  }
}

/**
 * Hook for fetching data on mount
 * Automatically fetches when URL changes
 */
export function useFetchOnMount<T>(url: string, options?: RequestInit) {
  const { data, loading, error, execute } = useFetch<T>({ initialLoading: true })

  // Note: The component using this should call execute in useEffect
  // This is just a convenience wrapper

  return {
    data,
    loading,
    error,
    refetch: () => execute(url, options),
  }
}
