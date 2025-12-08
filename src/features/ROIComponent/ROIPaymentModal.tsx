import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import bcgImg from "@/assets/money-growth-3d.png"
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roiPaymentSchema, type ROIPaymentFormData } from "@/validations/roi-payment-schema";


type ROIPaymentModalProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: ROIPaymentFormData) => void
    isPending?: boolean
}

const ROIPaymentModal = ({isOpen, onClose, onSubmit, isPending }: ROIPaymentModalProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(roiPaymentSchema),
        defaultValues: {
            user_id: 0,
            investment_id: 0,
            roi: "",
            month: "",
            year: ""
        }
    })

    const onSubmitForm = (data: ROIPaymentFormData) => {
        console.log(data);
        onSubmit(data)
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-lg p-10 pt-6 max-h-[90vh] overflow-y-auto scrollbar-hide"
                    style={{
                        backgroundImage: `url(${bcgImg})`,
                        backgroundPosition: "bottom right",
                        backgroundRepeat: " no-repeat",
                        backgroundSize: "120px",
                    }}
                >
                    <DialogHeader className="py-2 border-b border-icon/30">
                        <DialogTitle className="text-lg font-semibold text-megagreen text-center">Investment Information</DialogTitle>
                    </DialogHeader>
                    <form className="max-w-[300px] mx-auto w-full py-6 space-y-6" onSubmit={handleSubmit(onSubmitForm)}>
                        <div>
                            <Label htmlFor="roi" className="block mb-2 text-sm font-medium text-gray-700">
                                ROI (₦)
                            </Label>
                            <Input
                                {...register("roi")}
                                type="text" 
                                id="roi" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                placeholder="₦125,000"
                            />
                            {errors.roi && <p className="text-xs text-red-500 mt-1">{errors.roi.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="month" className="block mb-2 text-sm font-medium text-gray-700">
                                Month
                            </Label>
                            <Input
                                {...register("month")}
                                type="text" 
                                id="month" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                placeholder="December"
                            />
                            {errors.month && <p className="text-xs text-red-500 mt-1">{errors.month.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-700">
                                Year
                            </Label>
                            <Input
                                {...register("year")}
                                type="text" 
                                id="year" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                placeholder="2025"
                            />
                            {errors.year && <p className="text-xs text-red-500 mt-1">{errors.year.message}</p>}
                        </div>
                    <Button
                        className="w-full bg-megagreen hover:bg-megagreen/80" 
                        disabled={isPending}
                        type="submit"
                    >
                        
                        <Check/> Initiate Transaction
                            
                        
                    </Button>
                </form>

                    
            </DialogContent>

        </Dialog>
    )
}

export default ROIPaymentModal;