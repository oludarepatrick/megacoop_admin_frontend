import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface LoanRejectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (reason: string, explanation?: string) => Promise<void>
}

const rejectionReasons = [
  { value: "low_credit_score", label: "Low Credit Score" },
  { value: "insufficient_income", label: "Insufficient Income" },
  { value: "high_debt_ratio", label: "High Debt Ratio" },
  { value: "employment_status", label: "Employment Status" },
  { value: "incomplete_documentation", label: "Incomplete Documentation" },
  { value: "fraud_suspicion", label: "Fraud Suspicion" },
  { value: "other", label: "Other" },
]

export function LoanRejectionModal({ open, onOpenChange, onSubmit }: LoanRejectionModalProps) {
  const [selectedReason, setSelectedReason] = useState("")
  const [explanation, setExplanation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!selectedReason) return
    setIsSubmitting(true)
    try {
      await onSubmit?.(selectedReason, explanation)
      setSelectedReason("")
      setExplanation("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Rejection Reason</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Select Reason</label>
            <Select value={selectedReason} onValueChange={setSelectedReason}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Choose a reason..." />
              </SelectTrigger>
              <SelectContent>
                {rejectionReasons.map((reason) => (
                  <SelectItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Additional Explanation (Optional)</label>
            <Textarea
              placeholder="Provide additional details about the rejection..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="border-gray-300 resize-none"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleSubmit}
            disabled={!selectedReason || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
