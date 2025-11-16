import PaginationComponent from "@/components/PaginationComponent";
import ReusableTabs from "@/components/ReusableTabs";
import { Input } from "@/components/ui/input";
import InvestmentDetailModal from "@/features/InvestmentComponent/InvestmentDetailModal";
import InvestmentTable from "@/features/InvestmentComponent/InvestmentTable";
import { useInvestmentApplication } from "@/hooks/useInvestment";
import type { InvestmentApplication } from "@/types/investment";
import { Search } from "lucide-react";
import { useState } from "react";

const InvestTransaction = () => {
    const [activeTab, setActiveTab] = useState<InvestmentApplication["status"] | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedApplication, setSelectedApplication] = useState<InvestmentApplication | null>(null)
    const [searchValue, setSearchValue] = useState("")

    const {data, isLoading, isError} = useInvestmentApplication()

    const allApplications = data?.data || [];
    const totalPages = data?.last_page || 1    

    const transactionTabs = [
        { value: "all" as const, label: "All Transactions" },
        { value: "approved" as const, label: "Approved" },
        { value: "pending" as const, label: "Pending", showCount: true },
        { value: "rejected" as const, label: "Denied" },
    ];

    const handleTabChange = (tab: InvestmentApplication["status"] | "all") => {
        setActiveTab(tab)
    }

    // filter by tab
    const filterbyTab = activeTab === "all" 
    ? allApplications 
    : allApplications.filter(list => list.status === activeTab)

    // filter by search
    const filteredList = searchValue ?
    filterbyTab.filter(list => 
        list.inv_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        list.user.first_name?.toLowerCase().includes(searchValue.toLowerCase())||
        list.user.middle_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        list.user.last_name?.toLowerCase().includes(searchValue.toLowerCase())
    ) : filterbyTab

    return (
        <div className="font-jakarta space-y-6">
            <div className="flex justify-between">
                <h2 className="font-semibold text-[20px]">Subscribers</h2>
                <div className="relative hidden sm:flex rounded-full">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-icon w-4 h-4" />
                    <Input type="text"
                        placeholder="Search transaction..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="pr-10 w-60 shadow-none placeholder:text-megagreen border-icon/45 rounded-xl"
                    />
                </div>
            </div>
            <ReusableTabs
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                tabs={transactionTabs}
                data={allApplications}
                countKey="status"
            />

            <InvestmentTable
                applications={filteredList}
                onClick={(application)=> setSelectedApplication(application)}
                isLoading={isLoading}
                isError={isError}
            />

            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {selectedApplication && (
                <InvestmentDetailModal
                    isOpen={!!selectedApplication}
                    onClose={() => setSelectedApplication(null)}
                    application={selectedApplication} 

                />
            )}


        </div>
    );
}
export default InvestTransaction;



