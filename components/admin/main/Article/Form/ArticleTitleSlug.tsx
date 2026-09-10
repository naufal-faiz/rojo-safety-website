"use client";

import { slugify } from "@/lib/utils/slugify";
import { useState } from "react";

interface ArticleTitleSlugProps {
    title: string;
    slug: string;
    onTitleChange: (newTitle: string, newSlug: string) => void;
    onSlugChange: (newSlug: string) => void;
}

export const ArticleTitleSlug = ({
    title,
    slug,
    onTitleChange,
    onSlugChange,
}: ArticleTitleSlugProps) => {
    const [isEditingSlug, setIsEditingSlug] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                    Judul Artikel <span className="text-red-500">*</span>
                </label>
                <input
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg font-semibold text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="Masukkan judul artikel yang menarik..."
                    value={title}
                    onChange={(e) => {
                        const newTitle = e.target.value;
                        const newSlug = isEditingSlug ? slug : slugify(newTitle);
                        onTitleChange(newTitle, newSlug);
                    }}
                />
            </div>

            {/* Permalink / Slug */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700/60">
                <span className="font-medium text-gray-500">Permalink:</span>
                <span className="text-gray-400">/artikel/</span>
                {isEditingSlug ? (
                    <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => onSlugChange(slugify(e.target.value))}
                            className="rounded-md border border-gray-300 bg-white px-2 py-0.5 text-xs text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 flex-1"
                        />
                        <button
                            type="button"
                            onClick={() => setIsEditingSlug(false)}
                            className="text-xs font-medium text-brand-500 hover:text-brand-600"
                        >
                            Selesai
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 flex-1">
                        <span className="font-mono text-gray-700 dark:text-gray-300 font-medium">
                            {slug || "slug-otomatis"}
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsEditingSlug(true)}
                            className="text-xs text-brand-500 hover:underline ml-1"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
