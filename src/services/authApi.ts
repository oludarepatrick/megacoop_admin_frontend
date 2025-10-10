import axios from "@/lib/axiosInstance";

import type { LoginResponse } from "@/types";
import type { LoginFormData } from "@/validations/login-schema";

export const authAPI = {
    login: async (data: LoginFormData): Promise<LoginResponse> => {
        const response = await axios.post("/admin/admin-login", data)
        return response.data
    },
    logout: async (): Promise<void> => {
        const response = await axios.get("/admin/logout")
        return response.data
    }
} 