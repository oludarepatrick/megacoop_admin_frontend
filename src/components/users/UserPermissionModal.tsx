import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { useAssignPermission, useSystemPermissions } from "@/hooks/useUser";
import type { User } from "@/types/User";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

type UserPermissionModalProps = {
    isOpen: boolean
    onClose: () => void
    user: User
}

const UserPermissionModal = ({isOpen, onClose, user}: UserPermissionModalProps) => {
    const [selectedPermission, setSelectedPermission] = useState<number[]>([])
    const [removedPermissions, setRemovedPermissions] = useState<number[]>([]) // Track removed

    const {data: systemPermissions, isLoading} = useSystemPermissions()
    const {mutate: assignPermissions, isPending} = useAssignPermission()

    // Handle system permissions toggle (new assignments)
    const handleToggleSystemPermission = (permissionId: number, checked: boolean) => {
        if(checked) {
            setSelectedPermission(prev => [...prev, permissionId])
        } else { 
            setSelectedPermission(prev => prev.filter(id => id !== permissionId))
        };
    }

    // Handle user permissions toggle (existing - for removal)
    const handleToggleUserPermission = (permissionId: number, checked: boolean) => {
        if(!checked) {
            // User unchecked an existing permission - mark for removal
            setRemovedPermissions(prev => [...prev, permissionId])
        } else {
            // User re-checked it - remove from removal list
            setRemovedPermissions(prev => prev.filter(id => id !== permissionId))
        }
    }

    const handleAssignPermission = () => {
        // Get existing user permission IDs
        const userPermissionIds = user.permissions.map(i => i.id)

        // Remove permissions marked for removal
        const remainingPermissions = userPermissionIds.filter(id => !removedPermissions.includes(id))

        // Add newly selected permissions
        const finalPermissionIds = [...new Set([...remainingPermissions, ...selectedPermission])]

        assignPermissions({
            id: user.id,
            data: { permission_ids: finalPermissionIds }
        }, {
            onSuccess: () => {
                const addedCount = selectedPermission.length
                const removedCount = removedPermissions.length
                
                if(addedCount > 0 && removedCount > 0) {
                    toast.success(`Added ${addedCount} and removed ${removedCount} permission(s)`)
                } else if(addedCount > 0) {
                    toast.success(`Added ${addedCount} permission(s)`)
                } else if(removedCount > 0) {
                    toast.success(`Removed ${removedCount} permission(s)`)
                } else {
                    toast.success("Permissions updated successfully")
                }
                
                setSelectedPermission([]);
                setRemovedPermissions([]);
                onClose()
            }
        })
    }
   
   
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-xl p-0 pb-8 max-h-[90vh] overflow-y-auto scrollbar-hide" aria-describedby={undefined}>
                <DialogHeader className="py-6 border-b border-b-megagreen/35 ">
                    <DialogTitle className="font-semibold text-center">Manage User Permissions</DialogTitle>
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
                            <p className="text-sm text-muted-foreground col-span-2 text-center px-8">
                                No permissions assigned to user yet. Check the permissions list to be added below
                            </p>
                            ) : (
                            user.permissions?.map((list) => {
                                const id = `user-permission-${list.id}`
                                const isMarkedForRemoval = removedPermissions.includes(list.id)
                                
                                return (
                                <div key={list.id} className="flex items-center gap-2">
                                    <Checkbox 
                                        id={id} 
                                        checked={!isMarkedForRemoval}
                                        onCheckedChange={(checked) => handleToggleUserPermission(list.id, checked as boolean)}
                                        className="data-[state=checked]:border-megagreen"
                                    />
                                    <Label htmlFor={id} className="text-sm cursor-pointer">
                                        {list.name}
                                        {/* {isMarkedForRemoval && (
                                            <span className="text-xs text-red-500 ml-2">(Will be removed)</span>
                                        )} */}
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
                            <p className="text-sm text-muted-foreground col-span-2">
                                Loading system permissions…
                            </p>
                            ) : (
                            systemPermissions?.map((list) => {
                                const id = `system-permission-${list.id}`

                                // Check if user already has this permission
                                const alreadyHasPermission = user.permissions.some(p => p.id === list.id)
                                const isSelected = selectedPermission.includes(list.id)

                                return (
                                <div key={list.id} className="flex items-center gap-2">
                                    <Checkbox 
                                        id={id}
                                        checked={isSelected || alreadyHasPermission}
                                        disabled={alreadyHasPermission} // Disable if user already has it
                                        onCheckedChange={(checked) => handleToggleSystemPermission(list.id, checked as boolean)}
                                        className="data-[state=checked]:border-megagreen"
                                    />
                                    <Label htmlFor={id} className="text-sm cursor-pointer">
                                        {list.name}
                                        {/* {alreadyHasPermission && (
                                            <span className="text-xs text-muted-foreground ml-2">(Already assigned)</span>
                                        )} */}
                                    </Label>
                                </div>
                                )
                            })
                            )}
                        </div>
                        
                        <Button 
                            className="bg-megagreen hover:bg-megagreen/90 " 
                            onClick={handleAssignPermission}
                            disabled={isPending || (selectedPermission.length === 0 && removedPermissions.length === 0)}
                        >
                            {isPending ? "Updating..." : (() => {
                                const addedCount = selectedPermission.length
                                const removedCount = removedPermissions.length
                                
                                if(addedCount > 0 && removedCount > 0) {
                                    return `Add ${addedCount} & Remove ${removedCount}`
                                } else if(addedCount > 0) {
                                    return `Assign ${addedCount} Permission(s)`
                                } else if(removedCount > 0) {
                                    return `Remove ${removedCount} Permission(s)`
                                }
                                return "Update Permissions"
                            })()}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserPermissionModal;


// // import { Button } from "@/components/ui/button";
// import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
// import { useAssignPermission, useSystemPermissions } from "@/hooks/useUser";
// import type { User } from "@/types/User";
// import { Label } from "../ui/label";
// import { Checkbox } from "../ui/checkbox";
// import { Button } from "../ui/button";
// import { useState } from "react";
// import { toast } from "sonner";
// // import { useState } from "react";
// // import { Bell } from "lucide-react";


// type UserPermissionModalProps = {
//     isOpen: boolean
//     onClose: () => void
//     user: User
// }

// const UserPermissionModal = ({isOpen, onClose, user}: UserPermissionModalProps) => {
//     const [selectedPermission, setSelectedPermission] = useState<number[]>([])

//     const {data: systemPermissions, isLoading} = useSystemPermissions()
//     const {mutate: assignPermissions, isPending} = useAssignPermission()

//     const handleTogglePermission = (permissionId: number, checked: boolean) => {
//         if(checked) {
//             setSelectedPermission(prev => [...prev, permissionId])
//         } else { 
//             setSelectedPermission(prev => prev.filter(id => id !== permissionId))
//         };
//     }

//     const handleAssignPermission = () => {
//         // get existing user permission ID
//         const userPermissionIds = user.permissions.map(i => i.id)

//         // merge existing user permission + newly selected permission (remove duplicates)
//         const mergePermissionIds = [...new Set([...userPermissionIds, ...selectedPermission])]

//         assignPermissions({
//             id: user.id,
//             data: { permission_ids: mergePermissionIds }
//         }, {
//             onSuccess: () => {
//                 toast.success("user permissions added successfully")
//                 setSelectedPermission([]);
//                 onClose()
//             }
//         })
//     }
   
   
//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="font-jakarta sm:max-w-xl p-0 pb-8 max-h-[90vh] overflow-y-auto scrollbar-hide" aria-describedby={undefined}>
//                 <DialogHeader className="py-6 border-b border-b-megagreen/35 ">
//                     <DialogTitle className="font-semibold text-center">Assign Permission to user</DialogTitle>
//                 </DialogHeader>

//                 <div className="flex flex-col gap-4 pb-4 px-6 shadow-md border-b-2 border-b-megagreen/60">
//                    <div className="flex gap-8 [&_div]:flex [&_div]:gap-2">
//                         <div>
//                             <h4>User:</h4>
//                             <span className="font-medium text-megagreen">{user.first_name}</span>
//                         </div>
//                         <div>
//                             <h4>Role:</h4>
//                             <span className="font-medium text-megagreen">{user.role.name}</span>
//                         </div>
//                     </div>

//                     <div className="sm:w-[90%] w-full mx-auto space-y-4">
//                         <h4 className="bg-megagreen/25 py-4 text-center text-green-900 dark:text-white rounded-sm font-semibold">
//                             User Permissions
//                         </h4>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//                             {user.permissions.length === 0 ? (
//                             <p className="text-sm text-muted-foreground col-span-12 text-center px-8">
//                                 No persmissions assigned to user yet. Check the permisssions list to be added below
//                             </p>
//                             ) : (
//                             user.permissions?.map((list) => {
//                                 const id = `permission-${list.id}`
//                                 return (
//                                 <div key={list.id} className="flex items-center gap-2">
//                                     <Checkbox id={id} checked className="data-[state=checked]:border-megagreen"/>
//                                     <Label htmlFor={id} className="text-sm cursor-pointer">
//                                     {list.name}
//                                     </Label>
//                                 </div>
//                                 )
//                             })
//                             )}
//                         </div>
//                     </div>

//                     <div className="sm:w-[90%] w-full mx-auto space-y-4">
//                         <h4 className="bg-megagreen/25 py-4 text-center text-green-900 dark:text-white rounded-sm font-semibold">
//                             System Permissions
//                         </h4>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//                             {isLoading ? (
//                             <p className="text-sm text-muted-foreground">
//                                 Loading system permissions…
//                             </p>
//                             ) : (
//                             systemPermissions?.map((list) => {
//                                 const id = `permission-${list.id}`

//                                 // check if user already has this permission
//                                 const alreadyHasPermission = user.permissions.some(p => p.id === list.id)
//                                 const isSelected = selectedPermission.includes(list.id)

//                                 return (
//                                 <div key={list.id} className="flex items-center gap-2">
//                                     <Checkbox id={id}
//                                         checked={isSelected || alreadyHasPermission}
//                                         onCheckedChange={(checked) => handleTogglePermission(list.id, checked as boolean)}
//                                         className="data-[state=checked]:border-megagreen"

//                                     />
//                                     <Label htmlFor={id} className="text-sm cursor-pointer">
//                                     {list.name}
//                                     </Label>
//                                 </div>
//                                 )
//                             })
//                             )}
//                         </div>
                        
//                         <Button 
//                             className="bg-megagreen hover:bg-megagreen/90" 
//                             onClick={handleAssignPermission}
//                             disabled={isPending || selectedPermission.length === 0}
//                         >
//                             {user.permissions.length === 0 ? (
//                                 <>{isPending? "Assigning..." : `Assign ${selectedPermission.length} Permission(s)`}</>
                                
//                             ): (
//                                 <>{isPending? "Updating..." : "Update"}</>
//                             )}
//                         </Button>
//                     </div>


//                 </div>
//             </DialogContent>

           
//         </Dialog>
//     )
// }

// export default UserPermissionModal;