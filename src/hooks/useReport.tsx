import { reportAPI } from "@/services/reportApi";
import type { ReportFilters } from "@/types/reports";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetReport(){
    return useMutation({
        mutationFn: (filters: ReportFilters & {page?: number}) => reportAPI.getReport(filters),
        onSuccess:(data) => {
            console.log("success", data)},
        onError: (error) => {
            console.log("failed", error)
            toast.error("Failed to generate report. Try again.")
        }
    })
}

export function useDownloadReport(){
    return useMutation({
        mutationFn: (filters: ReportFilters & {format: 'pdf' | 'excel'}) => reportAPI.downloadReport(filters),
        onSuccess: (file, variables) => {
            const mimeType = variables.format === "pdf" 
                ? 'application/pdf' 
                : 'text/csv';
            
            const fileExtension = variables.format === "pdf" ? 'pdf' : 'csv';
            
            const blob = new Blob([file], { type: mimeType });
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                "download", 
                `${variables.type}-report-${new Date().toISOString().slice(0, 10)}.${fileExtension}`
            );
            
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // ✅ Free up memory
            
            toast.success(`${variables.format.toUpperCase()} downloaded successfully`);
        },
        onError: (error) => {
            console.error("Download failed:", error);
            toast.error("Failed to download report");
        }
    });
}