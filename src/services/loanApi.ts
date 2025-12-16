import axios from "@/lib/axiosInstance";
import type { LoanResponse } from "@/types/loan";

export const LoanAPI = {
    getLoans : async (page: number): Promise<LoanResponse> => {
        const response = await axios.get(`/admin/loans?${page}`);
        return response.data.data
    },
    approveLoan: async (id: number) => {
        const response = await axios.post(`/admin/loans/approve/${id}`)
        return response.data;
    },
    denyLoan: async (id: number, data: {admin_remarks: string}) => {
        const response = await axios.post(`/admin/loans/deny/${id}`, data)
        return response.data;
    },
}