"use client";

import { useState } from "react";
import { updateArticleCategory, softDeleteArticleCategory } from "@/lib/data/article";

type Category = { id: string; name: string };

const ArticleCategoryRow =({
    sequence,
    category,
    onUpdated,
    onDeleted,
}: {
    sequence: number;
    category: Category;
    onUpdated: (updated: Category) => void;
    onDeleted: (id: string) => void;
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(category.name);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleSave() {
        if (!name.trim() || name === category.name) {
            setIsEditing(false);
            setName(category.name);
            return;
        }

        try {
            setIsSaving(true);
            const updated = await updateArticleCategory(category.id, name);
            onUpdated(updated);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            alert("Gagal memperbarui kategori.");
            setName(category.name);
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDelete() {
        if (!confirm(`Hapus kategori "${category.name}"?`)) return;

        try {
            setIsDeleting(true);
            await softDeleteArticleCategory(category.id);
            onDeleted(category.id);
        } catch (err) {
            console.error(err);
            alert("Gagal menghapus kategori. Mungkin masih dipakai artikel lain.");
            setIsDeleting(false);
        }
    }

    return (
        <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/60 dark:hover:bg-gray-800/40">
            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{sequence}</td>
            <td className="px-4 py-3">
                {isEditing ? (
                    <input
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                            if (e.key === "Escape") {
                                setName(category.name);
                                setIsEditing(false);
                            }
                        }}
                        disabled={isSaving}
                        className="w-full rounded-lg border border-brand-400 bg-white px-2.5 py-1.5 text-sm text-gray-900 focus:outline-none dark:bg-gray-800 dark:text-white"
                    />
                ) : (
                    <span className="text-gray-800 dark:text-gray-200">{category.name}</span>
                )}
            </td>
            <td className="px-4 py-3 text-right whitespace-nowrap">
                {isEditing ? (
                    <div className="inline-flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-3 py-1 text-xs font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-lg disabled:opacity-50"
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
                            className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            Batal
                        </button>
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-400 dark:hover:bg-brand-950/60 rounded-lg transition-colors"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Edit</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {isDeleting ? "..." : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>}
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}

export default ArticleCategoryRow