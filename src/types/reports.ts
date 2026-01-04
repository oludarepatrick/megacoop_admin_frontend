export type ReportType = 
    | "loans"
    | "investments" 
    | "orders" 
    | "wallet-transactions"
    | "savings"
    | "buy-on-credit"
    | "buy-on-credit-payments"
    | "roi";

export type ReportFilters = {
    type: ReportType;
    year: string;
    from: string;
    to: string;
}

export type LoanReport = {
    id: number
    user_id: number
    guarantor_user_id: number | null
    amount: string
    term_type: string
    purpose: string
    status: string
    created_at: string
    user: {
        first_name: string
        middle_name: string
        last_name: string
        phone: string
        email: string
    }
    
}
export type OrderReport = {
    id: number
    user_id: number
    order_id: number
    items: {
        price: string, 
        quantity: number, 
        product_id: number, 
        product_name: string
        images: string[]
    }[]
    sub_total: string
    vat: string
    delivery_fee: string
    total_amount: string
    status: "pending" | "declined" | "completed"
    created_at: string
    user: {
        first_name: string
        middle_name: string
        last_name: string
        phone: string
        email: string
    }
}
export type InvestmentReport = {
    id: number
    user_id: number
    investment_id: number
    inv_name: string
    sub_type: string | null
    amount: string
    interest_earned: string
    status: string
    denied_reason: string | null
    consent: number
    created_at: string
    user: {
        first_name: string
        middle_name: string
        last_name: string
        phone: string
        email: string
    }
}
export type ROIReport = {
    id: number
    user_id: number
    investment_id: number
    amount_invested: string
    roi: string
    month: string
    year: string
    created_at: string
    user: {
        first_name: string
        middle_name: string
        last_name: string
        phone: string
        email: string
    }
}

export type BuyOnCreditReport = {
    id: number
    user_id: number
    product_id: number
    user: {
        first_name: string
        middle_name: string
        last_name: string
        phone: string
        email: string
    }
    meta: {
        total_payable: string
    }
    // amount: string
    created_at: string
    status: string
    
}
export type BuyOnCreditPaymentReport = {
    id: number
    user: {
        first_name: string
        middle_name: string
        last_name: string
        phone: string
        email: string
    }

}
export type WalletTransactionReport = {
    id: number
    type: string
    balance_b4: string
    amount: string
    reference: string
    description: string
    status: string
    denied_reason: string | null
    created_at: string
    user: {
        first_name: string
        middle_name: string
        last_name: string
        phone: string
        email: string
    }
}
export type SavingsReport = {
    id: number
    user_id: number
    saving_id: number
    type: string
    balance_b4: string
    amount: string
    next_due_date: string | null
    payment_method: string | null
    reference: string
    description: string
    status: string
    created_at: string
    user: {
        first_name: string
        middle_name: string
        last_name: string
        phone: string
        email: string
    }
}

export type ReportData = LoanReport | OrderReport | InvestmentReport | ROIReport | WalletTransactionReport | SavingsReport | BuyOnCreditReport | BuyOnCreditPaymentReport;

export type ReportResponse = {
    current_page: number
    data: ReportData[]
    last_page: number
    per_page: number
    total: number
}