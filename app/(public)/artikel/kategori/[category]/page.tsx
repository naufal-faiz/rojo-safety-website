export default async function CategoryArticlesPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-2xl font-bold">Kategori: {category}</h1>
        </div>
    );
}
