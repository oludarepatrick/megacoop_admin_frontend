// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import { useROIProcessPayment } from "@/hooks/useROI";
// import type { ROIPaymentFormData } from "@/validations/roi-payment-schema";
import { CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { SingleUserResponse } from "@/types/userView";

interface UserViewDetailProps {
    user: SingleUserResponse;
    // isLoading: boolean
}

const UserViewDetail = ({ user }: UserViewDetailProps) => {
    const userBio = user?.user;
    const userWallet = user?.wallet
    // const userTransactions = user.wallet_transactions


    // const {mutate, isPending} = useROIProcessPayment();

    // const handlePaymentSubmit = (data: ROIPaymentFormData) => {
    //     if(!selectedInvestment) return;
    //     mutate({
    //         ...data,
    //         user_id: selectedInvestment.user_id,
    //         investment_id: selectedInvestment.investment_id,
    //     },
    //     {onSuccess: () => {
    //         setOpenPaymentModal(false);
    //         setSelectedInvestment(null);
    //     }}
    // )
    // }
    // if(isLoading){
    //     return(
    //         <div>
    //             <div className="flex justify-between items-center">
    //                 <div>
    //                     <h2 className="font-semibold text-[20px]">View User Investment List</h2>
    //                 </div>
    //                 <Button 
    //                     variant="ghost" 
    //                     className="text-megagreen hover:text-megagreen/80"
    //                     onClick={onBack}
    //                 >
    //                     <ArrowLeft className="mr-2 h-4 w-4" />
    //                     Back
    //                 </Button>
    //             </div>
    //             <div className="flex items-center justify-center h-32 border rounded-lg mt-6">
    //                 <p className="text-muted-foreground">Loading user investment details...</p>
    //             </div>

    //         </div>
    //     )
    // }

    return (
        <CardContent className="flex justify-between items-center bg-[#71BF93]/20 border-none p-6 rounded-none shadow-none">
            <div className="space-y-1 font-medium text-sm">
                <div className="flex gap-4">
                    <p>
                        <span>Name:{" "}</span>
                        <span className="text-megagreen">{[userBio?.first_name, userBio?.middle_name, userBio?.last_name].join(" ")}</span>
                    </p>
                    <p>
                        <span>Email:{" "}</span>
                        <span className="text-megagreen">{userBio?.email}</span>
                    </p>
                </div>
                <p>
                    <span>Phone:{" "}</span>
                    <span className="text-megagreen">{userBio?.phone}</span>
                </p>
                <div className="flex gap-4 items-start">
                    <p>
                        <span>Account Value:{" "}</span>
                        <span className="text-megagreen">{formatCurrency(Number(userWallet?.balance))}</span>
                    </p>
                    <p className="bg-[#DB960F] text-white font-medium rounded-sm p-1">
                        Account Number: {userWallet?.account_number}
                    </p>
                </div>
                <p>
                    <span>Status:{" "}</span>
                    <span className="text-megagreen">{userBio?.status === 1 ? "Active" : "Inactive"}</span>
                </p>
            </div>
            {/* image  */}
            <div>
            </div>
            
        </CardContent>
    );
};
export default UserViewDetail;
