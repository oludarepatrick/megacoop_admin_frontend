import { Button } from "@/components/ui/button"
import errorImg from "@/assets/warning-icon.png"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ErrorModalProps = {
  isOpen: boolean
  onClose: () => void
  onTryAgain: () => void
  errorMessage?: string
}

export function ErrorModal({
  isOpen,
  onClose,
  onTryAgain,
  errorMessage
}: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-linear-to-b from-[#CAE7D6] to-[#F5FBF8] justify-center gap-10">
        <DialogHeader className="text-center">
          <img src={errorImg} alt="error-image" className="mx-auto h-24 w-24 mb-2"/>
          <DialogTitle className="sr-only">Error</DialogTitle>
          <DialogDescription className="text-xl text-black mt-2 font-poppins max-w-[315px] mx-auto text-center">
            {errorMessage || "Error! While trying to generate this user access code"}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex gap-2 sm:justify-center">
          <Button
            variant="destructive"
            onClick={onTryAgain}
            className="rounded-full"
          >
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}