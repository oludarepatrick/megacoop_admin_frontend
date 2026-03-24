import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTargetSavingsMigration } from "@/hooks/useMigration"
import { UserMigrationFormBase } from "./UserMigrationFormBase"
import { targetSavingsSchema, type TargetSavingsFormValues } from "@/validations/migration-schema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getErrorMessage } from "@/utils/errorUtils"
import type { AppError } from "@/types"
 
type Props = { userId: string; onSuccess: () => void }
 
export function TargetSavingsForm({ userId, onSuccess }: Props) {
    // const [apiError, setApiError] = useState<string | null>(null)
 
    const form = useForm<TargetSavingsFormValues>({
        resolver: zodResolver(targetSavingsSchema),
        defaultValues: {
            goal_name: "", 
            purpose: "", 
            target_amount: "", 
            amount_saved: "" ,

        },
    })
 
 
    // const mutation = useTargetSavingsMigration()
 
    // Submit each goal individually to the endpoint
    // const handleSubmit = form.handleSubmit(async (values) => {
    //     setApiError(null)
    //     try {
    //         for (const goal of values.goals) {
    //             await mutation.mutateAsync({ user_id: userId, ...goal })
    //         }
    //         onSuccess()
    //     } catch (err: any) {
    //         setApiError(
    //             err?.response?.data?.message ?? "Failed to submit one or more goals. Please try again."
    //         )
    //     }
    // })

    const {mutate, isPending, isSuccess, isError, error} = useTargetSavingsMigration()
     
        // const handleSubmit = form.handleSubmit((values) => {
        //     console.log(values, "submit triggered")
        //     mutate(
        //         {...values, uuid: userId },
        //         { onSuccess },
        //     )
        // })
    
        const handleSubmit = form.handleSubmit(
            (values) => {
                mutate({ ...values, uuid: userId }, { onSuccess })
            },
            (errors) => {
                console.log("target savings validation errors:", errors)
            }
        )
     
        const apiError = isError ? getErrorMessage(error as AppError) : null
    
 
    return (
        <UserMigrationFormBase
            title="Target Savings Goals"
            description="Add all existing savings goals for this member."
            onSubmit={handleSubmit}
            isPending={isPending}
            isSuccess={isSuccess}
            error={apiError}
            submitLabel="Submit savings goals"
        >
            <Form {...form}>
                <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="goal_name"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Goal Name</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full border py-5 border-gray-300 rounded-md focus:!outline-none focus:!ring focus:!ring-megagreen focus:!shadow-md" disabled={isPending}>
                                                <SelectValue placeholder="Travelling" />
                                            </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                            <SelectItem value="Property Purchase">Property Purchase</SelectItem>
                                            <SelectItem value="House Rent">House Rent</SelectItem>
                                            <SelectItem value="Personal Project">Personal Project</SelectItem>
                                            <SelectItem value="Car">Car</SelectItem>
                                            <SelectItem value="Home Appliances">Home Appliances</SelectItem>
                                            <SelectItem value="Travelling">Travelling</SelectItem>
                                            <SelectItem value="Others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='purpose'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Purpose</FormLabel>
                                <FormControl>
                                        <Input placeholder="e.g. Children education" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                    />
                    <FormField
                        control={form.control}
                        name="target_amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target amount (₦)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="e.g. 200000"
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
                        name="amount_saved"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount already saved (₦)</FormLabel>
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