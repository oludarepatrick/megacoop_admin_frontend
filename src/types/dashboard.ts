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
  total_earn: string
  total_disburse: string
  total_saved: string
  total_loan: string
  percentages: {
    earn: number
    disburse: number
    saved: number
    loan: number
  }
}
