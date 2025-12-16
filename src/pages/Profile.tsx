import profileAvatar from "@/assets/profile-avatar.png"
import { useAuthStore } from "@/store/authStore";


function Profile() {
    const {admin} = useAuthStore();

    return (
        <div className="font-poppins rounded-xl shadow-sm space-y-6 pb-4 px-4 sm:px-0" >
            <div className="flex gap-6 items-center p-4 border-b-2 border-b-megagreen/60 shadow-lg">
                <div>
                    <img src={profileAvatar} alt="admin profile image" />
                </div>
                <div>
                    <h2 className="font-semibold text-lg">{[admin?.first_name, admin?.last_name].join(" ")}</h2>
                    <p className="text-muted-foreground text-sm">{admin?.email}</p>
                </div>
            </div>

            <div className="p-4 space-y-3 text-sm">
                <span className="text-megagreen font-semibold bg-[#D2EEDE] text-xs p-1 inline-block">Personal Information</span>
                <div>
                    <p className="text-muted-foreground">First Name</p>
                    <p className="font-medium">{admin?.first_name}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Last Name</p>
                    <p className="font-medium">{admin?.last_name}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{admin?.email}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{admin?.phone}</p>
                </div>
                
            </div>
        </div>
    )
}
export default Profile