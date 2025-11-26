import { ROIAPI } from "@/services/ROIApi";
import { useQuery } from "@tanstack/react-query";

export function useActiveUserInvestment(page: number) {
    return useQuery({
        queryKey: ["roi", page],
        queryFn: () => ROIAPI.activeUserInvestment(page),
    })
}