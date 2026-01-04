import axios from "@/lib/axiosInstance";
import type { SystemPermissions, UserFormValues, UserResponse } from "@/types/User";
import type { AllUserListResponse, SingleUserResponse, UserViewStat } from "@/types/userView";

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

  },
  getSystemPermissions: async(): Promise<SystemPermissions[]> => {
    const response = await axios.get("/admin/management/permissions")
    return response.data.data
  },
  assignPermission: async (id:number, data: {permission_ids:number[]}) => {
    const response = await axios.post(`/admin/management/sub-admins/${id}/permissions`, data)
    return response.data
  },

  // users API endpoints added here

  getUsersSummary: async(): Promise<UserViewStat> => {
    const response = await axios.get("/admin/users/summary");
    return response.data;
  },
  getAllUsers: async(page: number): Promise<AllUserListResponse> => {
    const response = await axios.get(`/admin/users?page=${page}`);
    return response.data;
  },
  getSingleUserHistory: async (id: string): Promise<SingleUserResponse> => {
    const response = await axios.get(`/admin/users/${id}`);
    return response.data;
  },

}

