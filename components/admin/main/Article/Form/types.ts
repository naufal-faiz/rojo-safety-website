export type Category = {
    id: string;
    name: string;
};

export type ArticleStatusType = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type InitialArticle = {
    id: string;
    title: string;
    slug: string;
    content: string;
    thumbnail?: string | null;
    excerpt?: string | null;
    articleCategoryId: string;
    status: ArticleStatusType;
    views?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string | null;
};

export type ArticleFormData = {
    title: string;
    slug: string;
    thumbnail: string;
    content: string;
    excerpt: string;
    categoryId: string;
};

export type AutosaveStatus = "idle" | "saving" | "saved" | "error";
