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
      <DialogContent
        className="font-poppins sm:max-w-md bg-no-repeat bg-center bg-cover h-[500px] flex flex-col justify items-center gap-10 pt-54"
        style={{ backgroundImage: `url(${successImg})` }}
      >
        <DialogHeader className="text-center">
            <DialogTitle className="text-2xl text-center font-medium">Congratulations</DialogTitle>
            <DialogDescription className="text-center text-megagreen">
                Access Code Generated Successfully
            </DialogDescription>

          <span className="text-center text-xs text-green-800">
              And has been sent to : <span className="font-semibold text-megagreen">
                {formData.email.replace(/(.{3})(.*)(?=@)/, "$1****")}
              </span>
          </span>
        </DialogHeader>
        
          <Button
            onClick={onConfirm}
            className="bg-megagreen hover:bg-megagreen/90 rounded-full mt-10 px-6"
          >
            Close
          </Button>
          
      </DialogContent>
    </Dialog>
  )
}