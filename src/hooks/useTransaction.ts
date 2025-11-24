import { transactionAPI } from "@/services/transactionApi";
import { useQuery } from "@tanstack/react-query";

export function useTransaction(page: number) {
    return useQuery({
        queryKey: ["transactions", page],
        queryFn: () => transactionAPI.getTransaction(page),
    })
}