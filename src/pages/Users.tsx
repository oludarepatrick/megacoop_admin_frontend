import { AddUserModal } from "@/components/users/AddUserModal"
import { UsersStatsBanner } from "@/components/users/UsersStatsBanner"
import { UsersTable } from "@/components/users/UsersTable"
import { fetchUsers } from "@/services/UserService"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function UsersPage() {
  const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive">("all")

  const { data, isLoading } = useQuery({
      queryKey: ["users", page, search, activeTab],
      queryFn: () => fetchUsers(page, search, activeTab),
    })
  return (
    
      <div className="min-h-screen p-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex flex-col gap-6">
            <div>
              <AddUserModal />
            </div>

          <UsersStatsBanner
            data={data}
          
          />
          </div>

          {/* Main Content */}
        <UsersTable
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          data={data}
          isLoading={isLoading}
        />
        </div>
      </div>
  )
}
