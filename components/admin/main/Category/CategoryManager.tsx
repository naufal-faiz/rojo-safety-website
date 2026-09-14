"use client";

import { useState } from "react";
import CategoryRow, { BaseCategory } from "./CategoryRow";

type CategoryManagerProps<T extends BaseCategory> = {
    initialCategories: T[];
    title?: string;
    description?: string;
    singularLabel?: string;
    pluralLabel?: string;
    totalItems?: number | null;
    itemLabel?: string;

    createCategory: (name: string) => Promise<T>;
    updateCategory: (id: string, name: string) => Promise<T>;
    deleteCategory: (id: string) => Promise<unknown>;
};

function CategoryManager<T extends BaseCategory>({
    initialCategories,
    title = "Kategori",
    description = "Kelola kategori yang tersedia.",
    singularLabel = "kategori",
    pluralLabel = "kategori",
    totalItems,
    itemLabel,

    createCategory,
    updateCategory,
    deleteCategory,
}: CategoryManagerProps<T>) {
    const [categories, setCategories] =
        useState<T[]>(initialCategories);

    const [newName, setNewName] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    async function handleCreate() {
        const trimmedName = newName.trim();

        if (!trimmedName) {
            return;
        }

        try {
            setIsCreating(true);

            const created = await createCategory(trimmedName);

            setCategories((prev) => [...prev, created]);
            setNewName("");
        } catch (error) {
            console.error(error);
            alert(`Gagal menambah ${singularLabel}.`);
        } finally {
            setIsCreating(false);
        }
    }

    function handleUpdated(updated: T) {
        setCategories((prev) =>
            prev.map((category) =>
                category.id === updated.id
                    ? updated
                    : category
            )
        );
    }

    function handleDeleted(id: string) {
        setCategories((prev) =>
            prev.filter((category) => category.id !== id)
        );
    }

    const totalCategories = categories.length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {title}
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Total Kategori
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                        {totalCategories}
                    </h3>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
                    <p className="text-xs font-medium text-brand-600 dark:text-brand-400">
                        Total {itemLabel}
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                        {totalItems}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {itemLabel} yang sedang tersedia
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Pengelolaan
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                        {totalCategories > 0
                            ? "Tersedia"
                            : "Belum ada"}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Tambahkan kategori sesuai kebutuhan
                    </p>
                </div>
            </div>

            {/* Create */}
            <div className="rounded-2xl border border-stroke bg-white p-5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <div className="mb-4">
                    <h4 className="text-lg font-semibold text-black dark:text-white">
                        Tambah Kategori
                    </h4>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Buat {singularLabel} baru untuk digunakan pada
                        {` ${pluralLabel}`}.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                        value={newName}
                        onChange={(event) =>
                            setNewName(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleCreate();
                            }
                        }}
                        placeholder={`Masukkan nama ${singularLabel}...`}
                        disabled={isCreating}
                        className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />

                    <button
                        type="button"
                        onClick={handleCreate}
                        disabled={
                            isCreating ||
                            !newName.trim()
                        }
                        className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
                    >
                        {isCreating
                            ? "Menambah..."
                            : "Tambah Kategori"}
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="rounded-2xl border border-stroke bg-white p-5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <div className="mb-5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Daftar {title}
                    </h4>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {totalCategories} {pluralLabel} tersedia
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50/75 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-400">
                                <th className="px-4 py-3.5">
                                    No
                                </th>
                                <th className="px-4 py-3.5">
                                    Nama
                                </th>
                                <th className="px-4 py-3.5 text-right">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="px-4 py-10 text-center"
                                    >
                                        <div className="mx-auto max-w-sm">
                                            <p className="font-medium text-gray-700 dark:text-gray-200">
                                                Belum ada {pluralLabel}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-400">
                                                Tambahkan {singularLabel} pertama
                                                menggunakan form di atas.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                categories.map(
                                    (category, index) => (
                                        <CategoryRow
                                            key={category.id}
                                            sequence={index + 1}
                                            category={category}
                                            onUpdated={handleUpdated}
                                            onDeleted={handleDeleted}
                                            updateCategory={
                                                updateCategory
                                            }
                                            deleteCategory={
                                                deleteCategory
                                            }
                                        />
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CategoryManager;