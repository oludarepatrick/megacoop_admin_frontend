export type DashboardStat = {
  total_users: number
  active_loans: number
  total_savings: string
  total_investments: number
  pending_loans: number
  disbursed_loans: number
}

export type DashboardCharts ={
  interest_earn: {
    months: string[]
    income: number[]
    outcome: number[]
  }
  expense_statistics: ExpenseStatistics
}

export type ExpenseStatistics ={
  total_earn: number
  total_disburse: number
  total_saved: number
  total_loan: number
  percentages: {
    earn: number
    disburse: number
    saved: number
    loan: number
  }
}

export type RecentLoan ={
  first_name: string,
  last_name: string
  phone: string
  email: string
  amount: string
  date: string
  status: "pending"|"approved"|"deny"
  purpose: "Business"
}[]