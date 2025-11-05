import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import clsx from "clsx";
import { Toaster } from "../ui/sonner";

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const sidebarStyle= clsx(
        "fixed inset-y-0 left-0 z-50 lg:hidden",
        "transform transition-transform duration-300 ease",
        sidebarOpen? "translate-x-0" : "-translate-x-full"
    )
    
    return (
        <div className="flex h-screen">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <Sidebar onClose={closeSidebar}/>
            </div>

            {/* Mobile sidebar*/}       
            <div className={sidebarStyle}>
                <Sidebar onClose={closeSidebar} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-x-hidden" >
                <Header onMenuToggle={toggleSidebar} />
                <main className="flex-1 p-4 sm:p-6 overflow-y-auto mt-18">
                    <div className="max-w-[1440px] mx-auto">
                        <Outlet />
                        <Toaster/>
                    </div>
                </main>
            </div>
            
            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}
        </div>
    )
}

export default MainLayout;
