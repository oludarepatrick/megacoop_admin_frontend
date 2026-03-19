import { preRegisterAPI } from "@/services/preRegisterApi"
import type { Status } from "@/types/preRegisterUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useNewUserList = () => {
    return useQuery({
        queryKey: ['new-user-list'],
        queryFn: () => preRegisterAPI.getNewUserList(),
    })
}

export function useSendEmail(){
    return useMutation({
        mutationFn: (data: {ids:number[]}) => preRegisterAPI.sendEmail(data),
        onSuccess: () => {
            toast.success("Emails sent successfully")
            console.log("email sent successfully")
        },
        onError: (error) => {
            console.log("failed")
            toast.error(error.message)
        }
    })
}

export function useUpdateStatus(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {ids:number[], status: Status}) => preRegisterAPI.updateStatus(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["new-user-list"]})
            toast.success("Status Updated successfully")
            console.log("Status updated successfully")
        },
        onError: (error) => {
            console.log("failed")
            toast.error(error.message)
        }
    })
}