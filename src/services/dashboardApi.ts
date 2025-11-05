import axios from "@/lib/axiosInstance";
import type { DashboardStat } from "@/types/dashboard";

export const dashboardAPI = {
    getUserWalllet: async (): Promise<DashboardStat> => {
        const response = await axios.get("/admin/get-dashboard-stats")
        return response.data.data
    },
    getDashboardLoan: async (limit = 10): Promise<void> => {
        const response = await axios.get("/admin/get-recent-loan-deals", {
            params: {limit},
        })
        return response.data.data
    }
}