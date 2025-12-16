import axios from "@/lib/axiosInstance";
import type { DashboardCharts, DashboardStat, RecentLoan } from "@/types/dashboard";

export const dashboardAPI = {
    getUserWalllet: async (): Promise<DashboardStat> => {
        const response = await axios.get("/admin/get-dashboard-stats")
        return response.data.data
    },
    getDashboardLoan: async (limit = 10): Promise<RecentLoan> => {
        const response = await axios.get("/admin/get-recent-loan-deals", {
            params: {limit},
        })
        return response.data.data
    },
    getDashboardStats: async (): Promise<DashboardCharts> => {
        const response = await axios.get("/admin/get-dashboard-dummy");
        return response.data.data
    }

}