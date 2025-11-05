import {z} from 'zod'

export const kycDeclineSchema = z.object({
    // uuid: z.string(),
    status: z.string(),
    admin_comment: z.string().min(1, {message: "Email is required"}),
    what_failed: z.string().min(1, {message: "This field is required"})
})
   

export type KycDeclineFormData = z.infer<typeof kycDeclineSchema>