const EmptyState = ({ title, description }: { title: string, description: string }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            </div>
            <p className="font-medium text-gray-800 dark:text-gray-200">{title}</p>
            <p className="text-xs text-gray-400">{description}</p>
        </div>
    )
}

export default EmptyState
