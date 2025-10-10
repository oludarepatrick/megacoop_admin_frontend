import axios from "@/lib/axiosInstance";
import type { accessCodeResponse } from "@/types";
import type { accessCodeFormData } from "@/validations/access-code-schema";

export const accessCodeApi = async (data: accessCodeFormData): Promise<accessCodeResponse> => {
    try{
        const response = await axios.post("/admin/generate-code", data)
        const responseData = response.data;
        
        // If we get here with a 2xx status code, it means success
        // The API returns the data directly without a success field
        return responseData;
    } catch(error){
        console.error("Error generating access code:", error);
        throw error;
    }
}
