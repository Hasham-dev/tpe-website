/**
 * Centralized types for API responses
 */

export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  error?: string
  data?: T
}

export interface DriveApiResponse<T> extends ApiResponse<T> {
  folders?: T
  images?: T
  subfolders?: T
  count?: number
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number
  pageSize: number
  total: number
  hasMore: boolean
}
