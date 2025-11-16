import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface LoanPaginationProps {
  currentPage: number
  lastPage: number
  onPageChange: (page: number) => void
}

export function LoanPagination({ currentPage, lastPage, onPageChange }: LoanPaginationProps) {
  const pageNumbers = []
  const maxVisible = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  const endPage = Math.min(lastPage, startPage + maxVisible - 1)

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      {startPage > 1 && (
        <>
          <Button variant="outline" size="sm" onClick={() => onPageChange(1)}>
            1
          </Button>
          {startPage > 2 && <span className="text-gray-600">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <Button
          key={page}
          size="sm"
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "bg-green-600 hover:bg-green-700" : "border border-gray-300"}
          variant={page === currentPage ? "default" : "outline"}
        >
          {page}
        </Button>
      ))}

      {endPage < lastPage && (
        <>
          {endPage < lastPage - 1 && <span className="text-gray-600">...</span>}
          <Button variant="outline" size="sm" onClick={() => onPageChange(lastPage)}>
            {lastPage}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="gap-1"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
