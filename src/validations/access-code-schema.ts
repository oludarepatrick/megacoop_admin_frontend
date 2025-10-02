import {z} from 'zod'

export const accessCodeSchema = z.object({
    first_name: z.string().min(1, {message: "First name is required"}),
    middle_name: z.string().min(1, {message: "Middle name is required"}),
    last_name: z.string().min(1, {message: "Last name is required"}),
    email: z.string().min(1, {message: "Email is required"}).email({message: "Invalid email address"}),
    phone: z.string().min(1, {message: "Phone is required"}).min(11, {message: "Phone number must be at least 11 characters"}),
    user_type: z.enum(["new", "old"], {message: "User type is required"})
})
   

export type accessCodeFormData = z.infer<typeof accessCodeSchema>