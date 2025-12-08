import PaginationComponent from "@/components/PaginationComponent";
import ReusableTabs from "@/components/ReusableTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import EditModal from "@/features/InvestmentComponent/EditModal";
// import InvestListDetailModal from "@/features/InvestmentComponent/InvestListDetailModal";
// import InvestmentWizard from "@/features/InvestmentComponent/InvestmentWizard";
import SuccessModal from "@/features/InvestmentComponent/SuccessModal";
import ProductDetailModal from "@/features/ProductComponent/ProductDetailModal";
import ProductListTable from "@/features/ProductComponent/ProductTable";
// import { useUpdateInvestment } from "@/hooks/useInvestment";
import { useProductList } from "@/hooks/useProduct";
import type { ProductList } from "@/types/product";
// import type { EditFormData } from "@/validations/investment-schema";
import { Plus, Search } from "lucide-react";
import { useState } from "react";


const ProductListing = () => {
    const [currentPage, setCurrentPage] = useState(1);
    // const [investmentWizardOpen, setInvestmentWizardOpen ] = useState(false)
    const [selectedInvestment, setSelectedInvestment] = useState<ProductList | null>(null)
    // const [editInvestment, setEditInvestment] = useState<ProductList | null>(null)
    const [activeTab, setActiveTab] = useState<ProductList["status"] | "all" >("all");
    const [searchValue, setSearchValue] = useState("")
    const [successModal, setSuccessModal] = useState<{
        isOpen: boolean
        title: string
    }>({isOpen: false, title: ""})

    const {data, isLoading, isError} = useProductList(currentPage)

        console.log("data fetched", data)

    // const {mutate: updateMutate, isPending: isUpdatePending} = useUpdateInvestment(() => {
    //     setEditInvestment(null)
    //     setSuccessModal({
    //         isOpen: true,
    //         title: "Investment has been updated successfully"
    //     })
    // })
    
    const allInvestments = data?.data || []
    const totalPages = data?.last_page || 1

    const transactionTabs = [
        { value: "all" as const, label: "All" },
        { value: "active" as const, label: "Visible" },
        { value: "inactive" as const, label: "Not visible", showCount: true },
    ];

    const handleTabChange = (tab: ProductList["status"] | "all") => {
        setActiveTab(tab)
        setCurrentPage(1)
    }

    // const handleSubmitForm = (data: EditFormData) => {
    //     if(!editInvestment?.id) return
    //     updateMutate({
    //         id: editInvestment.id,
    //         data:{ ...data }
    //     })
    // }
    // const handleSuccessModal = () => {
    //     setInvestmentWizardOpen(false)
    //     setSuccessModal({
    //         isOpen: true,
    //         title: "New Investment has been added successfully"
    //     })
    // }
        
    // filter by tab
    const filterbyTab = activeTab === "all" 
    ? allInvestments : allInvestments.filter((list) => list.status === activeTab)

    // filter by search
    const filteredList = searchValue ?
    filterbyTab.filter(product => 
        product.product_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.product_category?.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.price?.toLowerCase().includes(searchValue.toLowerCase())
    ) : filterbyTab


    return (
        <div className="font-jakarta space-y-4">
            <div className="flex gap-6 items-center">
                <Button className="bg-megaorange/80 text-white hover:bg-megaorange/70"
                    // onClick={() => setInvestmentWizardOpen(true)}
                >
                    <Plus/> Add new Product
                </Button>
            </div>
            {/* <TrendingInvestment className="hidden"/> */}
            <div className="flex justify-between">
                <h2 className="font-semibold text-[20px]">Products</h2>
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
                data={allInvestments}
                countKey="status"
            />

            <ProductListTable
                products={filteredList}
                onClick={(product)=> setSelectedInvestment(product)}
                // onOpenForm={product => setEditInvestment(product)}
                isLoading={isLoading}
                isError={isError}
            />

            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {selectedInvestment && (
                <ProductDetailModal
                    isOpen={!!selectedInvestment}
                    onClose={() => setSelectedInvestment(null)}
                    product={selectedInvestment} 

                />
            )}

            {/* {investmentWizardOpen && (
                <InvestmentWizard 
                    isOpen={investmentWizardOpen}
                    onClose={()=> setInvestmentWizardOpen(false)}
                    onSuccess={handleSuccessModal}
                />
            )} */}

            {/* {editInvestment && (
                <EditModal
                    isOpen={!!editInvestment}
                    onClose={()=> setEditInvestment(null)}
                    onSubmit={handleSubmitForm}
                    investment={editInvestment}
                    isPending={isUpdatePending}
                /> 
            )} */}

             <SuccessModal 
                isOpen={successModal.isOpen}
                onClose={()=> setSuccessModal({isOpen:false, title: ""})}
                title={successModal.title}
            />
        </div>
    )
}

export default ProductListing;