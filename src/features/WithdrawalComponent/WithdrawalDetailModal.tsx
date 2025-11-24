import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import bcgImg from "@/assets/hand-taking-bill-from-wallet-img.png"
import type { Withdrawal } from "@/pages/Withdrawal";
import { Button } from "@/components/ui/button";
import ConfirmModal from "../InvestmentComponent/ConfirmModal";
import DeclineModal from "../InvestmentComponent/DeclineModal";
import { useState } from "react";


interface TransactionDetailModalProps {
    isOpen: boolean
    onClose: () => void
    transactions: Withdrawal

}

const WithdrawalDetailModal = ({isOpen, onClose, transactions}: TransactionDetailModalProps) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
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
                            <p className="font-medium">{transactions.first_name} {transactions.last_name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="font-medium">{transactions.phone}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium">{transactions.email}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Wallet Balance</p>
                            <p className="font-medium text-megagreen">₦{transactions.wallet_balance}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Withdrawal Amount</p>
                            <p className="font-medium text-megagreen">₦{transactions.amount}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Previous Transaction Date</p>
                            <p className="font-medium">{transactions.date}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Bank Name</p>
                            <p className="font-medium text-megagreen">{transactions.bank}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Account Number</p>
                            <p className="font-medium text-megagreen">{transactions.account_no}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Account Name</p>
                            <p className="font-semibold">{transactions.account_name}</p>
                        </div>
                        <div className="flex gap-4 flex-wrap pt-4">
                            <Button className="bg-megagreen hover:bg-megagreen/80" onClick={()=>setIsConfirmModalOpen(true)} >Approve Investment</Button>
                            <Button className="bg-megaorange hover:bg-megaorange/80" onClick={()=>setIsDeclineModalOpen(true)} >Deny Investment</Button>
                        </div>

                    </div>
            </DialogContent>

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={()=> setIsConfirmModalOpen(false)}
                text="Withdrawal"
                onProceed={()=>{}}
                isPending={false}
            />

            <DeclineModal
                isOpen={isDeclineModalOpen}
                onClose={() => setIsDeclineModalOpen(false)}
                onSubmit={()=> {}}
                isPending={false}
                text="Withdrawal"
            />

        </Dialog>
    )
}

export default WithdrawalDetailModal;