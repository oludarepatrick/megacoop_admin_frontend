import { transactionAPI } from "@/services/transactionApi";
import { useQuery } from "@tanstack/react-query";

export function useTransaction(page: number) {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: () => transactionAPI.getTransaction(page),
    })
}