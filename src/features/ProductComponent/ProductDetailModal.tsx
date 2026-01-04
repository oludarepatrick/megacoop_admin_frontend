import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import type { ProductList } from "@/types/product";
import ConfirmModal from "../InvestmentComponent/ConfirmModal";
import { useState } from "react";
import { Bell } from "lucide-react";
import { useDeleteProduct, useProductNotification } from "@/hooks/useProduct";


type ProductDetailModalProps = {
    isOpen: boolean
    onClose: () => void
    product: ProductList
}

const ProductDetailModal = ({isOpen, onClose, product}: ProductDetailModalProps) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const {mutate, isPending} = useDeleteProduct();
    const {mutate:notifyUser, isPending:isSending} = useProductNotification();

    const handleDeleteProduct =() => {
        mutate(product.product_id,
        {
            onSuccess:() => {
                setIsConfirmModalOpen(false)
                onClose()
            },
        })
    }
    const handleSendNotification =() => {
        notifyUser(product.product_id,{
            onSuccess: () =>{
                onClose()
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-xl p-0 pb-8 max-h-[90vh] overflow-y-auto scrollbar-hide" aria-describedby={undefined}>
                <DialogHeader className="py-4 border-b border-icon/30 bg-megagreen">
                    <DialogTitle className="font-semibold text-white text-center">Product View</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 pb-4 px-4 shadow-md border-b-2 border-b-megagreen/60">
                    <div className="flex self-center">
                        {product?.images?.map((img, i) => (
                            <img 
                                key={i}
                                src={img === "" ? "" : img} alt=""
                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 -ml-6 first:ml-0 relative"
                                style={{zIndex: i + 1}}
                            />
                        ))}
                    </div>
                    <div className="pt-4 max-w-[307px] mx-auto [&_div]:grid [&_div]:grid-cols-2 [&_div]:gap-4 space-y-3 text-sm">
                        <div>
                            <h4>Product Name:</h4>
                            <span className="font-medium text-megagreen">{product?.product_name}</span>
                        </div>
                        <div>
                            <h4>Product Category:</h4>
                            <span className="font-medium text-megagreen">{product?.product_category}</span>
                        </div>
                        <div>
                            <h4>Available Stock:</h4>
                            <span className="font-medium text-megagreen">{product?.available_stock}</span>
                        </div>
                        <div>
                            <h4>Price:</h4>
                            <span className="font-medium text-megagreen">₦{parseInt(product?.price).toLocaleString()}</span>
                        </div>
                        <div>
                            <h4>Seller Name:</h4>
                            <span className="font-medium text-megagreen">{product?.seller?.name}</span>
                        </div>
                        <div>
                            <h4>Delivery fee:</h4>
                            <span className="font-medium text-megagreen">₦{parseInt(product?.delivery_fee).toLocaleString()}</span>
                        </div>
                        <div>
                            <h4>Size:</h4>
                            <span className="font-medium text-megagreen">{product?.size || "Nil"}</span>
                        </div>
                        <div>
                            <h4>Color:</h4>
                            <div className="flex items-center gap-2">
                                {product?.color ? (
                                    <>
                                        <span 
                                            className="w-6 h-6 rounded border border-gray-300 shadow-sm"
                                            style={{ backgroundColor: product.color }}
                                        />
                                        <span className="font-medium text-megagreen">{product.color}</span>
                                    </>
                                ) : (
                                    <span className="font-medium text-megagreen">Nil</span>
                                )}
                            </div>
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
                    <div className="flex gap-4 justify-center flex-wrap pt-4">
                        <Button className="bg-red-500 hover:bg-red/80" onClick={()=>setIsConfirmModalOpen(true)} >Delete Product</Button>
                        <Button className="bg-megaorange hover:bg-megaorange/80"
                            onClick={handleSendNotification}
                            disabled={isSending}
                        > 
                            <Bell/> 
                            Notify User
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={()=> setIsConfirmModalOpen(false)}
                onProceed={handleDeleteProduct}
                isPending={isPending}
                text={<>Are you sure you want to <br/> Delete this Product</>}
            />

        </Dialog>
    )
}

export default ProductDetailModal;