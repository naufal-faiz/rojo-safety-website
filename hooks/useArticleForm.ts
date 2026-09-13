import { useDebouncedCallback } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { publishArticle, saveDraft } from "@/lib/data/article/articleAction";
import { Category, InitialArticle, AutosaveStatus } from "@/types";
import { slugify } from "@/lib/utils/slugify";
import { PublishedStatus } from "@/lib/generated/prisma/enums";

interface ArticleFormProps {
    categories: Category[];
    initialData?: InitialArticle | null;
    articleId?: string;
}

type FormFields = {
    title: string
    slug: string
    thumbnail: string
    content: string
    excerpt: string
    categoryId: string
}

const useArticleForm = ({ categories, initialData, articleId }: ArticleFormProps) => {
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
    const [publishedStatus, setPublishedStatus] = useState<PublishedStatus>(
        initialData?.status || "DRAFT"
    );
    const [isPublishing, setIsPublishing] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    const isPublished = publishedStatus === "PUBLISHED"
    const isExisting = Boolean(articleId || initialData?.id)

    // Autosave callback (1500ms delay)
    const autosave = useDebouncedCallback(
        async (data: FormFields) => {
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
                    status: "DRAFT",
                });

                idRef.current = result.id;
                if (!articleId && typeof window !== "undefined") {
                    window.history.replaceState(null, "", `/admin/artikel/${result.id}`);
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
        patch: Partial<FormFields>
    ) {
        const next = { title, slug, thumbnail, content, excerpt, categoryId, ...patch };
        if (patch.title !== undefined) setTitle(next.title);
        if (patch.slug !== undefined) setSlug(next.slug);
        if (patch.thumbnail !== undefined) setThumbnail(next.thumbnail);
        if (patch.content !== undefined) setContent(next.content);
        if (patch.excerpt !== undefined) setExcerpt(next.excerpt);
        if (patch.categoryId !== undefined) setCategoryId(next.categoryId);
        if (isPublished) {
            // Nonaktifkan autosave jika status artikel yang diedit adalah "PUBLISHED"
            setHasUnsavedChanges(true)
            setAutosaveStatus("idle")
        } else {
            autosave(next);
        }
    }

    async function handleSaveChanges() {
        try {
            setAutosaveStatus("saving")
            const result = await saveDraft({
                id: idRef.current,
                title: title.trim(),
                slug: slug.trim() || slugify(title) || `artikel-${Date.now()}`,
                thumbnail,
                content,
                excerpt,
                articleCategoryId: categoryId,
                status: "PUBLISHED", // tetap published, hanya update kontennya
            });
            idRef.current = result.id;
            setAutosaveStatus("saved");
            setHasUnsavedChanges(false);
            router.refresh();
        } catch (err) {
            console.error("Save changes error:", err);
            setAutosaveStatus("error");
            alert("Gagal menyimpan perubahan.");
        }
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
            setPublishedStatus("DRAFT");
            setAutosaveStatus("saved");
            if (!articleId) {
                router.replace(`/admin/artikel/${result.id}`);
            }
            router.push("/admin/artikel")
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
            setPublishedStatus("PUBLISHED");
            router.push("/admin/artikel");
            router.refresh();
        } catch (err) {
            console.error("Publish error: ", err);
            alert("Gagal mempublikasikan artikel.");
        } finally {
            setIsPublishing(false);
        }
    }

    useEffect(() => {
        if (!isPublished || !hasUnsavedChanges) return;

        const handler = (e: BeforeUnloadEvent) => {
            e.preventDefault()
            e.returnValue = ""
        }
        window.addEventListener("beforeunload", handler)
        return () => window.removeEventListener("beforeunload", handler)
    }, [isPublished, hasUnsavedChanges])

    return {
        // fields
        title, slug, thumbnail, content, excerpt, categoryId,
        // status
        autosaveStatus, publishedStatus, isPublishing, hasUnsavedChanges, isPublished, isExisting,
        // actions
        updateField, handleSaveChanges, handleManualSaveDraft, handlePublish
    }
}

export default useArticleForm