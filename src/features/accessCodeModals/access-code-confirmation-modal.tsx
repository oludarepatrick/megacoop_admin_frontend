import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { accessCodeFormData } from "@/validations/access-code-schema"

type AccessCodeConfirmationModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  formData: accessCodeFormData
  isLoading: boolean
}

export function AccessCodeConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  formData,
  isLoading
}: AccessCodeConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle><span className="bg-ring/20 text-megagreen font-medium text-xl font-poppins inline-block px-4 py-2 rounded-lg">User Information</span></DialogTitle>
        </DialogHeader>
        
        <div className="space-y-2 py-4 font-poppins">
              <p className="font-medium ">First Name: <span 
                className="text-megagreen">{formData.first_name}</span>
              </p>
              <p className="font-medium ">Middle Name: <span 
                className="text-megagreen">{formData.middle_name}</span>
              </p>
              <p className="font-medium ">Last Name: <span 
                className="text-megagreen">{formData.last_name}</span>
              </p>
              <p className="font-medium ">Email: <span 
                className="text-megagreen">{formData.email}</span>
              </p>
              <p className="font-medium ">Phone: <span 
                className="text-megagreen">{formData.phone}</span>
              </p>
              <p className="font-medium ">User Type: <span 
                className="text-megagreen">{formData.user_type}</span>
              </p>
          </div>
        <DialogFooter className="gap-2 sm:justify-between font-poppins">
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-megagreen hover:bg-megagreen/90"
          >
            {isLoading ? "Generating..." : "Generate Code Now"}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </DialogFooter>
        <p className="text-xs text-center text-red-600 mt-2 font-poppins px-4 font-medium">
          Please ensure that all Information are correct before proceeding to generate code.
        </p>
      </DialogContent>
    </Dialog>
  )
}