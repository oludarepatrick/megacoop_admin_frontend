import { TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/common";
import { formatCurrency } from "@/lib/utils";
import type { BuyOnCreditPaymentReport, BuyOnCreditReport, InvestmentReport, LoanReport, OrderReport, ReportData, ReportType, ROIReport, SavingsReport, WalletTransactionReport } from "@/types/reports";

// Helper function to get table headers based on report type
export function getTableHeaders(reportType: ReportType | null) : string[] {
    switch(reportType){
        case "loans":
            return ["First Name", "Last Name", "Email", "Phone", "Amount", "Date", "Status"];
        case "wallet-transactions":
            return ["First Name", "Last Name", "Email", "Amount", "Transaction Type", "Date", "Status"];
        case "savings":
            return ["First Name", "Last Name", "Email", "Amount", "Reference ID", "Date", "Status"];
        case "buy-on-credit":
            return ["First Name", "Last Name", "Email", "Phone", "Amount",  "Date", "Status"];
        case "buy-on-credit-payments":
            return ["First Name", "Last Name", "Email", "Amount", "Phone", "Date", "Status"];
        case "roi":
            return ["First Name", "Last Name", "Email", "Amount", "ROI", "Date"];
        case "orders":
            return ["Order ID", "First Name", "Last Name", "Email", "Amount", "Date", "Status"];
        case "investments":
            return ["First Name", "Last Name", "Investment", "Amount", "ROI Earned", "Date", "Status"];
        default:
            return [];
    }
}

// Helper function to render table row based on report type
export function renderTableRow(report: ReportData, reportType: ReportType | null) {
    switch (reportType) {
        case "loans": {
            const loanReport = report as LoanReport;
            return (
                <>
                    <TableCell>{loanReport.user.first_name}</TableCell>
                    <TableCell>{loanReport.user.last_name}</TableCell>
                    <TableCell>{loanReport.user.email}</TableCell>
                    <TableCell>{loanReport.user.phone}</TableCell>
                    <TableCell className="font-medium text-megagreen">
                        ₦{Number(loanReport.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>{formatDate(loanReport.created_at)}</TableCell>
                    <TableCell>
                        <StatusBadge status={loanReport.status} />
                    </TableCell>
                </>
            )
        }
        case "orders":{
            const orderReport = report as OrderReport;
            return (
                <>
                    <TableCell className="">{orderReport.order_id}</TableCell>
                    <TableCell className="">{orderReport.user.first_name}</TableCell>
                    <TableCell className="">{orderReport.user.last_name}</TableCell>
                    <TableCell className="">{orderReport.user.email}</TableCell>
                    <TableCell className="font-medium text-megagreen">{formatCurrency(Number(orderReport.total_amount))}</TableCell>
                    <TableCell> {formatDate(orderReport.created_at)}</TableCell>
                    <TableCell>
                        <StatusBadge status={orderReport.status} />
                    </TableCell>
                </>
            )
        };
        case "investments":{
            const investmentReport = report as InvestmentReport;
            return (
                <>
                    <TableCell>{investmentReport.user.first_name}</TableCell>
                    <TableCell>{investmentReport.user.last_name}</TableCell>
                    <TableCell className="max-w-50 truncate">{investmentReport.inv_name}</TableCell>
                    <TableCell className="font-medium text-megagreen">
                        {formatCurrency(Number(investmentReport.amount))}
                    </TableCell>
                    <TableCell className="font-medium text-megagreen">
                        {formatCurrency(Number(investmentReport.interest_earned))}
                    </TableCell>
                    
                    <TableCell>{formatDate(investmentReport.created_at)}</TableCell>
                    <TableCell>
                        <StatusBadge status={investmentReport.status} />
                    </TableCell>
                </>
            )
        };
        case ("wallet-transactions"):{
            const walletTransactionReport = report as WalletTransactionReport;
            return (
                <>
                    <TableCell>{walletTransactionReport.user.first_name}</TableCell>
                    <TableCell>{walletTransactionReport.user.last_name}</TableCell>
                    <TableCell>{walletTransactionReport.user.email}</TableCell>
                    <TableCell className="font-medium text-megagreen">
                        {formatCurrency(Number(walletTransactionReport.amount))}
                    </TableCell>
                    <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            walletTransactionReport.type === "credit" 
                                ? "bg-green-100 text-green-700" 
                                : walletTransactionReport.type === "withdrawal" 
                                ? "bg-orange-100 text-megaorange" 
                                : "bg-red-100 text-red-700"
                        }`}>
                            {walletTransactionReport.type.charAt(0).toUpperCase() + walletTransactionReport.type.slice(1)}
                        </span>
                    </TableCell>
                    <TableCell>{formatDate(walletTransactionReport.created_at)}</TableCell>
                    <TableCell>
                        <StatusBadge status={walletTransactionReport.status} />
                    </TableCell>
                </>
            )
        };
        case "savings":{
            const savingsReport = report as SavingsReport;
            return (
                <>
                    <TableCell>{savingsReport.user.first_name}</TableCell>
                    <TableCell>{savingsReport.user.last_name}</TableCell>
                    <TableCell className="max-w-45 truncate">{savingsReport.user.email}</TableCell>
                    <TableCell className="font-medium text-megagreen">
                        {formatCurrency(Number(savingsReport.amount))}
                    </TableCell>
                    <TableCell className="max-w-40 truncate">{savingsReport.reference}</TableCell>
                    <TableCell>{formatDate(savingsReport.created_at)}</TableCell>
                    <TableCell>
                        <StatusBadge status={savingsReport.status} />
                    </TableCell>
                </>
            )
        };
        case "roi":{
            const roiReport = report as ROIReport;
            return (
                <>
                    <TableCell>{roiReport.user.first_name}</TableCell>
                    <TableCell>{roiReport.user.last_name}</TableCell>
                    <TableCell>{roiReport.user.email}</TableCell>
                    <TableCell className="font-medium text-megagreen">
                        {formatCurrency(Number(roiReport.amount_invested))}
                    </TableCell>
                    <TableCell className="font-medium text-megagreen">
                        {formatCurrency(Number(roiReport.roi))}
                    </TableCell>
                    <TableCell>{formatDate(roiReport.created_at)}</TableCell>
                    
                </>
            )
        };
        case "buy-on-credit":{
            const bocReport = report as BuyOnCreditReport;
            return (
                <>
                    <TableCell>{bocReport.user.first_name}</TableCell>
                    <TableCell>{bocReport.user.last_name}</TableCell>
                    <TableCell>{bocReport.user.email}</TableCell>
                    <TableCell>{bocReport.user.phone}</TableCell>
                    <TableCell className="font-medium text-megagreen">
                        {formatCurrency(Number(bocReport.meta.total_payable))}
                    </TableCell>
                    <TableCell>{formatDate(bocReport.created_at)}</TableCell>
                    <TableCell>
                        <StatusBadge status={bocReport.status} />
                    </TableCell>
                    
                </>
            )
        };
        case "buy-on-credit-payments":{
            const bocpReport = report as BuyOnCreditPaymentReport
            return (
                <>
                    <TableCell>{bocpReport.user.first_name}</TableCell>
                    <TableCell>{bocpReport.user.last_name}</TableCell>
                    <TableCell>{bocpReport.user.email}</TableCell>
                    
                </>
            )
        };
        default:
            return (
                <p>No data found</p>
            );
    }
}

// Status badge component
// eslint-disable-next-line react-refresh/only-export-components
function StatusBadge({ status }: { status: string }) {
    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            status === "approved" || status === "delivered" || status === "completed"
                ? "bg-green-100 text-green-700" 
                : status === "pending" 
                ? "bg-orange-100 text-megaorange" 
                : "bg-red-100 text-red-700"
        }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

