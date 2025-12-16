import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter } from "lucide-react"
import { useState } from "react"

interface LoanSearchFilterProps {
  onSearchChange: (search: string) => void
  onFilterChange: (filter: string) => void
}

export function LoanSearchFilter({ onSearchChange, onFilterChange }: LoanSearchFilterProps) {
  const [searchValue, setSearchValue] = useState("")

  const handleSearch = (value: string) => {
    setSearchValue(value)
    onSearchChange(value)
  }

  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      {/* <div className="flex flex-col sm:flex-row gap-3 flex-1"> */}
        <div className="relative flex-1 max-w-xl w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search user loan..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 border-gray-300 focus:border-green-500"
          />
        </div>
      <div className="flex flex-row gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-fit sm:w-auto border-gray-300 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem onClick={() => onFilterChange("all")}>View All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange("newest")}>Newest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange("oldest")}>Oldest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange("highest")}>Highest Amount</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange("lowest")}>Lowest Amount</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      {/* </div> */}

      {/* <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white w-fit sm:w-auto">
        <Calendar className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="10 Oct - 20 Nov"
          onChange={(e) => onDateChange(e.target.value)}
          className="text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none"
        />
      </div> */}
      </div>
    </div>
  )
}
