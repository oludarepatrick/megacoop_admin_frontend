import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useLoanDeal } from "@/hooks/useDashboard";
// import emptyBox from "@/assets/empty-box.svg";

import { Link } from "react-router-dom";
import { useState } from "react";
import InvestmentDetailModal from "./InvestmentDetailModal";
import type { InvestmentApplication } from "@/types/investment";
import { useInvestmentApplication } from "@/hooks/useInvestment";
import { formatDate } from "@/lib/common";
import { LoaderIcon } from "@/components/PageLoader";
// import { LoaderIcon } from "@/components/PageLoader";

const RecentSubscribers = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<InvestmentApplication | null>(null);

  const { data, isLoading, isError } = useInvestmentApplication();
  const applications = data?.data || [];

  return (
    <>
      <Card className="px-4 pb-2 border-0 shadow-none ">
        <CardHeader className="flex justify-between px-2">
          <CardTitle className="text-xl font-semibold">
            Recent Subscribers
          </CardTitle>
          <div className="flex gap-4 items-center">
            <Link
              to="/investment-transactions"
              className="text-megagreen text-sm hover:text-megagreen "
            >
              View All
            </Link>
          </div>
        </CardHeader>
        <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
          {!isLoading && !isError && applications.length === 0 && (
            <div className="flex justify-center items-center py-6 text-muted-foreground">
              No subscribers found for this category.
            </div>
          )}
          {isLoading && (
            <div className="flex flex-col justify-center items-center">
              <LoaderIcon/>
            </div>
          )}
          {isError && (
            <div className="flex flex-col justify-center items-center">
              <p className="font-medium text-muted-foreground">
                Error fetching Investment History
              </p>
            </div>
          )}
          {!isLoading && !isError &&  (
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
                {applications.slice(0, 4).map((application) => (
                  <TableRow
                    key={application.id}
                    className="hover:bg-transparent [&_td]:text-xs [&_td]:py-4"
                  >
                    <TableCell className="">
                      {application.user.first_name}
                    </TableCell>
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
                        onClick={() => setSelectedTransaction(application)}
                      >
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

      {selectedTransaction && (
        <InvestmentDetailModal
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          application={selectedTransaction}
        />
      )}
    </>
  );
};

export default RecentSubscribers;
