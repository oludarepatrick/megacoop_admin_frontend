import { dashboardAPI } from "@/services/dashboardApi"
import { useQuery } from "@tanstack/react-query"

export const useDashboardStat = () => {
    return useQuery({
        queryKey: ["get-dashboard-stats"],
        queryFn: dashboardAPI.getUserWalllet
    })
}
export const useLoanDeal = (limit = 10) => {
    return useQuery({
        queryKey: ["recent-loan-deal", limit],
        queryFn: () => dashboardAPI.getDashboardLoan(limit)
    })
}
export function useDashboardChart(){
    return useQuery({
        queryKey: ["get-dashboard-charts"],
        queryFn: dashboardAPI.getDashboardStats
    })
}