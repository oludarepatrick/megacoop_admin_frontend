import { migrationaAPI } from "@/services/migrationApi"
import type { BuyOnCreditFormValues, LoanFormValues, NhfSavingsFormValues, TargetSavingsFormValues, WalletBalanceFormValues } from "@/validations/migration-schema"
import { useMutation } from "@tanstack/react-query"


export function useWalletMigration(){
    return useMutation({
        mutationFn: (data: WalletBalanceFormValues & { uuid: string }) => migrationaAPI.migrateWallet(data)
    })
}

export function useNhfMigration(){
    return useMutation({
        mutationFn: (data: NhfSavingsFormValues & { uuid: string }) => migrationaAPI.migrateNhf(data)
    })
}
 
export function useTargetSavingsMigration(){
    return useMutation({
        mutationFn: (data: TargetSavingsFormValues & { uuid: string }) => migrationaAPI.migrateTargetSavings(data)
    })
}
 
export function useLoanMigration(){
    return useMutation({
        mutationFn: (data: LoanFormValues & { uuid: string }) => migrationaAPI.migrateLoan(data)
    })
}

export function useByOnCreditMigration(){
    return useMutation({
        mutationFn: (data: BuyOnCreditFormValues & { uuid: string }) => migrationaAPI.migrateBuyOnCredit(data)
    })
}
