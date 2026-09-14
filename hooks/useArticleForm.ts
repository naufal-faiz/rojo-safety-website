import usePublishableForm from "./usePublishableForm";
import { publishArticle, saveDraft } from "@/lib/data/article";
import { slugify } from "@/lib/utils/slugify";
import { ArticleFormProps } from "@/types";

type ArticleFields = {
    title: string;
    slug: string;
    thumbnail: string;
    content: string;
    excerpt: string;
    categoryId: string;
};

const useArticleForm = ({ categories, initialData, articleId }: ArticleFormProps) => {
    const form = usePublishableForm<ArticleFields>({
        initialId: articleId || initialData?.id,
        initialStatus: initialData?.status,
        initialFields: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            thumbnail: initialData?.thumbnail || "",
            content: initialData?.content || "",
            excerpt: initialData?.excerpt || "",
            categoryId: initialData?.articleCategoryId || categories[0]?.id || "",
        },
        isEmpty: (f) => !f.title.trim() && !f.content.trim(),
        buildDraftInput: (f, { id, status }) => ({
            id,
            title: f.title,
            slug: f.slug || slugify(f.title) || `draft-${Date.now()}`,
            thumbnail: f.thumbnail,
            content: f.content,
            excerpt: f.excerpt,
            articleCategoryId: f.categoryId,
            status,
        }),
        saveDraft,
        publish: publishArticle,
        getEditUrl: (id) => `/admin/artikel/${id}`,
        listUrl: "/admin/artikel",
        requiredFieldError: "Harap masukkan judul artikel sebelum mempublikasikan.",
    });

    // Ratakan `fields` supaya bentuk return sama persis seperti hook lama
    // (ArticleForm/index.tsx masih destructure title, slug, dst secara langsung)
    return {
        title: form.fields.title,
        slug: form.fields.slug,
        thumbnail: form.fields.thumbnail,
        content: form.fields.content,
        excerpt: form.fields.excerpt,
        categoryId: form.fields.categoryId,
        autosaveStatus: form.autosaveStatus,
        publishedStatus: form.publishedStatus,
        isPublishing: form.isPublishing,
        hasUnsavedChanges: form.hasUnsavedChanges,
        isPublished: form.isPublished,
        isExisting: form.isExisting,
        updateField: form.updateField,
        handleSaveChanges: form.handleSaveChanges,
        handleManualSaveDraft: form.handleManualSaveDraft,
        handlePublish: form.handlePublish,
    };
};

export default useArticleForm;