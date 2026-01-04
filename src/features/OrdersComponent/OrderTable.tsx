import { LoaderIcon } from "@/components/PageLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OrderList } from "@/types/order";

export type OrderTableProps = {
  orders: OrderList[];
  onClick: (orders: OrderList) => void;
  isLoading: boolean
  isError: boolean
  onOpenForm?: (orders: OrderList)=> void
};

const OrderTable = ({ orders, onClick, isLoading, isError }: OrderTableProps) => {

    const formatDate = (isoDate: string) => {
        return new Date(isoDate).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };
    console.log(orders)

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
                    Error fetching Order List
                </p>
            </div>
        )
    } 
    if (orders.length === 0) {
        return (
        <div className="flex justify-center items-center py-6 text-muted-foreground">
            No order found for this category.
        </div>
        );
    }

  return (
    <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
        <Table>
            <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                <TableRow className="bg-transparent [&_th]:text-xs ">
                    <TableHead>Order ID</TableHead>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Amount (₦)</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead className="text-megagreen">Status</TableHead>
                    <TableHead className="">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="">
                {orders.map((order) => (
                    <TableRow
                        key={order.id}
                        className="hover:bg-transparent [&_td]:text-xs [&_td]:py-4"
                    >
                        <TableCell className="">{order.order_id}</TableCell>
                        <TableCell className="">{order.buyer.firstname}</TableCell>
                        <TableCell className="">{order.buyer.lastname}</TableCell>
                        <TableCell>₦{parseInt(order.total_amount).toLocaleString()}</TableCell>
                        {/* <TableCell>{order.total_amount}</TableCell> */}
                        <TableCell> {formatDate(order.created_at)}</TableCell>
                        <TableCell
                            className={
                            order.status === "completed"
                                ? "text-megagreen"
                                : order.status === "pending"
                                ? "text-megaorange"
                                : "text-red-600"
                            }
                        >
                            {order.status }
                        </TableCell>
                        <TableCell className="cursor-pointer flex items-center gap-2">
                            
                            <span
                                className="text-megagreen"
                                onClick={() => onClick(order)}
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

export default OrderTable;
