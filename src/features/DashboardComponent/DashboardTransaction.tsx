import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useLoanDeal } from "@/hooks/useDashboard";
import emptyBox from "@/assets/empty-box.svg";

import { Link } from "react-router-dom";
import { LoaderIcon } from "@/components/PageLoader";



const transactions = [
  {
    id: "TXN123456",
    FirstName: "Frank",
    LastName: "Junior",
    Email: "frankJ@gmail.com",
    phone: "090 1234 5678",
    amount: "N800.09",
    date: "28 Oct 12:20PM",
    status: "Approved"
  },
  {
    id: "TXN654321",
    FirstName: "Kylian",
    LastName: "Mbappe",
    Email: "kylianm@gmail.com",
    phone: "080 1234 5678",
    amount: "N750.00",
    date: "15 Mar 09:15AM",
    status: " Denied"
  },
  
]

const DashboardTransation= () => {
    const {data = [], isLoading, isError, error} = useLoanDeal(10)
    console.log(data, error)
    
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
                {isLoading && (
                    <div className="flex flex-col justify-center items-center">
                        <LoaderIcon/>
                    </div>
                )}
                {isError && (
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-medium text-muted-foreground pb-4">
                            Error fetching Loan History
                        </p>
                    </div>
                )}
                {!isLoading && !isError && data.length === 0 && (
                    <div className="flex flex-col justify-center items-center py-4">
                        <img src={emptyBox} alt="" />
                        <p className="font-medium text-muted-foreground">
                            No Loan Deal Available yet!
                        </p>
                    </div>
                )}

                {!isLoading && !isError && data.length > 0 && (
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
                                    <TableCell className="">{transaction.FirstName}</TableCell>
                                    <TableCell>{transaction.LastName}</TableCell>
                                    <TableCell>{transaction.Email}</TableCell>
                                    <TableCell>{transaction.phone}</TableCell>
                                    <TableCell className="text-megagreen"> {transaction.amount}</TableCell>
                                    <TableCell> {transaction.date}</TableCell>
                                    <TableCell className={transaction.status === "Approved" ? "text-megagreen" : "text-red-500"}>
                                        {transaction.status}
                                    </TableCell>
                                    <TableCell className=" w-[120px] cursor-pointer">
                                        <span className="border-megagreen border text-megagreen py-1 px-3 rounded-2xl " onClick={()=> {}}>
                                            view
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}


            </div>
        </Card>
        // </section>
    )
}

export default DashboardTransation;