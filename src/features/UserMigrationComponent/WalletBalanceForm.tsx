import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { walletBalanceSchema, type WalletBalanceFormValues } from "@/validations/migration-schema"
import { useWalletMigration } from "@/hooks/useMigration"
import { getErrorMessage } from "@/utils/errorUtils"
import { UserMigrationFormBase } from "./UserMigrationFormBase"
import type { AppError } from "@/types"
 
type Props = { userId: string; onSuccess: () => void }
 
export function WalletBalanceForm({ userId, onSuccess }: Props) {
    const form = useForm<WalletBalanceFormValues>({
        resolver: zodResolver(walletBalanceSchema),
        defaultValues: {
            amount: "",
            description: "Legacy wallet balance migration",
        },
    })
 
    const {mutate, isPending, isSuccess, isError, error} = useWalletMigration()

    const handleSubmit = form.handleSubmit(
        (values) => {
            console.log("WalletBalanceForm submit values:", values)
            mutate({ ...values, uuid: userId }, { onSuccess })
        },
        (errors) => {
            console.log("WalletBalanceForm validation errors:", errors)
        }
    )
 
    const apiError = isError ? getErrorMessage(error as AppError) : null

    return (
        <UserMigrationFormBase
            title="Wallet Balance"
            description="Enter the member's existing wallet balance to migrate."
            onSubmit={handleSubmit}
            isPending={isPending}
            isSuccess={isSuccess}
            error={apiError}
            submitLabel="Submit wallet balance"
        >
            <Form {...form}>
                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Opening balance (₦)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="e.g. 25000"
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
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input type="text" 
                                        placeholder="e.g. Legacy wallet balance migration" {...field} 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </Form>
        </UserMigrationFormBase>
    )
}