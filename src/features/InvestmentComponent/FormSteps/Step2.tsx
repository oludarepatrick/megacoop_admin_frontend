import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { InvestmentFormData } from "@/validations/investment-schema"
import type { UseFormReturn } from "react-hook-form"

type Step2Props = {
    formData: UseFormReturn<InvestmentFormData>
}

const Step2 = ({formData}: Step2Props) => {
    const { register, formState: {errors} } = formData;

    return (
        <div className="space-y-3">
            <h2 className="text-megagreen font-semibold text-sm">Company Information</h2>
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
                    // disabled={isPending}
                />
                {errors.company_name && <p className="text-xs text-red-500 mt-1">{errors.company_name.message}</p>}
            </div>
            <div>
                <Label htmlFor="company_type" className="block mb-2 text-sm font-medium text-gray-700">
                    Type of company <span className="text-megagreen">(Ltd, Plc, etc...)</span>
                </Label>
                <Input
                    {...register("company_type")}
                    type="text" 
                    id="company_type" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                    placeholder="Ltd"
                />
                {errors.company_type && <p className="text-xs text-red-500 mt-1">{errors.company_type.message}</p>}
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
                    // disabled={isPending}
                    />
                {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry.message}</p>}
            </div>
            <div>
                <Label htmlFor="nature" className="block mb-2 text-sm font-medium text-gray-700">
                    Nature of business
                </Label>
                <Input
                    {...register("brief_description")}
                    type="text" 
                    id="nature" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                />
                {errors.brief_description && <p className="text-xs text-red-500 mt-1">{errors.brief_description.message}</p>}
            </div>
            <div>
                <Label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-700">
                    Company website
                </Label>
                <Input
                    {...register("website")}
                    type="text" 
                    id="website" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                    placeholder="www.megacoop.com"
                />
                {errors.website && <p className="text-xs text-red-500 mt-1">{errors.website.message}</p>}
            </div>
        </div>
    )
}
export default Step2;