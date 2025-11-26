import PaginationComponent from "@/components/PaginationComponent";
import ReusableTabs from "@/components/ReusableTabs";
import { Input } from "@/components/ui/input";
import WithdrawalDetailModal from "@/features/WithdrawalComponent/WithdrawalDetailModal";
import WithdrawalTable from "@/features/WithdrawalComponent/WithdrawalTable";
import { useDownloadWithdrawalReport, useWithdrawalTransaction } from "@/hooks/useTransaction";
import type { WithdrawalList } from "@/types/transactions";
import { Search } from "lucide-react";
import { useState } from "react";

const Withdrawal = () => {
    const [activeTab, setActiveTab] = useState<WithdrawalList["status"] | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTransaction, setSelectedTransaction] = useState<WithdrawalList | null>(null)
    const [searchValue, setSearchValue] = useState("")

    const {data, isLoading, isError} = useWithdrawalTransaction(currentPage);
    const {mutate, isPending} = useDownloadWithdrawalReport();

    const handleDownload = () => {
        mutate();
    }

    const allWithdrawals = data?.data || [];
    const totalPages = data?.last_page || 1;

    const transactionTabs = [
        { value: "all" as const, label: "All Transactions" },
        { value: "approved" as const, label: "Approved" },
        { value: "pending" as const, label: "Pending", showCount: true },
        { value: "denied" as const, label: "Denied" },
    ];

    const handleTabChange = (tab: WithdrawalList["status"] | "all") => {
        setActiveTab(tab);
        setCurrentPage(1)
    }

    // filter by tab
    const filterbyTab = activeTab === "all"
    ? allWithdrawals : allWithdrawals.filter(list => list.status === activeTab);

    // filter by search
    const query = searchValue.toLowerCase();
    const filteredTransaction = searchValue ?
    filterbyTab.filter(list => {
        const user = list.user
        return [
            user.email,
            user.first_name,
            user.middle_name,
            user.last_name
        ].some(value => value?.toLowerCase().includes(query))
    }
    ): filterbyTab
    
    return (
        <div className="font-jakarta space-y-6">
            <div className="flex justify-between">
                <h2 className="font-semibold text-[20px]">Withdrawals</h2>
                <div className="relative hidden sm:flex bg-white rounded-full">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-icon w-4 h-4" />
                    <Input type="text"
                        placeholder="Search transaction..."
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
                tabs={transactionTabs}
                data={allWithdrawals}
                countKey="status"
            />
            <WithdrawalTable
                withdrawals={filteredTransaction}
                onClick={(transaction)=> setSelectedTransaction(transaction)}
                isLoading= {isLoading}
                isError={isError}
                onDownload= {handleDownload}
                isPending= {isPending}
            />

            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {selectedTransaction && (
                <WithdrawalDetailModal
                    isOpen={!!selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                    transactions={selectedTransaction} 

                />
            )}
        </div>

    );
}
export default Withdrawal;



