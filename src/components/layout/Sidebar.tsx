import { useState } from "react";
import clsx from "clsx";
import { X, LogOut, Moon, Key, UserRoundCheck, ChevronDown, ChevronRight, ArrowRightLeft, CircleDollarSign, Users, UserCog, Wallet, ArrowUpRight, ChartNoAxesCombined, ChartLine, User2Icon, ShoppingBag, BaggageClaim, ShoppingCart, ShoppingBasket, ChartPie } from "lucide-react";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
// import helpIcon from "../../assets/help-icon.svg"
import { Switch } from "../ui/switch";
import { useThemeStore } from "@/store/themeStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/hooks/useLogin";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type SidebarProps = {
    onClose: () => void
}

const Sidebar = ({ onClose }: SidebarProps) => {
    const admin = useAuthStore((state) => state.admin);
    const { mutate } = useLogout();
    const [userMgmtOpen, setUserMgmtOpen] = useState(false);
    const [adminMgmtOpen, setAdminMgmtOpen] = useState(false);
    const [loanMgmtOpen, setLoanMgmtOpen] = useState(false);
    const [transactionOpen, setTransactionOpen] = useState(false);
    const [investmentOpen, setInvestmentOpen] = useState(false);
    const [marketPlaceOpen, setMarketPlaceOpen] = useState(false);

    const handleLogout = () => mutate();

    const { theme, toggleTheme } = useThemeStore()

    const activeClass = ({ isActive }: { isActive: boolean }) =>
        clsx("flex gap-3 cursor-pointer items-center", {
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
        <aside className="w-[306px] h-full bg-megaPrimary text-white pt-28 px-10 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
            <Button variant="ghost" onClick={onClose}
                className="hover:bg-transparent lg:hidden absolute top-4 right-10"
            >
                <X className="text-whitebg !w-8 !h-8" />
            </Button>
            <nav className="font-jakarta flex flex-col gap-6 text-sm">
                <NavLink to="dashboard" className={activeClass} onClick={onClose}>
                    <LayoutGrid className="w-5 h-5" />
                    Dashboard
                </NavLink>

                {/* User Management with Collapsible */}
                <Collapsible open={userMgmtOpen} onOpenChange={setUserMgmtOpen}>
                    <CollapsibleTrigger asChild>
                        <div className="flex gap-3 cursor-pointer items-center text-white">
                            <Users className="w-5 h-5" />
                            <span className="flex-1">User Management</span>
                            <ChevronRight className={clsx("w-4 h-4 transition-transform", {
                                    "rotate-90": userMgmtOpen
                                })}
                            />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-8 mt-3 flex flex-col gap-3">
                        <NavLink to="access-code" className={activeClass} onClick={onClose}>
                            <Key className="w-5 h-5" />
                            Access Code
                        </NavLink>

                        <NavLink to="kyc" className={activeClass} onClick={onClose} >
                            <UserRoundCheck className="w-5 h-5" />
                            KYC Verification
                        </NavLink>

                        <NavLink to="all-users" className={activeClass} onClick={onClose} >
                            <Users className="w-5 h-5" />
                            Users Profile
                        </NavLink>
                    </CollapsibleContent>
                </Collapsible>

                {/* Admin Management with Collapsible */}
                <Collapsible open={adminMgmtOpen} onOpenChange={setAdminMgmtOpen}>
                    <CollapsibleTrigger asChild>
                        <div className="flex gap-3 cursor-pointer items-center text-white">
                            <UserCog className="w-5 h-5" />
                            <span className="flex-1">Admin Management</span>
                            <ChevronRight className={clsx("w-4 h-4 transition-transform", {
                                    "rotate-90": adminMgmtOpen
                                })}
                            />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-8 mt-3 flex flex-col gap-3">
                        <NavLink to="profile" className={activeClass} onClick={onClose} >
                            <UserCog className="w-5 h-5" />
                            Profile
                        </NavLink>
                        
                        {/* sub admins/users */}
                        <NavLink to="users" className={activeClass} onClick={onClose} >
                            <User2Icon className="w-5 h-5" />
                            Sub-Admin/Users
                        </NavLink>
                    </CollapsibleContent>
                </Collapsible>

                {/* Loan Management with Collapsible */}
                <Collapsible open={loanMgmtOpen} onOpenChange={setLoanMgmtOpen}>
                    <CollapsibleTrigger asChild>
                        <div className="flex gap-3 cursor-pointer items-center text-white">
                            <Wallet className="w-5 h-5" />
                            <span className="flex-1">Loan Management</span>
                            <ChevronRight  className={clsx("w-4 h-4 transition-transform", {
                                    "rotate-90": loanMgmtOpen
                                })}
                            />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-8 mt-3 flex flex-col gap-3">
                        <NavLink to="loan" className={activeClass} onClick={onClose} >
                            <UserCog className="w-5 h-5" />
                            Loan
                        </NavLink>
                    </CollapsibleContent>
                </Collapsible>

                {/* Transaction Management with Collapsible */}
                <Collapsible open={transactionOpen} onOpenChange={setTransactionOpen}>
                    <CollapsibleTrigger asChild>
                        <div className="flex gap-3 cursor-pointer items-center text-white">
                            <ArrowRightLeft className="w-5 h-5" />
                            <span className="flex-1">Transaction</span>
                            <ChevronRight  className={clsx("w-4 h-4 transition-transform", {
                                    "rotate-90": transactionOpen
                                })}
                            />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-8 mt-3 flex flex-col gap-3">
                        <NavLink to="transactions" className={activeClass} onClick={onClose}>
                            <ArrowRightLeft className="w-5 h-5" />
                            Transaction
                        </NavLink>
                        <NavLink to="withdrawal" className={activeClass} onClick={onClose}>
                            <ArrowUpRight className="w-5 h-5" />
                            Withdrawal
                        </NavLink>
                        <NavLink to="investment-transactions" className={activeClass} onClick={onClose}>
                            <ChartNoAxesCombined className="w-5 h-5" />
                            Investment
                        </NavLink>
                    </CollapsibleContent>
                </Collapsible>

                {/* Investment Management with Collapsible */}
                <Collapsible open={investmentOpen} onOpenChange={setInvestmentOpen}>
                    <CollapsibleTrigger asChild>
                        <div className="flex gap-3 cursor-pointer items-center text-white">
                            <CircleDollarSign className="w-5 h-5" />
                            <span className="flex-1">Invest Management</span>
                            <ChevronRight  className={clsx("w-4 h-4 transition-transform", {
                                    "rotate-90": investmentOpen
                                })}
                            />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-8 mt-3 flex flex-col gap-3">
                        <NavLink to="investment" className={activeClass} onClick={onClose}>
                            Investment
                        </NavLink>
                        <NavLink to="investment-list" className={activeClass} onClick={onClose}>
                            Investment List
                        </NavLink>
                    </CollapsibleContent>
                </Collapsible>

                <NavLink to="roi-processing" className={activeClass} onClick={onClose}>
                    <ChartLine className="w-5 h-5" />
                    ROI Processing
                </NavLink>

                {/* marketplace collapsible */}
                <Collapsible open={marketPlaceOpen} onOpenChange={setMarketPlaceOpen}>
                    <CollapsibleTrigger asChild>
                        <div className="flex gap-3 cursor-pointer items-center text-white">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="flex-1">Market Place</span>
                            <ChevronRight  className={clsx("w-4 h-4 transition-transform", {
                                    "rotate-90": marketPlaceOpen
                                })}
                            />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-8 mt-3 flex flex-col gap-3">
                        <NavLink to="product-listing" className={activeClass} onClick={onClose}>
                            <BaggageClaim className="w-5 h-5" />
                            Product Listing
                        </NavLink>
                        <NavLink to="orders" className={activeClass} onClick={onClose}>
                            <ShoppingCart className="w-5 h-5" />
                            Orders
                        </NavLink>
                        <NavLink to="buy-on-credit" className={activeClass} onClick={onClose}>
                            <ShoppingBasket className="w-5 h-5" />
                            Buy on Credit
                        </NavLink>
                    </CollapsibleContent>
                </Collapsible>
                <NavLink to="report" className={activeClass} onClick={onClose}>
                    <ChartPie className="w-5 h-5" />
                    Report
                </NavLink>

                <hr className="my-6 border-white/20" />
{/* 
                <div className="flex items-center gap-3 px-3 text-white hover:bg-white/10 rounded-lg cursor-pointer">
                    <ShieldCheck className="w-5 h-5" />
                    Security
                </div>

                <div className="flex items-center gap-3 px-3 text-white hover:bg-white/10 rounded-lg cursor-pointer">
                    <img src={helpIcon} alt="" aria-hidden="true" className="w-5 h-5" />
                    Help
                </div> */}

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
                            <AvatarFallback className="font-medium"> {getInitials()} </AvatarFallback>
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
                        <ChevronDown />
                    </div>

                    <Button onClick={handleLogout} variant="ghost"
                        className="w-full justify-start text-white hover:bg-white/10 font-jakarta"
                    >
                        <LogOut className="w-4 h-4 mr-3" /> Logout
                    </Button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;