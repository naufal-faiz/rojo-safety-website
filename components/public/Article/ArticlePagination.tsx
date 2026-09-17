"use client";

import useUrlFilters from "@/hooks/useUrlFilters";

type ArticlePaginationProps = {
    currentPage: number;
    totalPages: number;
};

export default function ArticlePagination({ currentPage, totalPages }: ArticlePaginationProps) {
    const { setPage } = useUrlFilters();

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | "...")[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="mt-12.5 flex items-center justify-center gap-1.5">
            <button
                type="button"
                onClick={() => setPage(currentPage - 1, totalPages)}
                disabled={currentPage === 1}
                className="flex h-10 items-center justify-center rounded-lg border border-stroke px-4 text-sm font-medium text-black transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 dark:border-strokedark dark:text-white"
            >
                Sebelumnya
            </button>

            <div className="hidden items-center gap-1.5 sm:flex">
                {getPageNumbers().map((page, idx) =>
                    page === "..." ? (
                        <span key={`ellipsis-${idx}`} className="px-2 text-sm text-gray-400">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            onClick={() => setPage(page, totalPages)}
                            className={`flex h-10 min-w-10 items-center justify-center rounded-lg text-sm font-medium transition ${
                                page === currentPage
                                    ? "bg-primary text-white"
                                    : "text-black hover:bg-gray-100 dark:text-white dark:hover:bg-blacksection"
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <span className="text-sm text-gray-500 dark:text-gray-400 sm:hidden">
                {currentPage} / {totalPages}
            </span>

            <button
                type="button"
                onClick={() => setPage(currentPage + 1, totalPages)}
                disabled={currentPage === totalPages}
                className="flex h-10 items-center justify-center rounded-lg border border-stroke px-4 text-sm font-medium text-black transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 dark:border-strokedark dark:text-white"
            >
                Berikutnya
            </button>
        </div>
    );
}