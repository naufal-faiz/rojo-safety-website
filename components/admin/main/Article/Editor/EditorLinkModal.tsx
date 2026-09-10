"use client";

import { Editor } from "@tiptap/react";

interface EditorLinkModalProps {
    editor: Editor;
    url: string;
    onUrlChange: (url: string) => void;
    onApply: () => void;
    onClose: () => void;
}

export const EditorLinkModal = ({
    editor,
    url,
    onUrlChange,
    onApply,
    onClose,
}: EditorLinkModalProps) => {
    return (
        <div className="flex items-center gap-2 border-b border-gray-200 bg-brand-50/50 p-2.5 dark:border-gray-800 dark:bg-brand-950/20">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Tautan:
            </span>
            <input
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        onApply();
                    } else if (e.key === "Escape") {
                        onClose();
                    }
                }}
                autoFocus
                className="flex-1 rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
            <button
                type="button"
                onClick={onApply}
                className="rounded-md bg-brand-500 px-3 py-1 text-xs font-medium text-white hover:bg-brand-600 transition-colors"
            >
                Terapkan
            </button>
            {editor.isActive("link") && (
                <button
                    type="button"
                    onClick={() => {
                        editor.chain().focus().extendMarkRange("link").unsetLink().run();
                        onClose();
                    }}
                    className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400 transition-colors"
                >
                    Hapus Link
                </button>
            )}
            <button
                type="button"
                onClick={onClose}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-1"
            >
                Batal
            </button>
        </div>
    );
};
