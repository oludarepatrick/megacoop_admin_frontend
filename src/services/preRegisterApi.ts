import axios from "@/lib/axiosInstance";
import type { NewUserListResponse, Status } from "@/types/preRegisterUser";

export const preRegisterAPI = {
    getNewUserList: async (): Promise<NewUserListResponse> => {
        const response = await axios.get('/admin/preregister');
        return response.data;
    },

    sendEmail: async(data: {ids:number[]}) => {
        const response = await axios.post('/admin/preregister/send-email', data);
        return response.data
    },
    updateStatus: async(data: {ids:number[], status: Status}) => {
        const response = await axios.post('/admin/preregister/update-status', data);
        return response.data
    }
    
}