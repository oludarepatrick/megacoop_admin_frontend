import axios from "@/lib/axiosInstance";
import type { CreditListResponse } from "@/types/product";

export const buyOnCreditAPI = {
  getBuyOnCreditList: async (page: number) : Promise<CreditListResponse> => {
    const response = await axios.get(`admin/buyers-oncredit?page=${page}`);
    return response.data;
  },
}
