"use client";

import useUrlFilters from "@/hooks/useUrlFilters";

type ArticleFilterBarProps = {
    categories: { id: string; name: string }[];
    selectedCategory: string;
};

export default function ArticleFilterBar({ categories, selectedCategory }: ArticleFilterBarProps) {
    const { debouncedValue, setDebouncedValue, setFilter } = useUrlFilters();

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* SEARCH — kiri */}
            <div className="relative w-full sm:max-w-md">
                <svg
                    className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400"
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
                <input
                    type="text"
                    value={debouncedValue}
                    onChange={(e) => setDebouncedValue(e.target.value)}
                    placeholder="Cari artikel..."
                    className="w-full rounded-lg border border-stroke bg-white py-3 pl-11 pr-4 text-sm text-black placeholder:text-gray-400 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-blacksection dark:text-white"
                />
            </div>

            {/* KATEGORI — kanan */}
            <div className="w-full sm:w-56">
                <select
                    value={selectedCategory}
                    onChange={(e) => setFilter("category", e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-white px-4 py-3 text-sm text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-blacksection dark:text-white"
                >
                    <option value="ALL">Semua Kategori</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}