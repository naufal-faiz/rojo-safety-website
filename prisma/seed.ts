// import ArticleData from "@/components/public/Article/articleData";
import { ArticleCategoryData, ArticleData } from "./seeders/articleData";
import { prisma } from "@/lib/prisma";

async function main() {
    const categoryIdMap = new Map<string, string>()

    for (const [index, category] of ArticleCategoryData.entries()) {
        const created = await prisma.articleCategory.create({
            data: { name: category.name }
        })
        categoryIdMap.set(`${index + 1}`, created.id)
    }

    for (const article of ArticleData) {
        const realCategoryid = categoryIdMap.get(article.article_category_id)

        if (!realCategoryid) {
            console.warn(`Lewati "${article.title}" — article_category_id ${article.article_category_id} tidak ketemu`)
            continue
        }

        await prisma.article.create({
            data: {
                title: article.title,
                slug: article.slug,
                excerpt: article.content.slice(0, 40),
                thumbnail: "/images/article/blog-01.png",
                content: article.content,
                status: "PUBLISHED",
                articleCategoryId: realCategoryid
            }
        })
        console.log(`Seeded: ${article.title}`)
    }
}

main().then(async () => {
    console.log("Seeding Berhasil!")
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})