import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { User } from "@/types/User";
import { StatusSwitch } from "./UserStatusSwitch";

type UserAdminTableProps = {
    userList: User[];
    onClick?: (user: User) => void
    isLoading: boolean
    isError: boolean
}

const UserAdminTable = ({userList, onClick, isLoading, isError}: UserAdminTableProps) => {

   if (isLoading) {
        return (
            <Card className="p-0 px-4 pb-2 border-0 shadow-none">
                <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
                    <Table>
                        <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                            <TableRow className="bg-transparent [&_th]:text-xs [&_th]:uppercase ">
                                <TableHead className="text-gray-900">ID</TableHead>
                                <TableHead className="text-gray-900">Name</TableHead>
                                <TableHead className="text-gray-900">Email</TableHead>
                                <TableHead className="text-gray-900">Phone</TableHead>
                                <TableHead className="text-gray-900">Role</TableHead>
                                <TableHead className="text-center text-[#F4C566]">STATUS</TableHead>
                                <TableHead className="text-gray-900">ACTIONS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        );
    }

    // Show error state
    if (isError) {
        return (
            <Card className="p-0 px-4 pb-2 border-0 shadow-none">
                <div className="flex flex-col justify-center items-center py-12">
                    <p className="font-medium text-red-500 mb-2">
                        Error fetching Withdrawal History
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Please try again later
                    </p>
                </div>
            </Card>
        );
    }

    // Show empty state
    if(userList.length === 0) {
        return (
            <Card className="p-0 px-4 pb-2 border-0 shadow-none">
                <div className="flex justify-center items-center py-12 text-muted-foreground">
                    <div className="text-center">
                        <p className="font-medium mb-1">No withdrawals found</p>
                        <p className="text-sm">There are no transactions in this category yet.</p>
                    </div>
                </div>
            </Card>
        );
    }
    
    return (
        <Card className="p-0 pb-2 border-0 shadow-none ">
            <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
                <Table>
                    <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                        <TableRow className="bg-gray-50 [&_th]:text-xs [&_th]:uppercase [&_th]:font-semibold ">
                            <TableHead className="text-gray-900">ID</TableHead>
                            <TableHead className="text-gray-900">Name</TableHead>
                            <TableHead className="text-gray-900">Email</TableHead>
                            <TableHead className="text-gray-900">Phone</TableHead>
                            <TableHead className="text-gray-900">Role</TableHead>
                            <TableHead className="text-center text-megaorange">STATUS</TableHead>
                            <TableHead className="text-gray-900">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userList.map((user) => (
                            <TableRow key={user.id} className="hover:bg-muted/50 [&_td]:text-xs [&_td]:py-4 transition-colors">
                                <TableCell>{[user.first_name, user.middle_name, user.last_name].filter(Boolean).join(" ")}</TableCell>
                                <TableCell>{[user.first_name, user.middle_name, user.last_name].filter(Boolean).join(" ")}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.role.name}</TableCell>
                                <TableCell className="font-medium text-megagreen">
                                    <StatusSwitch status={user.status_text} />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => onClick?.(user)}
                                        variant="outline"
                                        className="border border-megagreen text-megagreen py-[6px] px-4 h-auto rounded-full text-xs font-medium hover:bg-megagreen hover:text-white transition-all"
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}

export default UserAdminTable;