import PaginationComponent from "@/components/PaginationComponent";
import ReusableTabs from "@/components/ReusableTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SuccessModal from "@/features/InvestmentComponent/SuccessModal";
import AddProductForm from "@/features/ProductComponent/AddproductForm";
import EditProductModal from "@/features/ProductComponent/EditProductModal";
import ProductDetailModal from "@/features/ProductComponent/ProductDetailModal";
import ProductListTable from "@/features/ProductComponent/ProductTable";
import { useProductList, useUpdateProduct } from "@/hooks/useProduct";
import type { ProductList } from "@/types/product";
import type { EditProductFormData } from "@/validations/product-schema";
import { Plus, Search } from "lucide-react";
import { useState } from "react";


const ProductListing = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productFormOpen, setProductFormOpen ] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<ProductList | null>(null)
    const [editProduct, setEditProduct] = useState<ProductList | null>(null)
    const [activeTab, setActiveTab] = useState<ProductList["status"] | "all" >("all");
    const [searchValue, setSearchValue] = useState("")
    const [successModal, setSuccessModal] = useState<{
        isOpen: boolean
        title: string
    }>({isOpen: false, title: ""})

    const {data, isLoading, isError} = useProductList(currentPage)

    console.log("data fetched", data)

    const {mutate: updateMutate, isPending} = useUpdateProduct(() => {
        setEditProduct(null)
        setSuccessModal({
            isOpen: true,
            title: "Product has been updated successfully"
        })
    })
    
    const allProducts = data?.data || []
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

    const handleSubmitForm = (data: EditProductFormData) => {
        if(!editProduct?.product_id) return
        updateMutate({
            id: editProduct.product_id,
            data:{ ...data }
        })
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
    ? allProducts : allProducts.filter((list) => list.status === activeTab)

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
                    onClick={() => setProductFormOpen(true)}
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
                data={allProducts}
                countKey="status"
            />

            <ProductListTable
                products={filteredList}
                onClick={(product)=> setSelectedProduct(product)}
                onOpenForm={product => setEditProduct(product)}
                isLoading={isLoading}
                isError={isError}
            />

            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {selectedProduct && (
                <ProductDetailModal
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    product={selectedProduct} 

                />
            )}

            {productFormOpen && (
                <AddProductForm 
                    isOpen={productFormOpen}
                    onClose={()=> setProductFormOpen(false)}
                    onSuccess={handleSuccessModal}
                />
            )}

            {editProduct && (
                <EditProductModal
                    isOpen={!!editProduct}
                    onClose={()=> setEditProduct(null)}
                    onSubmit={handleSubmitForm}
                    product={editProduct}
                    isPending={isPending}
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

export default ProductListing;