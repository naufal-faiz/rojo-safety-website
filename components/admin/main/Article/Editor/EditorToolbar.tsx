"use client";

import { Editor } from "@tiptap/react";

interface EditorToolbarProps {
    editor: Editor;
    isUploadingImage: boolean;
    onOpenLinkModal: () => void;
    onUploadClick: () => void;
}

export const EditorToolbar = ({
    editor,
    isUploadingImage,
    onOpenLinkModal,
    onUploadClick,
}: EditorToolbarProps) => {
    return (
        <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50/80 p-2 text-gray-700 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-200">
            {/* 1. Format / Heading Group */}
            <div className="flex items-center gap-0.5 pr-1 border-r border-gray-300 dark:border-gray-700">
                <button
                    type="button"
                    title="Paragraf Biasa"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${editor.isActive("paragraph") && !editor.isActive("heading")
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    Teks
                </button>
                <button
                    type="button"
                    title="Judul Utama (H1)"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${editor.isActive("heading", { level: 1 })
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    H1
                </button>
                <button
                    type="button"
                    title="Sub Judul (H2)"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${editor.isActive("heading", { level: 2 })
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    H2
                </button>
                <button
                    type="button"
                    title="Sub Bagian (H3)"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${editor.isActive("heading", { level: 3 })
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    H3
                </button>
                <button
                    type="button"
                    title="Seksi Kecil (H4)"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${editor.isActive("heading", { level: 4 })
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    H4
                </button>
            </div>

            {/* 2. Inline Style Group */}
            <div className="flex items-center gap-0.5 px-1 border-r border-gray-300 dark:border-gray-700">
                <button
                    type="button"
                    title="Tebal (Ctrl+B)"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`w-7 h-7 flex items-center justify-center font-bold text-sm rounded-md transition-all ${editor.isActive("bold")
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    B
                </button>
                <button
                    type="button"
                    title="Miring (Ctrl+I)"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`w-7 h-7 flex items-center justify-center italic font-serif text-sm rounded-md transition-all ${editor.isActive("italic")
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    I
                </button>
                <button
                    type="button"
                    title="Coretan (Strikethrough)"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`w-7 h-7 flex items-center justify-center line-through text-sm rounded-md transition-all ${editor.isActive("strike")
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    S
                </button>
                <button
                    type="button"
                    title="Kode Inline"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={`px-1.5 h-7 flex items-center justify-center font-mono text-xs rounded-md transition-all ${editor.isActive("code")
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    &lt;/&gt;
                </button>
            </div>

            {/* 3. Lists & Blocks Group */}
            <div className="flex items-center gap-0.5 px-1 border-r border-gray-300 dark:border-gray-700">
                <button
                    type="button"
                    title="Daftar Poin (Bullet List)"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 h-7 flex items-center gap-1 text-xs font-medium rounded-md transition-all ${editor.isActive("bulletList")
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" />
                        <circle cx="4" cy="6" r="2" fill="currentColor" /><circle cx="4" cy="12" r="2" fill="currentColor" /><circle cx="4" cy="18" r="2" fill="currentColor" />
                    </svg>
                </button>
                <button
                    type="button"
                    title="Daftar Nomor (Numbered List)"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 h-7 flex items-center gap-1 text-xs font-medium rounded-md transition-all ${editor.isActive("orderedList")
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" />
                        <path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                    </svg>
                </button>
                <button
                    type="button"
                    title="Kutipan (Quote)"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`w-7 h-7 flex items-center justify-center font-serif text-base rounded-md transition-all ${editor.isActive("blockquote")
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    “
                </button>
                <button
                    type="button"
                    title="Blok Kode (Code Block)"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`px-1.5 h-7 flex items-center justify-center text-xs font-mono rounded-md transition-all ${editor.isActive("codeBlock")
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    {`{ }`}
                </button>
                <button
                    type="button"
                    title="Garis Pembatas (Divider)"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className="px-1.5 h-7 flex items-center justify-center text-xs font-medium text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-all"
                >
                    ―
                </button>
            </div>

            {/* 4. Media & Insert Group (Link & Upload Gambar) */}
            <div className="flex items-center gap-0.5 px-1 border-r border-gray-300 dark:border-gray-700">
                <button
                    type="button"
                    title="Sematkan Tautan (Link)"
                    onClick={onOpenLinkModal}
                    className={`w-7 h-7 flex items-center justify-center text-xs rounded-md transition-all ${editor.isActive("link")
                            ? "bg-brand-500 text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                    </svg>
                </button>
                <button
                    type="button"
                    title="Unggah Gambar"
                    disabled={isUploadingImage}
                    onClick={onUploadClick}
                    className="px-2 h-7 flex items-center gap-1 text-xs font-medium text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-all disabled:opacity-50"
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                    {isUploadingImage ? "Mengunggah..." : "Gambar"}
                </button>
            </div>

            {/* 5. Actions & History Group */}
            <div className="flex items-center gap-0.5 pl-1 ml-auto">
                <button
                    type="button"
                    title="Hapus Format (Clear Formatting)"
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                    className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-gray-600 hover:bg-gray-200/70 dark:text-gray-400 dark:hover:bg-gray-700 rounded-md transition-all"
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <button
                    type="button"
                    title="Urungkan (Undo Ctrl+Z)"
                    disabled={!editor.can().undo()}
                    onClick={() => editor.chain().focus().undo().run()}
                    className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200/70 dark:text-gray-400 dark:hover:bg-gray-700 rounded-md transition-all disabled:opacity-30"
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 7v6h6" /><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
                    </svg>
                </button>
                <button
                    type="button"
                    title="Ulangi (Redo Ctrl+Y)"
                    disabled={!editor.can().redo()}
                    onClick={() => editor.chain().focus().redo().run()}
                    className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200/70 dark:text-gray-400 dark:hover:bg-gray-700 rounded-md transition-all disabled:opacity-30"
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 7v6h-6" /><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13" />
                    </svg>
                </button>
            </div>
        </div>
    );
};