// import { useState } from "react"
// import { useQuery } from "@tanstack/react-query"
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
// import { fetchUsers } from "@/services/UserService"
import { StatusSwitch } from "./UserStatusSwitch";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
// import Link from "next/link"
import { Button } from "../ui/button";
import type { User, UserResponse } from "@/types/User";
import { Card } from "../ui/card";
import { useToggleUserStatus } from "@/hooks/useUser";
import { useState } from "react";

interface UsersTableProps {
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  search: string;
  setSearch: (search: string) => void;
  activeTab: "all" | "Active" | "Inactive";
  setActiveTab: (tab: "all" | "Active" | "Inactive") => void;
  userList: User[];
  data?: UserResponse;
  isLoading: boolean;
  isError: boolean;
  error?: string
  onClick: (user: User) => void
}

export function UsersTable({
  page,
  setPage,
  search,
  setSearch,
  activeTab,
  setActiveTab,
  data,
  userList,
  isLoading,
  isError,
  error,
  onClick

}: UsersTableProps) {
  const [pendingId, setPendingId] = useState<number | null>(null)

  // ✅ FILTER DATA BASED ON ACTIVE TAB
  const filteredUsers =
    activeTab === "all"
      ? userList
      : userList.filter((user) => user.status_text === activeTab);

  // ✅ UPDATE TAB COUNTS TO USE FULL LIST
  const tabs = [
    {
      id: "all" as const,
      label: "All",
      count: userList?.length,
    },
    {
      id: "Active" as const,
      label: "Active",
      count: userList.filter((user) => user.status_text === "Active").length,
    },
    {
      id: "Inactive" as const,
      label: "Inactive",
      count: userList.filter((user) => user.status_text === "Inactive").length,
    },
  ];

  const { mutate: toggleStatus } = useToggleUserStatus();
  const handleToggle = (id: number) => {
    setPendingId(id);
    toggleStatus(id, {
      onSettled: () => setPendingId(null)
    });
  };

  if (isError) {
    return (
      <Card className="p-0 px-4 pb-2 border-0 shadow-none">
        <div className="flex flex-col justify-center items-center py-12">
          <p className="font-medium text-red-500 mb-2">
            {error == "Request failed with status code 403" ? "You don't have permission to view sub-admins" : "Error fetching user admin list"}
          </p>
          <p className="text-sm text-muted-foreground">
            Please try again later
          </p>
        </div>
      </Card>
    );
  }

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
                activeTab === tab.id
                  ? "text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.label}
              {(tab?.count ?? 0) > 0 && (
                <span className="ml-2 bg-[#F4C566] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Input
            placeholder="Search user"
            className="pl-4 pr-10 py-2 rounded-full border-gray-200 placeholder:text-megagreen"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto green-scrollbar border rounded-lg shadow-sm p-3 pb-0">
        <Table>
          <TableHeader className="[&_tr]:border-b-0 bg-muted-foreground/20">
            <TableRow className="bg-gray-50 [&_th]:text-xs [&_th]:uppercase [&_th]:font-semibold">
              <TableHead className="text-gray-900">ID</TableHead>
              <TableHead className="text-gray-900">Name</TableHead>
              <TableHead className="text-gray-900">Email</TableHead>
              <TableHead className="text-gray-900">Phone</TableHead>
              <TableHead className="text-gray-900">Role</TableHead>
              <TableHead className="text-megaorange">STATUS</TableHead>
              <TableHead className="text-gray-900">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <TableCell key={j} className="px-6 py-4">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="px-6 py-8 text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-muted/50 [&_td]:text-xs [&_td]:py-4 transition-colors"
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {[user.first_name, user.middle_name, user.last_name]
                      .filter(Boolean)
                      .join(" ")}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role.name}</TableCell>
                  <TableCell className="text-center">
                    <StatusSwitch
                      status={user.status_text}
                      onToggle={() => handleToggle(user.id)}
                      isPending={pendingId === user.id}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      // onClick={() => navigate(`/admin/users/${user.id}`)}
                      onClick={() => onClick(user)}
                      variant="outline"
                      className="border border-megagreen text-megagreen py-[6px] px-4 h-auto rounded-full text-xs font-medium hover:bg-megagreen hover:text-white transition-all"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
            {Array.from({ length: Math.min(4, data.meta.total) }).map(
              (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={cn(
                      "w-8 h-8 rounded-md text-sm font-medium transition-colors",
                      page === pageNum
                        ? "bg-green-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {pageNum}
                  </button>
                );
              }
            )}
            {data.meta.total > 4 && <span className="text-gray-400">...</span>}
            {data.meta.total > 4 && (
              <button
                onClick={() => setPage(data.meta.total)}
                className="px-2 py-1 text-sm font-medium text-green-600"
              >
                Next
                <ChevronRight className="w-4 h-4 inline ml-1" />
              </button>
            )}
            {data.meta.total <= 4 && (
              <button
                onClick={() => setPage((p) => Math.min(data.meta.total, p + 1))}
                disabled={page === data.meta.total}
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
  );
}
