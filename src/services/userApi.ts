import axios from "@/lib/axiosInstance";
import type { UserFormValues, UserResponse } from "@/types/User";

export const userAPI = {
  getSubAdmin: async () : Promise<UserResponse> => {
    const response = await axios.get("/admin/management/sub-admins");
    return response.data.data;
  },

  createUser: async (data: UserFormValues) => {
    const response = await axios.post("/admin/management/sub-admins", data);
    return response.data;
  },

  toggleUserStatus: async(id: number)=> {
    const response = await axios.patch(`/admin/management/sub-admins/${id}/toggle-status`);
    return response.data;

  }
}

