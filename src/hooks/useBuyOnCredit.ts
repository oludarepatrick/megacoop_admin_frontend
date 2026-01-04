import { buyOnCreditAPI } from "@/services/buyOnCreditApi";
import { useQuery } from "@tanstack/react-query";

export function useBuyOnCreditList(page: number) {
    return useQuery({
        queryKey: ["buy-on-credit-list", page],
        queryFn: () => buyOnCreditAPI.getBuyOnCreditList(page)
    })
}