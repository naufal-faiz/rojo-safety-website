"use client";

interface EditorStatsProps {
    wordCount: number;
    characterCount: number;
    estimatedReadTime: number;
}

export const EditorStats = ({
    wordCount,
    characterCount,
    estimatedReadTime,
}: EditorStatsProps) => {
    return (
        <div className="flex flex-wrap items-center justify-between border-t border-gray-200 bg-gray-50/50 px-4 py-2 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-400">
            <div className="flex items-center gap-3">
                <span>{wordCount} kata</span>
                <span>•</span>
                <span>{characterCount} karakter</span>
                <span>•</span>
                <span>~{estimatedReadTime} menit baca</span>
            </div>
            <div className="text-[11px] text-gray-400">
                Tiptap Rich Text Editor
            </div>
        </div>
    );
};
