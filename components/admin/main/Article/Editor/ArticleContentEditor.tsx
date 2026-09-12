"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ResizeImage from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { EditorToolbar } from "./EditorToolbar";
import { EditorLinkModal } from "./EditorLinkModal";
import { EditorStats } from "./EditorStats";

export interface ArticleContentEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export const ArticleContentEditor = ({
    value,
    onChange,
    placeholder = "Tulis isi artikel yang menarik di sini...",
}: ArticleContentEditorProps) => {
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4],
                },
            }),
            ResizeImage.configure({
                inline: true,
                HTMLAttributes: {
                    class: "rounded-lg max-w-full h-auto my-4 border border-gray-200 dark:border-gray-700 shadow-sm transition-all",
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-brand-500 font-medium underline underline-offset-2 hover:text-brand-600 transition-colors",
                    target: "_blank",
                    rel: "noopener noreferrer",
                },
            }),
        ],
        content: value || "",
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class:
                    "min-h-[360px] max-h-[700px] overflow-y-auto w-full px-5 py-4 focus:outline-none dark:text-gray-100 prose prose-slate dark:prose-invert max-w-none text-base leading-relaxed selection:bg-brand-100 selection:text-brand-900",
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html === "<p></p>" ? "" : html);
        },
    });

    // Sync external value with editor content
    useEffect(() => {
        if (editor) {
            const currentHTML = editor.getHTML();
            const normalizedValue = value || "";
            if (normalizedValue !== currentHTML && (normalizedValue !== "" || currentHTML !== "<p></p>")) {
                editor.commands.setContent(normalizedValue);
            }
        }
    }, [value, editor]);

    if (!editor) return null;

    const handleOpenLinkModal = () => {
        const previousUrl = editor.getAttributes("link").href || "";
        setLinkUrl(previousUrl);
        setShowLinkModal(true);
    };

    const handleApplyLink = () => {
        if (!linkUrl.trim()) {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
        } else {
            let formattedUrl = linkUrl.trim();
            if (!/^https?:\/\//i.test(formattedUrl) && !formattedUrl.startsWith("/") && !formattedUrl.startsWith("#")) {
                formattedUrl = `https://${formattedUrl}`;
            }
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: formattedUrl })
                .run();
        }
        setShowLinkModal(false);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploadingImage(true);
            const supabase = createClient();
            const fileExt = file.name.split(".").pop();
            const fileName = `content-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("articles")
                .upload(fileName, file);

            if (uploadError) {
                alert("Gagal mengunggah gambar: " + uploadError.message);
                return;
            }

            const { data } = supabase.storage.from("articles").getPublicUrl(fileName);
            if (data?.publicUrl) {
                editor.chain().focus().setImage({ src: data.publicUrl }).run();
            }
        } catch (err) {
            console.error("Upload error:", err);
            alert("Terjadi kesalahan saat mengunggah gambar.");
        } finally {
            setIsUploadingImage(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    // Calculate word & character statistics
    const editorText = editor.getText();
    const characterCount = editorText.length;
    const wordCount = editorText.trim() ? editorText.trim().split(/\s+/).length : 0;
    const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
            />

            <EditorToolbar
                editor={editor}
                isUploadingImage={isUploadingImage}
                onOpenLinkModal={handleOpenLinkModal}
                onUploadClick={() => fileInputRef.current?.click()}
            />

            {showLinkModal && (
                <EditorLinkModal
                    editor={editor}
                    url={linkUrl}
                    onUrlChange={setLinkUrl}
                    onApply={handleApplyLink}
                    onClose={() => setShowLinkModal(false)}
                />
            )}

            <div className="relative">
                {editor.isEmpty && (
                    <div className="pointer-events-none absolute left-5 top-4 text-gray-400 dark:text-gray-500 text-base">
                        {placeholder}
                    </div>
                )}
                <EditorContent editor={editor} />
            </div>

            <EditorStats
                wordCount={wordCount}
                characterCount={characterCount}
                estimatedReadTime={estimatedReadTime}
            />
        </div>
    );
};

export default ArticleContentEditor;