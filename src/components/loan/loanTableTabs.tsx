import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { Loan } from "@/services/loanService"


interface LoanTableTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  loans: Loan[]
  onViewLoan: (loan: Loan) => void
  isLoading: boolean
  searchPerformed: boolean
  filter: string
}

const statusColors: Record<string, { bg: string; text: string; badge: string }> = {
  approved: { bg: "bg-green-50", text: "text-green-700", badge: "bg-green-100" },
  pending: { bg: "bg-yellow-50", text: "text-yellow-700", badge: "bg-yellow-100" },
  disbursed: { bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100" },
  denied: { bg: "bg-red-50", text: "text-red-700", badge: "bg-red-100" },
}

export function LoanTableTabs({
  activeTab,
  onTabChange,
  loans,
  onViewLoan,
  isLoading,
  searchPerformed,
  filter,
}: LoanTableTabsProps) {
  console.log("Rendering LoanTableTabs with loans:", isLoading)
  if (isLoading) {
    console.log("Loading loans...")
    return <div className="text-center py-8 text-gray-600">Loading loans...</div>
  }

  if (loans.length === 0 && searchPerformed) {
    return <div className="text-center py-8 text-gray-600">User not found for search name</div>
  }

  if (loans.length === 0) {
    return <div className="text-center py-8 text-gray-600">No loans available</div>
  }

  // sort loans based on filter
  let sortedLoans = [...loans]
  if (filter === "newest") {
    sortedLoans.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } else if (filter === "oldest") {
    sortedLoans.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  } else if (filter === "highest") {
    sortedLoans.sort((a, b) => b.amount - a.amount)
  } else if (filter === "lowest") {
    sortedLoans.sort((a, b) => a.amount - b.amount)
  } else {
    // default to original order or any other logic
    sortedLoans = [...loans]
  }

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <div className="w-full border-b border-gray-200 px-1 py-1 rounded-none overflow-x-auto scrollbar-hide">
        <TabsList className="grid w-fit grid-cols-4 rounded-lg bg-inherit p-1  min-w-[450px]">
        <TabsTrigger value="all" className="text-xs sm:text-sm">
          All Loans
        </TabsTrigger>
        <TabsTrigger value="approved" className="text-xs sm:text-sm">
          Approved
        </TabsTrigger>
        <TabsTrigger value="pending" className="text-xs sm:text-sm">
            Pending
            <Badge className="ml-[-1px] bg-orange-100 text-orange-700">
              {loans.filter((loan) => loan.status === "pending").length}
            </Badge>
        </TabsTrigger>
        <TabsTrigger value="disbursed" className="text-xs sm:text-sm">
          Disbursed
        </TabsTrigger>
      </TabsList>
      </div>

      <div className="mt-6 overflow-x-auto scrollbar-hide">
        <table className="w-full text-sm border border-green-200">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left">
                {/* <Checkbox /> */}
              </th>
              <th className=" pr-4 py-3 text-center font-semibold">First Name</th>
              <th className="py-3 text-center font-semibold">Last Name</th>
              <th className=" py-3 text-center font-semibold">Email</th>
              <th className=" py-3 text-center font-semibold">Phone</th>
              <th className=" py-3 text-center font-semibold">Amount</th>
              <th className=" py-3 text-center font-semibold">Date</th>
              <th className="py-3 text-center font-semibold">Status</th>
              <th className="py-3 text-center font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {/* {loans.map((loan) => {
              const colors = statusColors[loan.status]
              return (
                <tr key={loan.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Checkbox />
                  </td>
                  <td className="px-4 py-3 text-center text-blue-900 border">{loan.firstName}</td>
                  <td className="px-4 py-3 text-center text-blue-900 border">{loan.lastName}</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-xs md:text-sm border">{loan.email}</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-xs md:text-sm border">{loan.phone}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-semibold border">₦{loan.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-xs md:text-sm truncate border">{loan.date}</td>
                  <td className="px-4 py-3 text-center border">
                    <Badge className={`${colors.badge} ${colors.text} capitalize`}>{loan.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent rounded-full"
                      onClick={() => onViewLoan(loan)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              )
            })} */}
            {sortedLoans.map((loan) => {
              const colors = statusColors[loan.status]
              return (
                <tr key={loan.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Checkbox />
                  </td>
                  <td className="px-4 py-3 text-center text-blue-900 border">{loan.firstName}</td>
                  <td className="px-4 py-3 text-center text-blue-900 border">{loan.lastName}</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-xs md:text-sm border">{loan.email}</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-xs md:text-sm border">{loan.phone}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-semibold border">₦{loan.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-xs md:text-sm truncate border">{loan.date}</td>
                  <td className="px-4 py-3 text-center border">
                    <Badge className={`${colors.badge} ${colors.text} capitalize`}>{loan.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent rounded-full"
                      onClick={() => onViewLoan(loan)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Tabs>
  )
}
