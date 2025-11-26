type Investments = {
    id: number
    user_id: number
    investment_id: number
    inv_name: string
    sub_type: string
    amount: string
    interest_earned: string
    status: "pending" | "approved" | "denied";
    created_at: string
}

export type ActiveUserInvestment = {
    member_id: string
    uuid: string
    first_name: string,
    middle_name: string
    last_name: string
    phone: string
    email: string
    investments: Investments[]
}

export type ActiveUserInvestmentResponse = {
  current_page: number
  data: ActiveUserInvestment[]
  last_page: number
  per_page: number
  total: number,
}
