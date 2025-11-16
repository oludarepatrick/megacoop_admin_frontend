import axios from "@/lib/axiosInstance";
import type { InvestmentApplicationResponse, ApproveRejectInvestment, ListInvestmentResponse, TopTrendingInvestment } from "@/types/investment";
import type { EditFormData, InvestmentFinalFormData } from "@/validations/investment-schema";

export const investmentAPI = {
    getTrendingInvestment: async (): Promise<TopTrendingInvestment[]> => {
    const response = await axios.get('/investments/top');
    return response.data.data
  },
  getInvestmentList: async(page: number): Promise<ListInvestmentResponse> => {
    const response = await axios.get(`/admin/investments?page=${page}`)
    return response.data
  },
  getInvestmentApplication: async () : Promise<InvestmentApplicationResponse> => {
    const response = await axios.get("/admin/investments/applications")
    return response.data
  },

  approveRejectKYC: async (id: number, data: ApproveRejectInvestment) => {
    const response = await axios.post(`/admin/investments/status/${id}`, data)
    return response.data;
  },

  createInvestment: async(data: InvestmentFinalFormData) => {
    const response = await axios.post("/admin/investments", data)
    return response.data
  },

  updateInvestment: async (id: number, data: EditFormData) => {
    const response = await axios.put(`/admin/investments/${id}`, data);
    return response.data
  }


}