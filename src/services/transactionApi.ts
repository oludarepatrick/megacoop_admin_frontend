import axios from "@/lib/axiosInstance"
import type { TransactionResponse, WithdrawalResponse } from "@/types/transactions";

export const transactionAPI = {
    getTransaction: async (page:number): Promise<TransactionResponse> => {
        const response = await axios.get(`/admin/transactions?page=${page}`);
        return response.data
    },

    withdrawalTransaction: async(page:number) : Promise<WithdrawalResponse> => {
        const response = await axios.get(`/admin/transactions/withdrawals?page=${page}`);
        return response.data
    },

    downloadWithdrawalReport: async(): Promise<Blob> => {
        const response = await axios.get("/admin/transactions/export/approved", {
            responseType: "blob"
        });
        return response.data
    },

    approveWithdrawal: async (id: number) => {
        const response = await axios.post(`/admin/transactions/approve/${id}`)
        return response.data;
    },

    denyWithdrawal: async (id: number, data: {denied_reason: string}) => {
        const response = await axios.post(`/admin/transactions/deny/${id}`, data)
        return response.data;
    },

    paidWithdrawal: async (id: number) => {
        const response = await axios.post(`/admin/transactions/paid/${id}`)
        return response.data;
      },

}


