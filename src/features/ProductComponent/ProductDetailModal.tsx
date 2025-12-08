import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import type { ProductList } from "@/types/product";


type ProductDetailModalProps = {
    isOpen: boolean
    onClose: () => void
    product: ProductList
}

const ProductDetailModal = ({isOpen, onClose, product}: ProductDetailModalProps) => {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-xl p-0 pb-8 max-h-[90vh] overflow-y-auto scrollbar-hide" aria-describedby={undefined}>
                <DialogHeader className="py-4 border-b border-icon/30 bg-megagreen">
                    <DialogTitle className="font-semibold text-white text-center">Product View</DialogTitle>
                </DialogHeader>

                <div className="flex gap-8 gap-x-12 pb-4 px-4 flex-wrap shadow-md border-b-2 border-b-megagreen/60">
                    <div className="pt-4 max-w-[307px] mx-auto [&_div]:grid [&_div]:grid-cols-2 space-y-3 text-sm">
                        <div>
                            <h4>Product Name:</h4>
                            <span className="font-medium text-megagreen">{product.product_name}</span>
                        </div>
                        <div>
                            <h4>Product Category:</h4>
                            <span className="font-medium text-megagreen">{product.product_category}</span>
                        </div>
                        <div>
                            <h4>Available Stock:</h4>
                            <span className="font-medium text-megagreen">{product.available_stock}</span>
                        </div>
                        <div>
                            <h4>Price:</h4>
                            <span className="font-medium text-megagreen">₦{parseInt(product.price).toLocaleString()}</span>
                        </div>
                        <div>
                            <h4>Seller Name:</h4>
                            <span className="font-medium text-megagreen">{product.seller.name}</span>
                        </div>
                        <div>
                            <h4>Delivery fee:</h4>
                            <span className="font-medium text-megagreen">₦{parseInt(product.delivery_fee).toLocaleString()}</span>
                        </div>
                        <div>
                            <h4>Size:</h4>
                            <span className="font-medium text-megagreen">{product.size || "Nil"}</span>
                        </div>
                        <div>
                            <h4>Color:</h4>
                            <span className="font-medium text-megagreen">{product.color || "Nil"}</span>
                        </div>
                        <div>
                            <h4>Product Status:</h4>
                            <span className="font-medium text-megagreen">{product.status === "active" ? "Visible" : product.status === "pending" ? "Not visible": product.status}</span>
                        </div>
                    </div>
                </div>
                <DialogFooter className="sm:flex-col flex-col text-center text-sm px-4">
                    <h4 className="text-megagreen font-semibold ">Description</h4>
                    <p>{product.full_description}</p>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}

export default ProductDetailModal;