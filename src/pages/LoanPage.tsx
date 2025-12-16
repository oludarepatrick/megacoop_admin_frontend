import { LoanAnalyticsModal } from "@/components/loan/loanAnalyticsModal"
import LoanDetailModal from "@/components/loan/loanDetailModal"
import { LoanSearchFilter } from "@/components/loan/loanSearchFilter"
import { LoanStatisticsCards } from "@/components/loan/loanStatisticsCards"
import LoanTable from "@/components/loan/LoanTable"
import PaginationComponent from "@/components/PaginationComponent"
import bcgImg from "@/assets/cash-bundle-man-hand.png"
import ReusableTabs from "@/components/ReusableTabs"
import { Button } from "@/components/ui/button"
import SuccessModal from "@/features/InvestmentComponent/SuccessModal"
import { useLoanAnalytics, useLoanData, useLoanStatistics } from "@/hooks/useLoan"
import type { Loan } from "@/types/loan"
import { BarChart3 } from "lucide-react"
import { useState } from "react"


const LoanPage = () => {    
    const [currentPage, setCurrentPage] = useState(1);
    const [showAnalyticsModal, setShowAnalyticsModal] = useState(false)
    const [activeTab, setActiveTab] = useState<Loan["status"] | "all" >("all");
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)
    const [successModal, setSuccessModal] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [filterValue, setFilterValue] = useState<"all" | "newest" | "oldest" | "highest" | "lowest">("all")

    
    const {data: statisticsData, isLoading: isLoadingStatistics} = useLoanStatistics()
    const {data: analyticsData } = useLoanAnalytics()
    const {data: loansData, isLoading: isLoadingLoanData, isError } = useLoanData(currentPage);

    const allLoans = loansData?.data || []    
    const totalPages = loansData?.last_page || 1


    const filterbyTab = activeTab === "all" 
    ? allLoans : allLoans.filter((list) => list.status === activeTab)

    // // filter by search
    // const filteredList = searchValue ?
    // filterbyTab.filter(loan => 
    //     inv.company_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    //     inv.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
    //     inv.company_type?.toLowerCase().includes(searchValue.toLowerCase())
    // ) : filterbyTab
    
    const transactionTabs = [
        { value: "all" as const, label: "All" },
        { value: "approved" as const, label: "Active" },
        { value: "pending" as const, label: "Inactive", showCount: true },
    ];

    const handleTabChange = (tab: Loan["status"] | "all") => {
        setActiveTab(tab)
        setCurrentPage(1)
    }
    
    const handleClose = () => {
        setSelectedLoan(null)
        setSuccessModal(true)
    }

    // search loans
    const searchedLoans = searchValue
    ? filterbyTab.filter((loan) =>
        loan.user.first_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        loan.user.last_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        String(loan.amount)?.includes(searchValue)
        )
    : filterbyTab

    // filter loan 
    const filteredLoans = [...searchedLoans].sort((a, b) => {
        switch (filterValue) {
            case "newest":
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            case "oldest":
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            case "highest":
            // return b.amount - a.amount
            return Number(b.amount) - Number(a.amount)
            case "lowest":
            // return a.amount - b.amount
            return Number(a.amount) - Number(b.amount)
            default:
            return 0
        }
    })

    
   
    return (
        <div className="font-jakarta space-y-6">
            <h2 className="font-semibold text-[20px]">Loan</h2>
            <LoanStatisticsCards
                statistics={
                    statisticsData ?? {
                        totalApplicants: 0,
                        totalLoans: 0,
                        totalDisbursed: 0,
                        totalDefaulted: 0,
                        interestEarned: 0,
                    }
                }
                isLoading={isLoadingStatistics}
            />
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 gap-2 w-full md:w-fit bg-transparent"
                onClick={() => setShowAnalyticsModal(true)}
            >
                <BarChart3 className="w-4 h-4" />
                View Analytic Loan performance chart
            </Button>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-xl font-bold">Recent Loans</h2>
                <LoanSearchFilter
                    onSearchChange={setSearchValue}
                    // onFilterChange={setFilterValue}
                    onFilterChange={(filter) => setFilterValue(filter as "all" | "newest" | "oldest" | "highest" | "lowest")}
                />
            </div>

            <ReusableTabs
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                tabs={transactionTabs}
                data={allLoans}
                countKey="status"
            />

            <LoanTable
                loans={filteredLoans}
                onClick={(loan)=> setSelectedLoan(loan)}
                isLoading={isLoadingLoanData}
                isError={isError}
            />

            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            { selectedLoan && (
                <LoanDetailModal
                    isOpen={!!selectedLoan}
                    onClose={() => setSelectedLoan(null)}
                    onSuccess={handleClose}
                    loan={selectedLoan}

            />)}

           {analyticsData && (
                <LoanAnalyticsModal
                    open={showAnalyticsModal}
                    onOpenChange={setShowAnalyticsModal}
                    analyticsData={analyticsData}
                />
            )}

            <SuccessModal 
                isOpen={successModal}
                onClose={()=> setSuccessModal(false)}
                title="Loan have been Approved"
                imgIcon={bcgImg}
            />
           
        </div>
    )
}

export default LoanPage