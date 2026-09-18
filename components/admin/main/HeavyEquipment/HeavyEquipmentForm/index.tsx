"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createHeavyEquipment, updateHeavyEquipment } from "@/lib/data/training/heavyEquipmentAction";
import { HeavyEquipmentFormHeader } from "../Form/HeavyEquipmentFormHeader";
import HeavyEquipmentImageUpload from "../Form/HeavyEquipmentImageUpload";
import { HeavyEquipment, TrainingCategory } from "@/types";

interface HeavyEquipmentFormProps {
    categories: TrainingCategory[];
    initialData?: HeavyEquipment | null;
    equipmentId?: string;
}

const HeavyEquipmentForm = ({
    categories,
    initialData,
    equipmentId,
}: HeavyEquipmentFormProps) => {
    const router = useRouter();
    const isEditing = Boolean(equipmentId);

    const [fields, setFields] = useState({
        name: initialData?.name || "",
        description: initialData?.description || "",
        image: initialData?.image || "",
        trainingCategoryId: initialData?.trainingCategoryId || categories[0]?.id || "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (patch: Partial<typeof fields>) => {
        setFields((f) => ({ ...f, ...patch }));
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);

            if (isEditing && equipmentId) {
                await updateHeavyEquipment(equipmentId, fields);
            } else {
                await createHeavyEquipment(fields);
            }

            router.push("/admin/training/jenis-alat");
            router.refresh();
        } catch (err) {
            console.error("Submit error:", err);
            alert(err instanceof Error ? err.message : "Gagal menyimpan alat berat.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-16">
            <HeavyEquipmentFormHeader
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* KONTEN — 8 kolom */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Nama */}
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Nama Alat Berat <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={fields.name}
                            onChange={(e) => updateField({ name: e.target.value })}
                            placeholder="Contoh: Excavator CAT 320"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg font-semibold text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {/* Deskripsi */}
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Deskripsi Alat <span className="text-red-500">*</span>
                            </label>
                            <span className="text-xs text-gray-400">
                                {fields.description.length} karakter
                            </span>
                        </div>
                        <textarea
                            rows={8}
                            value={fields.description}
                            onChange={(e) => updateField({ description: e.target.value })}
                            placeholder="Jelaskan spesifikasi, cara penggunaan, dan fungsi alat berat ini..."
                            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {/* Gambar */}
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Foto Alat Berat <span className="text-red-500">*</span>
                        </label>
                        <HeavyEquipmentImageUpload
                            value={fields.image}
                            onChange={(url) => updateField({ image: url })}
                            isLoading={isSubmitting}
                        />
                    </div>
                </div>

                {/* SIDEBAR — 4 kolom */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Kategori */}
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
                            Kategori Training <span className="text-red-500">*</span>
                        </h3>
                        <div>
                            {categories.length > 0 ? (
                                <select
                                    value={fields.trainingCategoryId}
                                    onChange={(e) =>
                                        updateField({ trainingCategoryId: e.target.value })
                                    }
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

                    {/* Info */}
                    {initialData && (
                        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
                                Informasi
                            </h3>
                            <div className="space-y-3 text-sm">
                                {initialData.createdAt && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Dibuat:
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300 text-xs">
                                            {new Date(initialData.createdAt).toLocaleDateString(
                                                "id-ID",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </span>
                                    </div>
                                )}
                                {initialData.updatedAt && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Terakhir Diubah:
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300 text-xs">
                                            {new Date(initialData.updatedAt).toLocaleDateString(
                                                "id-ID",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeavyEquipmentForm;
