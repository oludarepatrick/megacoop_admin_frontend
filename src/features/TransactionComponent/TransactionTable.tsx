import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom";


type Transaction ={
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    amount: number;
    date: string;
    status: "approved" | "pending" |  "denied" | "cancel";
}

type TransactionTableProps = {
    transactions: Transaction[];
    onClick: (transaction: Transaction) => void
}


const TransactionTable = ({transactions, onClick}: TransactionTableProps) => {
    if(transactions.length === 0) {
        return (
            <div className="flex justify-center items-center py-6 text-muted-foreground">
                No transactions found for this category.
            </div>
        )
    }
    
    return (
        // <section className="">
        <Card className="px-4 pb-2 border-0 shadow-none ">
            <CardHeader className="flex justify-between px-2">
                <CardTitle className="text-xl font-semibold">Recent Loan Deals</CardTitle>
                <div className="flex gap-4 items-center">
                    
                    <Link to="/transactions" className="text-footertext text-sm hover:text-megagreen ">See All</Link>
                </div>
            </CardHeader>
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
                                <TableCell className="">{transaction.first_name}</TableCell>
                                <TableCell>{transaction.last_name}</TableCell>
                                <TableCell>{transaction.email}</TableCell>
                                <TableCell>{transaction.phone}</TableCell>
                                <TableCell className="text-megagreen"> {transaction.amount}</TableCell>
                                <TableCell> {transaction.date}</TableCell>
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