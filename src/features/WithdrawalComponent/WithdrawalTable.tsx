import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // ADDED: Missing import
import { Table, TableBody, TableCell,TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { formatDate } from "@/lib/common";
import type { WithdrawalList } from "@/types/transactions";
import { Download } from "lucide-react";
import excelIcon from "@/assets/excel-icon.svg";

type WithdrawalTableProps = {
    withdrawals: WithdrawalList[];
    onClick: (transaction: WithdrawalList) => void;
    isLoading: boolean;
    isPending: boolean;
    isError: boolean;
    onDownload?: () => void;
}

const WithdrawalTable = ({ withdrawals, onClick, isLoading, isPending, isError, onDownload }: WithdrawalTableProps) => {
    
    if (isLoading) {
        return (
            <Card className="p-0 px-4 pb-2 border-0 shadow-none">
                <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
                    <Table>
                        <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                            <TableRow className="bg-transparent [&_th]:text-xs">
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Wallet Balance</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-megagreen">Status</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                    <TableCell><Skeleton className="h-8 w-16" /></TableCell>
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
                        Error fetching Withdrawal History
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Please try again later
                    </p>
                </div>
            </Card>
        );
    }

    // Show empty state
    if (withdrawals.length === 0) {
        return (
            <Card className="p-0 px-4 pb-2 border-0 shadow-none">
                <div className="flex justify-center items-center py-12 text-muted-foreground">
                    <div className="text-center">
                        <p className="font-medium mb-1">No withdrawals found</p>
                        <p className="text-sm">There are no transactions in this category yet.</p>
                    </div>
                </div>
            </Card>
        );
    }

    // Show data table
    return (
        <Card className="p-0 px-4 pb-2 border-0 shadow-none">
            <Button variant="outline"
                disabled={isPending}
                className="border-megagreen text-megagreen self-end"
                onClick={onDownload}
            >
                <Download /> Download Report 
                <img src={excelIcon} alt="" />
            </Button>
            <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
                <Table>
                    <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                        <TableRow className="bg-transparent [&_th]:text-xs">
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Wallet Balance</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-megagreen">Status</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {withdrawals.map((transaction) => (
                            <TableRow key={transaction.id} className="hover:bg-muted/50 [&_td]:text-xs [&_td]:py-4 transition-colors">
                                <TableCell>{transaction.user.first_name}</TableCell>
                                <TableCell>{transaction.user.last_name}</TableCell>
                                <TableCell>{transaction.user.email}</TableCell>
                                <TableCell>₦{Number(transaction.balance_b4).toLocaleString()}</TableCell>
                                <TableCell className="font-medium">
                                    ₦{Number(transaction.amount).toLocaleString()}
                                </TableCell>
                                <TableCell>{formatDate(transaction.created_at)}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        transaction.status === "approved" 
                                            ? "bg-green-100 text-green-700" 
                                            : transaction.status === "pending" 
                                            ? "bg-orange-100 text-megaorange" 
                                            : transaction.status === "paid" 
                                            ? "bg-muted-foreground/50 text-grey-700" 
                                            : "bg-red-100 text-red-700"
                                    }`}>
                                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => onClick(transaction)}
                                        variant="outline"
                                        className="border border-megagreen text-megagreen py-[6px] px-4 h-auto rounded-full text-xs font-medium hover:bg-megagreen hover:text-white transition-all" 
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
};

export default WithdrawalTable;