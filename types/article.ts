import { Prisma } from "@/lib/generated/prisma/client";
import { PublishedStatus } from "@/lib/generated/prisma/enums";

export type ArticleCategory = {
    id: string;
    name: string;
};

export type ArticleWithCategory = Prisma.ArticleGetPayload<{
    include: { category: true };
}>;

export type ArticleFormProps = {
    categories: ArticleCategory[];
    initialData?: InitialArticle | null;
    articleId?: string;
}

export type InitialArticle = {
    id: string;
    title: string;
    slug: string;
    content: string;
    thumbnail?: string | null;
    excerpt?: string | null;
    articleCategoryId: string;
    status: PublishedStatus;
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

