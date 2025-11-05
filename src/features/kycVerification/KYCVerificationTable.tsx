import { LoaderIcon } from "@/components/PageLoader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AppError } from "@/types";
import type { KYCList, KYCStatus } from "@/types/kycList";
import { getErrorMessage } from "@/utils/errorUtils";

type KYCTableProps={
    kycList: KYCList[]
    status: KYCStatus
    isLoading: boolean
    isError: boolean
    error?: unknown
    onviewDetails?: (list: KYCList) => void
}

const KYCVerificationTable = ({status, kycList, isLoading, isError, error, onviewDetails}: KYCTableProps) => {
    if(isLoading) return <LoaderIcon/>

    if (isError) {
        const message = getErrorMessage(error as AppError, "Failed to load KYC data");
        return <p className="p-4 text-center text-red-500">{message}</p>;
    }

    return (
        <div>
            <div className="mb-4">
                <h2 className="font-semibold">
                    {status === "pending" ? `Request (${kycList.length})` : `Approved KYC (${kycList.length})`}
                </h2>
            </div>
            <Table className="border">
                <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20 ">
                    <TableRow className="[&_th]:text-xs [&_th]:font-medium ">
                        <TableHead className="rounded-tl-lg"></TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className="text-megaorange">Status</TableHead>
                        <TableHead className="rounded-tr-lg">Details</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {kycList.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="p-0 border-0">
                                No kyc list found
                            </TableCell>
                        </TableRow>
                    ) : (
                        kycList.map((list, index) => (
                            <TableRow key={index} className="hover:bg-transparent [&_td]:text-xs">
                                <TableCell className="pr-0 ">
                                    <input type="checkbox" className="w-4 h-4 accent-megagreen"/>
                                </TableCell>
                                <TableCell className="flex items-center gap-3">
                                    {list.first_name}
                                </TableCell>
                                <TableCell>{list.last_name}</TableCell>
                                <TableCell>{list.email}</TableCell>
                                <TableCell>{list.phone}</TableCell>
                                <TableCell className="text-megagreen" >
                                    {list.admin_approval_status === 'approved' ? 
                                        <span className="bg-megagreen/30 p-1 px-2 rounded-md text-megagreen">Approved</span> : 
                                        "Request"
                                    }
                                </TableCell>
                                <TableCell className=" w-[120px] cursor-pointer">
                                    <span className="text-megagreen rounded-2xl underline underline-offset-3 " onClick={()=> onviewDetails?.(list)}>
                                        View Details
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
export default KYCVerificationTable;