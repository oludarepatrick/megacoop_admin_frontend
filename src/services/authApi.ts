import axios from "@/lib/axiosInstance";
import { formConfig } from "@/lib/utils";

import type { LoginResponse } from "@/types";
import type { ForgotPasswordEmailFormData, LoginFormData, SendPasswordFormData } from "@/validations/login-schema";

export const authAPI = {
    login: async (data: LoginFormData): Promise<LoginResponse> => {
        const response = await axios.post("/admin/admin-login", data)
        return response.data
    },
    logout: async (): Promise<void> => {
        const response = await axios.get("/admin/logout")
        return response.data
    },
    forgotPassword: async(data: ForgotPasswordEmailFormData) => {
        const response = await axios.post('/user/forgot-password', data, formConfig)
        return response.data
    },

    sendPassword: async(data: SendPasswordFormData) => {
        const response = await axios.post('/user/reset-password', data, formConfig)
        return response.data
    },
} 
