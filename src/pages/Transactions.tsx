import PaginationComponent from "@/components/PaginationComponent";
import { Input } from "@/components/ui/input";
import TransactionDetailModal from "@/features/TransactionComponent/TransactionDetailModal";
import TransactionTabs from "@/features/TransactionComponent/TransactionTab";
import TransactionTable from "@/features/TransactionComponent/TransactionTable";
import { Search } from "lucide-react";
import { useState } from "react";


export type Transaction ={
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    amount: number;
    date: string;
    status: "approved" | "pending" |  "denied" | "cancel";
}

const allTransactions: Transaction[] = [
  {
    id: "638dedidkl",
    first_name: "Frank",
    last_name: "Junior",
    email: "frankJ@gmail.com",
    phone: "090 1234 5678",
    amount: 800.09,
    date: "28 Oct 12:20PM",
    status: "approved"
  },
  {
    id: "2e323tefr",
    first_name: "Kylian",
    last_name: "Mbappe",
    email: "kylianm@gmail.com",
    phone: "090 1234 5678",
    amount: 800.09,
    date: "28 Oct 12:20PM",
    status: "pending"
  },
];


const Transactions = () => {
    const [activeTab, setActiveTab] = useState<Transaction["status"] | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

    const ITEMS_PER_PAGE = 10;

    const filteredTransaction = allTransactions.filter(txn => 
        activeTab === "all" ? true : txn.status === activeTab
    )

    const totalPages = Math.ceil(filteredTransaction.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedTransactions = filteredTransaction.slice(startIndex, endIndex)


    return (
        <div className="font-jakarta space-y-6">
            <div className="flex justify-between">
                <h2 className="font-semibold text-[20px]">Recent Transactions</h2>
                <div className="relative hidden sm:flex bg-white rounded-full">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-icon w-4 h-4" />
                    <Input type="text"
                        placeholder="Search transaction..."
                        className="pr-10 w-60 shadow-none placeholder:text-megagreen border-icon/45 rounded-xl"
                    />
                </div>
            </div>
            <TransactionTabs transactions={allTransactions} activeTab={activeTab} setActiveTab={setActiveTab} />

            <TransactionTable
                transactions={paginatedTransactions}
                onClick={(transaction)=> setSelectedTransaction(transaction)}
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



