import { z } from "zod"

export const userIDSchema = z.object({
    uuid: z.string(),
})
 
export const walletBalanceSchema = z.object({
    amount: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    description: z.string().min(1, "Description is required"),
})
 
export const nhfSavingsSchema = z.object({
    nhf_amount: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    frequency: z.enum(["daily", "weekly", "monthly"], { message: "Select frequency" }),
})
 
export const targetSavingsSchema = z.object({
    goal_name: z.string().min(1, "Goal name is required"),
    purpose: z.string().min(1, "Purpose is required"),
    target_amount: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    amount_saved: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    frequency: z.enum(["daily", "weekly", "monthly"], { message: "Select frequency" }),
})
 
export const loanSchema = z.object({
    amount: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    purpose: z.string().min(1, "Purpose is required"),
    term_type: z.enum(["monthly", "weekly", "quarterly"], { message: "Select a term type" }),
    interest_rate: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    monthly_repayment: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    total_payback: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    next_repayment_date: z.string().min(1, "Select next repayment date"),
})
 
export const buyOnCreditSchema =  z.object({
    product_name: z.string().min(1, "Product name is required"),
    product_price: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    balance: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    interest_rate: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    interest_amount: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    repayment_months: z.string()
        .min(1, "This field is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter repayment months"),
    monthly_due: z.string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    next_due_date: z.string().min(1, "Select next due date"),
})

export type WalletBalanceFormValues = z.infer<typeof walletBalanceSchema>
export type NhfSavingsFormValues = z.infer<typeof nhfSavingsSchema>
export type TargetSavingsFormValues = z.infer<typeof targetSavingsSchema>
export type LoanFormValues = z.infer<typeof loanSchema>
export type BuyOnCreditFormValues = z.infer<typeof buyOnCreditSchema>
 