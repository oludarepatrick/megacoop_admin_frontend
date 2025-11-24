import PaginationComponent from "@/components/PaginationComponent";
import ReusableTabs from "@/components/ReusableTabs";
import { Input } from "@/components/ui/input";
import WithdrawalDetailModal from "@/features/WithdrawalComponent/WithdrawalDetailModal";
import WithdrawalTable from "@/features/WithdrawalComponent/WithdrawalTable";
import { Search } from "lucide-react";
import { useState } from "react";

export type Withdrawal ={
    id: string;
    first_name: string
    last_name: string
    email: string;
    phone: string
    wallet_balance: number
    amount: number
    date: string
    bank: string;
    account_no: number
    account_name: string
    status: "approved" | "pending" |  "denied" ;
}

const allWithdrawals: Withdrawal[] = [
  {
    id: "638dedidkl",
    first_name: "Frank",
    last_name: "Junior",
    email: "frankJ@gmail.com",
    phone: "08128374057",
    wallet_balance: 12000,
    amount: 800.09,
    date: "28 Oct 12:20PM",
    bank: "First Bank",
    account_no: 1023456789,
    account_name: "Frank Junior",
    status: "approved"
  },
  {
    id: "2e323tefr",
    first_name: "Kylian",
    last_name: "Mbappe",
    email: "kylianm@gmail.com",
    phone: "09123847563",
    wallet_balance: 200000,
    amount: 800.09,
    bank: "Union Bank",
    account_no: 1023421289,
    account_name: "Kylian Mbappe",
    date: "28 Oct 12:20PM",
    status: "pending"
  },
];


const Withdrawal = () => {
    const [activeTab, setActiveTab] = useState<Withdrawal["status"] | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTransaction, setSelectedTransaction] = useState<Withdrawal | null>(null)

    const transactionTabs = [
        { value: "all" as const, label: "All Transactions" },
        { value: "approved" as const, label: "Approved" },
        { value: "pending" as const, label: "Pending", showCount: true },
        { value: "denied" as const, label: "Denied" },
    ];
    
    const ITEMS_PER_PAGE = 10;

    const filteredTransaction = allWithdrawals.filter(txn => 
        activeTab === "all" ? true : txn.status === activeTab
    )

    const totalPages = Math.ceil(filteredTransaction.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedTransactions = filteredTransaction.slice(startIndex, endIndex)



    return (
        <div className="font-jakarta space-y-6">
            <div className="flex justify-between">
                <h2 className="font-semibold text-[20px]">Withdrawals</h2>
                <div className="relative hidden sm:flex bg-white rounded-full">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-icon w-4 h-4" />
                    <Input type="text"
                        placeholder="Search transaction..."
                        className="pr-10 w-60 shadow-none placeholder:text-megagreen border-icon/45 rounded-xl"
                    />
                </div>
            </div>
            <ReusableTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={transactionTabs}
                data={allWithdrawals}
                countKey="status"
            />
            <WithdrawalTable
                transactions={paginatedTransactions}
                onClick={(transaction)=> setSelectedTransaction(transaction)}
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



