import { cn } from "@/lib/utils"

interface StatusSwitchProps {
  status: "Active" | "Inactive"
  onToggle?: () => void
  isPending?: boolean
}

export function StatusSwitch({ status, onToggle, isPending }: StatusSwitchProps) {
  const isActive = status === "Active"

  return (
    <div className="flex items-center gap-3">
      <span className={cn("text-xs font-medium uppercase", isActive ? "text-green-600" : "text-red-500")}>
        {isActive ? "Active" : "Deactivated"}
      </span>
      <button
        onClick={onToggle}
        disabled={isPending}
        className={cn(
          "w-11 h-6 rounded-full p-1 flex items-center transition-colors duration-200 ease-in-out", 
          isActive ? "bg-green-500" : "bg-red-500",
          isPending && "opacity-50 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200",
            isActive ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    </div>
  )
}
