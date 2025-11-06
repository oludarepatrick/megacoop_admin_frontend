import { kycApi } from "@/services/kycApi"
import type { AppError } from "@/types"
import type { KYCStatus } from "@/types/kycList"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useKYCList = (status: KYCStatus) => {
    return useQuery({
        queryKey: ['kyc-list', status],
        queryFn: () => kycApi.getKYCList(status),
    })
}

export const useApproveKYC = (onSuccess: () => void ) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:kycApi.approveKYC,
        onSuccess: () => {
            console.log("KYC approved successfully");
            toast.success("KYC Approved: The user's KYC has been successfully approved.");
            queryClient.invalidateQueries({ queryKey: ['kyc-list'] });
            onSuccess()
            
        }, 
        onError: (error: AppError) => {
            toast.error("Approval Failed: " + (error?.message || "Something went wrong while approving the KYC."));
            console.log("KYC approval failed:", error);
        }
    })
}

export const useDeclineKYC = (onSuccess: () => void ) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:kycApi.approveKYC,
        onSuccess: () => {
            console.log("KYC denied successfully");
            toast.success("KYC Declined: The user's KYC has been successfully declined.");
            queryClient.invalidateQueries({ queryKey: ['kyc-list'] });
            onSuccess()
            
        }, 
        onError: (error: AppError) => {
            toast.error("Approval Failed: " + (error?.message || "Something went wrong while approving the KYC."));
            console.log("KYC approval failed:", error);
        }
    })
}