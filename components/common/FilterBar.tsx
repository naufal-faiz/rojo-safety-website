type StatusOption = { value: string; label: string };

type FilterBarProps = {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    selectedStatus?: string;
    onStatusChange?: (value: string) => void;
    statusOptions?: StatusOption[];
};

const FilterBar =({
    searchQuery,
    onSearchChange,
    searchPlaceholder = "Cari...",
    selectedStatus,
    onStatusChange,
    statusOptions,
}: FilterBarProps) => {
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <div className="relative flex-1 max-w-md">
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-gray-50/50 pl-9 pr-4 py-2 text-sm text-gray-800 focus:border-brand-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
                <svg
                    className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {statusOptions && onStatusChange && (
                <div className="flex items-center gap-2">
                    <select
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default FilterBar