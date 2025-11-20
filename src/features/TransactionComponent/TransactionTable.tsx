import { LoaderIcon } from "@/components/PageLoader";
import { Card, 
    // CardHeader, 
    // CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/common";
import type { TransactionList } from "@/types/transactions";
// import { Link } from "react-router-dom";

type TransactionTableProps = {
    transactions: TransactionList[];
    onClick: (transaction: TransactionList) => void
    isLoading: boolean
    isError: boolean
}


const TransactionTable = ({transactions, onClick, isLoading, isError}: TransactionTableProps) => {
    if(isLoading) {
        return (
            <div className="flex flex-col justify-center items-center">
                <LoaderIcon/>
            </div>
        )
    } 
    if(isError) {
        return (
            <div className="flex flex-col justify-center items-center">
                <p className="font-medium text-muted-foreground">
                    Error fetching Investment History
                </p>
            </div>
        )
    }
        
    if(transactions.length === 0) {
        return (
            <div className="flex justify-center items-center py-6 text-muted-foreground">
                No transactions found for this category.
            </div>
        )
    }
    
    return (
        <Card className="p-0 px-4 pb-2 border-0 shadow-none ">
            <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
                <Table>
                        <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                            <TableRow className="bg-transparent [&_th]:text-xs ">
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
                    <TableBody className="">
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id} className="hover:bg-transparent [&_td]:text-xs [&_td]:py-4">
                                <TableCell className="">{transaction.user.first_name}</TableCell>
                                <TableCell>{transaction.user.last_name}</TableCell>
                                <TableCell>{transaction.user.email}</TableCell>
                                <TableCell>{transaction.user.phone}</TableCell>
                                <TableCell className="text-megagreen"> {transaction.amount}</TableCell>
                                <TableCell> {formatDate(transaction.created_at)}</TableCell>
                                <TableCell className={
                                    transaction.status === "approved" ? "text-megagreen" 
                                    : transaction.status === "pending" ? "text-megaorange" 
                                    : "text-red-500"}>
                                    {transaction.status}
                                </TableCell>
                                <TableCell className=" w-[120px] cursor-pointer">
                                    <span className="border-megagreen border text-megagreen py-1 px-3 rounded-2xl " onClick={()=> onClick(transaction)}>
                                        View
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </Card>
        // </section>
    )
}

export default TransactionTable;