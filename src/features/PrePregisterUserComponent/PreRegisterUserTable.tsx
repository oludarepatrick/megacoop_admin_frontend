import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectAllCheckbox } from "@/components/ui/select-all-checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTableSelection } from "@/hooks/useTableSelection";
import type { NewUserList, Status } from "@/types/preRegisterUser";

type PreRegisterUserTableProps = {
    users: NewUserList[];
    onClick: (user: NewUserList) => void
    onSend: (ids: number[]) => void
    onComplete: (ids: number[], status: Status) => void
    isComplete: boolean
    isLoading: boolean
    isError: boolean
    isPending: boolean
}

const PreRegisterUserTable = ({users, onClick, isLoading, isError, isPending, onSend, onComplete, isComplete}: PreRegisterUserTableProps) => {
    const {
        selectedIds,
        isAllSelected,
        isIndeterminate,
        handleToggleOne,
        handleToggleAll,
        clearSelection,        
    } = useTableSelection(users, (user) => user.id)


    if (isLoading) {
        return (
            <Card className="p-0 px-4 pb-2 border-0 shadow-none">
                <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
                    <Table>
                        <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
                            <TableRow className="bg-transparent [&_th]:text-xs ">
                                <TableHead>Full Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead className="text-megagreen">Status</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                    <TableCell><Skeleton className="h-8 w-16" /></TableCell>
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
                        Error fetching users History
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Please try again later
                    </p>
                </div>
            </Card>
        );
    }

    // Show empty state
    if(users.length === 0) {
        return (
            <Card className="p-0 px-4 pb-2 border-0 shadow-none">
                <div className="flex justify-center items-center py-12 text-muted-foreground">
                    <div className="text-center">
                        <p className="font-medium mb-1">No users found</p>
                        <p className="text-sm">There are no users in this category yet.</p>
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
                        <TableRow className="bg-transparent [&_th]:text-xs ">
                            <TableHead>
                                <SelectAllCheckbox
                                    isAllSelected={isAllSelected}
                                    isIndeterminate={isIndeterminate}
                                    onToggle={handleToggleAll}
                                />
                                </TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead className="text-megagreen">Status</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} className="hover:bg-muted/50 [&_td]:text-xs [&_td]:py-4 transition-colors">
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                        checked={selectedIds.includes(user.id)}
                                        onCheckedChange={() => handleToggleOne(user.id)}
                                    />
                                </TableCell>
                                <TableCell>{user.fullname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        user.status === "completed" 
                                            ? "bg-green-100 text-green-700" 
                                            : user.status === "pending" 
                                            ? "bg-orange-100 text-megaorange" 
                                            : "bg-red-100 text-red-700"
                                    }`}>
                                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => onClick(user)}
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

            <div className="flex items-center justify-between mt-3 px-1">
                {selectedIds.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                        {selectedIds.length} user{selectedIds.length > 1 ? "s" : ""} selected
                    </p>
                )}
                <div className=" ml-auto flex gap-4">
                    <Button
                        onClick={() => { 
                            onSend(selectedIds); 
                            clearSelection() 
                        }}
                        disabled={selectedIds.length === 0 || isPending}
                        className=" bg-megagreen hover:bg-emerald-800/90 disabled:bg-megagreen"
                    >
                        {isPending ? "Sending..." : `Send Email ${selectedIds.length > 0 ? `(${selectedIds.length})` : ""}`}
                    </Button>

                    <Button
                        onClick={() => { 
                            onComplete(selectedIds, "completed"); 
                            clearSelection() 
                        }}
                        disabled={selectedIds.length === 0 || isComplete}
                        className=" bg-megagreen hover:bg-emerald-800/90 disabled:bg-megagreen"
                    >
                        {isComplete ? "Updating..." : `Completed ${selectedIds.length > 0 ? `(${selectedIds.length})` : ""}`}
                    </Button>

                </div>
                
            </div>
            
        </Card>
    )
}

export default PreRegisterUserTable;