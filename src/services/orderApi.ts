import axios from "@/lib/axiosInstance";
import type { OrderListResponse, OrderStat } from "@/types/order";

export const orderAPI = {
    getOrderStats: async (): Promise<OrderStat> => {
        const response = await axios.get("/admin/orders/summary");
        return response.data
    },
    getOrderList: async (page: number): Promise<OrderListResponse> => {
        const response = await axios.get(`/admin/orders?page=${page}`);
        return response.data;
  },
  completeOrder: async (id: number) => {
    const response = await axios.post(`/admin/orders/complete/${id}`)
    return response.data;
  },
  declineOrder: async (id: number, data: {reason: string}) => {
    const response = await axios.post(`/admin/orders/decline/${id}`, data)
    return response.data;
  },
}



