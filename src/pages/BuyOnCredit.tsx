import PaginationComponent from "@/components/PaginationComponent";
import ReusableTabs from "@/components/ReusableTabs";
import { Input } from "@/components/ui/input";
import BuyOnCreditTable from "@/features/BuyOnCreditComponent/BuyOnCreditTable";
import { useBuyOnCreditList } from "@/hooks/useBuyOnCredit";
import type { CreditList } from "@/types/product";
import {  Search } from "lucide-react";
import { useState } from "react";


const BuyOnCredit = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState<CreditList["status"] | "all" >("all");
    const [searchValue, setSearchValue] = useState("")
    
    const {data, isLoading, isError} = useBuyOnCreditList(currentPage)

    console.log("data fetched", data)
    
    const allProducts = data?.data || []
    const totalPages = data?.last_page || 1

    const transactionTabs = [
        { value: "all" as const, label: "All" },
        { value: "completed" as const, label: "Paid" },
        { value: "ongoing" as const, label: "Credit", showCount: true },
    ];

    const handleTabChange = (tab: CreditList["status"] | "all") => {
        setActiveTab(tab)
        setCurrentPage(1)
    }

        
    // filter by tab
    const filterbyTab = activeTab === "all" 
    ? allProducts : allProducts.filter((list) => list.status === activeTab)

    // filter by search
    const filteredList = searchValue ?
    filterbyTab.filter(product => 
        product.user.first_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.status?.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.user.last_name?.toLowerCase().includes(searchValue.toLowerCase())
    ) : filterbyTab


    return (
        <div className="font-jakarta space-y-4">
            <div className="flex justify-between">
                <h2 className="font-semibold text-[20px]">Buy On Credit</h2>
                <div className="relative hidden sm:flex bg-white rounded-full">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-icon w-4 h-4" />
                    <Input type="text"
                        placeholder="Search product..."
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
                data={allProducts}
                countKey="status"
            />

            <BuyOnCreditTable
                products={filteredList}
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

export default BuyOnCredit;