import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import bcgImg from "@/assets/money-growth-3d.png"
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { useState } from "react";
import type { ApproveRejectInvestment } from "@/types/investment";


type DeclineModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApproveRejectInvestment) => void;
  isPending?: boolean;
  text: string
};

const DeclineModal = ({isOpen, onClose, onSubmit, isPending, text}: DeclineModalProps) => {
    const [reason, setReason] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!reason.trim()){
            setError("This field is required")
        }
        const formData: ApproveRejectInvestment =  {
            status: "rejected",
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
                    {/* <div className="flex flex-col gap-4">
                        <Label>Reason for Denial</Label>
                        <Select >
                            <SelectTrigger className="w-full border py-5 border-gray-300 rounded-md focus:!outline-none focus:!ring focus:!ring-megagreen focus:!shadow-md">
                                <SelectValue placeholder="Select reason" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dd">Reason 1</SelectItem>
                                <SelectItem value="dd">Reason 2</SelectItem>
                                <SelectItem value="dd">Reason 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> */}
                    <div className="flex flex-col gap-4">
                        <Label>Reason for Denial <span className="text-megagreen">(if necessary)</span></Label>
                        {/* <Label>Add other reasons <span className="text-megagreen">(if necessary)</span></Label> */}
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
                                <Check/>Send
                            </>
                        )}
                    </Button>

                </form>
                   
            </DialogContent>
        </Dialog>
    ) 
}
export default DeclineModal;

