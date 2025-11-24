import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import bcgImg from "@/assets/money-growth-3d.png"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import DeclineModal from "./DeclineModal";
import type { ApproveRejectInvestment, InvestmentApplication } from "@/types/investment";
import { formatDate } from "@/lib/common";
import { useApproveDeclineInvestment } from "@/hooks/useInvestment";
import { toast } from "sonner";


interface InvestmentDetailModalProps {
    isOpen: boolean
    onClose: () => void
    application: InvestmentApplication
}

const InvestmentDetailModal = ({isOpen, onClose, application}: InvestmentDetailModalProps) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
    const {mutate: approveReject, isPending } = useApproveDeclineInvestment()

    const handleRejectInvestment = (data: ApproveRejectInvestment) => {
        approveReject({
            id: application.id,
            data:{
                status: "rejected",
                denied_reason: data.denied_reason
            }
        },
        {
            onSuccess:() => {
                toast.success("Investment declined successfully!");
                setIsDeclineModalOpen(false)
                onClose()
            },
            onError:() =>{
                toast.error("Failed! Try again");
            }
        })
    }

    const handleApproveInvestment =() => {
        approveReject({
            id: application.id,
            data:{
                status: "approved",
                denied_reason: ""
            }
        },
        {
            onSuccess:() => {
                toast.success("Investment approved successfully");
                setIsConfirmModalOpen(false)
                onClose()
            },
            onError:() =>{
                toast.error("Failed! Try again");
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-xl p-10 pt-6 max-h-[90vh] overflow-y-auto scrollbar-hide"
                    style={{
                        backgroundImage: `url(${bcgImg})`,
                        backgroundPosition: "right",
                        backgroundRepeat: " no-repeat",
                        backgroundSize: "200px",
                    }}
                >
                    <DialogHeader className="py-2 border-b border-icon/30">
                        <DialogTitle className="text-lg font-semibold text-megagreen text-center">Investment Information</DialogTitle>
                    </DialogHeader>

                    <div className="pb-4 space-y-3 text-xs">
                        <span className="text-megagreen font-semibold bg-[#D2EEDE] text-xs p-1 inline-block">Subscriber Information</span>
                        <div>
                            <p className="text-muted-foreground">Full Name</p>
                            <p className="font-medium">{application.user.first_name} {application.user.middle_name} {application.user.last_name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="font-medium">{application.user.phone}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium">{application.user.email}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Amount Invested</p>
                            <p className="font-medium text-megagreen">₦{application.amount.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Investment Type</p>
                            <p className="font-medium text-megagreen">{application.inv_name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Date Applied</p>
                            <p className="font-semibold">{formatDate(application.created_at)}</p>
                        </div>
                        <hr className="w-60"/>
                        <span className="text-megagreen font-semibold bg-[#F6DEB5] text-xs p-1 inline-block">Investment Type Information</span>
                        <div>
                            <p className="text-muted-foreground">Investment Type</p>
                            <p className="font-medium">{application.inv_name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Minimum amount</p>
                            <p className="font-medium">{application.investment.minimum_amount}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Investment ROI</p>
                            <p className="font-medium">{application.investment.roi}%</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Duration</p>
                            <p className="font-medium">{application.investment.vesting_period}</p>
                        </div>

                        <div className="flex gap-4 flex-wrap pt-4">
                            <Button className={`bg-megagreen hover:bg-megagreen/80 ${application.status === "approved" ? "hidden": ""}`} onClick={()=>setIsConfirmModalOpen(true)} disabled={isPending}>Approve Investment</Button>
                            <Button className="bg-megaorange hover:bg-megaorange/80" onClick={()=>setIsDeclineModalOpen(true)} disabled={isPending}>Deny Investment</Button>
                        </div>
                    </div>
            </DialogContent>

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={()=> setIsConfirmModalOpen(false)}
                onProceed={handleApproveInvestment}
                isPending={isPending}
                text="Investment"
            />

            <DeclineModal
                isOpen={isDeclineModalOpen}
                onClose={() => setIsDeclineModalOpen(false)}
                onSubmit={handleRejectInvestment}
                isPending={isPending}
                text="Investment"
            />
        </Dialog>
    )
}

export default InvestmentDetailModal;