"use client";

import { useState } from "react";

export type BaseCategory = {
    id: string;
    name: string;
};

type CategoryRowProps<T extends BaseCategory> = {
    sequence: number;
    category: T;
    onUpdated: (updated: T) => void;
    onDeleted: (id: string) => void;
    updateCategory: (id: string, name: string) => Promise<T>;
    deleteCategory: (id: string) => Promise<unknown>;
};

function CategoryRow<T extends BaseCategory>({
    sequence,
    category,
    onUpdated,
    onDeleted,
    updateCategory,
    deleteCategory,
}: CategoryRowProps<T>) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(category.name);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleSave() {
        const trimmedName = name.trim();

        if (!trimmedName || trimmedName === category.name) {
            setName(category.name);
            setIsEditing(false);
            return;
        }

        try {
            setIsSaving(true);

            const updated = await updateCategory(
                category.id,
                trimmedName
            );

            onUpdated(updated);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            alert("Gagal memperbarui kategori.");
            setName(category.name);
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDelete() {
        if (!confirm(`Hapus kategori "${category.name}"?`)) {
            return;
        }

        try {
            setIsDeleting(true);

            await deleteCategory(category.id);
            onDeleted(category.id);
        } catch (error) {
            console.error(error);
            alert(
                "Gagal menghapus kategori. Mungkin kategori masih digunakan."
            );
            setIsDeleting(false);
        }
    }

    return (
        <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/60 dark:hover:bg-gray-800/40">
            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                {sequence}
            </td>

            <td className="px-4 py-3">
                {isEditing ? (
                    <input
                        autoFocus
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleSave();
                            }

                            if (event.key === "Escape") {
                                setName(category.name);
                                setIsEditing(false);
                            }
                        }}
                        disabled={isSaving}
                        className="w-full rounded-lg border border-brand-400 bg-white px-2.5 py-1.5 text-sm text-gray-900 focus:outline-none dark:bg-gray-800 dark:text-white"
                    />
                ) : (
                    <span className="text-gray-800 dark:text-gray-200">
                        {category.name}
                    </span>
                )}
            </td>

            <td className="whitespace-nowrap px-4 py-3 text-right">
                {isEditing ? (
                    <div className="inline-flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="rounded-lg bg-brand-500 px-3 py-1 text-xs font-medium text-white hover:bg-brand-600 disabled:opacity-50"
                        >
                            {isSaving ? "Menyimpan..." : "Simpan"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setName(category.name);
                                setIsEditing(false);
                            }}
                            disabled={isSaving}
                            className="rounded-lg px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Batal
                        </button>
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-400"
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                        >
                            {isDeleting ? "..." : "Hapus"}
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}

export default CategoryRow;