import { accessCodeApi } from "@/services/accessCodeApi"
import { useMutation } from "@tanstack/react-query";
import type { AppError } from "@/types";

export const useAcessCode = () => {
    return useMutation({
        mutationFn: accessCodeApi,
        onSuccess: (data) => {
            console.log("Access code generated:", data.code);
        },
        onError: (error: AppError) => {
            console.log("Access code generation failed:", error);
        }
    })

}
