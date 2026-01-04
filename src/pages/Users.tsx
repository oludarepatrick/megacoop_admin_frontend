import { Button } from "@/components/ui/button";
import { AddUserModal } from "@/components/users/AddUserModal";
import { SuccessModal } from "@/components/users/SuccessModal";
import UserPermissionModal from "@/components/users/UserPermissionModal";
import { UsersStatsBanner } from "@/components/users/UsersStatsBanner";
import { UsersTable } from "@/components/users/UsersTable";
import { useUserAdminList } from "@/hooks/useUser";
import type { User, UserFormValues } from "@/types/User";

import { Plus } from "lucide-react";
import { useState } from "react";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "Active" | "Inactive">("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [createdUser, setCreatedUser] = useState<UserFormValues | null>(null);


  const {data: userAdminList, isLoading: userListLoading, isError, error} = useUserAdminList();

  const handleSuccess = (data: UserFormValues) => {
    setCreatedUser(data);
    setOpenModal(false);
    setOpenSuccessModal(true);
  }

  return (
    <div className="font-jakarta space-y-6">
      <div className="flex gap-6 items-center">
        <h2 className="font-semibold text-[20px]">Users</h2>
        <Button
          className="bg-megaorange/80 text-white hover:bg-megaorange/70"
          onClick={() => setOpenModal(true)}
        >
          <Plus /> Add new user
        </Button>
      </div>
      <UsersStatsBanner
        data={userAdminList}
      />
      
      <UsersTable
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={userAdminList}
        userList={userAdminList?.data || []}
        isLoading={userListLoading}
        isError={isError}
        error={error?.message}
        onClick={(user) => setSelectedUser(user)}
      />

      <AddUserModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleSuccess}  
      />

      { selectedUser && (
                <UserPermissionModal
                    isOpen={!!selectedUser}
                    onClose={() => setSelectedUser(null)}
                    user={selectedUser}
                    // onSuccess={handleClose}
                    // loan={selectedLoan}

            />)}

      {openSuccessModal && createdUser && (
        <SuccessModal 
          open={openSuccessModal} 
          onOpenChange={setOpenSuccessModal} 
          values={createdUser}
          onClose={() => {
            setOpenSuccessModal(false)
            setCreatedUser(null)
          }}
        />
      )}




    </div>

    
  );
}
