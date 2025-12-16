
// import { useState } from "react"
// import { useQuery } from "@tanstack/react-query"
// import { toast } from "sonner"

// import { Button } from "@/components/ui/button"
// import { LoanStatisticsCards } from "@/components/loan/loanStatisticsCards"
// import { LoanAnalyticsModal } from "@/components/loan/loanAnalyticsModal"
// import { LoanSearchFilter } from "@/components/loan/loanSearchFilter"
// import { LoanTableTabs } from "@/components/loan/loanTableTabs"
// import { LoanPagination } from "@/components/loan/loanPagination"
// import { BarChart3 } from "lucide-react"
// import { loanService, type Loan } from "@/services/loanService"
// import LoanDetailModal from "@/components/loan/loanDetailModal"

// export default function LoansPage() {
//   const [showAnalyticsModal, setShowAnalyticsModal] = useState(false)
//   const [showDetailModal, setShowDetailModal] = useState(false)
//   const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)
//   const [activeTab, setActiveTab] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectFilter, setSelectFilter] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
  

//   // Fetch statistics
//   const { data: statisticsData, isLoading: isLoadingStatistics } = useQuery({
//     queryKey: ["loanStatistics"],
//     queryFn: () => loanService.getLoanStatistics(),
//   })

//   // Fetch analytics data
//   const { data: analyticsData } = useQuery({
//     queryKey: ["loanAnalytics"],
//     queryFn: () => loanService.getLoanAnalytics(),
//   })

//   // Fetch loans with pagination and filters
//   const { data: loansData, isLoading: isLoadingLoans } = useQuery({
//     queryKey: ["loans", currentPage, searchQuery, activeTab],
//     // queryFn: () => loanService.getLoans(currentPage, searchQuery, activeTab !== "all" ? activeTab : undefined, 10),
//     queryFn: () => loanService.getLoans(currentPage, searchQuery, activeTab, 20),
//   })

//   console.log("Loans Data:", loansData)

//   const handleApprove = async (loanId: string) => {
//     try {
//       await loanService.approveLoan(loanId)
//       toast.success("Success", {
//         description: "Loan approved successfully",
//       })
//     } catch (error) {
//       toast.error("Error", {
//         description: `Failed to approve loan ${error instanceof Error ? `: ${error.message}` : ""}`,
//       })
//     }
//   }

//   const handleReject = async (loanId: string, reason: string, explanation?: string) => {
//     try {
//       await loanService.rejectLoan(loanId, { reason, explanation })
//       toast("Success", {
//         description: "Loan rejected successfully",
//       })
//     } catch (error) {
//       toast.error("Error", {
//         description: `Failed to reject loan ${error instanceof Error ? `: ${error.message}` : ""}`,
//       })
//     }
//   }

//   const handleViewLoan = (loan: Loan) => {
//     setSelectedLoan(loan)
//     setShowDetailModal(true)
//   }

//   return (
//     <div className="min-h-screen p-4 md:p-6 space-y-8 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="space-y-2">
//         <h1 className="text-3xl font-bold ">Loan</h1>
//       </div>

//       {/* Statistics Cards */}
//       {/* {statistics && <LoanStatisticsCards statistics={statistics} />} */}

//       {/* {statistics ? <LoanStatisticsCards statistics={statistics} /> : <div className="flex items-center w-full">Loading statistics...</div>} */}
//       <LoanStatisticsCards
//         statistics={
//           statisticsData ?? {
//             totalApplicants: 0,
//             totalLoans: 0,
//             totalDisbursed: 0,
//             totalDefaulted: 0,
//             interestEarned: 0,
//           }
//         }
//         isLoading={isLoadingStatistics}
//       />

//       {/* Analytics Button */}
//       <Button
//         variant="outline"
//         className="border-green-600 text-green-600 hover:bg-green-50 gap-2 w-full md:w-fit bg-transparent"
//         onClick={() => setShowAnalyticsModal(true)}
//       >
//         <BarChart3 className="w-4 h-4" />
//         View Analytic Loan performance chart
//       </Button>

//       {/* Analytics Modal */}
//       {analyticsData && (
//         <LoanAnalyticsModal
//           open={showAnalyticsModal}
//           onOpenChange={setShowAnalyticsModal}
//           analyticsData={analyticsData}
//         />
//       )}

//       {/* Search and Filters */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <h2 className="text-xl font-bold">Recent Loans</h2>
//         <LoanSearchFilter
//             onSearchChange={setSearchQuery}
//             onFilterChange={setSelectFilter}
//             // onDateChange={() => { }}
//           />
//       </div>

//       {/* Loans Table */}
//       {loansData && (
//         <>
//           <LoanTableTabs
//             activeTab={activeTab}
//             onTabChange={(tab) => {
//               setActiveTab(tab)
//               setCurrentPage(1)
//             }}
//             loans={loansData.data}
//             onViewLoan={handleViewLoan}
//             isLoading={isLoadingLoans}
//             searchPerformed={searchQuery.length > 0 && loansData.data.length === 0}
//             filter={selectFilter}
//           />

//           {/* Pagination */}
//           {loansData.last_page > 1 && (
//             <LoanPagination currentPage={currentPage} lastPage={loansData.last_page} onPageChange={setCurrentPage} />
//           )}
//         </>
//       )}

//       {/* Loan Detail Modal */}
//       <LoanDetailModal
//         open={showDetailModal}
//         onOpenChange={setShowDetailModal}
//         loanId={selectedLoan?.id || null}
//         onApprove={handleApprove}
//         onReject={handleReject}
//       />
//     </div>
//   )
// }
