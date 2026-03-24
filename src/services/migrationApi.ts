import axios from "@/lib/axiosInstance";
import type { BuyOnCreditFormValues, LoanFormValues, NhfSavingsFormValues, TargetSavingsFormValues, WalletBalanceFormValues } from "@/validations/migration-schema";

export const migrationaAPI = {
    // migrateWallet: (data: { user_id: number; amount: number; description: string }) =>
    migrateWallet: async (data: WalletBalanceFormValues & { uuid: string }) => {
        const response = await axios.post("/admin/migration/wallet-balance", data)
        return response.data
    },
 
    migrateNhf: async (data: NhfSavingsFormValues & { uuid: string }) => {
        const response = await axios.post("/admin/migration/nhf-savings", data)
        return response.data;
    },
 
    migrateTargetSavings: async (data: TargetSavingsFormValues & { uuid: string }) => {
        const response = await axios.post("/admin/migration/target-savings", data)
        return response.data;
    },
 
    migrateLoan: async (data: LoanFormValues & { uuid: string }) => {
        const response = await axios.post("/admin/migration/loan", data)
        return response.data;
    },
 
    migrateBuyOnCredit: async (data: BuyOnCreditFormValues & { uuid: string}) => {
        const response = await axios.post("/admin/migration/buy-on-credit", data)
        return response.data;
    }
}