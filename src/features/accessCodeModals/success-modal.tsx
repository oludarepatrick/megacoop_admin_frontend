import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { accessCodeFormData } from "@/validations/access-code-schema"
import successImg from "@/assets/success-bg.png"

type SuccessModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  formData: accessCodeFormData
}

export function SuccessModal({
  isOpen,
  onClose,
  onConfirm,
  formData,
}: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md bg-[url('${successImg}')] bg-no-repeat bg-center bg-contain`}>
        <DialogHeader className="text-center">
            <DialogTitle className="text-2xl">Congratulations</DialogTitle>
            <DialogDescription>
                Access Code Generated Successfully
            </DialogDescription>
        </DialogHeader>
        <span className="text-center text-gray-600">
            And has been sent to : <span className="font-semibold text-megagreen">{formData.email}</span>
        </span>
        
          <Button
            onClick={onConfirm}
            className="bg-megagreen hover:bg-megagreen/90 rounded-full"
          >
            Close
          </Button>
          
        <p className="text-xs text-center text-red-600 mt-2 font-poppins px-4 font-medium">
          Please ensure that all Information are correct before proceeding to generate code.
        </p>
      </DialogContent>
    </Dialog>
  )
}