export interface LoginResponse {
  success: boolean
  data: {
    admin: Admin
    token: string
  }
  message: string
}

export type AuthState = {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type Admin = {
  id?: string
  first_name: string
  last_name: string
  email: string
  avatar?: string
}

export type accessCodeResponse = {
  success: boolean
  message: string
  data: {
    access_code: string
    expires_at: string
  }
}

// API Error Types
export interface ApiErrorResponse {
  success: false
  message: string
  data?: unknown
  errors?: Record<string, string[]>
}

export interface ApiError extends Error {
  response?: {
    data: ApiErrorResponse
    status: number
    statusText: string
  }
  status?: number
  statusText?: string
}

// Generic error type for handling various error scenarios
export type AppError = ApiError | Error | { message: string }
