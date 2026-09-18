"use client";

import { uploadImage, UploadError } from "@/lib/supabase/uploadImage";
import Image from "next/image";
import { useRef, useState } from "react";

type HeavyEquipmentImageUploadProps = {
    value?: string | null;
    onChange: (url: string) => void;
    isLoading?: boolean;
};

const HeavyEquipmentImageUpload = ({ value, onChange, isLoading = false }: HeavyEquipmentImageUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (file: File) => {
        if (!file) return;

        try {
            setUploading(true);
            const publicUrl = await uploadImage(file, "heavy-equipments", "equipment");
            onChange(publicUrl);
        } catch (err) {
            const message =
                err instanceof UploadError ? err.message : "Terjadi kesalahan saat mengunggah gambar.";
            console.error("Heavy equipment image upload error:", err);
            alert(message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileUpload(file);
    };

    const hasCustomImage = value && value !== "/images/no-image.jpg" && value !== "";

    return (
        <div className="space-y-3">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading || isLoading}
                className="hidden"
            />

            {hasCustomImage ? (
                <div className="relative group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
                    <div className="relative aspect-video w-full">
                        <Image
                            src={value!}
                            alt="Gambar Alat Berat"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 400px"
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading || isLoading}
                            className="px-3 py-1.5 text-xs font-medium bg-white text-gray-800 hover:bg-gray-100 rounded-lg shadow-md transition-colors"
                        >
                            Ganti Gambar
                        </button>
                        <button
                            type="button"
                            onClick={() => onChange("")}
                            className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white hover:bg-red-700 rounded-lg shadow-md transition-colors"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                        dragOver
                            ? "border-brand-500 bg-brand-50/40 dark:bg-brand-950/20"
                            : "border-gray-300 dark:border-gray-700 hover:border-brand-400 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                >
                    {uploading || isLoading ? (
                        <div className="flex flex-col items-center justify-center gap-2 py-4">
                            <span className="animate-spin size-6 border-2 border-brand-500 border-t-transparent rounded-full" />
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {uploading ? "Mengunggah gambar..." : "Memproses..."}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2 py-2">
                            <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-500 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.75}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                                    Unggah gambar alat berat
                                </p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                    Klik atau seret file ke sini (PNG, JPG, WebP)
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HeavyEquipmentImageUpload;
