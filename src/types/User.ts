import * as z from "zod"

export interface User {
  id: number
  first_name: string
  middle_name?: string
  last_name: string
  full_name: string
  email: string
  phone: string
  role: {id:number, name: string}
  status: number
  status_text: "Active" | "Inactive"
  avatar?: string
  permisions: string[]
}

export interface UserResponse {
  data: User[]
  meta: {
    total: number
    current_admin_id: number
    current_admin_name: number
    timestamp: string
  }
  // meta: {
  //   total: number
  //   page: number
  //   limit: number
  //   totalPages: number
  // }
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
  role_id: z.number().min(1, "Role is required"),
})