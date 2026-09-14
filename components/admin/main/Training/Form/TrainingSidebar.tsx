"use client";

import TrainingImageUpload from "./TrainingImageUpload";
import { TrainingCategory, InitialTrainingData } from "@/types";
import { CertificationType, PublishedStatus } from "@/lib/generated/prisma/enums";

const CERTIFICATION_OPTIONS: { value: CertificationType; label: string }[] = [
    { value: "KEMNAKER", label: "Kemnaker" },
    { value: "BNSP", label: "BNSP" },
    { value: "NONE", label: "Tanpa Sertifikasi" },
];

interface TrainingSidebarProps {
    categories: TrainingCategory[];
    categoryId: string;
    certification: CertificationType;
    image: string;
    trainingStatus: PublishedStatus;
    initialData?: InitialTrainingData | null;
    onCategoryChange: (categoryId: string) => void;
    onCertificationChange: (certification: CertificationType) => void;
    onImageChange: (imageUrl: string) => void;
}

export const TrainingSidebar = ({
    categories,
    categoryId,
    certification,
    image,
    trainingStatus,
    initialData,
    onCategoryChange,
    onCertificationChange,
    onImageChange,
}: TrainingSidebarProps) => {
    return (
        <div className="lg:col-span-4 space-y-6">
            {/* Status & Publikasi */}
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
                    Status & Publikasi
                </h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Status Saat Ini:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {trainingStatus === "PUBLISHED" ? "Dipublikasikan" : "Draf"}
                        </span>
                    </div>
                    {initialData?.createdAt && (
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Dibuat:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-xs">
                                {new Date(initialData.createdAt).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                    )}
                    {initialData?.updatedAt && (
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Terakhir Diubah:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-xs">
                                {new Date(initialData.updatedAt).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Kategori */}
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
                    Kategori Training <span className="text-red-500">*</span>
                </h3>
                <div>
                    {categories.length > 0 ? (
                        <select
                            value={categoryId}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        >
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                            Belum ada kategori training yang dibuat.
                        </p>
                    )}
                </div>
            </div>

            {/* Sertifikasi */}
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
                    Jenis Sertifikasi
                </h3>
                <select
                    value={certification}
                    onChange={(e) => onCertificationChange(e.target.value as CertificationType)}
                    className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                    {CERTIFICATION_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Gambar */}
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        Gambar Training
                    </h3>
                </div>
                <TrainingImageUpload value={image} onChange={onImageChange} />
            </div>
        </div>
    );
};