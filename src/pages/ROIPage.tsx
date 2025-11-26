import PaginationComponent from "@/components/PaginationComponent";
// import ReusableTabs from "@/components/ReusableTabs";
import { Input } from "@/components/ui/input";
import ROITable from "@/features/ROIComponent/ROITable";
// import TransactionDetailModal from "@/features/TransactionComponent/TransactionDetailModal";
import { useActiveUserInvestment } from "@/hooks/useROI";
// import type { ActiveUserInvestment } from "@/types/returnInvestment";
import { Search } from "lucide-react";
import { useState } from "react";


const ROIPage = () => {
    // const [activeTab, setActiveTab] = useState<ActiveUserInvestment["status"] | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);
    // const [selectedTransaction, setSelectedTransaction] = useState<ActiveUserInvestment | null>(null)
    const [searchValue, setSearchValue] = useState("")

    const {data, isLoading, isError} = useActiveUserInvestment(currentPage);

    const allActiveInvestment = data?.data || [];
    const totalPages = data?.last_page || 1;

    // const transactionTabs = [
    //     { value: "all" as const, label: "All Transactions" },
    //     { value: "approved" as const, label: "Approved" },
    //     { value: "pending" as const, label: "Pending", showCount: true },
    //     { value: "denied" as const, label: "Denied" },
    // ];

    // const handleTabChange = (tab: ["status"] | "all") => {
    //     setActiveTab(tab);
    //     setCurrentPage(1)
    // }

    // filter by tab
    // const filterbyTab = activeTab === "all"
    // ? allActiveInvestment : allActiveInvestment.filter(list => list.status === activeTab);

    // filter by search
    const query = searchValue.toLowerCase();
    const filteredTransaction = searchValue ?
    allActiveInvestment.filter(list => {
        return [
            list.email,
            list.first_name,
            list.middle_name,
            list.last_name
        ].some(value => value?.toLowerCase().includes(query))
    }
    ): allActiveInvestment


    return (
        <div className="font-jakarta space-y-6">
            <div className="flex justify-between">
                <h2 className="font-semibold text-[20px]">ROI Processing</h2>
                <div className="relative hidden sm:flex bg-white rounded-full">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-icon w-4 h-4" />
                    <Input type="text"
                        placeholder="Search active user..."
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                            setCurrentPage(1);
                        }}
                        className="pr-10 w-60 shadow-none placeholder:text-megagreen border-icon/45 rounded-xl"
                    />
                </div>
            </div>
            {/* <ReusableTabs
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                tabs={transactionTabs}
                data={allTransactions}
                countKey="status"
            /> */}
            <ROITable
                transactions={filteredTransaction}
                // onClick={(transaction)=> setSelectedTransaction(transaction)}
                isLoading={isLoading}
                isError={isError}
            />

            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {/* {selectedTransaction && (
                <TransactionDetailModal
                    isOpen={!!selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                    transactions={selectedTransaction} 

                />
            )} */}


        </div>
    );
}
export default ROIPage;



