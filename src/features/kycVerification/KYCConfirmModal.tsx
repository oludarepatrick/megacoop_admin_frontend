import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import kycIcon from "@/assets/kyc-icon.svg"
import { Loader2 } from "lucide-react"

type KYCConfirmModalProps ={
    onClose: () => void
    onProceed: () => void
    isPending: boolean
    isOpen: boolean
    image?: string
}

const KYCConfirmModal = ({isOpen, isPending, onClose, onProceed}: KYCConfirmModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-sm w-full">
                <DialogHeader className="items-center text-center" >
                    <img src={kycIcon} alt="" aria-hidden="true" className="w-10"  />
                    <DialogDescription className="text-center">
                        Are you Sure you want to <br/>Approve this user KYC
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center gap-8 mt-6">
                    <Button 
                        className="bg-megagreen hover:bg-megagreen/90" 
                        disabled={isPending} onClick={onProceed}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                                Approving...
                            </>
                            ): "Approve"
                        }
                        
                    </Button>
                    <Button variant="outline" className="border-megagreen text-green-800" disabled={isPending} onClick={onClose}>Cancel</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default KYCConfirmModal;


type KYCImageModalProps ={
    onClose: () => void
    isOpen: boolean
    image?: string
}
export const KYCImageModal = ({isOpen, onClose, image}: KYCImageModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="items-center text-center" >
                    <DialogTitle className="mb-4 font-normal text-megagreen text-2xl">Means of Identification</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center gap-8 mt-6 max-h-100 w-full">
                   <img src={image} alt="" className="0bject-contain" />
                </div>
                    
            </DialogContent>
        </Dialog>
    )
}