import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().min(1, {message: "Email is required"}).email({message: "Invalid email address"}),
    password: z.string().min(1, {message: "Password is required"}).min(6, {message: "Password must be at least 6 characters"})
})

export const forgotPasswordEmailSchema = z.object({
    email: z.string().nonempty("email is required").email("Invalid email format"),
});

export const sendPasswordSchema = z.object({
    email: z.string().email("Invalid email"),
    token: z.string().min(1, "Token is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(8, "Confirm Password must be at least 8 characters"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"], // Set the path of the error to password_confirmation field
});

export type LoginFormData = z.infer<typeof loginSchema>
export type ForgotPasswordEmailFormData = z.infer<typeof forgotPasswordEmailSchema>
export type SendPasswordFormData = z.infer<typeof sendPasswordSchema>