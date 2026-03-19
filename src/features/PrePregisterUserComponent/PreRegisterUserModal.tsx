import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import bcgImg from "@/assets/money-stack-img.png"
import { formatDate } from "@/lib/common";
import type { NewUserList } from "@/types/preRegisterUser";
// import { Button } from "@/components/ui/button";


interface PreRegisterUserModalProps {
    isOpen: boolean
    onClose: () => void
    users: NewUserList

}

const PreRegisterUserModal = ({isOpen, onClose, users}: PreRegisterUserModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-lg p-10 pt-4 pb-20 max-h-[90vh] overflow-y-auto scrollbar-hide"
                    style={{
                        backgroundImage: `url(${bcgImg})`,
                        backgroundPosition: "bottom right",
                        backgroundRepeat: " no-repeat",
                        backgroundSize: "200px",
                    }}
                >
                    <DialogHeader className="py-4 border-b border-icon/30">
                        <DialogTitle className="text-lg font-semibold text-megagreen text-center">Transaction Details</DialogTitle>
                    </DialogHeader>

                    <div className="py-4 space-y-3 text-xs">
                        <div>
                            <p className="text-muted-foreground">Full Name</p>
                            <p className="font-medium">{users.fullname}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium">{users.email}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Phone No</p>
                            <p className="font-medium">{users.phone}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Transaction Date</p>
                            <p className="font-medium">{formatDate(users.created_at)}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-muted-foreground">Status</p>
                            <span className={`font-medium py-1 px-3 rounded-2xl ${users.status === "completed" ? "bg-megagreen/20 text-megagreen": "bg-megaorange/30 text-megaorange"}`}>
                                {users.status === "completed" ? "Successful": users.status}
                            </span>
                        </div>

                    </div>
                    {/* <div className="">
                        <div className="flex gap-4 mt-4 flex-wrap">
                            <Button className="bg-megagreen hover:bg-megagreen/90" onClick={() => (true)}>
                                Send Email
                            </Button>
                            <Button className="bg-[#F4C980] text-green-800 hover:bg-[#F4C980BE]" onClick={()=> (true)}>
                                Complete Registration
                            </Button>

                        </div> 
                    </div>                    */}
                    
            </DialogContent>

        </Dialog>
    )
}

export default PreRegisterUserModal;