import axios from "@/lib/axiosInstance"
import type { TransactionResponse } from "@/types/transactions";

export const transactionAPI = {
    getTransaction: async (page:number): Promise<TransactionResponse> => {
        const response = await axios.get(`/admin/transactions?page=${page}`);
        return response.data
    }
}