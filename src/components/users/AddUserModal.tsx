// import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { Plus } from "lucide-react"
import bcgImg from "@/assets/user-add-icon.png"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { SuccessModal } from "./SuccessModal"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { createUser } from "@/services/UserService"
import { userSchema, type UserFormValues } from "@/types/User"
import { useCreateUserAdmin } from "@/hooks/useUser";
// import { PlusCircle } from "lucide-react";


type AddUserModalProps ={
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: UserFormValues) => void;

}

export function AddUserModal({isOpen, onClose, onSuccess}: AddUserModalProps) {

    const usersForm = useForm<UserFormValues>({
      resolver: zodResolver(userSchema),
      defaultValues: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone: "",
        role_id: 0,
      },
    });

  const {mutate, isPending} = useCreateUserAdmin();

  const onSubmit = (data: UserFormValues) => {
    mutate(data, {
      onSuccess: () => {
        onSuccess(data);
        usersForm.reset();
      }
    })
  };

  const handleClose = () => {
    usersForm.reset();
    onClose();
  }

    return (
    <>
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="font-jakarta pt-4 pb-18 px-16 max-h-[90vh] overflow-y-auto scrollbar-hide"
        aria-describedby={undefined}
        style={{
        backgroundImage: `url(${bcgImg})`,
        backgroundPosition: "bottom right",
        backgroundRepeat: "no-repeat",
        backgroundSize: "70px",
        }}
      >
        <DialogHeader className="flex flex-col items-center pt-6">
          <DialogTitle>Add New User Form Wizard</DialogTitle>
          <DialogDescription className="text-center font-semibold text-megagreen w-[200px]">Input the correct user information below</DialogDescription>
        </DialogHeader>
              <Form {...usersForm}>
                  <form onSubmit={usersForm.handleSubmit(onSubmit)} className="space-y-7 w-full rounded-lg">
                    <FormField
                      control={usersForm.control}
                      name="first_name"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                      />

                      <FormField
                      control={usersForm.control}
                      name="middle_name"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Middle Name</FormLabel>
                            <FormControl>
                                  <Input placeholder="Michael" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    <FormField
                      control={usersForm.control}
                      name="last_name"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                  <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    <FormField
                      control={usersForm.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                  <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    <FormField
                      control={usersForm.control}
                      name="phone"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                  <Input placeholder="08012345678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                    <FormField
                      control={usersForm.control}
                      name="role_id"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <Select  
                                defaultValue={String(field.value)}
                                onValueChange={(value) => field.onChange(Number(value))}
                                value={String(field.value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">Super Admin</SelectItem>
                                  <SelectItem value="2">Support Admin</SelectItem>
                                  
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                          type="submit"
                          // onClick={usersForm.handleSubmit(onSubmit)}
                          disabled={isPending}
                          className="bg-megagreen w-full"
                      >
                      {isPending ? "Adding..." : "Save User"}
                    </Button>
                  </form>
                  <DialogFooter>
                    hhhh
                  </DialogFooter>
              </Form>
              
      </DialogContent>
    </Dialog>
    
    </>
  )
}
