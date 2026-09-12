import { useEffect, useMemo, useState } from "react";

export function usePagination<T>(data: T[], itemsPerPage: number = 10) {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage))

    // langsung reset ke halaman 1 kalo ada perubahan data (filter pencarian atau lebih dari data yang ada)
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1)
        }
    }, [totalPages, currentPage])

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage
        return data.slice(start, start + itemsPerPage)
    }, [data, currentPage, itemsPerPage])

    return {
        currentPage, setCurrentPage, totalPages, paginatedData, totalItems: data.length
    }
}