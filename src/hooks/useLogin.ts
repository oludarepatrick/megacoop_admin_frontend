import { authAPI } from "@/services/authApi";
import { useAuthStore } from "@/store/authStore"
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { AppError } from "@/types";

export const useLogin = () => {
    const loginState = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authAPI.login,
        onSuccess: (data) => {
            if(data.success){
                loginState(data.data.admin, data.data.token);
                navigate("/dashboard");
                return;
            } else{
                throw new Error(data.message || "Login failed");
            }
        },
        onError: (error: AppError) => {
            console.error("Login failed:", error);
        }

    })

}

export const useLogout = () => {
    const logoutState = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    return useMutation({
        mutationFn: authAPI.logout,
        onSuccess: () => { 
            logoutState();
            navigate("/login");
        },
        onError: (error: AppError) => {
            console.error("Logout failed:", error);
        }
    })
}