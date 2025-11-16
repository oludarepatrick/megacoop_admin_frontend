import { LoaderIcon } from "@/components/PageLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/common";
import type { InvestmentApplication } from "@/types/investment";

export type InvestmentTableProps = {
  applications: InvestmentApplication[];
  onClick: (application: InvestmentApplication) => void;
  isLoading: boolean
  isError: boolean
};

const InvestmentTable = ({ applications, onClick, isLoading, isError }: InvestmentTableProps) => {
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
    
    if (applications.length === 0) {
        return (
            <div className="flex justify-center items-center py-6 text-muted-foreground">
                No subscribers found for this category.
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
            <TableHead>Investment</TableHead>
            <TableHead>Minimum</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-megagreen">Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {applications.map((application) => (
            <TableRow
              key={application.id}
              className="hover:bg-transparent [&_td]:text-xs [&_td]:py-4"
            >
              <TableCell className="">{application.user.first_name}</TableCell>
              <TableCell>{application.user.last_name}</TableCell>
              <TableCell>{application.inv_name}</TableCell>
              <TableCell>{application.investment.minimum_amount}</TableCell>
              <TableCell className="text-megagreen">
                {application.amount}
              </TableCell>
              <TableCell> {formatDate(application.created_at)}</TableCell>
              <TableCell
                className={
                  application.status === "approved"
                    ? "text-megagreen"
                    : application.status === "pending"
                    ? "text-megaorange"
                    : "text-red-600"
                }
              >
                {application.status}
              </TableCell>
              <TableCell className=" w-[120px] cursor-pointer">
                <span
                  className="border-megagreen border text-megagreen py-1 px-3 rounded-2xl "
                  onClick={() => onClick(application)}
                >
                  view
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvestmentTable;
