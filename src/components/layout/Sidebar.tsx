import clsx from "clsx";
import { X, ShieldCheck, LogOut, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import kycIcon from "../../assets/kyc-icon.svg"
import helpIcon from "../../assets/help-icon.svg"
import { Switch } from "../ui/switch";
import { useThemeStore } from "@/store/themeStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/store/authStore";
// import logo from "/Logo.svg"

type SidebarProps={
    onClose: () => void
}

const Sidebar = ({onClose}:SidebarProps) => {
    const admin= useAuthStore((state) => state.admin);
    const logout= useAuthStore((state) => state.logout);

    const {theme, toggleTheme} = useThemeStore()

    const activeClass= ({isActive}:{isActive: boolean}) =>
        clsx("flex gap-3 cursor-pointer", {
        "text-megagreen bg-main-bg p-3 rounded-lg": isActive,
        "text-white": !isActive,
    });

    const getInitials = () => {
        if (admin?.first_name && admin?.last_name) {
            return `${admin.first_name.charAt(0)}${admin.last_name.charAt(0)}`.toUpperCase();
        }
        if (admin?.first_name) {
            return admin.first_name.charAt(0).toUpperCase();
        }
        return "AD";
    };

    return (
        <aside className="w-[306px] h-full bg-megaPrimary text-white pt-28 px-12 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
            <Button 
                variant="ghost" 
                className="hover:bg-transparent lg:hidden absolute top-4 right-10"
                onClick={onClose}
            >
                <X className="text-whitebg !w-8 !h-8" />
            </Button>
            <nav className="font-jakarta flex flex-col gap-6">
                <NavLink to="dashboard" className={activeClass} onClick={onClose}>
                    <LayoutGrid className="w-5 h-5" /> 
                    Dashboard
                </NavLink>

                <NavLink to="kyc" className={activeClass } onClick={onClose}>
                    <img src={kycIcon} alt="" aria-hidden="true" className="w-5 h-5" />
                    KYC Verification
                </NavLink>

                <hr className="my-6 border-white/20" />
                        
                <div className="flex items-center gap-3 px-3 text-white hover:bg-white/10 rounded-lg cursor-pointer">
                    <ShieldCheck className="w-5 h-5" /> 
                    Security
                </div>

                <div className="flex items-center gap-3 px-3 text-white hover:bg-white/10 rounded-lg cursor-pointer">
                    <img src={helpIcon} alt="" aria-hidden="true" className="w-5 h-5" />
                    Help
                </div>
                        
                    <div className="flex items-center justify-between px-3 ">
                    <div className="flex items-center gap-3">
                        <Moon className="w-5 h-5" />
                        Dark Mode
                    </div>
                    <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                </div>
            </nav>

            {/* Admin Profile */}
            <div className="flex items-center justify-between gap-3 pt-30 pb-10 ">
                  
                <div className="border-white/20 pt-4 pb-6">
                    <div className="flex items-center space-x-3 mb-4 font-jakarta">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={admin?.avatar || ""} alt="" />
                            <AvatarFallback className="font-medium">
                                {getInitials()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                {admin?.first_name && admin?.last_name 
                                    ? `${admin.first_name}`
                                    : admin?.first_name || "MegaCoop Admin"
                                }
                            </p>
                            <p className="text-xs text-white/70 truncate">
                                {admin?.email || "admin@megacoop.com"}
                            </p>
                        </div>
                    </div>
                            
                    <Button
                        onClick={logout}
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-white/10 font-jakarta"
                    >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                    </Button>
                </div>
            </div>


        </aside>
    )
}

export default Sidebar;

