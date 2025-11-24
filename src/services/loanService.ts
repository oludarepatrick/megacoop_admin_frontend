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

export interface RejectionReason {
  reason: string
  explanation?: string
}

// Dummy data
const dummyLoans: Loan[] = [
  {
    id: "LOAN001",
    firstName: "Frank",
    lastName: "Junior",
    email: "frank.j@gmail.com",
    phone: "07068935648",
    amount: 750000,
    date: "28 Oct,12:30 AM",
    status: "approved",
    interestRate: 5.5,
    disbursedAmount: 750000,
    ROI: "16-20%",
    previousLoanStatus: true,
    rating: 4.5,
    guarantorsApproved: true,
  },
  {
    id: "LOAN002",
    firstName: "Ninah",
    lastName: "Bruno",
    email: "ninah.b@gmail.com",
    phone: "07068935648",
    amount: 570000,
    date: "28 Oct, 12:30 AM",
    status: "pending",
    interestRate: 6.2,
    disbursedAmount: 0,
    ROI: "12-15%",
    previousLoanStatus: false,
    rating: 4.8,
    guarantorsApproved: false,
  },
  {
    id: "LOAN003",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@gmail.com",
    phone: "08012345678",
    amount: 1200000,
    date: "27 Oct, 10:15 AM",
    status: "disbursed",
    interestRate: 5.0,
    disbursedAmount: 1200000,
    ROI: "10-12%",
    previousLoanStatus: true,
    rating: 4.8,
    guarantorsApproved: true,
  },
  {
    id: "LOAN004",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@gmail.com",
    phone: "09012345678",
    amount: 450000,
    date: "26 Oct, 03:45 PM",
    status: "pending",
    interestRate: 6.8,
    disbursedAmount: 0,
    ROI: "14-18%",
    previousLoanStatus: false,
    rating: 3.9,
    guarantorsApproved: false,
  },
  {
    id: "LOAN005",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@gmail.com",
    phone: "07087654321",
    amount: 950000,
    date: "25 Oct, 09:20 AM",
    status: "approved",
    interestRate: 5.3,
    disbursedAmount: 950000,
    ROI: "16-20%",
    previousLoanStatus: true,
    rating: 4.5,
    guarantorsApproved: true,
  },
  {
    id: "LOAN006",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.w@gmail.com",
    phone: "08098765432",
    amount: 650000,
    date: "24 Oct, 02:30 PM",
    status: "disbursed",
    interestRate: 5.8,
    disbursedAmount: 650000,
    ROI: "10-12%",
    previousLoanStatus: true,
    rating: 4.8,
    guarantorsApproved: true,
  },
  {
    id: "LOAN007",
    firstName: "David",
    lastName: "Brown",
    email: "david.b@gmail.com",
    phone: "07055555555",
    amount: 800000,
    date: "23 Oct, 11:00 AM",
    status: "pending",
    interestRate: 7.0,
    disbursedAmount: 0,
    ROI: "14-18%",
    previousLoanStatus: false,
    rating: 3.7,
    guarantorsApproved: false,
  },
  {
    id: "LOAN008",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.d@gmail.com",
    phone: "09099999999",
    amount: 350000,
    date: "22 Oct, 04:15 PM",
    status: "approved",
    interestRate: 5.2,
    disbursedAmount: 350000,
    ROI: "12-15%",
    previousLoanStatus: true,
    rating: 4.2,
    guarantorsApproved: true,
  },
]

export const loanService = {
// class LoanService {
//   private axiosInstance: AxiosInstance
//   private apiUrl: string

//   constructor() {
//     // TODO: Replace with actual API URL when ready
//     this.apiUrl = process.env.REACT_APP_API_URL || "https://api.example.com"
//     this.axiosInstance = axios.create({
//       baseURL: this.apiUrl,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//   }

  // Get loan statistics
    //   async getLoanStatistics(): Promise<LoanStatistics> {
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

  // Get loans with pagination, search, and filters
    //   async getLoans(page = 1, search?: string, status?: string, perPage = 10): Promise<LoanPaginatedResponse> {
    getLoans: async (page = 1, search?: string, status?: string, perPage = 20): Promise<LoanPaginatedResponse> => {
    try {
      // TODO: Replace with actual API call
      const response = await axios.get('/admin/loans/applicants', {
      //   params: { page, search, status, per_page: perPage },
        params: {page, status},
      });
      console.log("Loans response:", response.data.data.data);
      // return response.data;

      // Dummy pagination logic
      let filteredLoans = dummyLoans
      // let filteredLoans: Loan[] = response.data.data.data;

      // Filter by search (full name)
      if (search) {
        const searchLower = search.toLowerCase()
        filteredLoans = filteredLoans.filter((loan) =>
          `${loan.firstName} ${loan.lastName}`.toLowerCase().includes(searchLower),
        )
      }

      // Filter by status
      if (status && status !== "all") {
        filteredLoans = filteredLoans.filter((loan) => loan.status === status)
      }

      const total = filteredLoans.length
      const lastPage = Math.ceil(total / perPage)
      const from = (page - 1) * perPage + 1
      const to = Math.min(page * perPage, total)
      const paginatedData = filteredLoans.slice((page - 1) * perPage, page * perPage)

      return {
        data: paginatedData,
        current_page: page,
        from,
        to,
        per_page: perPage,
        total,
        last_page: lastPage,
        first_page_url: `?page=1`,
        last_page_url: `?page=${lastPage}`,
        next_page_url: page < lastPage ? `?page=${page + 1}` : null,
        prev_page_url: page > 1 ? `?page=${page - 1}` : null,
        path: "/loans",
          // links: this.generatePaginationLinks(page, lastPage),
        links: loanService.generatePaginationLinks(page, lastPage),
      }
    } catch (error) {
      console.error("Error fetching loans:", error)
      throw error
    }
  },

  // Get single loan details
    //   async getLoanDetail(loanId: string): Promise<LoanDetail> {
    getLoanDetail: async (loanId: string): Promise<LoanDetail> => {
    try {
      // TODO: Replace with actual API call
      // const response = await this.axiosInstance.get(`/loans/${loanId}`);
      // return response.data;

      const loan = dummyLoans.find((l) => l.id === loanId)
      if (!loan) throw new Error("Loan not found")

      // Dummy extended details
      return {
        ...loan,
        loanPurpose: "Business Expansion",
        collateral: "Property Title Deed",
        employmentStatus: "Employed",
        yearsOfEmployment: 5,
        monthlyIncome: 150000,
        creditScore: 750,
      }
    } catch (error) {
      console.error("Error fetching loan detail:", error)
      throw error
    }
  },

  // Approve loan
    //   async approveLoan(loanId: string): Promise<{ success: boolean; message: string }> {
    approveLoan: async (loanId: string): Promise<{ success: boolean; message: string }> => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.post(`/admin/loans/${loanId}/approve`);
      // return response.data;

      console.log(`Loan ${loanId} approved`)
      return { success: true, message: "Loan approved successfully" }
    } catch (error) {
      console.error("Error approving loan:", error)
      throw error
    }
  },

  // Reject loan
    //   async rejectLoan(loanId: string, rejectionData: RejectionReason): Promise<{ success: boolean; message: string }> {
    rejectLoan: async (loanId: string, rejectionData: RejectionReason): Promise<{ success: boolean; message: string }> => {
    try {
      // TODO: Replace with actual API call
      const response = await axios.post(`/admin/loans/${loanId}/deny`, rejectionData);
      console.log("Loan rejection response:", response);
      // return response.data;

      console.log(`Loan ${loanId} rejected with reason:`, rejectionData)
      return { success: true, message: "Loan rejected successfully" }
    } catch (error) {
      console.error("Error rejecting loan:", error)
      throw error
    }
  },

  // Helper method to generate pagination links
    //   private generatePaginationLinks(currentPage: number, lastPage: number) {
generatePaginationLinks: (currentPage: number, lastPage: number) => {
    const links = []

    if (currentPage > 1) {
      links.push({
        url: `?page=${currentPage - 1}`,
        label: "Previous",
        active: false,
      })
    }

    for (let i = Math.max(1, currentPage - 1); i <= Math.min(lastPage, currentPage + 1); i++) {
      links.push({
        url: `?page=${i}`,
        label: i.toString(),
        active: i === currentPage,
      })
    }

    if (currentPage < lastPage) {
      links.push({
        url: `?page=${currentPage + 1}`,
        label: "Next",
        active: false,
      })
    }

    return links
  }
}

// export default new LoanService()
