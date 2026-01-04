import PaginationComponent from "@/components/PaginationComponent";
import ReusableTabs from "@/components/ReusableTabs";
import { Input } from "@/components/ui/input";
import UsersViewOverview from "@/features/UserProfileComponent/UsersViewOverview";
import UsersViewTable from "@/features/UserProfileComponent/UsersViewTable";
import { useAllUsers } from "@/hooks/useUser";
import type { AllUsers } from "@/types/userView";
// import type { EditProductFormData } from "@/validations/product-schema";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const UserViewPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState<string>("all");
    const [searchValue, setSearchValue] = useState("")

    const {data, isLoading, isError} = useAllUsers(currentPage)

    const navigate = useNavigate();

    const handleClick = (user: AllUsers) => {
        navigate(`${user?.uuid}`);
    };
    
    const allUsers = data?.data || []
    const totalPages = data?.last_page || 1

    const transactionTabs = [
        { value: "all" as const, label: "All" },
        { value: "1", label: "Active" },
        { value: "0", label: "Inactive", showCount: true },
    ];

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
        setCurrentPage(1)
    }
        
    // filter by tab
    const filterbyTab = activeTab === "all" 
    ? allUsers : allUsers.filter((user) => String(user.status) === activeTab)

    // filter by search
    const filteredList = searchValue ?
    filterbyTab.filter(user => 
        user.first_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.last_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchValue.toLowerCase())
    ) : filterbyTab


    return (
         <div className="font-jakarta space-y-6">
            <h2 className="font-semibold text-[20px]">Users Profile</h2>
            <UsersViewOverview/>
            <div className="flex justify-between">
                <h2 className="font-semibold text-[20px]">Users</h2>
                <div className="relative hidden sm:flex bg-white rounded-full">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-icon w-4 h-4" />
                    <Input type="text"
                        placeholder="Search user..."
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                            setCurrentPage(1)
                        }}
                        className="pr-10 w-60 shadow-none placeholder:text-megagreen border-icon/45 rounded-xl"
                    />
                </div>
            </div>
           
            <ReusableTabs
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                tabs={transactionTabs}
                data={allUsers}
                countKey="status"
            />

            <UsersViewTable
                users={filteredList}
                onClick={handleClick}
                isLoading={isLoading}
                isError={isError}
            />

            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default UserViewPage;