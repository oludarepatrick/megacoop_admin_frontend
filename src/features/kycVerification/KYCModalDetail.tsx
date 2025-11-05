import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { KYCList, KYCStatus } from "@/types/kycList"
// import { ChevronDown } from "lucide-react"
import KYCConfirmModal, { KYCImageModal } from "./KYCConfirmModal"
import { useState } from "react"
import KYCDeclineModal from "./KYCDeclineModal"
import { useApproveKYC, useDeclineKYC } from "@/hooks/useKYCList"
import type { KycDeclineFormData } from "@/validations/kyc-schema"


type KYCModalDetailProps ={
    isOpen: boolean
    onClose: () => void
    kycList: KYCList
    status: KYCStatus

}

const KYCModalDetail = ({isOpen, onClose, kycList, status}: KYCModalDetailProps) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] =  useState(false)
    const [isDeclineModalOpen, setIsDeclineModalOpen] =  useState(false)
    const [selectedImage, setSelectedImage] =  useState<string |null>(null)
    const {mutate, isPending} = useApproveKYC(() =>{
         setIsConfirmModalOpen(false);
         onClose();
    });
    const {mutate: rejectKYC, isPending: pending} = useDeclineKYC(()=>{
        setIsDeclineModalOpen(false)
        onClose()
    })

    const handleApproveKYC = async () => {
        mutate({ uuid: kycList.kyc_uuid, status: "approved" })
           
    }

    const handleRejectKYC = async(data: KycDeclineFormData) => {
        const payload = {
            uuid: kycList.kyc_uuid,
            status: "declined",
            admin_comment: data.admin_comment,
            what_failed: data.what_failed,
        }
        rejectKYC(payload)
       
    }
   
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="p-0 rounded-t-none sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide pb-8">
                <DialogHeader className="bg-megagreen py-6 text-white">
                    <DialogTitle className="text-2xl font-semibold text-center">User KYC Details</DialogTitle>
                </DialogHeader>
                <div className="border-b shadow-sm pt-6 ">
                    <div className="text-center px-4 flex justify-center gap-8 mb-6 sm:flex-row flex-col">
                        <div className="flex flex-col items-center gap-4">
                            <div className="sm:w-40 sm:h-40 w-30 h-30 rounded-full cursor-pointer flex flex-col items-center justify-center gap-2">
                                <img src={kycList.live_face_verification} 
                                    alt="user-kyc-uploaded-image" 
                                    className="w-full h-full object-cover rounded-full"
                                    onClick={()=> setSelectedImage(kycList.live_face_verification)}
                                />
                            </div>
                            <span className="text-megagreen text-xs font-medium">Selfie Uploaded, Tap the Image to view</span>
                            
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="sm:w-40 sm:h-40 w-30 h-30 rounded-full cursor-pointer flex flex-col items-center justify-center gap-2">
                                <img src={`data:image/jpeg;base64,${kycList?.nin_details?.photo}`}
                                    alt="user-kyc-uploaded-image" 
                                    className="w-full h-full object-cover rounded-full"
                                    onClick={()=> setSelectedImage(`data:image/jpeg;base64,${kycList?.nin_details?.photo}`)}
                                />
                            </div>
                            <span className="text-megagreen text-xs font-medium">NIN Image Uploaded, Tap the Image to view</span>
                            
                        </div>
                    </div>
                    <div className="sm:px-16 p-4 space-y-1 sm:max-w-lg">
                        <h2 className="uppercase font-medium text-megagreen">Personal Details</h2>
                        <div className="flex items-center">
                            <p className="w-1/2">First Name:</p>
                            <p className="font-semibold text-megagreen">{kycList.first_name}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-1/2">Last Name:</p>
                            <p className="font-semibold text-megagreen">{kycList.last_name}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-1/2">Middle Name:</p>
                            <p className="font-semibold text-megagreen">{kycList.middle_name}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-1/2">Email:</p>
                            <p className="font-semibold text-megagreen">{kycList.email}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-1/2">Phone:</p>
                            <p className="font-semibold text-megagreen">{kycList.phone}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-1/2">Address:</p>
                            <p className="font-semibold text-megagreen">{kycList.contact_address}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-1/2">BVN:</p>
                            <p className="font-semibold text-megaorange uppercase">{kycList.bvn_details.firstname && kycList.bvn_details.firstname ? "true" : "false"}</p>
                        </div>
                        {status === "approved" && (
                            <div className="flex items-center">
                                <p className="w-1/2">KYC Status:</p>
                                <p className="font-semibold text-megagreen">{kycList.admin_approval_status}</p>
                            </div>
                        )}

                        <h2 className="uppercase font-medium text-megagreen pt-3">Uploads</h2>
                        <div className="flex items-center">
                            <p className="w-1/2">ID Card Type:</p>
                            <p className="font-semibold text-megagreen">{kycList.valid_id_card} {" "}
                                <Button className="bg-megagreen rounded-xs " size="sm" onClick={()=> setSelectedImage(kycList.valid_id_card_path)}>View</Button>
                            </p>
                        </div>
                        
                        <div className="flex items-center">
                            <p className="w-1/2">Proof of Address:</p>
                            <Button className="bg-megagreen rounded-xs hover:bg-megagreen/90" size="sm" onClick={() => setSelectedImage(kycList.proof_of_address)}>View</Button>
                        </div>
                    </div>
                </div>
                <div className="sm:px-16 px-4">
                    {status === "pending" && (
                        <div className="flex gap-4 mt-4 flex-wrap">
                            <Button className="bg-megagreen hover:bg-megagreen/90" onClick={() =>setIsConfirmModalOpen(true)}>
                                Approve KYC
                            </Button>
                            <Button className="bg-[#F4C980] text-green-800 hover:bg-[#F4C980BE]" onClick={()=> setIsDeclineModalOpen(true)}>
                                Decline User KYC
                            </Button>

                        </div>
                    )}
                    {status === "approved" && (
                        <div className="flex gap-4 mt-4 flex-wrap">
                            <Button className="bg-[#F4C980] text-green-800 hover:bg-[#F4C980BE]" onClick={()=> setIsDeclineModalOpen(true)}>
                                Deactivate User KYC
                            </Button>
                        </div>
                    )}
                    
                </div>
            </DialogContent>

            <KYCConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={()=> setIsConfirmModalOpen(false)}
                onProceed={handleApproveKYC}
                isPending={isPending}
                
            />

            <KYCDeclineModal
                isOpen={isDeclineModalOpen}
                title={status === "approved" ? "Deactivate User KYC" : "Decline User KYC" }
                onClose={()=> setIsDeclineModalOpen(false)}
                onSubmit={handleRejectKYC}
                isPending={pending}
                
            />

            {selectedImage && (
                <KYCImageModal
                    isOpen={!!selectedImage}
                    onClose={()=> setSelectedImage(null)}
                    image={selectedImage}
                />
            )}
        </Dialog>
    )
}
export default KYCModalDetail;



 {/* <Button className="bg-[#F4C980] text-green-800 hover:bg-[#F4C980BE]">Deactivate User KYC</Button>
                            <Button className="bg-[#F3E4CA] text-green-800 hover:bg-[#f3e4cabe]">Select Issue and email user <ChevronDown/> </Button> */}