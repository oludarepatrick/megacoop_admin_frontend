import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { InvestmentFormData } from "@/validations/investment-schema"
import type { UseFormReturn } from "react-hook-form"

type Step1Props = {
    formData: UseFormReturn<InvestmentFormData>
}

const Step1 = ( {formData}: Step1Props) => {
    const { register, formState: { errors} } = formData

    return (
        <div className="space-y-3">
            <h2 className="text-megagreen font-semibold text-sm">Business Owner Information</h2>
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
                />
                {errors.founder_name && <p className="text-xs text-red-500 mt-1">{errors.founder_name.message}</p>}
            </div>
            <div>
                <Label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                    Phone
                </Label>
                <Input
                    {...register("phone")}
                    type="tel" 
                    id="phone" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                    placeholder="Phone"
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>
            <div>
                <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                </Label>
                <Input
                    {...register("email")}
                    type="email" 
                    id="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                    placeholder="@gmail.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
                <Label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
                    Address
                </Label>
                <Input
                    {...register("office_address")}
                    type="text" 
                    id="address" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                />
                {errors.office_address && <p className="text-xs text-red-500 mt-1">{errors.office_address.message}</p>}
            </div>
            <div>
                <Label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-700">
                    State
                </Label>
                <Input
                    {...register("state")}
                    type="text" 
                    id="state" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                    placeholder="state"
                />
                {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
            </div>
            <div>
                <Label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700">
                    City
                </Label>
                <Input
                    {...register("city")}
                    type="text" 
                    id="city" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                    placeholder="city"
                />
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
            </div>
        </div>
    )
}
export default Step1;