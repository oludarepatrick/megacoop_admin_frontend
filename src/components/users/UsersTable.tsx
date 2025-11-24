// import { useState } from "react"
// import { useQuery } from "@tanstack/react-query"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
// import { fetchUsers } from "@/services/UserService"
import { StatusSwitch } from "./UserStatusSwitch"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
// import Link from "next/link"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import type { UserResponse } from "@/types/User"


interface UsersTableProps {
  page: number
  setPage: (page: number | ((prev: number) => number)) => void
  search: string
  setSearch: (search: string) => void
  activeTab: "all" | "active" | "inactive"
  setActiveTab: (tab: "all" | "active" | "inactive") => void
  data?: UserResponse
  isLoading: boolean
}

export function UsersTable({
  page,
  setPage,
  search,
  setSearch,
  activeTab,
  setActiveTab,
  data,
  isLoading,
}: UsersTableProps) {
  const navigate = useNavigate()

  const tabs = [
    { id: "all", label: "All", count: activeTab === "all" ? data?.data.length : null },
    { id: "active", label: "Active", count: activeTab === "active" ? data?.data.filter(user => user.status === "active").length : null },
    { id: "inactive", label: "Inactive", count: activeTab === "inactive" ? data?.data.filter(user => user.status === "inactive").length : null },
  ] as const

  return (
    <div className="space-y-6">
      {/* Search and Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div className="flex items-center gap-8 border-b w-full md:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-3 px-1 relative text-sm font-medium transition-colors",
                activeTab === tab.id ? "text-green-600" : "text-gray-500 hover:text-gray-700",
              )}
            >
              {tab.label}
              {(tab?.count ?? 0) > 0 && (
                <span className="ml-2 bg-[#F4C566] text-white text-[10px] px-1.5 py-0.5 rounded-full">{tab.count}</span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Input
            placeholder="Search User"
            className="pl-4 pr-10 py-2 rounded-full border-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">NAME</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">phone</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-green-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-[#F4C566] uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : data?.data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                data?.data.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-500 transition-colors">
                    <td className="px-6 py-4 text-sm">{user.id}</td>
                    <td className="px-6 py-4 text-sm font-medium truncate">{[user.first_name, user.middle_name, user.last_name].filter(Boolean).join(" ")}</td>
                    <td className="px-6 py-4 text-sm ">{user.email}</td>
                    <td className="px-6 py-4 text-sm ">{user.phone}</td>
                    <td className="px-6 py-4 text-sm ">{user.role}</td>
                    <td className="px-6 py-4 text-sm ">
                      <StatusSwitch status={user.status} />
                    </td>
                    <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          // href={`/admin/users/${user.id}`}
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                          className="text-[10px] font-bold text-green-600 uppercase hover:underline"
                        >
                          View
                        </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {data?.meta && (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setPage((p: number) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 text-sm font-medium text-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(4, data.meta.totalPages) }).map((_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={cn(
                    "w-8 h-8 rounded-md text-sm font-medium transition-colors",
                    page === pageNum ? "bg-green-500 text-white" : "text-gray-600 hover:bg-gray-100",
                  )}
                >
                  {pageNum}
                </button>
              )
            })}
            {data.meta.totalPages > 4 && <span className="text-gray-400">...</span>}
            {data.meta.totalPages > 4 && (
              <button
                onClick={() => setPage(data.meta.totalPages)}
                className="px-2 py-1 text-sm font-medium text-green-600"
              >
                Next
                <ChevronRight className="w-4 h-4 inline ml-1" />
              </button>
            )}
            {data.meta.totalPages <= 4 && (
              <button
                onClick={() => setPage((p) => Math.min(data.meta.totalPages, p + 1))}
                disabled={page === data.meta.totalPages}
                className="flex items-center gap-1 text-sm font-medium text-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
