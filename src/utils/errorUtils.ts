import type { AppError, ApiError } from '@/types'

/**
 * Extracts a user-friendly error message from various error types
 * @param error - The error object to extract message from
 * @param fallbackMessage - Default message if no specific error message found
 * @returns User-friendly error message
 */
export const getErrorMessage = (
  error: AppError, 
  fallbackMessage = 'Something went wrong. Please try again.'
): string => {
  // Handle API errors with response data
  if (isApiError(error) && error.response?.data?.message) {
    return error.response.data.message
  }
  
  // Handle errors with message property
  if ('message' in error && error.message) {
    return error.message
  }
  
  // Return fallback message
  return fallbackMessage
}

/**
 * Type guard to check if error is an API error
 * @param error - The error to check
 * @returns true if error is ApiError
 */
export const isApiError = (error: AppError): error is ApiError => {
  return 'response' in error && error.response !== undefined
}

/**
 * Gets the HTTP status code from an error
 * @param error - The error object
 * @returns HTTP status code or null if not available
 */
export const getErrorStatus = (error: AppError): number | null => {
  if (isApiError(error) && error.response?.status) {
    return error.response.status
  }
  if ('status' in error && typeof error.status === 'number') {
    return error.status
  }
  return null
}

/**
 * Checks if error is a network/connection error
 * @param error - The error object
 * @returns true if it's a network error
 */
export const isNetworkError = (error: AppError): boolean => {
  const message = getErrorMessage(error).toLowerCase()
  return message.includes('network') || 
         message.includes('connection') || 
         message.includes('timeout') ||
         getErrorStatus(error) === null
}