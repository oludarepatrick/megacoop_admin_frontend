import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { KYCList, KYCStatus } from "@/types/kycList";

type KYCTabsProps = {
    activeTab: KYCStatus;
    setActiveTab: (tab: KYCStatus ) => void;
    kycList: KYCList[];
}

const KYCTabs = ({activeTab, setActiveTab, kycList}: KYCTabsProps) => {
    return (
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as KYCStatus) } className="bg-megagreen/30 px-4 py-4 sm:px-10 rounded-md overflow-y-auto scrollbar-hide">
            <TabsList className="bg-transparent gap-10 border-b-0">
                <TabsTrigger value="pending" className={` relative 
                    data-[state=active]:text-megagreen 
                    data-[state=active]:bg-transparent 
                    data-[state=active]:shadow-none 
                    data-[state=active]:border-b-megagreen data-[state=active]:dark:border-b-megagreen
                    rounded-none border-2 flex items-center gap-1`}
                >
                    KYC Verification Request 
                    {activeTab==="pending" && kycList.length > 0 && (
                        <span className="absolute top-0 -right-4 bg-[#FD9A06] text-white text-[8px] px-[8px] py-1 super rounded-full">{kycList.length}</span>
                    )}
                </TabsTrigger>
                <TabsTrigger value="approved" className={`
                    data-[state=active]:text-megagreen 
                    data-[state=active]:bg-transparent 
                    data-[state=active]:shadow-none 
                    data-[state=active]:border-b-megagreen data-[state=active]:dark:border-b-megagreen
                    rounded-none border-b-2 flex items-center gap-1`}>Approved KYC</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default KYCTabs;