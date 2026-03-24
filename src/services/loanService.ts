/* eslint-disable @typescript-eslint/no-explicit-any */
// import { type AxiosInstance } from "axios"
import axios from "@/lib/axiosInstance";
// import type { get } from "react-hook-form";

// Types
export interface Loan {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  amount: number
  date: string
  status: "approved" | "pending" | "disbursed" | "denied"
  interestRate: number
  disbursedAmount: number
  ROI?: string
  previousLoanStatus?: boolean
  rating?: number
  guarantorsApproved?: boolean
}

export interface LoanStatistics {
  totalApplicants: number
  totalLoans: number
  totalDisbursed: number
  totalDefaulted: number
  interestEarned: number
}

export interface LoanPaginatedResponse {
  data: Loan[]
  current_page: number
  from: number
  to: number
  per_page: number
  total: number
  last_page: number
  first_page_url: string
  last_page_url: string
  next_page_url: string | null
  prev_page_url: string | null
  path: string
  links: Array<{
    url: string | null
    label: string
    active: boolean
  }>
}

export interface LoanDetail extends Loan {
  loanPurpose: string
  collateral: string
  employmentStatus: string
  yearsOfEmployment: number
  monthlyIncome: number
  creditScore: number

}

export const loanService = {
  // Get loan statistics
  getLoanStatistics: async (): Promise<LoanStatistics> => {
    try {
      const [response1, response2] = await Promise.all([
        axios.get<any>('/admin/loans'),
        axios.get<any>('/admin/loans/dashboard'),
      ]);
      const data = response1?.data ?? {}
      const totals = data?.totals ?? {}
      const dashboardData = response2?.data ?? {}

      return {
        totalApplicants: totals?.total_loan_app_value,
        totalLoans: dashboardData?.total_approved_loans,
        totalDisbursed: dashboardData?.total_disbursed,
        totalDefaulted: data?.total_defaulted,
        interestEarned: dashboardData?.total_interest,
      }
    } catch (error) {
      console.error("Error fetching loan statistics:", error)
      throw error
    }
  },

 
    getLoanAnalytics: async () => {
    try {
      const response = await axios.get<any>('/admin/loans/dashboard');
      const data = response?.data.piechart ?? {}
      return {
        loansByStatus: [
          { name: "Total Loan", value: data?.total_loan , fill: "#22c55e" },
          { name: "Total Default", value: data?.total_default ?? 0, fill: "#f59e0b" },
          { name: "Loan Profit", value: data?.total_payback, fill: "#3b82f6" },
        ],
      }
    } catch (error) {
      console.error("Error fetching loan analytics:", error)
      throw error
    }
  },
}