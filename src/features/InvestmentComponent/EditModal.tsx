import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import bcgImg from "@/assets/golden-coins-3d.png"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ListInvestment } from "@/types/investment";
import { editFormSchema, type EditFormData, } from "@/validations/investment-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface EditModalProps {
    isOpen: boolean
    onClose: () => void
    investment: ListInvestment
    isPending: boolean
    onSubmit: (data: EditFormData) => void
}

const EditModal = ({isOpen, onClose, investment, onSubmit, isPending }: EditModalProps) => {
    const {register, handleSubmit, setValue, watch, formState:{errors}} = useForm<EditFormData>({
        resolver: zodResolver(editFormSchema),
        defaultValues: investment || {
            title: "",
            company_name: "",
            founder_name: "",
            industry: "",
            office_address: "",
            email: "",
            minimum_amount: "",
            max_amount: "",
            roi: "",
            amount_needed: "",
            status: "pending", // <-- important default
        }
    })

    const status = watch("status");

    const handleFormSubmit= (data:EditFormData) => {
        onSubmit(data);
    }

    return (
         <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent 
                className="font-jakarta pt-4 pb-18 px-16 max-h-[90vh] overflow-y-auto scrollbar-hide"
                aria-describedby={undefined}
                style={{
                backgroundImage: `url(${bcgImg})`,
                backgroundPosition: "bottom right",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100px",
                }}
            >
                <DialogHeader className="py-2 border-b border-icon/30">
                    <DialogTitle className="text-lg font-semibold text-megagreen text-center">Update Investment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="space-y-3">
                        <div className="flex justify-between gap-4">
                            <div>
                                <Label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                                    Investment title
                                </Label>
                                <Input
                                    {...register("title")}
                                    type="text" 
                                    id="title" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                    placeholder="Title"
                                    disabled={isPending}
                                />
                                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="company_name" className="block mb-2 text-sm font-medium text-gray-700">
                                    Company name
                                </Label>
                                <Input
                                    {...register("company_name")}
                                    type="text" 
                                    id="company_name" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                    placeholder="Company Name"
                                    disabled={isPending}
                                />
                                {errors.company_name && <p className="text-xs text-red-500 mt-1">{errors.company_name.message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div>
                                <Label htmlFor="founder_name" className="block mb-2 text-sm font-medium text-gray-700">
                                    Founder Name
                                </Label>
                                <Input
                                    {...register("founder_name")}
                                    type="text" 
                                    id="founder_name" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                    placeholder="Founder name"
                                    disabled={isPending}
                                />
                                {errors.founder_name && <p className="text-xs text-red-500 mt-1">{errors.founder_name.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="sector" className="block mb-2 text-sm font-medium text-gray-700">
                                    Business sector
                                </Label>
                                <Input
                                    {...register("industry")}
                                    type="text" 
                                    id="sector" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                    placeholder="sector"
                                    disabled={isPending}
                                    />
                                {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry.message}</p>}
                            </div>
                            
                            
                        </div>
                        <div className="flex justify-between gap-4">
                            <div>
                                <Label htmlFor="company_type" className="block mb-2 text-sm font-medium text-gray-700">
                                    Address
                                </Label>
                                <Input
                                    {...register("office_address")}
                                    type="text" 
                                    id="company_type" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                    placeholder="Ltd"
                                    disabled={isPending}
                                />
                                {errors.office_address && <p className="text-xs text-red-500 mt-1">{errors.office_address.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                    Email
                                </Label>
                                <Input
                                    {...register("email")}
                                    type="text" 
                                    id="email" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                    placeholder="@gmail.com"
                                    disabled={isPending}
                                    />
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div>
                                <Label htmlFor="minimum" className="block mb-2 text-sm font-medium text-gray-700">
                                    Minimim amount
                                </Label>
                                <Input
                                    {...register("minimum_amount")}
                                    type="text" 
                                    id="minimum" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                    disabled={isPending}
                                />
                                {errors.minimum_amount && <p className="text-xs text-red-500 mt-1">{errors.minimum_amount.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="maximum" className="block mb-2 text-sm font-medium text-gray-700">
                                    Maximum amount
                                </Label>
                                <Input
                                    {...register("max_amount")}
                                    type="text" 
                                    id="maximum" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                    disabled={isPending}
                                />
                                {errors.max_amount && <p className="text-xs text-red-500 mt-1">{errors.max_amount.message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                           <div>
                                <Label htmlFor="roi" className="block mb-2 text-sm font-medium text-gray-700">
                                    ROI
                                </Label>
                                <Input
                                    {...register("roi")}
                                    type="text" 
                                    id="roi" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                    placeholder="16-20%"
                                    disabled={isPending}
                                />
                                {errors.roi && <p className="text-xs text-red-500 mt-1">{errors.roi.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-700">
                                    Amount Needed
                                </Label>
                                <Input
                                    {...register("amount_needed")}
                                    type="text" 
                                    id="amount" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                    placeholder="N20000"
                                    disabled={isPending}
                                />
                                {errors.amount_needed && <p className="text-xs text-red-500 mt-1">{errors.amount_needed.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label className="block mb-2 text-sm font-medium text-gray-700">Status</Label>
                            <Select value={status} onValueChange={value => setValue("status", value as "approved" |"pending" |"rejected")}>
                                <SelectTrigger className="w-full border py-5 border-gray-300 rounded-md focus:!outline-none focus:!ring focus:!ring-megagreen focus:!shadow-md">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button 
                            type="submit"
                            className="bg-megagreen hover:bg-megagreen/80 w-full"
                            disabled={isPending}
                        >
                            {isPending ? "Submitting..." : (
                                <>
                                    <Check />
                                    Update Investment
                                </>
                            )}
                        </Button>
                        
                    </div>
                </form>

            </DialogContent>
        </Dialog>

    )
}
export default EditModal;