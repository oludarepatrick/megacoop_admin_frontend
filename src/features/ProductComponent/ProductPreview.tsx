import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import type { ProductFormData } from "@/validations/product-schema";


type ProductPreviewModalProps = {
    isOpen: boolean
    onClose: () => void
    formData: ProductFormData
}

const ProductPreviewModal = ({isOpen, onClose, formData}: ProductPreviewModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-lg p-0 pb-8 max-h-[90vh] overflow-y-auto scrollbar-hide" 
                aria-describedby={undefined}
                onInteractOutside={(e) => e.preventDefault()} 
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="py-4 border-b border-icon/30 bg-megagreen">
                    <DialogTitle className="font-semibold text-white text-center">Product Preview</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 pb-4 px-4 shadow-md border-b-2 border-b-megagreen/60">
                    <div className="flex self-center">
                        {formData?.images?.map((img, i) => (
                            <img 
                                key={i}
                                src={typeof img === "string" ? img : URL.createObjectURL(img)} alt=""
                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 -ml-6 first:ml-0 relative"
                                style={{zIndex: i + 1}}
                            />
                        ))}
                    </div>
                    <div className="pt-4 max-w-[307px] mx-auto [&_div]:grid [&_div]:grid-cols-2 space-y-3 text-sm">
                        <div>
                            <h4>Product Name:</h4>
                            <span className="font-medium text-megagreen">{formData.product_name}</span>
                        </div>
                        <div>
                            <h4>Product Category:</h4>
                            <span className="font-medium text-megagreen">{formData.product_category}</span>
                        </div>
                        <div>
                            <h4>Available Stock:</h4>
                            <span className="font-medium text-megagreen">{formData.available_stock}</span>
                        </div>
                        <div>
                            <h4>Price:</h4>
                            <span className="font-medium text-megagreen">₦{formData.price}</span>
                        </div>
                        <div>
                            <h4>Seller Name:</h4>
                            <span className="font-medium text-megagreen">{formData.seller_name}</span>
                        </div>
                        <div>
                            <h4>Delivery fee:</h4>
                            <span className="font-medium text-megagreen">₦{formData.delivery_fee}</span>
                        </div>
                        <div>
                            <h4>Size:</h4>
                            <span className="font-medium text-megagreen">{formData.size || "Nil"}</span>
                        </div>
                        <div>
                            <h4>Color:</h4>
                            <span className="font-medium text-megagreen">{formData.color || "Nil"}</span>
                        </div>
                    </div>
                </div>
                <DialogFooter className="sm:flex-col flex-col text-center text-sm px-4">
                    <h4 className="text-megagreen font-semibold ">Description</h4>
                    <p>{formData.full_description}</p>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}

export default ProductPreviewModal;