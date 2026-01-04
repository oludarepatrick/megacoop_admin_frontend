import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import ConfirmModal from "../InvestmentComponent/ConfirmModal";
import { useState } from "react";
import type { OrderList } from "@/types/order";
import { formatCurrency } from "@/lib/utils";
import { useCompleteOrder, useDeclineOrder } from "@/hooks/useOrder";
import DeclineWithdrawalModal from "../WithdrawalComponent/DeclineWithdrawalModal";
import { toast } from "sonner";


type OrderDetailModalProps = {
    isOpen: boolean
    onClose: () => void
    order: OrderList
}

const OrderDetailModal = ({isOpen, onClose, order}: OrderDetailModalProps) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
      const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

    const {mutate, isPending} = useCompleteOrder();
    const {mutate:declineOrder, isPending:isDeclining} = useDeclineOrder();

    const handleCompleteOrder =() => {
        mutate(order.order_id,
        {
            onSuccess:() => {
                setIsConfirmModalOpen(false)
                onClose()
            },
        })
    }

    const handleDeclineOrder = (data: {reason: string}) => {
        declineOrder({
        id: order.order_id,
        data: {reason: data.reason}
        }, {
        onSuccess: () => {
            toast.success("Order declined successfully")
            setIsDeclineModalOpen(false)
            onClose()
        }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-xl p-0 pb-8 max-h-[90vh] overflow-y-auto scrollbar-hide" aria-describedby={undefined}>
                <DialogHeader className="py-4 border-b border-icon/30 bg-megagreen">
                    <DialogTitle className="font-semibold text-white text-center">Order Detail</DialogTitle>
                </DialogHeader>

                {order && order.items.map(item => (
                    <div key={item.product_id} className="flex justify-between flex-wrap sm:justify-around gap-4  pb-4 px-4 shadow-md ">
                        <div className="pt-4 max-w-[307px] [&_div]:grid [&_div]:grid-cols-2 [&_div]:gap-4 space-y-3 text-sm">
                            <div>
                                <h4>Product Name:</h4>
                                <span className="font-medium text-megagreen">{item?.product_name}</span>
                            </div>
                            <div>
                                <h4>Price:</h4>
                                <span className="font-medium text-megagreen">{formatCurrency(Number(item?.price))}</span>
                            </div>
                            <div>
                                <h4>Buyer Name:</h4>
                                <span className="font-medium text-megagreen">{order?.buyer.firstname}</span>
                            </div>
                            <div>
                                <h4>Delivery fee:</h4>
                                <span className="font-medium text-megagreen">₦{parseInt(order?.delivery_fee).toLocaleString()}</span>
                            </div>
                            <div>
                                <h4>Product Status:</h4>
                                <span className="font-medium text-megagreen">{order.status}</span>
                            </div>
                        </div>
                        <div className="w-40 aspect-square bg-gray-100 rounded overflow-hidden">
                            <img 
                                src={item.images?.[0] || "/placeholder.png"} 
                                alt={item.product_name || "product image"}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                ))}

                <DialogFooter className="sm:flex-col flex-col text-center text-sm px-4">
                    <div className="flex gap-4 justify-center flex-wrap pt-4">
                        <Button className="bg-megagreen hover:bg-red/80" onClick={()=>setIsConfirmModalOpen(true)} >Completed</Button>
                        <Button className=""
                            onClick={()=> setIsDeclineModalOpen(true)}
                            disabled={isDeclining}
                        >
                            Decline
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={()=> setIsConfirmModalOpen(false)}
                onProceed={handleCompleteOrder}
                isPending={isPending}
                text={<>Are you sure you want to <br/> Confirm this Product</>}
            />

            <DeclineWithdrawalModal
                isOpen={isDeclineModalOpen}
                onClose={() => setIsDeclineModalOpen(false)}
                onSubmit={handleDeclineOrder}
                isPending={isDeclining}
                text="Order"
                fieldName="reason"
            />
        </Dialog>
    )
}

export default OrderDetailModal;