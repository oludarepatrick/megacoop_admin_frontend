export type Loan = {
    id: number
    user_id: number
    guarantor_user_id: number
    guarantor_details: null
    amount: string
    term_type: string
    term_value: number
    auto_payment: boolean
    interest_rate: string
    tax: string
    monthly_repayment: string
    total_payback: string
    next_repayment_date: string
    no_of_payments: number
    status: "pending"|"approved"|"denied"
    guarantor_approval_status: string
    purpose: string
    admin_remarks: string | null
    receipt_path: string | null
    created_at: string
    user: {
        first_name: string
        middle_name: string
        last_name: string
        phone: string
        email: string
    }
}

export type LoanResponse = {
    current_page: number
    data: Loan[]
    last_page: number
    per_page: number
    total: number,
}
