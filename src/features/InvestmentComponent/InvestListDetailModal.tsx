import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import bcgImg from "@/assets/golden-coins-3d.png"
import { Button } from "@/components/ui/button";
import type { ListInvestment } from "@/types/investment";


interface InvestListDetailModalProps {
    isOpen: boolean
    onClose: () => void
    investment: ListInvestment

}

const InvestListDetailModal = ({isOpen, onClose, investment}: InvestListDetailModalProps) => {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-xl p-10 pt-6 max-h-[90vh] overflow-y-auto scrollbar-hide" aria-describedby={undefined}
                style={{
                    backgroundImage: `url(${bcgImg})`,
                    backgroundPosition: "bottom right",
                    backgroundRepeat: " no-repeat",
                    backgroundSize: "100px",
                }}
            >
                <DialogHeader className="py-2 border-b border-icon/30">
                    <DialogTitle className="text-lg font-semibold text-megagreen text-center">Investment Information</DialogTitle>
                </DialogHeader>

                <div className="flex gap-8 gap-x-12 pt-4 flex-wrap">
                    <div className="pb-4 space-y-3 text-xs">
                        <span className="text-megagreen font-semibold bg-[#D2EEDE] text-xs p-1 inline-block">Business owner info</span>
                        <div >
                            <p className="text-muted-foreground">Founder Name</p>
                            <p className="font-medium">{investment.founder_name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="font-medium">{investment.phone}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium">{investment.email}</p>
                        </div>
                            <div>
                                <p className="text-muted-foreground">Address</p>
                                <p className="font-medium text-megagreen">{investment.office_address}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">State</p>
                                <p className="font-medium text-megagreen">{investment.state}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">City</p>
                                <p className="font-semibold">{investment.city}</p>
                            </div>
                            <span className="text-[#707070] font-semibold bg-[#EFE0C6] text-xs p-1 inline-block">Business owner Info</span>
                            <div>
                                <p className="text-muted-foreground">Company</p>
                                <p className="font-medium">{investment.company_name}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Type of Company</p>
                                <p className="font-medium">{investment.company_type || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Nature of Business</p>
                                <p className="font-medium">{investment.industry}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Business Sector</p>
                                <p className="font-medium">{investment.industry}</p>
                            </div>
                        </div>
                        <div className="pb-4 space-y-3 text-xs">
                            <span className="text-white font-semibold bg-megagreen text-xs p-1 inline-block">Subscriber Information</span>
                            <div>
                                <p className="text-muted-foreground">Amount Needed</p>
                                <p className="font-medium">₦{parseInt(investment.amount_needed).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Equity Offering</p>
                                <p className="font-medium">{investment.equity_offering || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Vesting Period</p>
                                <p className="font-medium">{investment.vesting_period}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">ROI</p>
                                <p className="font-medium ">{investment.roi}%</p>
                            </div>
                            
                            <span className="text-white font-semibold bg-[#D1AC6E] text-xs p-1 inline-block">Investment Type Information</span>
                            <div>
                                <p className="text-muted-foreground">Bank Name</p>
                                <p className="font-semibold text-megagreen">{investment.bank_name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Account Number</p>
                                <p className="font-medium">{investment.account_no || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Account Name</p>
                                <p className="font-medium">{investment.account_name || "N/A"}</p>
                            </div>
                            <span className="text-white font-semibold bg-black text-xs p-1 inline-block">Investment Type Information</span>
                            <div>
                               <Button className="bg-megagreen hover:bg-megagreen/80">View</Button>
                            </div>
                        </div>
                    </div>

            </DialogContent>
        </Dialog>
    )
}

export default InvestListDetailModal;