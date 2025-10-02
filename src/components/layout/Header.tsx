import { Menu, Bell } from "lucide-react";
import { Button } from "../ui/button";
import logo from "/Logo.svg"

type HeaderProps = {
    onMenuToggle: () => void
}

const Header = ({ onMenuToggle }: HeaderProps) => {
    return (
        <header className="px-4 lg:px-6 py-2 font-poppins fixed top-0 right-0 w-full z-[10] bg-main-bg border-b border-gray-200">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuToggle}
                        className="lg:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                    
                    <div className="flex items-center ">
                        <img src={logo} alt="megacoop-logo" className="h-16" />
                    </div>
                </div>
                
                {/* Right side content */}
                <div>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            3
                        </span>
                    </Button>
                </div>
            </div>  
        </header>
    );
};

export default Header;


// const Header = () => {

//     return (
//         <header className="px-4 lg:px-6 py-4 font-poppins fixed top-0 w-full z-[10] bg-main-bg">
//             <div className="flex items-center justify-between gap-4">
//                 Header
//             </div>
//         </header>
//     );
// };

// export default Header;