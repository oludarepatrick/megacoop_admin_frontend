import PaginationComponent from "@/components/PaginationComponent";
import { Button } from "@/components/ui/button";
import excelIcon from "@/assets/excel-icon.svg";
import pdfIcon from "@/assets/pdf-icon.svg";
import { Download } from "lucide-react";
import { useState } from "react";
import FilterField from "@/features/ReportComponent/FilterFields";
import ReportTable from "@/features/ReportComponent/ReportTable";
import type { ReportData, ReportFilters, ReportType } from "@/types/reports";
import { useDownloadReport, useGetReport } from "@/hooks/useReport";
import { toast } from "sonner";


const Return = () => {
    const [reportData, setReportData] = useState<ReportData[]>([]);
    const [reportType, setReportType] = useState<ReportType | null>(null);
    const [isGenerated, setIsGenerated] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentFilters, setCurrentFilters] = useState<ReportFilters | null>(null);

    const {mutate, isPending, isError} = useGetReport();
    const {mutate: downloadMutate, isPending: isDownloadPending} = useDownloadReport();

    const handleGenerateReport = (filters: ReportFilters, page: number = 1) => {
        setCurrentFilters(filters);
        mutate(
            {...filters, page}, {
            onSuccess: (data, variables) => {
                setReportData(data.data || []);
                setReportType(variables.type);
                setIsGenerated(true);
                setCurrentPage(data.current_page);
                setTotalPages(data.last_page);
                toast.success("Report generated successfully");
            },
            onError: () => {
                setIsGenerated(true);
            }
        })
    }

    const handleDownloadReport = (format: 'pdf' | 'excel') => {
        if(!currentFilters) {
            toast.error("Please generate a report first");
            return;
        }
        downloadMutate(
            {...currentFilters, format }
        )
        toast.success("Your download will begin shortly");

    }


    const handlePageChange = (page: number) => {
        if(currentFilters){
            handleGenerateReport(currentFilters, page)
        }
    }
    
    return (
        <div className="font-jakarta space-y-6">
            <div className="flex justify-between flex-wrap gap-4">
                <h2 className="font-semibold text-[20px]">Report Wizard</h2>
                <div className="relative flex flex-wrap gap-4 bg-white rounded-full">
                    <Button variant="outline"
                        disabled={isDownloadPending}
                        className="border-megagreen text-megagreen self-end"
                        onClick={handleDownloadReport.bind(null, 'excel')}
                    >
                        <Download /> Download Report 
                        <img src={excelIcon} alt="" />
                    </Button>

                    <Button variant="outline"
                        disabled={isDownloadPending}
                        className="border-megagreen text-megagreen self-end"
                        onClick={handleDownloadReport.bind(null, 'pdf')}
                    >
                        <Download /> Download pdf 
                        <img src={pdfIcon} alt="" />
                    </Button>
                </div>
            </div>
            <FilterField
                onFilter={handleGenerateReport}
                isPending={isPending}
            />

            {/* {reportType && ( */}
                <ReportTable
                    reports={reportData}
                    reportType={reportType}
                    isLoading={isPending}
                    isError={isError}
                    hasGenerated={isGenerated}
                />
            {/* )} */}

            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
            />

        </div>
    );
}
export default Return;