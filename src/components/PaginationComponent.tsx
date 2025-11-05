import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type KYCPaginationProps = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
};

const PaginationComponent = ({ totalPages, currentPage, setCurrentPage }: KYCPaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <Pagination className="mt-6 flex sm:justify-end text-megaPrimary">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {totalPages <= 5 ? (
                    Array.from({length: totalPages}, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink 
                                isActive={i + 1 === currentPage}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                ): (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                isActive={currentPage === 1}
                                onClick={() => setCurrentPage(1)}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage > 3 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        {currentPage > 2 && (
                            <PaginationItem>
                                <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>
                                    {currentPage - 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        {currentPage > 1 && currentPage < totalPages && (
                            <PaginationItem>
                                <PaginationLink isActive>
                                    {currentPage}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        {currentPage < totalPages - 1 && (
                            <PaginationItem>
                                <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>
                                    {currentPage + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        {currentPage < totalPages - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink 
                                isActive={currentPage === totalPages}
                                onClick={() => setCurrentPage(totalPages)}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    
                    />

                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;
