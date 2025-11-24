import { investmentAPI } from "@/services/investmentApi";
import type { ApproveRejectInvestment } from "@/types/investment";
import type { EditFormData, InvestmentFinalFormData } from "@/validations/investment-schema";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useInvestmentData(){
    return useQuery({
        queryKey: ["investment-dashboard"],
        queryFn: investmentAPI.getInvestmentData,
    })
}

export function useTrendingInvestment(){
    return useQuery({
        queryKey: ["top-investment"],
        queryFn: investmentAPI.getTrendingInvestment,
    })
}

export function useInvestmentList(page: number) {
    return useQuery({
        queryKey: ["investments", page],
        queryFn: () => investmentAPI.getInvestmentList(page),
        placeholderData: keepPreviousData,

    })
}
export function useInvestmentApplication() {
    return useQuery({
        queryKey: ["applications"],
        queryFn: investmentAPI.getInvestmentApplication,
    })
}

export function useApproveDeclineInvestment(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: ApproveRejectInvestment }) => investmentAPI.approveRejectKYC(id, data),
        onSuccess:() => {
            console.log("successful")
            queryClient.invalidateQueries({ queryKey: ["applications"] })
        },
        onError: (error) => {
            console.log("failed", error)
        }
    })
}

export function useCreateInvestment(onSuccess: ()=> void){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: InvestmentFinalFormData) => investmentAPI.createInvestment(data),
        onSuccess: () => {
            console.log("investment created successfully");
            queryClient.invalidateQueries({queryKey:["investments"]})
            onSuccess();
        },
        onError: (error)=> {
            console.log("investment creation failed", error)
        }
    })
}

export function useUpdateInvestment(onSuccess:()=>void){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: EditFormData }) => investmentAPI.updateInvestment(id, data),
        onSuccess: () => {
            console.log("investment updated successfully");
            queryClient.invalidateQueries({queryKey: ["investments"]});
            onSuccess();
        },
        onError: (error)=> {
            toast.error("investment update failed. Try again");
            console.log("investment creation failed", error)
        }
    })
}