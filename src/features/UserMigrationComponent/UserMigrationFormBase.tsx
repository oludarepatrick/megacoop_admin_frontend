import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
 
type MigrationFormWrapperProps = {
    title: string
    description?: string
    onSubmit: () => void
    isPending: boolean
    isSuccess: boolean
    error: string | null
    submitLabel: string
    children: React.ReactNode
}
 
export function UserMigrationFormBase({
    title, description, onSubmit, isPending,
    isSuccess, error, submitLabel, children,
}: MigrationFormWrapperProps) {
    return (
        <div className=" space-y-6">
            {/* Section heading */}
            <div>
                <h3 className="font-semibold text-base">{title}</h3>
                {description && (
                    <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                )}
            </div>
 
            {/* Success banner */}
            {isSuccess && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Section submitted successfully.
                </div>
            )}
 
            {/* Error banner */}
            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                </div>
            )}
 
            {/* Form fields */}
            {!isSuccess && <div>{children}</div>}
 
            {/* Submit */}
            {!isSuccess && <div className="flex justify-end pt-2 border-t border-dashed border-gray-200">
                <Button
                    type="button"
                    onClick={() => onSubmit()}
                    disabled={isPending || isSuccess}
                    className="bg-megagreen hover:bg-megagreen/90 min-w-[160px]"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Submitting...
                        </>
                    ) : isSuccess ? "Submitted" : submitLabel}
                </Button>
            </div>}
        </div>
    )
}