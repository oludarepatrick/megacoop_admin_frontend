import {z} from 'zod'

export const roiPaymentSchema = z.object({
    user_id: z.number(),
    investment_id: z.number(),
    roi: z.string().min(1, {message: "ROI is required"}),
    month: z.string().min(1, {message: "This field is required"}),
    year: z.string().min(1, {message: "This field is required"})
})

export type ROIPaymentFormData = z.infer<typeof roiPaymentSchema>
