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
import type { ListInvestment } from "@/types/investment";
import { Edit } from "lucide-react";

export type InvestListTableProps = {
  investments: ListInvestment[];
  onClick: (investments: ListInvestment) => void;
  isLoading: boolean
  isError: boolean
  onOpenForm: (investments: ListInvestment)=> void
};

const InvestListTable = ({ investments, onClick, isLoading, isError, onOpenForm }: InvestListTableProps) => {

    const formatDate = (isoDate: string) => {
        return new Date(isoDate).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

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
    if (investments.length === 0) {
        return (
        <div className="flex justify-center items-center py-6 text-muted-foreground">
            No investment found for this category.
        </div>
        );
    }

  return (
    <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
        <Table>
            <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                <TableRow className="bg-transparent [&_th]:text-xs ">
                    <TableHead>Company</TableHead>
                    <TableHead>Investment Name</TableHead>
                    <TableHead>Invest Type</TableHead>
                    <TableHead>Amount Needed</TableHead>
                    <TableHead>ROI</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead className="text-megagreen">Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="">
                {investments.map((investment) => (
                    <TableRow
                        key={investment.id}
                        className="hover:bg-transparent [&_td]:text-xs [&_td]:py-4"
                    >
                        <TableCell className="truncate max-w-40">{investment.company_name}</TableCell>
                        <TableCell className="truncate max-w-40">{investment.title}</TableCell>
                        <TableCell>{investment.company_type || "N/A"}</TableCell>
                        <TableCell>₦{parseInt(investment.amount_needed).toLocaleString()}</TableCell>
                        <TableCell className="text-megagreen">{investment.roi}%</TableCell>
                        <TableCell> {formatDate(investment.created_at)}</TableCell>
                        <TableCell
                            className={
                            investment.status === "approved"
                                ? "text-megagreen"
                                : investment.status === "pending" || investment.status === "rejected"
                                ? "text-megaorange"
                                : "text-red-600"
                            }
                        >
                            {investment.status === "approved" ? "Active" : investment.status === "pending" ? "Inactive": investment.status || "inactive"}
                        </TableCell>
                        <TableCell className=" w-[120px] cursor-pointer flex items-center gap-2">
                            <Button className="bg-blue-600 p-1 flex" size="sm" onClick={()=>{onOpenForm(investment)}}>
                                <Edit className="text-white" /> Edit
                            </Button>
                            <span
                                className="text-megagreen"
                                onClick={() => onClick(investment)}
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

export default InvestListTable;
