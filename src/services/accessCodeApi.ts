import axios from "@/lib/axiosInstance";
import type { accessCodeResponse } from "@/types";
import type { accessCodeFormData } from "@/validations/access-code-schema";

export const accessCodeApi = async (data: accessCodeFormData): Promise<accessCodeResponse> => {
    try{
        const response = await axios.post("/generate-code", data)
        return response.data;
    } catch(error){
        console.error("Error generating access code:", error);
        throw error;
    }
}