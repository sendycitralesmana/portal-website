import React from "react";
import { router } from "@inertiajs/react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  search?: string;
}

const PaginationComponentNoSlug: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  search = "",
}) => {
  const handlePageChange = (pageNumber: number) => {
    router.get(route(route().current()!), { page: pageNumber, search }, { preserveScroll: true });
  };

  const getPageRange = () => {
    if (totalPages <= 10) return [...Array(totalPages).keys()].map((i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3)
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {getPageRange().map((page, idx) => (
          <PaginationItem key={idx}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(page as number)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponentNoSlug;
