import PaginationComponent from "@/components/PaginationComponent";
import ReusableTabs from "@/components/ReusableTabs";
import { Input } from "@/components/ui/input";
import PreRegisterUserModal from "@/features/PrePregisterUserComponent/PreRegisterUserModal";
import PreRegisterUserTable from "@/features/PrePregisterUserComponent/PreRegisterUserTable";
import { useNewUserList, useSendEmail, useUpdateStatus } from "@/hooks/usePreRegisterUser";
import type { NewUserList, Status } from "@/types/preRegisterUser";
import { Search } from "lucide-react";
import { useState } from "react";


const PreRegisteredUser = () => {
    const [activeTab, setActiveTab] = useState<NewUserList["status"] | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<NewUserList | null>(null)
    const [searchValue, setSearchValue] = useState("")

    const {data, isLoading, isError} = useNewUserList();

    const allUsers = data?.data || [];
    const totalPages = data?.last_page || 1;

    const {mutate: sendMail, isPending} = useSendEmail();
    const {mutate: completeReg, isPending:isComplete} = useUpdateStatus();

    const userTabs = [
        { value: "all" as const, label: "All Transactions" },
        { value: "completed" as const, label: "Completed" },
        { value: "pending" as const, label: "Pending", showCount: true },
        // { value: "denied" as const, label: "Denied" },
    ];

    const handleTabChange = (tab: NewUserList["status"] | "all") => {
        setActiveTab(tab);
        setCurrentPage(1)
    }

    // filter by tab
    const filterbyTab = activeTab === "all"
    ? allUsers : allUsers.filter(list => list.status === activeTab);

    // filter by search
    const query = searchValue.toLowerCase();
    const filteredUser = searchValue ?
    filterbyTab.filter(list => {
        const user = list
        return [
            user.email,
            user.fullname,
            user.phone,
        ].some(value => value?.toLowerCase().includes(query))
    }
    ): filterbyTab

    const handleSendMail = (ids: number[]) => {
        sendMail({ids})
    }
    
    const handleUpdateStatus = (ids: number[], status: Status) => {
        completeReg({ids, status})
    }
    


    return (
        <div className="font-jakarta space-y-6">
            <div className="flex justify-between">
                <h2 className="font-semibold text-[20px]">New User</h2>
                <div className="relative hidden sm:flex bg-white rounded-full">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-icon w-4 h-4" />
                    <Input type="text"
                        placeholder="Search user..."
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                            setCurrentPage(1);
                        }}
                        className="pr-10 w-60 shadow-none placeholder:text-megagreen border-icon/45 rounded-xl"
                    />
                </div>
            </div>
            <ReusableTabs
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                tabs={userTabs}
                data={allUsers}
                countKey="status"
            />
            <PreRegisterUserTable
                users={filteredUser}
                onClick={(user)=> setSelectedUser(user)}
                isLoading={isLoading}
                isError={isError}
                onSend={handleSendMail}
                isPending={isPending}
                onComplete={handleUpdateStatus}
                isComplete={isComplete}
            />

            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {selectedUser && (
                <PreRegisterUserModal
                    isOpen={!!selectedUser}
                    onClose={() => setSelectedUser(null)}
                    users={selectedUser} 

                />
            )}


        </div>
    );
}
export default PreRegisteredUser;
