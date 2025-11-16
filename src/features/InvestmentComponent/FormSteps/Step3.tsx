import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import type { UseFormReturn } from "react-hook-form";
import type { InvestmentFormData } from "@/validations/investment-schema";


type Step3Props = {
    formData: UseFormReturn<InvestmentFormData>
}

const Step3 = ({formData}: Step3Props) => {
    const { register, formState: { errors } } = formData;
    
    return (
        <div className="space-y-3">
            <h2 className="text-megagreen font-semibold text-sm">Company Funds</h2>
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
                />
                {errors.amount_needed && <p className="text-xs text-red-500 mt-1">{errors.amount_needed.message}</p>}
            </div>
            <div>
                <Label htmlFor="equity" className="block mb-2 text-sm font-medium text-gray-700">
                    Equity Offering
                </Label>
                <Input
                    {...register("equity_offering")}
                    type="text" 
                    id="equity" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                    placeholder="Equity"
                />
                {errors.equity_offering && <p className="text-xs text-red-500 mt-1">{errors.equity_offering.message}</p>}
            </div>
            <div>
                <Label htmlFor="valuation" className="block mb-2 text-sm font-medium text-gray-700">
                    Current Valuation
                </Label>
                <Input
                    {...register("current_valuation")}
                    type="text" 
                    id="valuation" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                />
                {errors.current_valuation && <p className="text-xs text-red-500 mt-1">{errors.current_valuation.message}</p>}
            </div>
            <div>
                <Label htmlFor="vesting_period" className="block mb-2 text-sm font-medium text-gray-700">
                    Vesting Period
                </Label>
                <Input
                    {...register("vesting_period")}
                    type="text" 
                    id="vesting_period" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                    placeholder="3-5months"
                    />
                {errors.vesting_period && <p className="text-xs text-red-500 mt-1">{errors.vesting_period.message}</p>}
            </div>
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
                />
                {errors.roi && <p className="text-xs text-red-500 mt-1">{errors.roi.message}</p>}
            </div>
            <div>
                <Label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                    Detailed Description
                </Label>
                <Textarea
                    {...register("detail_description")}
                    id="description" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                    placeholder="www.megacoop.com"
                />
                {errors.detail_description && <p className="text-xs text-red-500 mt-1">{errors.detail_description.message}</p>}
            </div>
            
        </div>
    )
}
export default Step3;