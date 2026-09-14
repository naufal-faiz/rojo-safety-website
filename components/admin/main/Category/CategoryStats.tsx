type CategoryStatsProps = {
    totalCategories: number;
    totalItems: number;
    publishedItems: number;
    itemLabel: string;
};

export default function CategoryStats({
    totalCategories,
    totalItems,
    publishedItems,
    itemLabel,
}: CategoryStatsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Kategori</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {totalCategories}
                    </h3>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-green-600 dark:text-green-400">Total {itemLabel}</p>
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mt-1">
                        {totalItems}
                    </h3>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400">{itemLabel} Terbit</p>
                    <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">
                        {publishedItems}
                    </h3>
                </div>
            </div>
    );
}