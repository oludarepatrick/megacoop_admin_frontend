import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { nhfSavingsSchema, type NhfSavingsFormValues } from "@/validations/migration-schema"
import { useNhfMigration } from "@/hooks/useMigration"
import { getErrorMessage } from "@/utils/errorUtils"
import { UserMigrationFormBase } from "./UserMigrationFormBase"
import type { AppError } from "@/types"
 
type Props = { userId: string; onSuccess: () => void }
 
export function NhfSavingsForm({ userId, onSuccess }: Props) {
    const form = useForm<NhfSavingsFormValues>({
        resolver: zodResolver(nhfSavingsSchema),
        defaultValues: { 
            nhf_amount: ""
        },
    })
 
    const {mutate, isPending, isSuccess, isError, error} = useNhfMigration()

    const handleSubmit = form.handleSubmit(
        (values) => {
            mutate({ ...values, uuid: userId }, { onSuccess })
        },
        (errors) => {
            console.log("NHFform validation errors:", errors)
        }
    )
 
    const apiError = isError ? getErrorMessage(error as AppError) : null

    return (
        <UserMigrationFormBase
            title="NHF Savings"
            description="Enter the member's National Housing Fund accumulated balance."
            onSubmit={handleSubmit}
            isPending={isPending}
            isSuccess={isSuccess}
            error={apiError}
            submitLabel="Submit NHF savings"
        >
            <Form {...form}>
                <div className="space-y-6">

                    <FormField
                        control={form.control}
                        name="nhf_amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>NHF balance (₦)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="e.g. 150000"
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
                        name="frequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Frequency</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-full ">
                                        <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg" disabled={isPending}>
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

            </Form>
        </UserMigrationFormBase>
    )
}
 