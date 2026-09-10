"use client";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { publishArticle, saveDraft } from "./action";
import {
    ArticleContentEditor,
    ArticleFormHeader,
    ArticleSidebar,
    ArticleTitleSlug,
    AutosaveStatus,
    Category,
    InitialArticle,
} from "@/components/admin/main/Article";
import { slugify } from "@/lib/utils/slugify";

interface ArticleFormProps {
    categories: Category[];
    initialData?: InitialArticle | null;
    articleId?: string;
}

const ArticleForm = ({ categories, initialData, articleId }: ArticleFormProps) => {
    const router = useRouter();
    const idRef = useRef<string | undefined>(articleId || initialData?.id);

    // Form state
    const [title, setTitle] = useState(initialData?.title || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
    const [categoryId, setCategoryId] = useState(
        initialData?.articleCategoryId || categories[0]?.id || ""
    );
    const [autosaveStatus, setAutosaveStatus] = useState<AutosaveStatus>("idle");
    const [articleStatus, setArticleStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVED">(
        initialData?.status || "DRAFT"
    );
    const [isPublishing, setIsPublishing] = useState(false);

    // Autosave callback (1500ms delay)
    const autosave = useDebouncedCallback(
        async (data: {
            title: string;
            slug: string;
            thumbnail: string;
            content: string;
            excerpt: string;
            categoryId: string;
        }) => {
            if (!data.title.trim() && !data.content.trim()) return;

            try {
                setAutosaveStatus("saving");
                const result = await saveDraft({
                    id: idRef.current,
                    title: data.title,
                    slug: data.slug || slugify(data.title) || `draft-${Date.now()}`,
                    thumbnail: data.thumbnail,
                    content: data.content,
                    excerpt: data.excerpt,
                    articleCategoryId: data.categoryId,
                    status: articleStatus,
                });

                idRef.current = result.id;
                if (!articleId && typeof window !== "undefined") {
                    window.history.replaceState(null, "", `/admin/artikel/${result.id}/edit`);
                }
                setAutosaveStatus("saved");
            } catch (err) {
                console.error("Autosave error:", err);
                setAutosaveStatus("error");
            }
        },
        1500
    );

    function updateField(
        patch: Partial<{
            title: string;
            slug: string;
            thumbnail: string;
            content: string;
            excerpt: string;
            categoryId: string;
        }>
    ) {
        const next = { title, slug, thumbnail, content, excerpt, categoryId, ...patch };
        if (patch.title !== undefined) setTitle(next.title);
        if (patch.slug !== undefined) setSlug(next.slug);
        if (patch.thumbnail !== undefined) setThumbnail(next.thumbnail);
        if (patch.content !== undefined) setContent(next.content);
        if (patch.excerpt !== undefined) setExcerpt(next.excerpt);
        if (patch.categoryId !== undefined) setCategoryId(next.categoryId);
        autosave(next);
    }

    async function handleManualSaveDraft() {
        try {
            setAutosaveStatus("saving");
            const result = await saveDraft({
                id: idRef.current,
                title: title.trim() || "Draft Baru",
                slug: slug.trim() || slugify(title) || `draft-${Date.now()}`,
                thumbnail,
                content,
                excerpt,
                articleCategoryId: categoryId,
                status: "DRAFT",
            });
            idRef.current = result.id;
            setArticleStatus("DRAFT");
            setAutosaveStatus("saved");
            if (!articleId) {
                router.replace(`/admin/artikel/${result.id}/edit`);
            }
        } catch (err) {
            console.error("Save draft error:", err);
            setAutosaveStatus("error");
        }
    }

    async function handlePublish() {
        if (!title.trim()) {
            alert("Harap masukkan judul artikel sebelum mempublikasikan.");
            return;
        }

        try {
            setIsPublishing(true);
            const draftResult = await saveDraft({
                id: idRef.current,
                title: title.trim(),
                slug: slug.trim() || slugify(title) || `artikel-${Date.now()}`,
                thumbnail,
                content,
                excerpt,
                articleCategoryId: categoryId,
                status: "PUBLISHED",
            });

            await publishArticle(draftResult.id);
            setArticleStatus("PUBLISHED");
            router.push("/admin/artikel");
            router.refresh();
        } catch (err) {
            console.error("Publish error:", err);
            alert("Gagal mempublikasikan artikel.");
        } finally {
            setIsPublishing(false);
        }
    }

    const isExisting = Boolean(articleId || initialData?.id);

    return (
        <div className="space-y-6 max-w-(--breakpoint-2xl) mx-auto pb-16">
            {/* Top Action Header */}
            <ArticleFormHeader
                isExisting={isExisting}
                articleStatus={articleStatus}
                autosaveStatus={autosaveStatus}
                isPublishing={isPublishing}
                onSaveDraft={handleManualSaveDraft}
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