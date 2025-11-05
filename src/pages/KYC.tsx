import PaginationComponent from "@/components/PaginationComponent";
import KYCModalDetail from "@/features/kycVerification/KYCModalDetail";
// import KYCPagination from "@/features/kycVerification/KYCPagination";
import KYCTabs from "@/features/kycVerification/KYCTabs";
import KYCVerificationTable from "@/features/kycVerification/KYCVerificationTable";
import { useKYCList } from "@/hooks/useKYCList";
import type { KYCStatus, KYCList } from "@/types/kycList";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const KYC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentTab = (searchParams.get("status") as KYCStatus) || "pending";
    const [selectedUser, setSelectedUser] = useState<KYCList | null>(null);    
    const {data, isLoading, isError, error} = useKYCList(currentTab);

    const ITEMS_PER_PAGE = 10;

    const handleTabChange = (status: KYCStatus ) => {
        setSearchParams({status: status})
        setCurrentPage(1)
    } 

    //pagination
    const totalPages = Math.ceil((data?.data.length || 0) / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = data?.data.slice(startIndex, endIndex) || [];
    
    return (
        <div className="font-jakarta space-y-6">
            <h2 className="font-semibold text-[20px]">KYC Verification Wizard</h2>

            <KYCTabs activeTab={currentTab} setActiveTab={handleTabChange} kycList={data?.data || []} />
            <KYCVerificationTable
                status={currentTab}
                kycList={paginatedData}
                isLoading={isLoading}
                isError={isError}
                error={error}
                onviewDetails={(user) => setSelectedUser(user) }
            />
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />

            {selectedUser && (
                <KYCModalDetail 
                    isOpen={!!selectedUser} 
                    onClose={() => setSelectedUser(null)}
                    kycList={selectedUser}
                    status={currentTab}
                />
            )}
        </div>
    );
}
export default KYC;