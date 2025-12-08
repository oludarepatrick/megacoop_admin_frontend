import { ROIAPI } from "@/services/ROIApi";
import type { ROIPaymentFormData } from "@/validations/roi-payment-schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export function useActiveUserInvestment(page: number) {
    return useQuery({
        queryKey: ["roi", page],
        queryFn: () => ROIAPI.activeUserInvestment(page),
    })
}
export function useSingleUserInvestment(id: number) {
    return useQuery({
        queryKey: ["user-roi", id],
        queryFn: () => ROIAPI.singleUserInvestment(id),
        enabled: !!id,
    })
}

export function useROIProcessPayment() {
    return useMutation({
        mutationFn: (data: ROIPaymentFormData) => ROIAPI.roiProcessPayment(data),
        onSuccess: () => {
            console.log("ROI Payment Processed Successfully");
            toast.success("ROI Transaction Request Sent Succesfully")
        },
        onError: (error: AxiosError<{message: string}>) => {
            console.log("Error processing ROI payment:", error.response?.data.message);
            toast.error("Failed to process ROI payment. Try again.")
        }
    })
}