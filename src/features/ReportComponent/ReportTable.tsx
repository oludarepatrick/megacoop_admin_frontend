import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import emptyBox from "@/assets/empty-box.svg"
import type { ReportData, ReportType } from "@/types/reports";
import { getTableHeaders, renderTableRow } from "./ReportTableHelper";

type ReportTableProps = {
    reports: ReportData[];
    reportType: ReportType | null
    isLoading: boolean
    isError: boolean
    hasGenerated: boolean // to check if report has been generated
}

const ReportTable = ({reports, reportType, hasGenerated, isLoading, isError}: ReportTableProps) => {

    // Show initial state if no report is generated yet
    if(!hasGenerated) {
        return (
            <Card className="p-0 px-4 pb-2 border-0 shadow-none">
                <div className="flex flex-col justify-center items-center py-6 text-muted-foreground">
                    <img src={emptyBox} alt="" />
                    <p className="">There are no reports fetched yet.</p>
                    <p className="sm">Fill the field above and click the generate button.</p>
                </div>
            </Card>
        )
    }

   if (isLoading) {
        return (
            <Card className="p-0 px-4 pb-2 border-0 shadow-none">
                <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
                    <Table>
                        <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                            <TableRow className="bg-transparent [&_th]:text-xs ">
                                { getTableHeaders(reportType).map((header, index) => (
                                    <TableHead key={index}>{header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <TableRow key={index}>
                                    { getTableHeaders(reportType).map((_, index) => (
                                        <TableCell key={index}><Skeleton className="h-4 w-20" /></TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        );
    }

    // Show error state
    if (isError) {
        return (
            <Card className="p-0 px-4 pb-2 border-0 shadow-none">
                <div className="flex flex-col justify-center items-center py-12">
                    <p className="font-medium text-red-500 mb-2">
                        Error fetching reports
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Please try again later
                    </p>
                </div>
            </Card>
        );
    }

    // Show empty state
    if(reports.length === 0) {
        return (
            <Card className="p-0 px-4 pb-2 border-0 shadow-none">
                <div className="flex flex-col justify-center items-center py-6 text-muted-foreground">
                    <img src={emptyBox} alt="" />
                    <p className="">No reports found for the selected criteria</p>
                </div>
            </Card>
        );
    }
    
    return (
        <Card className="p-0 pb-2 border-0 shadow-none ">
            <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
                <Table>
                    <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                        <TableRow className="bg-transparent [&_th]:text-xs ">
                            {getTableHeaders(reportType).map((header, index) => (
                                <TableHead key={index}>{header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id} className="hover:bg-muted/50 [&_td]:text-xs [&_td]:py-4 transition-colors">
                                {renderTableRow(report, reportType)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}

export default ReportTable;