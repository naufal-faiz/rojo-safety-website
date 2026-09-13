import { useMemo, useState } from "react"

type UseTableFilterOptions<T> = {
    data: T[]
    searchFields: (item: T) => string[]
    statusField?: keyof T
}

export default function useTableFilter<T>({data, searchFields, statusField}: UseTableFilterOptions<T>) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedStatus, setSelectedStatus] = useState<string>("ALL")

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesSearch = searchFields(item).some((field) => 
                field?.toLowerCase().includes(searchQuery.toLowerCase())
            )

            const matchesStatus = !statusField || selectedStatus === "ALL" || String(item[statusField]) === selectedStatus

            return matchesSearch && matchesStatus
        })
    }, [data, searchQuery, selectedStatus, searchFields, statusField])

    return {
        searchQuery,
        setSearchQuery,
        selectedStatus,
        setSelectedStatus,
        filteredData
    }
}