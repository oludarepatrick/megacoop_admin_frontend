import { userAPI } from "@/services/userApi";
import type { UserFormValues } from "@/types/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import type { AxiosError } from "axios";
import { toast } from "sonner";

export function useUserAdminList() {
    return useQuery({
        queryKey: ["user-admin-list"],
        queryFn: () => userAPI.getSubAdmin(),
    })
}

export function useCreateUserAdmin(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UserFormValues) => userAPI.createUser(data),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ["user-admin-list"] })
        },
        onError: (error) => {
            console.log("failed", error)
            toast.error("Failed to create user. Try again.")
        }
    })
}

export function useToggleUserStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => userAPI.toggleUserStatus(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["user-admin-list"]});
        },
        onError: (error) => {
            console.log("failed to update status", error);
        }
    })
}