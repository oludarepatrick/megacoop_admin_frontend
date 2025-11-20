import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { loanService } from "@/services/loanService"
import { useState } from "react"
import { LoanRejectionModal } from "./loanRejectionModal"
import { Star } from "lucide-react"
import { Checkbox } from "../ui/checkbox"

interface LoanDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  loanId: string | null
  onApprove: (loanId: string) => Promise<void>
  onReject: (loanId: string, reason: string, explanation?: string) => Promise<void>
}

export function LoanDetailModal({ open, onOpenChange, loanId, onApprove, onReject }: LoanDetailModalProps) {
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [isApproving, setIsApproving] = useState(false)

  const { data: loanDetail, isLoading } = useQuery({
    queryKey: ["loanDetail", loanId],
    queryFn: () => (loanId ? loanService.getLoanDetail(loanId) : Promise.resolve(null)),
    enabled: !!loanId && open,
  })

  const handleApprove = async () => {
    if (!loanId) return
    setIsApproving(true)
    try {
      await onApprove(loanId)
      onOpenChange(false)
    } finally {
      setIsApproving(false)
    }
  }

  const statusColors: Record<string, { bg: string; text: string }> = {
    approved: { bg: "bg-green-100", text: "text-green-700" },
    pending: { bg: "bg-yellow-100", text: "text-yellow-700" },
    disbursed: { bg: "bg-blue-100", text: "text-blue-700" },
    denied: { bg: "bg-red-100", text: "text-red-700" },
  }

  if (isLoading) return null

  if (!loanDetail) return null

  const colors = statusColors[loanDetail.status]

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className=" w-full px-2 py-3 rounded-none mx-auto text-green-800 text-center border-b border-gray-300" >Loan Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <h3 className="text-sm text-green-200 bg-green-800 w-fit px-2 py-1 rounded">Personal Information</h3>
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 font-medium">First Name</p>
                <p className="text-sm font-semibold text-gray-900">{loanDetail.firstName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Last Name</p>
                <p className="text-sm font-semibold text-gray-900">{loanDetail.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Email</p>
                <p className="text-sm font-semibold text-gray-900">{loanDetail.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Phone</p>
                <p className="text-sm font-semibold text-gray-900">{loanDetail.phone}</p>
              </div>
            </div>

            {/* Loan Information */}
            <div className="border-t pt-4 space-y-4">
              <h3 className="text-sm text-green-200 bg-green-800 w-fit px-2 py-1 rounded">Loan Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 font-medium">Loan Amount</p>
                  <p className="text-sm font-semibold text-green-600">₦{loanDetail.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Interest Rate</p>
                  <p className="text-sm font-semibold text-gray-900">{loanDetail.interestRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Disbursed Amount</p>
                  <p className="text-sm font-semibold text-gray-900">₦{loanDetail.disbursedAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Loan Purpose</p>
                  <p className="text-sm font-semibold text-gray-900">{loanDetail.loanPurpose}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Status</p>
                  <Badge className={`${colors.bg} ${colors.text} capitalize mt-1`}>{loanDetail.status}</Badge>
                </div>
                {/* <div>
                  <p className="text-xs text-gray-600 font-medium">Credit Score</p>
                  <p className="text-sm font-semibold text-gray-900">{loanDetail.creditScore}</p>
                </div> */}
                {/* credit rating with stars */}
                <div>
                  <p className="text-xs text-gray-600 font-medium">Credit Rating</p>

                  <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                    {/* Full stars */}
                    {[...Array(Math.floor(Number(loanDetail?.rating)))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-green-500" />
                    ))}

                    {/* Half star (you can replace this with an icon of your choice) */}
                    {Number(loanDetail?.rating) % 1 >= 0.5 && (
                      <Star className="w-4 h-4 text-green-500 opacity-50" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="border-t pt-4 space-y-4">
              <h3 className="text-sm text-green-200 bg-green-800 w-fit px-2 py-1 rounded">Additional Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 font-medium">Employment Status</p>
                  <p className="text-sm font-semibold text-gray-900">{loanDetail.employmentStatus}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Years of Employment</p>
                  <p className="text-sm font-semibold text-gray-900">{loanDetail.yearsOfEmployment} years</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Monthly Income</p>
                  <p className="text-sm font-semibold text-gray-900">₦{loanDetail.monthlyIncome.toLocaleString()}</p>
                </div>
                {/* <div>
                  <p className="text-xs text-gray-600 font-medium">Collateral</p>
                  <p className="text-sm font-semibold text-gray-900">{loanDetail.collateral}</p>
                </div> */}
                {/* previous loan status true or false  */}
                <div>
                  <p className="text-xs text-gray-600 font-medium">Previous Loan Status</p>
                  <p className={`text-sm font-semibold ${loanDetail.previousLoanStatus ? "text-green-600" : "text-red-600"}`}>{loanDetail.previousLoanStatus ? "Cleared" : "Not Cleared"}</p>
                </div>
                {/* ROI */}
                <div>
                  <p className="text-xs text-gray-600 font-medium">ROI</p>
                  <p className="text-sm font-semibold text-gray-900">{loanDetail.ROI}</p>
                </div>
              </div>
              {/* guarantor approved true or false */}
              <div>
                <p className="text-xs text-gray-600 font-medium">Guarantors Approval Status</p>
                <p className={`text-sm font-semibold ${loanDetail.guarantorsApproved ? "text-green-600" : "text-yellow-600"}`}>{loanDetail.guarantorsApproved ? "Approved" : "Pending"}</p>
                {/* create a checkbox with good label inside a span below */}
                {!loanDetail.guarantorsApproved && (
                  <div className="mt-2 flex items-center gap-2">
                    {/* <input
                      type="checkbox"
                      id="bypassGuarantorApproval"
                      name="bypassGuarantorApproval"
                      checked={true}
                      readOnly
                      onClick={(e) => e.preventDefault()}
                      className="w-4 h-4 border-2 border-green-600 bg-green-500 text-green-600 rounded focus:ring-0 cursor-not-allowed"
                    /> */}
                    <Checkbox
                      id="bypassGuarantorApproval"
                      name="bypassGuarantorApproval"
                      checked={true}
                      onClick={(e) => e.preventDefault()}
                    />
                    <span className="text-xs text-gray-500">Bypass the guarantor approval process at your own risk.</span>
                  </div>
                )}
              </div>

            </div>

            {/* Action Buttons */}
            {loanDetail.status === "pending" && (
              <div className="border-t pt-4 flex gap-3 justify-start">
                <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove} disabled={isApproving}>
                  {isApproving ? "Approving..." : "Approve Loan"}
                </Button>
                <Button
                  // variant="outline"
                  className="border-yellow-300 text-white hover:bg-yellow-600 bg-yellow-500"
                  onClick={() => setShowRejectionModal(true)}
                >
                  Deny Loan
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <LoanRejectionModal
        open={showRejectionModal}
        onOpenChange={setShowRejectionModal}
        onSubmit={async (reason, explanation) => {
          if (loanId) {
            await onReject(loanId, reason, explanation)
            setShowRejectionModal(false)
            onOpenChange(false)
          }
        }}
      />
    </>
  )
}
