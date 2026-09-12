"use client";

import { ArticleContentEditor, ArticleFormHeader, ArticleSidebar, ArticleTitleSlug } from "@/components/admin/main/Article";
import { Category, InitialArticle } from "@/types";
import useArticleForm from "./useArticleForm";

interface ArticleFormProps {
    categories: Category[];
    initialData?: InitialArticle | null;
    articleId?: string;
}

const ArticleForm = ({ categories, initialData, articleId }: ArticleFormProps) => {
    const {
        title, slug, thumbnail, content, excerpt,
        categoryId, autosaveStatus, articleStatus,
        isPublishing, hasUnsavedChanges, isPublished,
        isExisting, updateField, handleSaveChanges,
        handleManualSaveDraft, handlePublish
    } = useArticleForm({ categories, initialData, articleId })

    return (
        <div className="space-y-6 max-w-(--breakpoint-2xl) mx-auto pb-16">
            {/* Top Action Header */}
            <ArticleFormHeader
                isExisting={isExisting}
                articleStatus={articleStatus}
                autosaveStatus={autosaveStatus}
                isPublishing={isPublishing}
                isPublished={isPublished}
                hasUnsavedChanges={hasUnsavedChanges}
                onSaveDraft={handleManualSaveDraft}
                onSaveChanges={handleSaveChanges}
                onPublish={handlePublish}
            />

            {/* 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Content Area (8 Cols) */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Title & Permalink Slug */}
                    <ArticleTitleSlug
                        title={title}
                        slug={slug}
                        onTitleChange={(newTitle, newSlug) =>
                            updateField({ title: newTitle, slug: newSlug })
                        }
                        onSlugChange={(newSlug) => updateField({ slug: newSlug })}
                    />

                    {/* Rich Content Editor */}
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Isi Konten Artikel <span className="text-red-500">*</span>
                            </label>
                            <span className="text-xs text-gray-400">
                                Gunakan toolbar untuk format teks, gambar, & link
                            </span>
                        </div>
                        <ArticleContentEditor
                            value={content}
                            onChange={(html) => updateField({ content: html })}
                        />
                    </div>

                    {/* Excerpt / Summary */}
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Ringkasan Singkat (Excerpt)
                            </label>
                            <span className="text-xs text-gray-400">
                                {excerpt.length} / 250 karakter
                            </span>
                        </div>
                        <textarea
                            rows={3}
                            placeholder="Tulis ringkasan singkat 1-2 kalimat untuk ditampilkan di kartu artikel dan hasil pencarian..."
                            value={excerpt}
                            onChange={(e) => updateField({ excerpt: e.target.value })}
                            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                </div>

                {/* Sidebar Column (4 Cols) */}
                <ArticleSidebar
                    categories={categories}
                    categoryId={categoryId}
                    thumbnail={thumbnail}
                    articleStatus={articleStatus}
                    initialData={initialData}
                    title={title}
                    slug={slug}
                    excerpt={excerpt}
                    onCategoryChange={(catId) => updateField({ categoryId: catId })}
                    onThumbnailChange={(thumbUrl) => updateField({ thumbnail: thumbUrl })}
                />
            </div>
        </div>
    );
};

export default ArticleForm;