import axios from "@/lib/axiosInstance";
import type { KYCListResponse, KYCStatus } from "@/types/kycList";
import type { KycDeclineFormData } from "@/validations/kyc-schema";

export const kycApi = {
    getKYCList: async (status: KYCStatus): Promise<KYCListResponse> => {
        const response = await axios.get('/kyc/get-kyc-list', {
            params: {status}
        });
        return response.data;
    },
    approveKYC: async (data: {uuid: string, status: string }) : Promise<void> => {
        const response = await axios.post('/kyc/approve-reject-kyc', data);
        return response.data;
    },
    rejectKYC: async (data: KycDeclineFormData): Promise<void> => {
        const response = await axios.post('/kyc/approve-reject-kyc', data);
        return response.data;
    }
}