type CategoryStatsProps = {
    total: number;
    totalItems: number;
    itemLabel: string;
};

export function CategoryStats({
    total,
    totalItems,
    itemLabel,
}: CategoryStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
                <p className="text-xs font-medium text-gray-500">
                    Total Kategori
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                    {total}
                </h3>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
                <p className="text-xs font-medium text-gray-500">
                    Total {itemLabel}
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                    {totalItems}
                </h3>
            </div>
        </div>
    );
}