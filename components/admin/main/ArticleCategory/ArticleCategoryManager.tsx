"use client";

import { useState } from "react";
import { createArticleCategory } from "@/lib/data/article/articleCategoryAction";
import ArticleCategoryRow from "./ArticleCategoryRow";

type Category = { id: string; name: string };

export default function ArticleCategoryManager({
    initialCategories,
}: {
    initialCategories: Category[];
}) {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [newName, setNewName] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    async function handleCreate() {
        if (!newName.trim()) return;

        try {
            setIsCreating(true);
            const created = await createArticleCategory(newName);
            setCategories((prev) => [...prev, created]);
            setNewName("");
        } catch (err) {
            console.error(err);
            alert("Gagal menambah kategori.");
        } finally {
            setIsCreating(false);
        }
    }

    return (
        <div className="space-y-6">
            {/* Form Tambah Kategori Baru */}
            <div className="mb-10 rounded-md border border-stroke bg-white p-4 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">
                    Tambah Kategori Baru
                </h4>
                <div className="flex gap-3">
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleCreate();
                        }}
                        placeholder="Masukkan nama kategori..."
                        className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                    <button
                        type="button"
                        onClick={handleCreate}
                        disabled={isCreating || !newName.trim()}
                        className="rounded-xl bg-brand-500 hover:bg-brand-600 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
                    >
                        {isCreating ? "Menambah..." : "Tambah"}
                    </button>
                </div>
            </div>
            
            {/* Tabel Kategori */}
            <div className="mb-10 rounded-md border border-stroke bg-white p-4 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <h4 className="mb-6 text-2xl font-semibold text-black dark:text-white">
                    Kategori
                </h4>

                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50/75 dark:border-gray-800 dark:bg-gray-800/50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            <th className="px-4 py-3.5">No</th>
                            <th className="px-4 py-3.5">Nama Kategori</th>
                            <th className="px-4 py-3.5 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                                    Belum ada kategori.
                                </td>
                            </tr>
                        ) : (
                            categories.map((category, index) => (
                                <ArticleCategoryRow
                                    key={category.id}
                                    sequence={index + 1}
                                    category={category}
                                    onUpdated={(updated) =>
                                        setCategories((prev) =>
                                            prev.map((c) => (c.id === updated.id ? updated : c))
                                        )
                                    }
                                    onDeleted={(id) =>
                                        setCategories((prev) => prev.filter((c) => c.id !== id))
                                    }
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}