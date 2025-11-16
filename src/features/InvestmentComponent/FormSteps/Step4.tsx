import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { UseFormReturn } from "react-hook-form";
import type { InvestmentFormData } from "@/validations/investment-schema";


type Step4Props = {
    formData: UseFormReturn<InvestmentFormData>
}

const Step4 = ({formData}: Step4Props) => {
    const { register, formState: { errors } } = formData;

    return (
        <div className="space-y-3">
            <h2 className="text-megagreen font-semibold text-sm">Bank Details</h2>
            <div>
                <Label htmlFor="minimum" className="block mb-2 text-sm font-medium text-gray-700">
                    Minimim amount
                </Label>
                <Input
                    {...register("minimum_amount")}
                    type="text" 
                    id="minimum" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
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
                    // disabled={isPending}
                />
                {errors.max_amount && <p className="text-xs text-red-500 mt-1">{errors.max_amount.message}</p>}
            </div>
            <div>
                <Label htmlFor="investor" className="block mb-2 text-sm font-medium text-gray-700">
                    Number of Investor
                </Label>
                <Input
                    {...register("investors_count")}
                    type="text" 
                    id="investor" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                />
                {errors.investors_count && <p className="text-xs text-red-500 mt-1">{errors.investors_count.message}</p>}
            </div>
            <div>
                <Label htmlFor="bank_name" className="block mb-2 text-sm font-medium text-gray-700">
                    Bank Name
                </Label>
                <Input
                    {...register("bank_name")}
                    type="text" 
                    id="bank_name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                    placeholder="GTB"
                    // disabled={isPending}
                />
                {errors.bank_name && <p className="text-xs text-red-500 mt-1">{errors.bank_name.message}</p>}
            </div>
            <div>
                <Label htmlFor="account_no" className="block mb-2 text-sm font-medium text-gray-700">
                    Account Number
                </Label>
                <Input
                    {...register("account_no")}
                    type="text" 
                    id="account_no" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                    placeholder="2920827282"
                />
                {errors.account_no && <p className="text-xs text-red-500 mt-1">{errors.account_no.message}</p>}
            </div>
            <div>
                <Label htmlFor="account_name" className="block mb-2 text-sm font-medium text-gray-700">
                    Account Name
                </Label>
                <Input
                    {...register("account_name")}
                    type="text" 
                    id="account_name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                    placeholder="acct name"
                    // disabled={isPending}
                    />
                {errors.account_name && <p className="text-xs text-red-500 mt-1">{errors.account_name.message}</p>}
            </div>
            
        </div>
    )
}
export default Step4;