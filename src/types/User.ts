import * as z from "zod"

export interface User {
  id: string
  first_name: string
  middle_name?: string
  last_name: string
  email: string
  phone: string
  role: string
  status: "active" | "inactive"
  avatar?: string
}

export interface UserResponse {
  data: User[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface CreateUserInput {
  first_name: string
  middle_name?: string
  last_name: string
  email: string
  phone: string
  role: string
}



export type UserFormValues = z.infer<typeof userSchema>

export const userSchema = z.object({
  first_name: z.string().min(2, "first name must be at least 2 characters"),
  middle_name: z.string().min(2, "middle name must be at least 2 characters").optional(),
  last_name: z.string().min(2, "last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  role: z.string().min(2, "Role is required"),
})