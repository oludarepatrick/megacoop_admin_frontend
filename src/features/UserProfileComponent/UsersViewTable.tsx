import { LoaderIcon } from "@/components/PageLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AllUsers } from "@/types/userView";

export type UsersViewTableProps = {
  users: AllUsers[];
  onClick: (users: AllUsers) => void;
//   onClick: (users: AllUsers) => void;
  isLoading: boolean
  isError: boolean
  onOpenForm?: (users: AllUsers)=> void
};

const UsersViewTable = ({ users, onClick, isLoading, isError }: UsersViewTableProps) => {

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
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-megagreen">Status</TableHead>
                    <TableHead className="">Details</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="">
                {users.map((user) => (
                    <TableRow
                        key={user.uuid}
                        className="hover:bg-transparent [&_td]:text-xs [&_td]:py-4"
                    >
                        <TableCell className="">{user.first_name}</TableCell>
                        <TableCell className="">{user.last_name}</TableCell>
                        <TableCell className="">{user.email}</TableCell>
                        <TableCell className="truncate max-w-40">{user.address}</TableCell>
                        <TableCell className="">{user.phone}</TableCell>
                        {/* <TableCell>₦{parseInt(order.total_amount).toLocaleString()}</TableCell> */}
                        {/* <TableCell>{order.total_amount}</TableCell> */}
                        <TableCell
                            className={
                            user.status === 1
                                ? "text-megagreen"
                                : user.status === 0
                                ? "text-megaorange"
                                : "text-red-600"
                            }
                        >
                            {user.status === 1 ? "Active" : user.status === 0 ? "Inactive": user.status}
                        </TableCell>
                        <TableCell className="cursor-pointer flex items-center gap-2">
                            
                            <span
                                className="text-megagreen"
                                onClick={() => onClick(user)}
                            >
                                View
                            </span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    // </section>
  );
};

export default UsersViewTable;
