import axios from "@/lib/axiosInstance"
import type { ActiveUserInvestment, ActiveUserInvestmentResponse } from "@/types/returnInvestment";
import type { ROIPaymentFormData } from "@/validations/roi-payment-schema";

export const ROIAPI = {
    activeUserInvestment: async (page:number): Promise<ActiveUserInvestmentResponse> => {
        const response = await axios.get(`/admin/roi/active-users?page=${page}`);
        return response.data;
    },
    singleUserInvestment: async (id: number): Promise<ActiveUserInvestment> => {
        const response = await axios.get(`/admin/roi/user/${id}`);
        return response.data;
    },
    roiProcessPayment: async (data: ROIPaymentFormData)  => {
        const response = await axios.post("/admin/roi/process", data);
        return response.data;
    },
}
