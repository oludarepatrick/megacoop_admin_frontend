import { LoaderIcon } from "@/components/PageLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { WalletTransaction } from "@/types/userView";

export type UsersViewTableProps = {
  users: WalletTransaction[];
  isLoading: boolean
  isError: boolean
};

const UserTransactionHistory = ({ users, isLoading, isError }: UsersViewTableProps) => {

    // const formatDate = (isoDate: string) => {
    //     return new Date(isoDate).toLocaleDateString("en-GB", {
    //         weekday: "short",
    //         day: "2-digit",
    //         month: "short",
    //         year: "numeric",
    //     });
    // };
    console.log(users)

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
                    Error fetching Users List
                </p>
            </div>
        )
    } 
    if (users.length === 0) {
        return (
        <div className="flex justify-center items-center py-6 text-muted-foreground">
            No user found for this category.
        </div>
        );
    }

  return (
    <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
        <Table>
            <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                <TableRow className="bg-transparent [&_th]:text-xs ">
                    <TableHead>Ref ID</TableHead>
                    <TableHead>Transaction Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-megagreen">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="">
                {users.map((user) => (
                    <TableRow
                        key={user.id}
                        className="hover:bg-transparent [&_td]:text-xs [&_td]:py-4"
                    >
                        <TableCell className="max-w-40 truncate">{user.reference}</TableCell>
                        <TableCell className="">{formatDate(user.created_at)}</TableCell>
                        <TableCell className="max-w-40 truncate">{user.description}</TableCell>
                        <TableCell className="">{user.type}</TableCell>
                        <TableCell className="font-medium text-megagreen">{formatCurrency(Number(user.amount))}</TableCell>
                        {/* <TableCell>₦{parseInt(order.total_amount).toLocaleString()}</TableCell> */}
                        {/* <TableCell>{order.total_amount}</TableCell> */}
                        <TableCell
                            className={
                            user.status === "approved"
                                ? "text-megagreen"
                                : user.status === "pending"
                                ? "text-megaorange"
                                : "text-red-600"
                            }
                        >
                            {user.status === "approved" ? "Completed" : user.status === "pending" ? "Pending": user.status}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    // </section>
  );
};

export default UserTransactionHistory;
