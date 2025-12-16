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
  phone: string
  avatar?: string
}

export type accessCodeResponse = {
  message: string
  code: string
  expires_in_mins: number
}

// API Error Types
export type ApiErrorResponse = {
  success: false
  message: string
  data?: unknown
  errors?: Record<string, string[]>
}

export type ApiError = Error & {
  response?: {
    data: ApiErrorResponse
    status: number
    statusText: string
  }
  status?: number
  statusText?: string
}

export type AppError = ApiError | Error | { message: string }
