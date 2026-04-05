import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { KYCList, KYCStatus } from "@/types/kycList"
// import { ChevronDown } from "lucide-react"
import KYCConfirmModal, { KYCImageModal } from "./KYCConfirmModal"
import { useState } from "react"
import KYCDeclineModal from "./KYCDeclineModal"
import { useApproveKYC, useDeclineKYC } from "@/hooks/useKYCList"
import type { KycDeclineFormData } from "@/validations/kyc-schema"
import { useNavigate } from "react-router-dom"


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

    const navigate = useNavigate();


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

    const handleStartMigration = () => {
        navigate("/user-migration", {
            state: {
                userId: kycList.user_uuid,
                fullName: [kycList.last_name, kycList.first_name, kycList.middle_name].join(" "),
                email: kycList.email
            }
        })
    }
   
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="p-0 rounded-t-none sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide pb-8">
                <DialogHeader className="bg-megagreen py-6 text-white">
                    <DialogTitle className="text-2xl font-semibold text-center">User KYC Details</DialogTitle>
                </DialogHeader>
                <div className="border-b shadow-sm pt-6 text-sm">
                    {/* ── Photos Row ───────────────────────────────────────── */}
                    <div className="flex justify-center gap-6 mb-8 px-4 flex-wrap">
                        {[
                            { src: kycList.live_face_verification, label: "Selfie" },
                            { src: kycList?.nin_details?.photo,    label: "NIN Photo" },
                            { src: kycList?.bvn_details?.photo,    label: "BVN Photo" },
                        ].map(({ src, label }) => (
                            <div key={label} className="flex flex-col items-center gap-2">
                                <div
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-megagreen/20 cursor-pointer"
                                    onClick={() => setSelectedImage(src)}
                                >
                                    <img src={src} alt={label} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-megagreen text-xs font-medium text-center">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* ── Details Grid ─────────────────────────────────────── */}
                    <div className="px-4 sm:px-8 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* Personal Details */}
                        <div className="space-y-2">
                            <h2 className="uppercase font-semibold text-megagreen text-xs tracking-wider border-b border-megagreen/20 pb-1 mb-3">
                                Personal Details
                            </h2>
                            {[
                                { label: "First Name",  value: kycList.first_name },
                                { label: "Last Name",   value: kycList.last_name },
                                { label: "Middle Name", value: kycList.middle_name },
                                { label: "Email",       value: kycList.email },
                                { label: "Phone",       value: kycList.phone },
                                { label: "Address",     value: kycList.contact_address },
                                ...(status === "approved" ? [{ label: "KYC Status", value: kycList.admin_approval_status }] : []),
                            ].map(({ label, value }) => (
                                <div key={label} className="flex gap-2">
                                    <p className="text-muted-foreground w-2/5 shrink-0">{label}:</p>
                                    <p className="font-semibold text-megagreen break-all">{value ?? "—"}</p>
                                </div>
                            ))}
                        </div>

                        {/* BVN Details */}
                        {kycList.bvn_details && (
                            <div className="space-y-2">
                                <h2 className="uppercase font-semibold text-megagreen text-xs tracking-wider border-b border-megagreen/20 pb-1 mb-3">
                                    BVN Details
                                </h2>
                                {[
                                    { label: "First Name", value: kycList.bvn_details.firstName },
                                    { label: "Last Name",  value: kycList.bvn_details.lastName },
                                    { label: "DOB",        value: kycList.bvn_details.dateOfBirth },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex gap-2">
                                        <p className="text-muted-foreground w-2/5 shrink-0">{label}:</p>
                                        <p className="font-semibold text-megagreen break-all">{value ?? "—"}</p>
                                    </div>
                                ))}
                                <div className="flex gap-2">
                                    <p className="text-muted-foreground w-2/5 shrink-0">Validation:</p>
                                    <span className={`font-semibold text-xs px-2 py-0.5 rounded-full ${
                                        kycList.bvn_details.allValidationPassed
                                            ? "bg-green-100 text-megagreen"
                                            : "bg-red-100 text-red-500"
                                    }`}>
                                        {kycList.bvn_details.allValidationPassed ? "Passed" : "Failed"}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* NIN Details */}
                        {kycList.nin_details && (
                            <div className="space-y-2">
                                <h2 className="uppercase font-semibold text-megagreen text-xs tracking-wider border-b border-megagreen/20 pb-1 mb-3">
                                    NIN Details
                                </h2>
                                {[
                                    { label: "First Name",  value: kycList.nin_details.firstName },
                                    { label: "Last Name",   value: kycList.nin_details.lastName },
                                    { label: "DOB",         value: kycList.nin_details.dateOfBirth },
                                    { label: "Gender",      value: kycList.nin_details.gender },
                                    { label: "Phone",       value: kycList.nin_details.phone },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex gap-2">
                                        <p className="text-muted-foreground w-2/5 shrink-0">{label}:</p>
                                        <p className="font-semibold text-megagreen break-all">{value ?? "—"}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Uploads */}
                        <div className="space-y-2">
                            <h2 className="uppercase font-semibold text-megagreen text-xs tracking-wider border-b border-megagreen/20 pb-1 mb-3">
                                Uploads
                            </h2>
                            <div className="flex gap-2 items-center">
                                <p className="text-muted-foreground w-2/5 shrink-0">ID Card:</p>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-megagreen">{kycList.valid_id_card}</p>
                                    <Button
                                        size="sm"
                                        className="bg-megagreen hover:bg-megagreen/90 h-6 text-xs px-2"
                                        onClick={() => setSelectedImage(kycList.valid_id_card_path)}
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <p className="text-muted-foreground w-2/5 shrink-0">Proof of Address:</p>
                                <Button
                                    size="sm"
                                    className="bg-megagreen hover:bg-megagreen/90 h-6 text-xs px-2"
                                    onClick={() => setSelectedImage(kycList.proof_of_address)}
                                >
                                    View
                                </Button>
                            </div>
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
                            {kycList.user_type === "old" && (
                                <Button className="bg-megagreen text-white hover:bg-megagreen/80" onClick={handleStartMigration}>
                                    Start Migration
                                </Button>

                            )}
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
