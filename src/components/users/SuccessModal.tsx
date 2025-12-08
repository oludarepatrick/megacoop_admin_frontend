import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import backgroundSuccess from "@/assets/user-success-bg-image.png"
import { PlusCircle } from "lucide-react"
import type { UserFormValues } from "@/types/User"

interface SuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  values: UserFormValues
  onClose: () => void
}

export function SuccessModal({ open, onOpenChange, values, onClose }: SuccessModalProps) {
    console.log("SuccessModal values:", values);
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" font-poppins sm:max-w-md bg-no-repeat bg-center bg-cover h-[500px] max-h-screen flex flex-col justify items-center gap-10 pt-34" style={{backgroundImage: `url(${backgroundSuccess})` }}>
        <DialogHeader className="text-center">
                  <DialogTitle className="text-2xl font-semibold flex flex-col items-center ">
                     <div className="relative w-32 h-32">
          {/* Creating a CSS-only representation of the 3D avatar in the image */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full shadow-2xl border-4 border-gray-600/50 flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full relative overflow-hidden">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-8 bg-gray-400 rounded-t-full"></div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-br from-[#84CC16] to-[#4D7C0F] rounded-2xl rotate-12 shadow-lg flex items-center justify-center border-2 border-white/20">
            <PlusCircle className="w-8 h-8 text-white" />
          </div>
        </div>
                  </DialogTitle>
          <DialogDescription className="mt-2 text-gray-600 text-center w-[65%] mx-auto">
            New user has been added <span className="text-megagreen">Successfully. Password has been sent to this email.</span>{values.email ? ` (${values.email})` : ""}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center w-full ">
          <Button variant="outline" onClick={onClose}
          className="w-full border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 bg-transparent"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}