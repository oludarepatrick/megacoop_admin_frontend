import axios from "@/lib/axiosInstance";
import type { ReportFilters, ReportResponse } from "@/types/reports";

export const reportAPI = {
    getReport: async (filters: ReportFilters & {page?: number}): Promise<ReportResponse> => {
        const response = await axios.get(`admin/reports/${filters.type}`, {
            params: {
                start_date: filters.from,
                end_date: filters.to,
                year: filters.year,
                page: filters.page || 1
            }
        })
        return response.data
    },
    downloadReport: async (filters: ReportFilters & {format: 'pdf' | 'excel'}): Promise<Blob> => {
        const response = await axios.get(`admin/reports/download`, {
            params: {
                type: filters.type,
                start_date: filters.from,
                end_date: filters.to,
                year: filters.year,
                format: filters.format
            },
            responseType: "blob"
        })
        console.log("Download file", response.data)
        return response.data;
       
    }
}