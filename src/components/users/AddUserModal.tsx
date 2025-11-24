import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SuccessModal } from "./SuccessModal"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { createUser } from "@/services/UserService"
import { userSchema, type UserFormValues } from "@/types/User"



export function AddUserModal() {
    const [open, setOpen] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const queryClient = useQueryClient()

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<UserFormValues>({
//       resolver: zodResolver(userSchema),
//         defaultValues: {
//           name: "",
//           email: "",
//           phone: "",
//           role: "",
//         },
    //   })
    
    const usersForm = useForm<UserFormValues>({
      resolver: zodResolver(userSchema),
      defaultValues: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "",
      },
    });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
        setOpen(false)
        setOpenSuccessModal(true)
    //   usersForm.reset()
    },
  })

  const onSubmit = (data: UserFormValues) => {
    mutation.mutate(data)
  }

    return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#F4C566] hover:bg-[#e0b455] text-white font-medium px-6 py-2 rounded-md shadow-sm transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add new User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] min-w-[300px] max-h-screen overflow-y-auto ">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>Add New User Form Wizard</DialogTitle>
          <DialogDescription className="text-center text-megagreen w-[200px]">Input the correct user information below</DialogDescription>
        </DialogHeader>
        {/* <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...register("name")} />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="john@example.com" {...register("email")} />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="08012345678" {...register("phone")} />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <select id="role" className="border border-gray-300 rounded-md px-3 py-2" {...register("role")}>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Account Clerk">Account Clerk</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Adding..." : "Save User"}
            </Button>
          </DialogFooter>
        </form> */}
              <Form {...usersForm}>
                  <div className="space-y-7 w-full rounded-lg">
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
                      name="role"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Admin">Admin</SelectItem>
                                  <SelectItem value="Account Clerk">Account Clerk</SelectItem>
                                  <SelectItem value="Manager">Manager</SelectItem>
                                  <SelectItem value="Staff">Staff</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </div>
                  <DialogFooter>
                      <Button
                          type="button"
                          onClick={usersForm.handleSubmit(onSubmit)}
                          disabled={mutation.isPending}
                          className="bg-megagreen"
                      >
                      {mutation.isPending ? "Adding..." : "Save User"}
                    </Button>
                  </DialogFooter>
              </Form>
              
      </DialogContent>
    </Dialog>
    {openSuccessModal && (
        <SuccessModal open={openSuccessModal} onOpenChange={setOpenSuccessModal} values={usersForm.getValues()} reset={usersForm.reset} />
    )}
    </>
  )
}
