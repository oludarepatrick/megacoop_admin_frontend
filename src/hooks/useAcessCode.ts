import { accessCodeApi } from "@/services/accessCodeApi"
import { useMutation } from "@tanstack/react-query";
import type { AppError } from "@/types";

export const useAcessCode = () => {
    return useMutation({
        mutationFn: accessCodeApi,
        onSuccess: (data) => {
            if(data.success){
                console.log("Access code generated:", data.data.access_code);
                return;
            }else{
                throw new Error(data.message || "Access code generation failed");
            }
        },
        onError: (error: AppError) => {
            console.log("Access code generation failed:", error);
        }
    })

}