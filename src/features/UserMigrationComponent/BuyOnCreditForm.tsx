import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserMigrationFormBase } from "./UserMigrationFormBase"
import { getErrorMessage } from "@/utils/errorUtils"
import type { AppError } from "@/types"
import { useByOnCreditMigration } from "@/hooks/useMigration"
import { buyOnCreditSchema,  type BuyOnCreditFormValues } from "@/validations/migration-schema"
 
type Props = { userId: string; onSuccess: () => void }
 
export function BuyOnCreditForm({ userId, onSuccess }: Props) {
    // const [apiError, setApiError] = useState<string | null>(null)
 
    const form = useForm<BuyOnCreditFormValues>({
        resolver: zodResolver(buyOnCreditSchema),
        defaultValues: {
            product_name: "", product_price: "", balance: "",
            interest_rate: "", interest_amount: "",
            repayment_months: "", monthly_due: "", next_due_date: "",

        },
    })
 
 
    const {mutate, isPending, isSuccess, isError, error} = useByOnCreditMigration()
     
    const handleSubmit = form.handleSubmit(
            (values) => {
                mutate({ ...values, uuid: userId }, { onSuccess })
            },
            (errors) => {
                console.log("buy on credit form validation errors:", errors)
            }
    )
     
    const apiError = isError ? getErrorMessage(error as AppError) : null
    
 
    return (
        <UserMigrationFormBase
            title="Buy on Credit Items"
            description="Add all existing buy-on-credit purchase records for this member."
            onSubmit={handleSubmit}
            isPending={isPending}
            isSuccess={isSuccess}
            error={apiError}
            submitLabel="Submit credit items"
        >
            <Form {...form}>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="product_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. LG Refrigerator" {...field} 
                                                disabled={isPending} 
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="product_price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product price (₦)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="e.g. 32000"
                                                    disabled={isPending}
                                                    {...field}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                                />                                            
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
 
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="balance"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Balance remaining (₦)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="e.g. 18000"
                                                    disabled={isPending}
                                                    {...field}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                                />    
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="interest_rate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Interest rate (%)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="e.g. 5"
                                                    disabled={isPending}
                                                    {...field}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                                />    
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="interest_amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Interest amount (₦)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="e.g. 9000"
                                                    disabled={isPending}
                                                    {...field}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                                    />    
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
 
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="repayment_months"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Repayment months</FormLabel>
                                            <FormControl>
                                                <Input type="number" 
                                                    placeholder="e.g. 12" {...field}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="monthly_due"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Monthly due (₦)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="e.g. 15000"
                                                    disabled={isPending}
                                                    {...field}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                                    />    
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="next_due_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Next due date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} 
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                </div>
            </Form>
        </UserMigrationFormBase>
    )
}