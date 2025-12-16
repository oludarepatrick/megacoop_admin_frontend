// import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { useAssignPermission, useSystemPermissions } from "@/hooks/useUser";
import type { User } from "@/types/User";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
// import { useState } from "react";
// import { Bell } from "lucide-react";


type UserPermissionModalProps = {
    isOpen: boolean
    onClose: () => void
    user: User
}

const UserPermissionModal = ({isOpen, onClose, user}: UserPermissionModalProps) => {
    const [selectedPermission, setSelectedPermission] = useState<number[]>([])

    const {data: systemPermissions, isLoading} = useSystemPermissions()
    const {mutate: assignPermissions, isPending} = useAssignPermission()

    const handleTogglePermission = (permissionId: number, checked: boolean) => {
        if(checked) {
            setSelectedPermission(prev => [...prev, permissionId])
        } else { 
            setSelectedPermission(prev => prev.filter(id => id !== permissionId))
        };
    }

    const handleAssignPermission = () => {
        // get existing user permission ID
        const userPermissionIds = user.permissions.map(i => i.id)

        // merge existing user permission + newly selected permission (remove duplicates)
        const mergePermissionIds = [...new Set([...userPermissionIds, ...selectedPermission])]

        assignPermissions({
            id: user.id,
            data: { permission_ids: mergePermissionIds }
        }, {
            onSuccess: () => {
                toast.success("user permissions added successfully")
                setSelectedPermission([]);
                onClose()
            }
        })
    }
   
   
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-xl p-0 pb-8 max-h-[90vh] overflow-y-auto scrollbar-hide" aria-describedby={undefined}>
                <DialogHeader className="py-6 border-b border-b-megagreen/35 ">
                    <DialogTitle className="font-semibold text-center">Assign Permission to user</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 pb-4 px-6 shadow-md border-b-2 border-b-megagreen/60">
                   <div className="flex gap-8 [&_div]:flex [&_div]:gap-2">
                        <div>
                            <h4>User:</h4>
                            <span className="font-medium text-megagreen">{user.first_name}</span>
                        </div>
                        <div>
                            <h4>Role:</h4>
                            <span className="font-medium text-megagreen">{user.role.name}</span>
                        </div>
                    </div>

                    <div className="sm:w-[90%] w-full mx-auto space-y-4">
                        <h4 className="bg-megagreen/25 py-4 text-center text-green-900 dark:text-white rounded-sm font-semibold">
                            User Permissions
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {user.permissions.length === 0 ? (
                            <p className="text-sm text-muted-foreground col-span-12 text-center px-8">
                                No persmissions assigned to user yet. Check the permisssions list to be added below
                            </p>
                            ) : (
                            user.permissions?.map((list) => {
                                const id = `permission-${list.id}`
                                return (
                                <div key={list.id} className="flex items-center gap-2">
                                    <Checkbox id={id} checked className="data-[state=checked]:border-megagreen"/>
                                    <Label htmlFor={id} className="text-sm cursor-pointer">
                                    {list.name}
                                    </Label>
                                </div>
                                )
                            })
                            )}
                        </div>
                    </div>

                    <div className="sm:w-[90%] w-full mx-auto space-y-4">
                        <h4 className="bg-megagreen/25 py-4 text-center text-green-900 dark:text-white rounded-sm font-semibold">
                            System Permissions
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {isLoading ? (
                            <p className="text-sm text-muted-foreground">
                                Loading system permissions…
                            </p>
                            ) : (
                            systemPermissions?.map((list) => {
                                const id = `permission-${list.id}`

                                // check if user already has this permission
                                const alreadyHasPermission = user.permissions.some(p => p.id === list.id)
                                const isSelected = selectedPermission.includes(list.id)

                                return (
                                <div key={list.id} className="flex items-center gap-2">
                                    <Checkbox id={id}
                                        checked={isSelected || alreadyHasPermission}
                                        onCheckedChange={(checked) => handleTogglePermission(list.id, checked as boolean)}
                                        className="data-[state=checked]:border-megagreen"

                                    />
                                    <Label htmlFor={id} className="text-sm cursor-pointer">
                                    {list.name}
                                    </Label>
                                </div>
                                )
                            })
                            )}
                        </div>
                        
                        <Button 
                            className="bg-megagreen hover:bg-megagreen/90" 
                            onClick={handleAssignPermission}
                            disabled={isPending || selectedPermission.length === 0}
                        >
                            {user.permissions.length === 0 ? (
                                <>{isPending? "Assigning..." : `Assign ${selectedPermission.length} Permission(s)`}</>
                                
                            ): (
                                <>{isPending? "Updating..." : "Update"}</>
                            )}
                        </Button>
                    </div>


                </div>
            </DialogContent>

           
        </Dialog>
    )
}

export default UserPermissionModal;