export type TopTrendingInvestment = {
  id: number;
  title: string
  company_name: string
  industry: string
  roi: string
  investors_count: number
  status: string;
}

export type InvestmentDashboard = {
  total_approved_investors: number
  total_paid_roi: number
  total_amount_raised: number
  piechart: {
    amount_raised: number
    total_roi: number
    amount_percentage: number
    roi_percentage: number
  }  
}

export type InvestmentStatus = "pending" | "approved" | "rejected";

export type ListInvestment = {
  id: number
  title: string
  company_name: string
  company_type: string
  founder_name: string
  industry: string
  brief_description: string
  detail_description: string
  state: string
  city: string
  office_address: string
  phone: string
  email: string
  website: string
  current_valuation: string
  amount_needed: string
  equity_offering: string
  vesting_period: string
  roi: string
  investors_count: number
  minimum_amount: string
  max_amount: string
  bank_name: string 
  account_no: string
  account_name: string
  document: string
  status: InvestmentStatus
  created_at: string
}
export type ListInvestmentResponse = {
  current_page: number
  data: ListInvestment[]
  last_page: number
  per_page: number
  total: number,
}

export type InvestmentApplication = {
  id: number
  user_id: number
  investment_id: number
  inv_name: string
  sub_type: string
  amount: number
  user:{
    first_name: string,
    middle_name: string
    last_name: string
    phone: string
    email: string
  }
  investment:{
    minimum_amount: string
    roi: string
    vesting_period: string
  }
  status: InvestmentStatus
  denied_reason: string
  created_at: string
}

export type InvestmentApplicationResponse = {
  current_page: number
  data: InvestmentApplication[]
  last_page: number
  per_page: number
  total: number
}

export type ApproveRejectInvestment = {
  status: InvestmentStatus
  denied_reason: string
}