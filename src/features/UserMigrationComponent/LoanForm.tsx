import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserMigrationFormBase } from "./UserMigrationFormBase"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getErrorMessage } from "@/utils/errorUtils"
import type { AppError } from "@/types"
import { useLoanMigration } from "@/hooks/useMigration"
import { loanSchema, type LoanFormValues } from "@/validations/migration-schema"
 
type Props = { userId: string; onSuccess: () => void }
 
export function LoanForm({ userId, onSuccess }: Props) {
    // const [apiError, setApiError] = useState<string | null>(null)
 
    const form = useForm<LoanFormValues>({
        resolver: zodResolver(loanSchema),
        defaultValues: {
            amount: "", purpose: "", term_type: "monthly",
            interest_rate: "", monthly_repayment: "",
            total_payback: "", next_repayment_date: "",

        },
    })
 
 
    const {mutate, isPending, isSuccess, isError, error} = useLoanMigration()
     
    const handleSubmit = form.handleSubmit(
            (values) => {
                mutate({ ...values, uuid: userId }, { onSuccess })
            },
            (errors) => {
                console.log("loan form validation errors:", errors)
            }
    )
     
    const apiError = isError ? getErrorMessage(error as AppError) : null
    
 
    return (
        <UserMigrationFormBase
            title="Existing Loan Record"
            description="Enter the member's outstanding loan details."
            onSubmit={handleSubmit}
            isPending={isPending}
            isSuccess={isSuccess}
            error={apiError}
            submitLabel="Submit loan record"
        >
            <Form {...form}>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loan amount (₦)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="e.g. 50000"
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
                            name="purpose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Purpose</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Business expansion" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
 
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="term_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Term type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className="">
                                            <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg" disabled={isPending}>
                                                <SelectValue placeholder="Select term" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="quarterly">Quarterly</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                            name="monthly_repayment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Monthly repayment (₦)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="e.g. 45000"
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
 
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="total_payback"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Total payback (₦)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="e.g. 540000"
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
                            name="next_repayment_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Next repayment date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} disabled={isPending} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"/>
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