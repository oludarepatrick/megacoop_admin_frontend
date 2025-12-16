import { LoanAPI } from "@/services/loanApi"
import { loanService } from "@/services/loanService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

// Fetch statistics
export const useLoanStatistics = () => {
    return useQuery({
        queryKey: ["loanStatistics"],
        queryFn: () => loanService.getLoanStatistics(),
    })
}
// Fetch analytics data
export const useLoanAnalytics = () => {
    return useQuery({
        queryKey: ["loanAnalytics"],
        queryFn: () => loanService.getLoanAnalytics(),
    })
}

// Fetch loans with paginations
export const useLoanData = (page: number) => {
    return useQuery({
        queryKey: ["loans", page],
        queryFn: () => LoanAPI.getLoans(page),
    })
}

//approve loan
export function useApproveLoan(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id :number) => LoanAPI.approveLoan(id),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ["loans"] })
        },
        onError: (error) => {
            console.log("failed", error)
            toast.error("Failed to approve loan. Try again.")
        }
    })
}

export function useDenyLoan(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: {admin_remarks: string} }) => LoanAPI.denyLoan(id, data),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ["loan"] })
        },
        onError: (error) => {
            console.log("failed", error)
            toast.error("Failed to approve loan. Try again.")
        }
    })
}