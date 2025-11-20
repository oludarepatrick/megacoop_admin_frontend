import PaginationComponent from "@/components/PaginationComponent";
import ReusableTabs from "@/components/ReusableTabs";
import { Input } from "@/components/ui/input";
import TransactionDetailModal from "@/features/TransactionComponent/TransactionDetailModal";
import TransactionTable from "@/features/TransactionComponent/TransactionTable";
import { useTransaction } from "@/hooks/useTransaction";
import type { TransactionList } from "@/types/transactions";
import { Search } from "lucide-react";
import { useState } from "react";


const Transactions = () => {
    const [activeTab, setActiveTab] = useState<TransactionList["status"] | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionList | null>(null)
    const [searchValue, setSearchValue] = useState("")

    const {data, isLoading, isError} = useTransaction(currentPage);
    console.log(data)

    const allTransactions = data?.data || [];
    const totalPages = data?.last_page || 1;

    const transactionTabs = [
        { value: "all" as const, label: "All Transactions" },
        { value: "approved" as const, label: "Approved" },
        { value: "pending" as const, label: "Pending", showCount: true },
        { value: "denied" as const, label: "Denied" },
    ];

    const handleTabChange = (tab: TransactionList["status"] | "all") => {
        setActiveTab(tab)
    }

    // filter by tab
    const filterbyTab = activeTab === "all"
    ? allTransactions : allTransactions.filter(list => list.status === activeTab);

    // filter by search

    const filteredTransaction = searchValue ?
    filterbyTab.filter(list => 
        list.user.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
        list.user.first_name?.toLowerCase().includes(searchValue.toLowerCase())||
        list.user.middle_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        list.user.last_name?.toLowerCase().includes(searchValue.toLowerCase())
    ) : filterbyTab

    // const ITEMS_PER_PAGE = 10;

    // const filteredTransaction = allTransactions.filter(txn => 
    //     activeTab === "all" ? true : txn.status === activeTab
    // )

    // const totalPages = Math.ceil(filteredTransaction.length / ITEMS_PER_PAGE);
    // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    // const endIndex = startIndex + ITEMS_PER_PAGE;
    // const paginatedTransactions = filteredTransaction.slice(startIndex, endIndex)


    return (
        <div className="font-jakarta space-y-6">
            <div className="flex justify-between">
                <h2 className="font-semibold text-[20px]">Transactions</h2>
                <div className="relative hidden sm:flex bg-white rounded-full">
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
                data={allTransactions}
                countKey="status"
            />
            <TransactionTable
                transactions={filteredTransaction}
                onClick={(transaction)=> setSelectedTransaction(transaction)}
                isLoading={isLoading}
                isError={isError}
            />

            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {selectedTransaction && (
                <TransactionDetailModal
                    isOpen={!!selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                    transactions={selectedTransaction} 

                />
            )}


        </div>
    );
}
export default Transactions;



