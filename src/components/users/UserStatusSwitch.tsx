import { cn } from "@/lib/utils"

interface StatusSwitchProps {
  status: "active" | "inactive"
}

export function StatusSwitch({ status }: StatusSwitchProps) {
  const isActive = status === "active"

  return (
    <div className="flex items-center gap-3">
      <span className={cn("text-xs font-medium uppercase", isActive ? "text-green-600" : "text-red-500")}>
        {isActive ? "Active" : "Deactivated"}
      </span>
      <div
        className={cn(
          "w-11 h-6 rounded-full p-1 flex items-center transition-colors duration-200 ease-in-out pointer-events-none", // pointer-events-none for read-only
          isActive ? "bg-green-500" : "bg-red-500",
        )}
      >
        <div
          className={cn(
            "w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200",
            isActive ? "translate-x-5" : "translate-x-0",
          )}
        />
      </div>
    </div>
  )
}
