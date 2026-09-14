"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type BaseCategory = {
    id: string;
    name: string;
};

export type CategoryActionResult = {
    success: boolean;
    message: string;
};

type CategoryRowProps<T extends BaseCategory> = {
    sequence: number;
    category: T;
    updateCategory: (
        id: string,
        name: string
    ) => Promise<CategoryActionResult>;
    deleteCategory: (
        id: string
    ) => Promise<CategoryActionResult>;
};

export default function CategoryRow<T extends BaseCategory>({
    sequence,
    category,
    updateCategory,
    deleteCategory,
}: CategoryRowProps<T>) {
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(category.name);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        const trimmedName = name.trim();

        if (!trimmedName) {
            alert("Nama kategori tidak boleh kosong.");
            return;
        }

        if (trimmedName === category.name) {
            setIsEditing(false);
            return;
        }

        try {
            setIsLoading(true);

            const result = await updateCategory(
                category.id,
                trimmedName
            );

            if (!result.success) {
                alert(result.message);
                return;
            }

            setIsEditing(false);

            router.refresh();
        } catch (error) {
            console.error("Failed to update category:", error);
            alert("Terjadi kesalahan saat memperbarui kategori.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Apakah Anda yakin ingin menghapus kategori "${category.name}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setIsLoading(true);

            const result = await deleteCategory(category.id);

            if (!result.success) {
                alert(result.message);
                return;
            }

            router.refresh();
        } catch (error) {
            console.error("Failed to delete category:", error);
            alert("Terjadi kesalahan saat menghapus kategori.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setName(category.name);
        setIsEditing(false);
    };

    return (
        <tr className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
            <td className="px-5 py-3.5 text-sm text-gray-500 dark:text-gray-400">
                {sequence}
            </td>

            <td className="px-5 py-3.5">
                {isEditing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleSave();
                            }

                            if (event.key === "Escape") {
                                handleCancel();
                            }
                        }}
                        disabled={isLoading}
                        autoFocus
                        className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-3 py-1.5 text-sm text-gray-800 focus:border-brand-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 disabled:opacity-50"
                    />
                ) : (
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {category.name}
                    </span>
                )}
            </td>

            <td className="px-5 py-3.5 text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-2">
                    {isEditing ? (
                        <>
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={isLoading}
                                className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-400 dark:hover:bg-brand-950/60 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isLoading ? "Menyimpan..." : "Simpan"}
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 disabled:opacity-50"
                            >
                                Batal
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                disabled={isLoading}
                                className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-400 dark:hover:bg-brand-950/60 disabled:opacity-50"
                            >
                                <svg
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                <span>Edit</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 disabled:opacity-50"
                                title="Hapus Kategori"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}