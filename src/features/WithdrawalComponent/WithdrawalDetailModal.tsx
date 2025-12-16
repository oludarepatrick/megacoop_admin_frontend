import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import bcgImg from "@/assets/hand-taking-bill-from-wallet-img.png"
import { Button } from "@/components/ui/button";
import ConfirmModal from "../InvestmentComponent/ConfirmModal";
import { useState } from "react";
import { formatDate } from "@/lib/common";
import type { WithdrawalList } from "@/types/transactions";
import { useApproveWithdrawal, useDenyWithdrawal, usePaidWithdrawal } from "@/hooks/useTransaction";
import { toast } from "sonner";
import DeclineWithdrawalModal from "./DeclineWithdrawalModal";



type WithdrawalDetailModalProps = {
    isOpen: boolean
    onClose: () => void
    transactions: WithdrawalList
}

const WithdrawalDetailModal = ({isOpen, onClose, transactions}: WithdrawalDetailModalProps) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isConfirmPaidModal, setIsConfirmPaidModal] = useState(false);
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

    const {mutate, isPending} = useApproveWithdrawal();
    const {mutate: paidWithdrawal, isPending: loading} = usePaidWithdrawal();
    const {mutate: denyWithdrawal, isPending: isDenying} = useDenyWithdrawal();

    const handleApproveWithdrawal = () => {
        mutate(transactions.id, {
            onSuccess: () => {
                toast.success("Withdrawal approved successfully");
                setIsConfirmModalOpen(false);
                onClose();
            },
            onError: () => {
                toast.error("Failed to approve withdrawal. Try again.");
            }
        })
    }

    const handlePaidWithdrawal = () => {
        paidWithdrawal(transactions.id, {
            onSuccess: () => {
                toast.success("Withdrawal status updated successfully");
                setIsConfirmModalOpen(false);
                onClose();
            },
            onError: () => {
                toast.error("Failed to update withdrawal. Try again.");
            }
        })
    }
    const handleDenyWithdrawal = (data: {denied_reason: string}) => {
        denyWithdrawal({
            id: transactions.id,
            data: {denied_reason: data.denied_reason}
        }, {
            onSuccess: () => {
                toast.success("Withdrawal denied successfully");
                setIsDeclineModalOpen(false);
                onClose();
            },
            onError: () => {
                toast.error("Failed to deny withdrawal. Try again.");
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-xl p-10 pt-4 pb-20 max-h-[90vh] overflow-y-auto scrollbar-hide"
                    style={{
                        backgroundImage: `url(${bcgImg})`,
                        backgroundPosition: "bottom right",
                        backgroundRepeat: " no-repeat",
                        backgroundSize: "200px",
                    }}
                >
                    <DialogHeader className="py-4 border-b border-icon/30">
                        <DialogTitle className="text-lg font-semibold text-megagreen text-center">Withdrawal Details</DialogTitle>
                    </DialogHeader>

                    <div className="py-4 space-y-3 text-xs">
                        <div>
                            <p className="text-muted-foreground">Full Name</p>
                            <p className="font-medium">{transactions.user.first_name} {transactions.user.last_name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="font-medium">{transactions.user.phone}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium">{transactions.user.email}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Wallet Balance</p>
                            <p className="font-medium text-megagreen">₦{Number(transactions.balance_b4).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Withdrawal Amount</p>
                            <p className="font-medium text-megagreen">₦{Number(transactions.amount).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Previous Transaction Date</p>
                            <p className="font-medium">{formatDate(transactions.created_at)}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Bank Name</p>
                            <p className="font-medium text-megagreen">{transactions.bank || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Account Number</p>
                            <p className="font-medium text-megagreen">{transactions.account_no || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Account Name</p>
                            <p className="font-semibold">{transactions?.account_name || "N/A"}</p>
                        </div>
                        <div className="flex gap-4 flex-wrap pt-4">
                            {transactions.status === "approved" ? (
                                <Button className="bg-megagreen hover:bg-megagreen/80" 
                                    onClick={()=>setIsConfirmPaidModal(true)} > Confirm Paid
                                </Button>
                                
                            ) : transactions.status === "paid" || transactions.status === "denied" ? (
                                null
                            ) : (
                                <>
                                    <Button className="bg-megagreen hover:bg-megagreen/80" onClick={()=>setIsConfirmModalOpen(true)} >Approve</Button>
                                    <Button className="bg-megaorange hover:bg-megaorange/80" onClick={()=>setIsDeclineModalOpen(true)} >Deny</Button>
                                </>
                            )}
                        </div>
                    </div>
            </DialogContent>

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={()=> setIsConfirmModalOpen(false)}
                text="Withdrawal"
                onProceed={handleApproveWithdrawal}
                isPending={isPending}
            />

            
            {/* for paid modal */}
            <ConfirmModal
                isOpen={isConfirmPaidModal}
                onClose={()=> setIsConfirmPaidModal(false)}
                text="Withdrawal"
                onProceed={handlePaidWithdrawal}
                isPending={loading}
            />

            <DeclineWithdrawalModal
                isOpen={isDeclineModalOpen}
                onClose={() => setIsDeclineModalOpen(false)}
                onSubmit={handleDenyWithdrawal}
                isPending={isDenying}
                text="Withdrawal"
                fieldName="denied_reason"
            />

        </Dialog>
    )
}

export default WithdrawalDetailModal;