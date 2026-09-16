"use client";

import { FormEvent, useEffect, useState } from "react";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

import CategoryRow, {
    BaseCategory,
    CategoryActionResult,
} from "./CategoryRow";

import CategoryStats from "./CategoryStats";

import {
    FilterBar,
    EmptyState,
    Pagination,
} from "@/components/common";

type CategoryPagination = {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
};

type CategoryManagerProps<T extends BaseCategory> = {
    initialCategories: T[];

    pagination: CategoryPagination;

    searchQuery: string;

    totalCategories: number;
    totalItems: number;
    publishedItems: number;

    title?: string;
    description?: string;

    singularLabel?: string;
    pluralLabel?: string;

    itemLabel?: string;

    createCategory: (
        name: string
    ) => Promise<CategoryActionResult>;

    updateCategory: (
        id: string,
        name: string
    ) => Promise<CategoryActionResult>;

    deleteCategory: (
        id: string
    ) => Promise<CategoryActionResult>;
};

export default function CategoryManager<
    T extends BaseCategory
>({
    initialCategories,
    pagination,
    searchQuery,
    totalCategories,
    totalItems,
    publishedItems,
    title = "Kategori",
    description = "Kelola kategori.",
    singularLabel = "Kategori",
    pluralLabel = "Kategori",
    itemLabel = "Item",
    createCategory,
    updateCategory,
    deleteCategory,
}: CategoryManagerProps<T>) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchQuery);
    const [newName, setNewName] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        setSearch(searchQuery);
    }, [searchQuery]);

    /*
     * SEARCH DEBOUNCE
     */
    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentSearch =
                searchParams.get("search") ?? "";

            if (search === currentSearch) {
                return;
            }

            const params = new URLSearchParams(
                searchParams.toString()
            );

            if (search.trim()) {
                params.set("search", search.trim());
            } else {
                params.delete("search");
            }

            // Set kembali ke halaman pertama
            // ketika keyword berubah.
            params.set("page", "1");

            router.replace(
                `${pathname}?${params.toString()}`
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [
        search,
        pathname,
        router,
        searchParams,
    ]);

    /*
     * CREATE CATEGORY
     */
    const handleCreate = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const trimmedName = newName.trim();

        if (!trimmedName) {
            alert(
                `Nama ${singularLabel.toLowerCase()} tidak boleh kosong.`
            );

            return;
        }

        try {
            setIsCreating(true);

            const result =
                await createCategory(trimmedName);

            if (!result.success) {
                alert(result.message);
                return;
            }

            setNewName("");

            router.refresh();
        } catch (error) {
            console.error(
                "Failed to create category:",
                error
            );

            alert(
                `Terjadi kesalahan saat membuat ${singularLabel.toLowerCase()}.`
            );
        } finally {
            setIsCreating(false);
        }
    };

    /*
     * PAGINATION
     */
    const handlePageChange = (page: number) => {
        if (
            page < 1 ||
            page > pagination.totalPages ||
            page === pagination.page
        ) {
            return;
        }

        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.set("page", page.toString());

        router.replace(
            `${pathname}?${params.toString()}`
        );
    };

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {title}
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            </div>

            {/* STATS */}
            <CategoryStats
                totalCategories={totalCategories}
                totalItems={totalItems}
                publishedItems={publishedItems}
                itemLabel={itemLabel}
            />

            {/* SEARCH */}
            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                searchPlaceholder={`Cari ${pluralLabel.toLowerCase()}...`}
            />

            {/* MAIN CONTENT */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                {/* CREATE CATEGORY */}
                <div className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                            Buat {singularLabel} Baru
                        </h2>

                        <p className="mt-1 text-sm leading-5 text-gray-500 dark:text-gray-400">
                            Tambahkan kategori baru
                            untuk mengelompokkan{" "}
                            {itemLabel.toLowerCase()}.
                        </p>
                    </div>

                    <form
                        onSubmit={handleCreate}
                        className="mt-6 space-y-4">
                        <div>
                            <label
                                htmlFor="category-name"
                                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nama kategori
                            </label>

                            <input
                                id="category-name"
                                type="text"
                                value={newName}
                                onChange={(event) =>
                                    setNewName(
                                        event.target.value
                                    )
                                }
                                placeholder="Masukkan nama kategori"
                                disabled={isCreating}
                                className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={
                                isCreating ||
                                !newName.trim()
                            }
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40">
                            {isCreating ? (
                                "Menyimpan..."
                            ) : (
                                <>
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Buat{" "}
                                    {singularLabel}
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* CATEGORY LIST */}
                <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
                    {/* LIST HEADER */}
                    <div className="flex flex-col gap-1 border-b border-gray-200 px-5 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                Daftar {pluralLabel}
                            </h2>

                            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                {pagination.totalItems}{" "}
                                {singularLabel.toLowerCase()}{" "}
                                ditemukan
                            </p>
                        </div>
                    </div>

                    {initialCategories.length > 0 ? (
                        <>
                            {/* TABLE */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50/75 dark:border-gray-800 dark:bg-gray-800/50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            <th className="w-16 px-5 py-3.5">
                                                #
                                            </th>
                                            <th className="px-5 py-3.5">
                                                Nama
                                            </th>
                                            <th className="w-40 px-5 py-3.5 text-right">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {initialCategories.map(
                                            (
                                                category,
                                                index
                                            ) => (
                                                <CategoryRow
                                                    key={
                                                        category.id
                                                    }
                                                    sequence={
                                                        (pagination.page -
                                                            1) *
                                                        pagination.limit +
                                                        index +
                                                        1
                                                    }
                                                    category={
                                                        category
                                                    }
                                                    updateCategory={
                                                        updateCategory
                                                    }
                                                    deleteCategory={
                                                        deleteCategory
                                                    }
                                                />
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* PAGINATION */}
                            <Pagination
                                currentPage={
                                    pagination.page
                                }
                                totalPages={
                                    pagination.totalPages
                                }
                                onPageChange={
                                    handlePageChange
                                }
                                totalItems={
                                    pagination.totalItems
                                }
                                itemsPerPage={
                                    pagination.limit
                                }
                                itemLabel={singularLabel.toLowerCase()}
                            />
                        </>
                    ) : (
                        /* EMPTY STATE */
                        <div className="flex min-h-[280px] items-center justify-center px-5 py-12">
                            <EmptyState
                                title={
                                    searchQuery
                                        ? "Kategori tidak ditemukan"
                                        : `Belum ada ${pluralLabel.toLowerCase()}`
                                }
                                description={
                                    searchQuery
                                        ? "Coba gunakan kata kunci pencarian lain."
                                        : `Silakan tambahkan ${singularLabel.toLowerCase()} baru.`
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
