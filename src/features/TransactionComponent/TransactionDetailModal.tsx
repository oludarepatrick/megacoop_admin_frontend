import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import type { Transaction } from "@/pages/Transactions";
import bcgImg from "@/assets/money-stack-img.png"


interface TransactionDetailModalProps {
    isOpen: boolean
    onClose: () => void
    transactions: Transaction

}

const TransactionDetailModal = ({isOpen, onClose, transactions}: TransactionDetailModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-lg p-10 pt-4 pb-20 max-h-[90vh] overflow-y-auto scrollbar-hide"
                    style={{
                        backgroundImage: `url(${bcgImg})`,
                        backgroundPosition: "bottom right",
                        backgroundRepeat: " no-repeat",
                        backgroundSize: "200px",
                    }}
                >
                    <DialogHeader className="py-4 border-b border-icon/30">
                        <DialogTitle className="text-lg font-semibold text-megagreen text-center">Transaction Details</DialogTitle>
                    </DialogHeader>

                    <div className="py-4 space-y-3 text-xs">
                        <div>
                            <p className="text-muted-foreground">Full Name</p>
                            <p className="font-medium">{transactions.first_name} {transactions.last_name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Service</p>
                            <p className="font-medium">Google Subscription</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Amount</p>
                            <p className="font-medium text-megagreen">₦{transactions.amount}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Transaction ID</p>
                            <p className="font-medium">{transactions.id}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Transaction Date</p>
                            <p className="font-medium">{transactions.date}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Description</p>
                            <p className="font-medium">Monthly Subscription Payment</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-muted-foreground">Status</p>
                            <span className={`font-medium py-1 px-3 rounded-2xl ${transactions.status === "approved" ? "bg-megagreen/20 text-megagreen": "bg-megaorange/30 text-megaorange"}`}>
                                {transactions.status === "approved" ? "Successful": transactions.status}
                            </span>
                        </div>

                    </div>
            </DialogContent>

        </Dialog>
    )
}

export default TransactionDetailModal;