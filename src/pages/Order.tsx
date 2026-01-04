import PaginationComponent from "@/components/PaginationComponent";
import ReusableTabs from "@/components/ReusableTabs";
import { Input } from "@/components/ui/input";
import SuccessModal from "@/features/InvestmentComponent/SuccessModal";
import OrderDetailModal from "@/features/OrdersComponent/OrderDetailModal";
import OrdersOverview from "@/features/OrdersComponent/OrdersOverview";
import OrderTable from "@/features/OrdersComponent/OrderTable";
import AddProductForm from "@/features/ProductComponent/AddproductForm";
import { useOrderList } from "@/hooks/useOrder";
import type { OrderList } from "@/types/order";
// import type { EditProductFormData } from "@/validations/product-schema";
import { Search } from "lucide-react";
import { useState } from "react";


const Order = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productFormOpen, setProductFormOpen ] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<OrderList | null>(null)
    const [activeTab, setActiveTab] = useState<OrderList["status"] | "all" >("all");
    const [searchValue, setSearchValue] = useState("")
    const [successModal, setSuccessModal] = useState<{
        isOpen: boolean
        title: string
    }>({isOpen: false, title: ""})

    const {data, isLoading, isError} = useOrderList(currentPage)

    // const {mutate: updateMutate, isPending} = useUpdateProduct(() => {
    //     setEditProduct(null)
    //     setSuccessModal({
    //         isOpen: true,
    //         title: "Product has been updated successfully"
    //     })
    // })
    
    const allOrders = data?.data || []
    const totalPages = data?.last_page || 1

    const transactionTabs = [
        { value: "all" as const, label: "All" },
        { value: "completed" as const, label: "Delivered" },
        { value: "pending" as const, label: "Pending", showCount: true },
    ];

    const handleTabChange = (tab: OrderList["status"] | "all") => {
        setActiveTab(tab)
        setCurrentPage(1)
    }

    const handleSuccessModal = () => {
        setProductFormOpen(false)
        setSuccessModal({
            isOpen: true,
            title: "New Product has been added successfully"
        })
    }
        
    // filter by tab
    const filterbyTab = activeTab === "all" 
    ? allOrders : allOrders.filter((list) => list.status === activeTab)

    // filter by search
    const filteredList = searchValue ?
    filterbyTab.filter(order => 
        order.status?.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.total_amount?.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.sub_total?.toLowerCase().includes(searchValue.toLowerCase())
    ) : filterbyTab


    return (
         <div className="font-jakarta space-y-6">
            <h2 className="font-semibold text-[20px]">Orders</h2>
            <OrdersOverview/>
            {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                <div className="lg:col-span-8">
                    <DashboardAnalytics/>
                </div>
                <div className="lg:col-span-4">
                    <DashboardExpenseStatistic/>
                </div>
            </div>
            <DashboardTransation/> */}
            <div className="flex justify-between">
                <h2 className="font-semibold text-[20px]">Product Orders</h2>
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
                data={allOrders}
                countKey="status"
            />

            <OrderTable
                orders={filteredList}
                onClick={(order)=> setSelectedProduct(order)}
                isLoading={isLoading}
                isError={isError}
            />

            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {selectedProduct && (
                <OrderDetailModal
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    order={selectedProduct}

                />
            )}

            {productFormOpen && (
                <AddProductForm 
                    isOpen={productFormOpen}
                    onClose={()=> setProductFormOpen(false)}
                    onSuccess={handleSuccessModal}
                />
            )}


             <SuccessModal 
                isOpen={successModal.isOpen}
                onClose={()=> setSuccessModal({isOpen:false, title: ""})}
                title={successModal.title}
            />
        </div>
    )
}

export default Order;