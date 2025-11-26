import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import bcgImg from "@/assets/money-growth-3d.png"
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { useState } from "react";
// import type { ApproveRejectInvestment } from "@/types/investment";


type DeclineWithdrawalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data:{denied_reason: string}) => void;
  isPending?: boolean;
  text: string
};

const DeclineWithdrawalModal = ({isOpen, onClose, onSubmit, isPending, text}: DeclineWithdrawalModalProps) => {
    const [reason, setReason] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!reason.trim()){
            setError("This field is required")
        }
        const formData =  {
            denied_reason: reason,
        }
        onSubmit?.(formData);

        setReason("");
        setError("");
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-poppins p-10 pb-30 max-h-[90vh] overflow-y-auto scrollbar-hide"
                style={{
                    backgroundImage: `url(${bcgImg})`,
                    backgroundPosition: "bottom right",
                    backgroundRepeat: " no-repeat",
                    backgroundSize: "120px",
                }}
            >
                <DialogHeader className="max-w-[300px] mx-auto w-full">
                    <DialogTitle className="text-lg font-semibold">Select your Reasons for {text}  Denial!</DialogTitle>
                </DialogHeader>
                <form className="max-w-[300px] mx-auto w-full py-6 space-y-6">
                    <div className="flex flex-col gap-4">
                        <Label>Reason for Denial <span className="text-megagreen">(if necessary)</span></Label>
                        <Textarea
                            value={reason}
                            onChange={(e) => {setReason(e.target.value); setError("")}}
                            className="focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                        />
                        {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="w-full bg-megagreen hover:bg-megagreen/80" 
                    >
                        {isPending ? "Submitting" : (
                            <>
                                <Check/> Send
                            </>
                        )}
                    </Button>
                </form>
                   
            </DialogContent>
        </Dialog>
    ) 
}
export default DeclineWithdrawalModal;