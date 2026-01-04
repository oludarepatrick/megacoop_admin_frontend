import { LoaderIcon } from "@/components/PageLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import emptyBox from "@/assets/empty-box.svg"
import type { CreditList } from "@/types/product";
import { formatCurrency } from "@/lib/utils";

export type BuyOnCreditTableProps = {
  products: CreditList[];
  isLoading: boolean
  isError: boolean
};

const BuyOnCreditTable = ({ products, isLoading, isError }: BuyOnCreditTableProps) => {

    const formatDate = (isoDate: string) => {
        return new Date(isoDate).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };
    console.log(products)

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
                    Error fetching Investment List
                </p>
            </div>
        )
    } 
    if (products.length === 0) {
        return (
        <div className="flex flex-col justify-center items-center py-6 text-muted-foreground">
            <img src={emptyBox} alt="" />
            <p>No product found for this category.</p>
        </div>
        );
    }

  return (
    <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
        <Table>
            <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                <TableRow className="bg-transparent [&_th]:text-xs ">
                    <TableHead>Buyer's Name </TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price (₦)</TableHead>
                    <TableHead>Payment Duration</TableHead>
                    <TableHead>Monthly Due</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead className="text-megagreen">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="">
                {products.map((product) => (
                    <TableRow
                        key={product.product_id}
                        className="hover:bg-transparent [&_td]:text-xs [&_td]:py-4"
                    >
                        <TableCell className="truncate max-w-40">{[product.user.first_name, product.user.last_name].join(" ")}</TableCell>
                        <TableCell className="truncate max-w-40">{product.product_name}</TableCell>
                        <TableCell className="truncate max-w-40">{formatCurrency(Number(product.meta.total_payable))}</TableCell>
                        <TableCell>{product.repayment_months}months</TableCell>
                        <TableCell className="truncate max-w-40">{formatCurrency(Number(product.monthly_due))}</TableCell>
                        <TableCell> {formatDate(product.created_at)}</TableCell>
                        <TableCell
                            className={
                            product.status === "completed"
                                ? "text-megagreen"
                                : product.status === "ongoing" || product.status === "inactive"
                                ? "text-megaorange"
                                : "text-red-600"
                            }
                        >
                            {product.status === "completed" ? "Paid" : product.status === "ongoing" ? "Credit": product.status}
                        </TableCell>
                        
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    // </section>
  );
};

export default BuyOnCreditTable;
