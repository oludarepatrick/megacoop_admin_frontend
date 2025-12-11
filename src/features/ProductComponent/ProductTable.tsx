import { LoaderIcon } from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProductList } from "@/types/product";
import { Edit } from "lucide-react";

export type ProductListTableProps = {
  products: ProductList[];
  onClick: (products: ProductList) => void;
  isLoading: boolean
  isError: boolean
  onOpenForm?: (products: ProductList)=> void
};

const ProductListTable = ({ products, onClick, isLoading, isError, onOpenForm }: ProductListTableProps) => {

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
        <div className="flex justify-center items-center py-6 text-muted-foreground">
            No product found for this category.
        </div>
        );
    }

  return (
    <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
        <Table>
            <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                <TableRow className="bg-transparent [&_th]:text-xs ">
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price (₦)</TableHead>
                    <TableHead>Available Stock</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead className="text-megagreen">Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="">
                {products.map((product) => (
                    <TableRow
                        key={product.product_id}
                        className="hover:bg-transparent [&_td]:text-xs [&_td]:py-4"
                    >
                        <TableCell className="truncate max-w-40">{product.product_name}</TableCell>
                        <TableCell className="truncate max-w-40">{product.product_category}</TableCell>
                        <TableCell>₦{parseInt(product.price).toLocaleString()}</TableCell>
                        <TableCell>{product.available_stock}</TableCell>
                        <TableCell> {formatDate(product.created_at)}</TableCell>
                        <TableCell
                            className={
                            product.status === "active"
                                ? "text-megagreen"
                                : product.status === "pending" || product.status === "inactive"
                                ? "text-megaorange"
                                : "text-red-600"
                            }
                        >
                            {product.status === "active" ? "Visible" : product.status === "pending" ? "Not visible": product.status}
                        </TableCell>
                        <TableCell className=" w-[120px] cursor-pointer flex items-center gap-2">
                            <Button className="bg-blue-600 p-1 flex" size="sm" onClick={()=>{onOpenForm?.(product)}}>
                                <Edit className="text-white" /> Edit
                            </Button>
                            <span
                                className="text-megagreen"
                                onClick={() => onClick(product)}
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

export default ProductListTable;
