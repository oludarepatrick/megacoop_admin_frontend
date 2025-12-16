import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // ADDED: Missing import
import { Table, TableBody, TableCell,TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { formatDate } from "@/lib/common";
import type { Loan } from "@/types/loan";

type LoanTableProps = {
    loans: Loan[];
    onClick: (loan: Loan) => void;
    isLoading: boolean;
    isError: boolean;
}

const LoanTable = ({ loans, onClick, isLoading,  isError }: LoanTableProps) => {
    
    if (isLoading) {
        return (
            <Card className="p-0 pb-2 border-0 shadow-none">
                <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
                    <Table>
                        <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                            <TableRow className="bg-transparent [&_th]:text-xs">
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
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
                        Error fetching Loan History
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Please try again later
                    </p>
                </div>
            </Card>
        );
    }

    // Show empty state
    if (loans.length === 0) {
        return (
            <Card className="p-0 px-4 pb-2 border-0 shadow-none">
                <div className="flex justify-center items-center py-12 text-muted-foreground">
                    <div className="text-center">
                        <p className="font-medium mb-1">No loan deals found</p>
                        <p className="text-sm">There are no loan deals history in this category yet.</p>
                    </div>
                </div>
            </Card>
        );
    }

    // Show data table
    return (
        <Card className="p-0 pb-2 border-0 shadow-none">
            <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
                <Table>
                    <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                        <TableRow className="bg-transparent [&_th]:text-xs">
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-megagreen">Status</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loans.map((loan) => (
                            <TableRow key={loan.id} className="hover:bg-muted/50 [&_td]:text-xs [&_td]:py-4 transition-colors">
                                <TableCell>{loan.user.first_name}</TableCell>
                                <TableCell>{loan.user.last_name}</TableCell>
                                <TableCell>{loan.user.email}</TableCell>
                                <TableCell>{loan.user.phone}</TableCell>
                                <TableCell className="font-medium">
                                    ₦{Number(loan.amount).toLocaleString()}
                                </TableCell>
                                <TableCell>{formatDate(loan.created_at)}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        loan.status === "approved" 
                                            ? "bg-green-100 text-green-700" 
                                            : loan.status === "pending" 
                                            ? "bg-orange-100 text-megaorange" 
                                            // : loan.status === "paid" 
                                            // ? "bg-muted-foreground/50 text-grey-700" 
                                            : "bg-red-100 text-red-700"
                                    }`}>
                                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => onClick(loan)}
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

export default LoanTable;