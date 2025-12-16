import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import bcgImg from "@/assets/cash-bundle-man-hand.png"
import { Button } from "@/components/ui/button";
import type { Loan } from "@/types/loan";
import ConfirmModal from "@/features/InvestmentComponent/ConfirmModal";
import { useState } from "react";
import { useApproveLoan, useDenyLoan } from "@/hooks/useLoan";
import { toast } from "sonner";
import DeclineWithdrawalModal from "@/features/WithdrawalComponent/DeclineWithdrawalModal";


interface LoanDetailModalProps {
    isOpen: boolean
    onClose: () => void
    loan: Loan,
    onSuccess: () => void

}

const LoanDetailModal = ({isOpen, onClose, loan, onSuccess}: LoanDetailModalProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

  const {mutate, isPending} = useApproveLoan();
  const {mutate: denyLoan, isPending: isDenyLoan} = useDenyLoan();

  const handleApproveLoan = () => {
    mutate(loan.id, {
      onSuccess: () => {
        toast.success("Loan approved successfully");
        setIsConfirmModalOpen(false);
        onSuccess();
      }
    })
  }

  const handleDenyLoan = (data: {admin_remarks: string}) => {
    denyLoan({
      id: loan.id,
      data: {admin_remarks: data.admin_remarks}
    }, {
      onSuccess: () => {
        toast.success("Loan denied successfully")
        setIsDeclineModalOpen(false)
        onClose()
      }
    })
  }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-xl p-10 pt-6 max-h-[90vh] overflow-y-auto scrollbar-hide" aria-describedby={undefined}
                style={{
                    backgroundImage: `url(${bcgImg})`,
                    backgroundPosition: "bottom right",
                    backgroundRepeat: " no-repeat",
                    backgroundSize: "150px",
                }}
            >
                <DialogHeader className="py-2 border-b border-icon/30">
                    <DialogTitle className="text-lg font-semibold text-megagreen text-center">Loan Details</DialogTitle>
                </DialogHeader>

                <div className="flex gap-8 gap-x-12 pt-4 flex-wrap">
                    <div className="pb-4 space-y-3 text-xs">
                        <h3 className="text-megagreen font-semibold bg-[#D2EEDE] text-xs p-1 inline-block">Personal information</h3>
                        <div >
                            <p className="text-muted-foreground">Full nam</p>
                            <p className="font-medium">{[loan.user.first_name, loan.user.middle_name, loan.user.last_name].join(" ")}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="font-medium">{loan.user.phone}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium">{loan.user.email}</p>
                        </div>
                            
                        <h3 className="text-[#707070] font-semibold bg-[#EFE0C6] text-xs p-1 inline-block">Loan Information</h3>
                        <div>
                          <p className="text-muted-foreground">Loan Amount</p>
                          <p className="font-medium">₦{loan.amount.toLocaleString()}</p>
                        </div>
                            <div>
                                <p className="text-muted-foreground">Interest Rate</p>
                                <p className="font-medium">{loan.interest_rate}%</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Repayment Duration</p>
                                <p className="font-medium">{loan.term_value}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Loan Purpose</p>
                                <p className="font-medium">{loan.purpose}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Status</p>
                                <p className="font-medium">{loan.status}</p>
                            </div>
                        </div>
                        {/* <div className="pb-4 space-y-3 text-xs">
                            <span className="text-white font-semibold bg-megagreen text-xs p-1 inline-block">Additional Information</span>
                            <div>
                                <p className="text-muted-foreground">Amount Needed</p>
                                <p className="font-medium">₦{parseInt(loan.amount_needed).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Equity Offering</p>
                                <p className="font-medium">{loan.equity_offering || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Vesting Period</p>
                                <p className="font-medium">{loan.vesting_period}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">ROI</p>
                                <p className="font-medium ">{loan.roi}%</p>
                            </div>
                            
                            <span className="text-white font-semibold bg-[#D1AC6E] text-xs p-1 inline-block">loan Type Information</span>
                            <div>
                                <p className="text-muted-foreground">Bank Name</p>
                                <p className="font-semibold text-megagreen">{loan.bank_name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Account Number</p>
                                <p className="font-medium">{loan.account_no || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Account Name</p>
                                <p className="font-medium">{loan.account_name || "N/A"}</p>
                            </div>
                            <
                        </div> */}
                    </div>
                    <div className="flex gap-4 flex-wrap pt-4 border-t">
                      <Button className={`bg-megagreen hover:bg-megagreen/80 ${loan.status === "approved" ? "hidden": ""}`} onClick={()=>setIsConfirmModalOpen(true)} disabled={false}>Approve Loan</Button>
                      <Button className="bg-megaorange hover:bg-megaorange/80" onClick={()=>setIsDeclineModalOpen(true)} disabled={false}>Deny Loan</Button>
                    </div>

            </DialogContent>

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={()=> setIsConfirmModalOpen(false)}
                onProceed={handleApproveLoan}
                isPending={isPending}
                text={<>Are you sure you want to <br/> Approve this Loan</>}
            />

            <DeclineWithdrawalModal
                isOpen={isDeclineModalOpen}
                onClose={() => setIsDeclineModalOpen(false)}
                onSubmit={handleDenyLoan}
                isPending={isDenyLoan}
                text="Loan"
                fieldName="admin_remarks"
            />
        </Dialog>
    )
}

export default LoanDetailModal;



// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// // import { useQuery } from "@tanstack/react-query"
// // import { loanService } from "@/services/loanService"
// import { useState } from "react"
// import { LoanRejectionModal } from "./loanRejectionModal"
// // import { Star } from "lucide-react"
// import { Checkbox } from "../ui/checkbox"
// import type { Loan } from "@/types/loan"

// interface LoanDetailModalProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   loan: Loan;
//   // loanId: string | null
//   onApprove: (loanId: string) => Promise<void>
//   onReject: (loanId: string, reason: string, explanation?: string) => Promise<void>
// }

// export function LoanDetailModal({ open, onOpenChange, loan,  
//   // onApprove, onReject 
// }: LoanDetailModalProps) {
//   const [showRejectionModal, setShowRejectionModal] = useState(false)
//   const [isApproving, setIsApproving] = useState(false)

//   // const { data: loanDetail, isLoading } = useQuery({
//   //   queryKey: ["loanDetail", loanId],
//   //   queryFn: () => (loanId ? loanService.getLoanDetail(loanId) : Promise.resolve(null)),
//   //   enabled: !!loanId && open,
//   // })

//   const handleApprove = async () => {
//     if (!loanId) return
//     setIsApproving(true)
//     try {
//       await onApprove(loanId)
//       onOpenChange(false)
//     } finally {
//       setIsApproving(false)
//     }
//   }

//   const statusColors: Record<string, { bg: string; text: string }> = {
//     approved: { bg: "bg-green-100", text: "text-green-700" },
//     pending: { bg: "bg-yellow-100", text: "text-yellow-700" },
//     disbursed: { bg: "bg-blue-100", text: "text-blue-700" },
//     denied: { bg: "bg-red-100", text: "text-red-700" },
//   }

//   // if (isLoading) return null

//   // if (!loanDetail) return null

//   const colors = statusColors[loan.status]

//   return (
//     <>
//       <Dialog open={open} onOpenChange={onOpenChange}>
//         <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className=" w-full px-2 py-3 rounded-none mx-auto text-green-800 text-center border-b border-gray-300" >Loan Details</DialogTitle>
//           </DialogHeader>

//           <div className="space-y-6">
//             <h3 className="text-sm text-green-200 bg-green-800 w-fit px-2 py-1 rounded">Personal Information</h3>
//             {/* Personal Information */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-xs text-gray-600 font-medium">First Name</p>
//                 <p className="text-sm font-semibold text-gray-900">{loan.user.first_name}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-600 font-medium">Last Name</p>
//                 <p className="text-sm font-semibold text-gray-900">{loan.user.last_name}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-600 font-medium">Email</p>
//                 <p className="text-sm font-semibold text-gray-900">{loan.user.email}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-600 font-medium">Phone</p>
//                 <p className="text-sm font-semibold text-gray-900">{loan.user.phone}</p>
//               </div>
//             </div>

//             {/* Loan Information */}
//             <div className="border-t pt-4 space-y-4">
//               <h3 className="text-sm text-green-200 bg-green-800 w-fit px-2 py-1 rounded">Loan Information</h3>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 <div>
//                   <p className="text-xs text-gray-600 font-medium">Loan Amount</p>
//                   <p className="text-sm font-semibold text-green-600">₦{loan.amount.toLocaleString()}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600 font-medium">Interest Rate</p>
//                   <p className="text-sm font-semibold text-gray-900">{loan.interest_rate}%</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600 font-medium">Disbursed Amount</p>
//                   <p className="text-sm font-semibold text-gray-900">₦{loan.amount.toLocaleString()}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600 font-medium">Loan Purpose</p>
//                   <p className="text-sm font-semibold text-gray-900">{loan.purpose}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600 font-medium">Status</p>
//                   <Badge className={`${colors.bg} ${colors.text} capitalize mt-1`}>{loan.status}</Badge>
//                 </div>
//                 {/* <div>
//                   <p className="text-xs text-gray-600 font-medium">Credit Score</p>
//                   <p className="text-sm font-semibold text-gray-900">{loanDetail.creditScore}</p>
//                 </div> */}
//                 {/* credit rating with stars */}
//                 {/* <div>
//                   <p className="text-xs text-gray-600 font-medium">Credit Rating</p> */}

//                   {/* <div className="flex items-center gap-1 text-sm font-semibold text-gray-900"> */}
//                     {/* Full stars */}
//                     {/* {[...Array(Math.floor(Number(loan?.rating)))].map((_, i) => (
//                       <Star key={i} className="w-4 h-4 fill-current text-green-500" />
//                     ))} */}

//                     {/* Half star (you can replace this with an icon of your choice) */}
//                     {/* {Number(loanDetail?.rating) % 1 >= 0.5 && (
//                       <Star className="w-4 h-4 text-green-500 opacity-50" />
//                     )}
//                   </div> */}
//                 {/* </div> */}
//               </div>
//             </div>

//             {/* Additional Information */}
//             <div className="border-t pt-4 space-y-4">
//               <h3 className="text-sm text-green-200 bg-green-800 w-fit px-2 py-1 rounded">Additional Information</h3>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 <div>
//                   <p className="text-xs text-gray-600 font-medium">Employment Status</p>
//                   <p className="text-sm font-semibold text-gray-900">{loan.monthly_repayment}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600 font-medium">Years of Employment</p>
//                   <p className="text-sm font-semibold text-gray-900">{loan.total_payback} years</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600 font-medium">Monthly Income</p>
//                   <p className="text-sm font-semibold text-gray-900">₦{loan.amount.toLocaleString()}</p>
//                 </div>
//                 {/* <div>
//                   <p className="text-xs text-gray-600 font-medium">Collateral</p>
//                   <p className="text-sm font-semibold text-gray-900">{loanDetail.collateral}</p>
//                 </div> */}
//                 {/* previous loan status true or false  */}
//                 <div>
//                   <p className="text-xs text-gray-600 font-medium">Previous Loan Status</p>
//                   <p className={`text-sm font-semibold ${loan.status ? "text-green-600" : "text-red-600"}`}>{loan.guarantor_approval_status ? "Cleared" : "Not Cleared"}</p>
//                 </div>
//                 {/* ROI */}
//                 <div>
//                   <p className="text-xs text-gray-600 font-medium">ROI</p>
//                   <p className="text-sm font-semibold text-gray-900">{loan.interest_rate}</p>
//                 </div>
//               </div>
//               {/* guarantor approved true or false */}
//               <div>
//                 <p className="text-xs text-gray-600 font-medium">Guarantors Approval Status</p>
//                 <p className={`text-sm font-semibold ${loan.guarantor_approval_status ? "text-green-600" : "text-yellow-600"}`}>{loan.guarantor_approval_status ? "Approved" : "Pending"}</p>
//                 {/* create a checkbox with good label inside a span below */}
//                 {!loan.guarantor_approval_status && (
//                   <div className="mt-2 flex items-center gap-2">
//                     {/* <input
//                       type="checkbox"
//                       id="bypassGuarantorApproval"
//                       name="bypassGuarantorApproval"
//                       checked={true}
//                       readOnly
//                       onClick={(e) => e.preventDefault()}
//                       className="w-4 h-4 border-2 border-green-600 bg-green-500 text-green-600 rounded focus:ring-0 cursor-not-allowed"
//                     /> */}
//                     <Checkbox
//                       id="bypassGuarantorApproval"
//                       name="bypassGuarantorApproval"
//                       checked={true}
//                       onClick={(e) => e.preventDefault()}
//                     />
//                     <span className="text-xs text-gray-500">Bypass the guarantor approval process at your own risk.</span>
//                   </div>
//                 )}
//               </div>

//             </div>

//             {/* Action Buttons */}
//             {loan.status === "pending" && (
//               <div className="border-t pt-4 flex gap-3 justify-start">
//                 <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove} disabled={isApproving}>
//                   {isApproving ? "Approving..." : "Approve Loan"}
//                 </Button>
//                 <Button
//                   // variant="outline"
//                   className="border-yellow-300 text-white hover:bg-yellow-600 bg-yellow-500"
//                   onClick={() => setShowRejectionModal(true)}
//                 >
//                   Deny Loan
//                 </Button>
//               </div>
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>

//       <LoanRejectionModal
//         open={showRejectionModal}
//         onOpenChange={setShowRejectionModal}
//         // onSubmit={async (reason, explanation) => {
//         //   if (loanId) {
//         //     await onReject(loanId, reason, explanation)
//         //     setShowRejectionModal(false)
//         //     onOpenChange(false)
//         //   }
//         // }}
//       />
//     </>
//   )
// }
