import { Button } from "@/components/ui/button";
import type { ActiveUserInvestment } from "@/types/returnInvestment";
import { ArrowLeft } from "lucide-react";
import ROIPaymentModal from "./ROIPaymentModal";
import { useState } from "react";
import { useROIProcessPayment } from "@/hooks/useROI";
import type { ROIPaymentFormData } from "@/validations/roi-payment-schema";

interface ROIDetailViewProps {
    user: ActiveUserInvestment;
    onBack: () => void;
    isLoading: boolean
}

const ROIDetailView = ({ user, onBack, isLoading }: ROIDetailViewProps) => {
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [selectedInvestment, setSelectedInvestment] = useState<ActiveUserInvestment["investments"][0] | null>(null);


    const {mutate, isPending} = useROIProcessPayment();

    const handlePaymentSubmit = (data: ROIPaymentFormData) => {
        if(!selectedInvestment) return;
        mutate({
            ...data,
            user_id: selectedInvestment.user_id,
            investment_id: selectedInvestment.investment_id,
        },
        {onSuccess: () => {
            setOpenPaymentModal(false);
            setSelectedInvestment(null);
        }}
    )
    }
    if(isLoading){
        return(
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-[20px]">View User Investment List</h2>
                    </div>
                    <Button 
                        variant="ghost" 
                        className="text-megagreen hover:text-megagreen/80"
                        onClick={onBack}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                </div>
                <div className="flex items-center justify-center h-32 border rounded-lg mt-6">
                    <p className="text-muted-foreground">Loading user investment details...</p>
                </div>

            </div>
        )
    }

    return (
        <div className="font-jakarta space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-semibold text-[20px]">View User Investment List</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {user.first_name} {user.middle_name} {user.last_name} • {user.email}
                    </p>
                </div>
                <Button 
                    variant="ghost" 
                    className="text-megagreen hover:text-megagreen/80"
                    onClick={onBack}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Investment History</h3>
                    <span className="text-sm text-muted-foreground">
                        Total: {user.investments.length} {user.investments.length === 1 ? 'investment' : 'investments'}
                    </span>
                </div>

                {user.investments.length === 0 ? (
                    <div className="flex items-center justify-center h-32 border rounded-lg">
                        <p className="text-muted-foreground">No investments found</p>
                    </div>
                ) : (
                    user.investments.map((investment) => (
                        <div key={investment.investment_id} className="p-4 border rounded-lg">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Investment Name</p>
                                    <p className="font-semibold">{investment.inv_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Amount</p>
                                    <p className="font-semibold text-megagreen">
                                        ₦{parseFloat(investment.amount).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                        {investment.status}
                                    </span>
                                </div>
                                <div>
                                    <Button className="bg-megagreen text-white hover:bg-megagreen/90 px-4 py-2 rounded-full text-sm font-medium"
                                        onClick={() =>{
                                            setOpenPaymentModal(true)
                                            setSelectedInvestment(investment)
                                        }}
                                    >
                                        Pay ROI
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ROIPaymentModal */}
            <ROIPaymentModal
                isOpen={openPaymentModal}
                onClose={() => {
                    setOpenPaymentModal(false);
                    setSelectedInvestment(null);
                }}

                onSubmit={handlePaymentSubmit}
                isPending={isPending}
            />
        </div>


    );
};

export default ROIDetailView;
