import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

type TransactionTabsProps = {
    activeTab: Transaction["status"] | "all";
    setActiveTab: (tab: Transaction["status"] | "all" ) => void;
    transactions: Transaction[]
}

const TransactionTabs = ({activeTab, setActiveTab, transactions}: TransactionTabsProps) => {
    const statusCount = (status: Transaction["status"]) => 
        transactions.filter(t => t.status === status).length;

    return (
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as Transaction["status"] | "all") } className="flex sm:gap-8 bg-transparent border-b rounded-none pb-0 overflow-x-auto scrollbar-hide">
            <TabsList className="bg-transparent gap-10 border-b-0">
                <TabsTrigger value="all" className={`
                    data-[state=active]:text-megagreen 
                    data-[state=active]:bg-transparent 
                    data-[state=active]:shadow-none 
                    data-[state=active]:border-b-megagreen data-[state=active]:dark:border-b-megagreen
                    rounded-none border-2 flex items-center gap-1`}>All Transactions
                </TabsTrigger>
                <TabsTrigger value="approved" className={`
                    data-[state=active]:text-megagreen 
                    data-[state=active]:bg-transparent 
                    data-[state=active]:shadow-none 
                    data-[state=active]:border-b-megagreen data-[state=active]:dark:border-b-megagreen
                    rounded-none border-2 flex items-center gap-1`}
                >
                    Approved 
                </TabsTrigger>
                <TabsTrigger value="pending" className={`
                    data-[state=active]:text-megagreen 
                    data-[state=active]:bg-transparent 
                    data-[state=active]:shadow-none 
                    data-[state=active]:border-b-megagreen data-[state=active]:dark:border-b-megagreen
                    rounded-none border-2 flex items-center gap-1 relative`}
                > 
                    Pending
                    {statusCount("pending") > 0  && (
                        <span className="absolute top-0 -right-4 bg-[#FD9A06] text-white text-[8px] px-[8px] py-1 super rounded-full">{statusCount("pending")}</span>
                    )}
                </TabsTrigger>
                <TabsTrigger value="denied" className={`
                    data-[state=active]:text-megagreen 
                    data-[state=active]:bg-transparent 
                    data-[state=active]:shadow-none 
                    data-[state=active]:border-b-megagreen data-[state=active]:dark:border-b-megagreen
                    rounded-none border-2 flex items-center gap-1`}> Denied
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default TransactionTabs;