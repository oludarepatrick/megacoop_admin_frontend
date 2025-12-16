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
      // TODO: Replace with actual API call
      // const response = await axios.get<any>('/admin/loans');
      // fetch 2 different endpoint for statistics with promises.all
      const [response1, response2] = await Promise.all([
        axios.get<any>('/admin/loans'),
        axios.get<any>('/admin/loans/dashboard'),
      ]);
      // console.log("Loan statistics response:", response1);
      console.log("Loan dashboard response:", response2);
      // Use response.data and provide safe fallbacks to avoid runtime/TS errors
      const data = response1?.data ?? {}
      const totals = data?.totals ?? {}
      const dashboardData = response2?.data ?? {}

      // Dummy / mapped data
      return {
        totalApplicants: totals?.total_loan_app_value ?? 1000000,
        totalLoans: dashboardData?.total_approved_loans ?? 350000,
        totalDisbursed: dashboardData?.total_disbursed ?? 850000,
        totalDefaulted: data?.total_defaulted ?? 320000,
        interestEarned: dashboardData?.total_interest ?? 320000,
      }
    } catch (error) {
      console.error("Error fetching loan statistics:", error)
      throw error
    }
  },

  // Get loan analytics data (for charts)
    //   getLoanAnalytics: async (): Promise<LoanAnalytics> => {
    getLoanAnalytics: async () => {
    try {
      const response = await axios.get<any>('/admin/loans/dashboard');
      console.log("Loan statistics response:", response.data.piechart);
      // Use response.data and provide safe fallbacks to avoid runtime/TS errors
      const data = response?.data.piechart ?? {}
      // const totals = data?.totals ?? {}
      // Dummy data
      return {
        monthlyApprovals: [
          { month: "Jan", approved: 120, pending: 45, rejected: 20 },
          { month: "Feb", approved: 150, pending: 60, rejected: 25 },
          { month: "Mar", approved: 130, pending: 50, rejected: 18 },
          { month: "Apr", approved: 180, pending: 70, rejected: 30 },
          { month: "May", approved: 160, pending: 55, rejected: 22 },
          { month: "Jun", approved: 200, pending: 80, rejected: 35 },
        ],
        loansByStatus: [
          { name: "Total Loan", value: data?.totalloan ?? 350000, fill: "#22c55e" },
          { name: "Total Default", value: data?.totalpayback ?? 320000, fill: "#f59e0b" },
          { name: "Loan Profit", value: data?.totalinterest ?? 300000, fill: "#3b82f6" },
          // { name: "Denied", value: 10, fill: "#ef4444" },
        ],
        disbursalTrend: [
          { week: "Week 1", amount: 120000 },
          { week: "Week 2", amount: 150000 },
          { week: "Week 3", amount: 130000 },
          { week: "Week 4", amount: 180000 },
        ],
      }
    } catch (error) {
      console.error("Error fetching loan analytics:", error)
      throw error
    }
  },
}