import { transactionAPI } from "@/services/transactionApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useTransaction(page: number) {
    return useQuery({
        queryKey: ["transactions", page],
        queryFn: () => transactionAPI.getTransaction(page),
    })
}

export function useWithdrawalTransaction(page:number) {
    return useQuery({
        queryKey: ["withdrawal", page],
        queryFn: () => transactionAPI.withdrawalTransaction(page),
    })
}

export function useDownloadWithdrawalReport() {
    return useMutation({
        mutationFn: () => transactionAPI.downloadWithdrawalReport(),
        onSuccess: (file) => {
            const url = window.URL.createObjectURL(
                new Blob([file], {type: 'application/vnd.ms-excel' })
            );
            const link = document.createElement('a');
            link.href= url;
            link.setAttribute("download", `withdrawal-approved-${new Date().toISOString().slice(0,10)}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    })
}

export function useApproveWithdrawal(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id :number) => transactionAPI.approveWithdrawal(id),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ["withdrawal"] })
        },
        onError: (error) => {
            console.log("failed", error)
            toast.error("Failed to approve withdrawal. Try again.")
        }
    })
}
export function useDenyWithdrawal(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: {denied_reason: string} }) => transactionAPI.denyWithdrawal(id, data),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ["withdrawal"] })
        },
        onError: (error) => {
            console.log("failed", error)
            toast.error("Failed to approve withdrawal. Try again.")
        }
    })
}
export function usePaidWithdrawal(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => transactionAPI.paidWithdrawal(id),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ["withdrawal"] })
        },
        onError: (error) => {
            console.log("failed", error)
            toast.error("Failed to update withdrawal. Try again.")
        }
    })
}