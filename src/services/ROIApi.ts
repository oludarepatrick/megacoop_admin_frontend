import axios from "@/lib/axiosInstance"
import type { ActiveUserInvestmentResponse } from "@/types/returnInvestment";

export const ROIAPI = {
    activeUserInvestment: async (page:number): Promise<ActiveUserInvestmentResponse> => {
        const response = await axios.get(`/admin/roi/active-users?page=${page}`);
        return response.data;
    },
}
