// import PageLoader from "@/components/PageLoader";
import PaginationComponent from "@/components/PaginationComponent";
import ReusableTabs from "@/components/ReusableTabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UserTransactionHistory from "@/features/UserProfileComponent/UserTransactionHistory";
import UserViewDetail from "@/features/UserProfileComponent/UserViewDetail";
import { useSingleUserHistory } from "@/hooks/useUser";
import type { WalletTransaction } from "@/types/userView";
// import { useSingleUserInvestment } from "@/hooks/useROI";
import { ArrowLeft, Download, Search } from "lucide-react";
import excelIcon from "@/assets/excel-icon.svg";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UserProfileDetailPage = () => {
    const [activeTab, setActiveTab] = useState<WalletTransaction["status"] | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("")

    const {userId} = useParams();
    const {data, isLoading } = useSingleUserHistory(userId || "");
    console.log(data)
    
    const userHistory = data?.wallet_transactions.data || [];
    const totalPages = data?.wallet_transactions.last_page || 1;
    
    const transactionTabs = [
        { value: "all" as const, label: "All Transactions" },
        { value: "approved" as const, label: "Completed" },
        { value: "pending" as const, label: "Pending", showCount: true },
        // { value: "denied" as const, label: "Denied" },
    ];
    
    const handleTabChange = (tab: WalletTransaction["status"] | "all") => {
        setActiveTab(tab);
        setCurrentPage(1)
    }

    // filter by tab
    const filterbyTab = activeTab === "all"
    ? userHistory : userHistory.filter(list => list.status === activeTab);

    // filter by search
    const query = searchValue.toLowerCase();
    const filteredTransaction = searchValue ?
    filterbyTab.filter(user => 
       user.created_at.toLowerCase().includes(query)
    ): filterbyTab
    
    
    if (isLoading) return <p>Loading...</p>

    return (
         <div className="font-jakarta space-y-6">
            <div className="flex justify-between">
                <h2 className="font-semibold text-[20px]">User Transaction History</h2>
                <Button 
                    variant="ghost" 
                    className="text-megagreen hover:text-megagreen/80"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>
            <Card className="p-0 rounded-none border-none shadow-none">
                <UserViewDetail
                    user={data!}
                />
                <CardContent className="space-y-6 pt-6">
                    <div className="flex justify-end gap-6">
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
                        <Button variant="outline"
                            // disabled={isPending}
                            className="border-megagreen text-megagreen self-end"
                            // onClick={onDownload}
                        >
                            <Download /> Download statement 
                            <img src={excelIcon} alt="" />
                        </Button>
                    </div>
                    <ReusableTabs
                        activeTab={activeTab}
                        setActiveTab={handleTabChange}
                        tabs={transactionTabs}
                        data={userHistory}
                        countKey="status"
                    />
                    <UserTransactionHistory users={filteredTransaction}
                        isLoading={isLoading}
                        isError={false}
                    />
                    <PaginationComponent
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </CardContent>


            </Card>
        </div>
    );
}
export default UserProfileDetailPage;