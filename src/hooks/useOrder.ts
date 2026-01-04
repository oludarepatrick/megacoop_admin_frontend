import { orderAPI } from "@/services/orderApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useOrderStat = () => {
    return useQuery({
        queryKey: ["order-summary"],
        queryFn: orderAPI.getOrderStats
    })
}

export function useOrderList(page: number) {
    return useQuery({
        queryKey: ["orders", page],
        queryFn: () => orderAPI.getOrderList(page)
    })
}

export function useCompleteOrder(){
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: (id :number) => orderAPI.completeOrder(id),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ["orders"] })
        },
        onError: (error) => {
            console.log("failed", error)
            toast.error("Failed to complete other. Try again.")
        }
    })
}

export function useDeclineOrder(){
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: ({ id, data }: { id: number; data: {reason: string} }) => orderAPI.declineOrder(id, data),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ["orders"] })
        },
        onError: (error) => {
            console.log("failed", error)
            toast.error("Failed to decline other. Try again.")
        }
    })
}