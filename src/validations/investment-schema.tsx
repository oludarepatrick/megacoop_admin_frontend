import { z } from "zod";

// Step 1: Business Owner Info
export const step1Schema = z.object({
    founder_name: z.string().min(2, "Founder name is required"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    email: z.email("Invalid email"),
    office_address: z.string().min(1, "Address is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
});

// Step 2: Company Info
export const step2Schema = z.object({
    title: z.string().min(2, "Investment title is required"),
    company_name: z.string().min(2, "Company name is required"),
    company_type: z.string().min(1, "Company type is required"),
    industry: z.string().min(1, "Business sector is required"),
    brief_description: z.string().optional(),
    website: z.string().optional(),
});

// Step 3: Company Funds
export const step3Schema = z.object({
    amount_needed: z.string().min(1, "amount is required"),
    equity_offering: z.string().optional(),
    current_valuation: z.string().min(1, "current valuation is required"),
    vesting_period: z.string().min(1, "vesting period is required"),
    roi: z.string().min(1, "roi is required"),
    detail_description: z.string().min(1, "Purpose is required"),

});

// Step 4: Bank Details
export const step4Schema = z.object({
    investors_count: z.string().min(1, "investors count is required"),
    minimum_amount : z.string().min(1, "minimum amount is required"),
    max_amount : z.string().min(1, "max amount is required"),
    bank_name: z.string().min(1, "Bank name is required"),
    account_no: z.string().min(10, "Valid account number is required"),
    account_name: z.string().min(1, "Account name is required"),
});

// Step 5: Documents (optional validation)
export const step5Schema = z.object({
    document: z.instanceof(File).optional(),
});

// Complete schema
export const investmentFormSchema = step1Schema
  .and(step2Schema)
  .and(step3Schema)
  .and(step4Schema)
  .and(step5Schema);

export const editFormSchema = z.object({
    title: z.string().optional(),
    company_name: z.string().optional(),
    founder_name: z.string().optional(),
    industry: z.string().optional(),
    email: z.email("Invalid email"),
    office_address: z.string().optional(),
    minimum_amount : z.string().optional(),
    max_amount : z.string().optional(),
    amount_needed: z.string().optional(),
    roi: z.string().optional(),
    status: z.enum(["approved", "pending", "rejected"]).optional()
})

export type InvestmentFormData = z.infer<typeof investmentFormSchema>;
export type InvestmentFinalFormData = InvestmentFormData & {
    status: "pending" | "approved" | "rejected"
}
export type EditFormData = z.infer<typeof editFormSchema>

