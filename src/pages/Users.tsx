import { Button } from "@/components/ui/button";
import { AddUserModal } from "@/components/users/AddUserModal";
import { SuccessModal } from "@/components/users/SuccessModal";
import { UsersStatsBanner } from "@/components/users/UsersStatsBanner";
import { UsersTable } from "@/components/users/UsersTable";
import { useUserAdminList } from "@/hooks/useUser";
import type { UserFormValues } from "@/types/User";

import { Plus } from "lucide-react";
import { useState } from "react";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "Active" | "Inactive">("all");
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [createdUser, setCreatedUser] = useState<UserFormValues | null>(null);


  const {data: userAdminList, isLoading: userListLoading, isError} = useUserAdminList();

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
      {/* Main Content */}
      {/* <UserAdminTable
        userList = {userAdminList?.data || []}
        isLoading={userListLoading}
        isError={isError}
        // onClick={}

      /> */}
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
      />

      <AddUserModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleSuccess}  
      />

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




// import { Button } from "@/components/ui/button";
// // import { AddUserModal } from "@/components/users/AddUserModal";
// import { UsersStatsBanner } from "@/components/users/UsersStatsBanner";
// import { UsersTable } from "@/components/users/UsersTable";
// import UserAdminTable from "@/components/users/UserTable";
// import { useUserAdminList } from "@/hooks/useUser";
// // import UserAdminTable from "@/components/users/UserTable";
// import { fetchUsers } from "@/services/UserService";
// import { useQuery } from "@tanstack/react-query";
// import { Plus } from "lucide-react";
// import { useState } from "react";

// export default function UsersPage() {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [activeTab, setActiveTab] = useState<"all" | "Active" | "Inactive">(
//     "all"
//   );

//   const {data: userAdminList, isLoading: userListLoading, isError} = useUserAdminList();
//   console.log("From endpoint", userAdminList, userAdminList?.data)

//   const { data, isLoading } = useQuery({
//     queryKey: ["users", page, search, activeTab],
//     queryFn: () => fetchUsers(page, search, activeTab),
//   });
//   return (
//     <div className="font-jakarta space-y-6">
//       <div className="flex gap-6 items-center">
//         <h2 className="font-semibold text-[20px]">Users</h2>
//         <Button
//           className="bg-megaorange/80 text-white hover:bg-megaorange/70"
//           // onClick={() => setInvestmentWizardOpen(true)}
//         >
//           <Plus /> Add new user
//         </Button>
//       </div>
//       <UsersStatsBanner
//         data={data} 
//       />
//       {/* Main Content */}
//       <UserAdminTable
//         userList = {userAdminList?.data || []}
//         isLoading={userListLoading}
//         isError={isError}
//         // onClick={}

//       />
//       <UsersTable
//         page={page}
//         setPage={setPage}
//         search={search}
//         setSearch={setSearch}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         data={userAdminList}
//         userList={userAdminList?.data || []}
//         isLoading={isLoading}
//       />
//     </div>

    // <div className="min-h-screen p-8 font-sans">
    //   <div className="max-w-7xl mx-auto space-y-6">
    //     {/* Header Section */}
    //     <div className="flex flex-col gap-6">
    //       <div>
    //         <AddUserModal />
    //       </div>

    //     <UsersStatsBanner
    //       data={data}

    //     />
    //     </div>

    //     {/* Main Content */}
    //   <UsersTable
    //     page={page}
    //     setPage={setPage}
    //     search={search}
    //     setSearch={setSearch}
    //     activeTab={activeTab}
    //     setActiveTab={setActiveTab}
    //     data={data}
    //     isLoading={isLoading}
    //   />
    //   </div>
    // </div>
  // );
// }
