"use client";

import { TrainingSidebar } from "../Form";
import { ContentEditor, FormHeader, TitleSlugField } from "@/components/common";
import { TrainingCategory, InitialTrainingData } from "@/types";
import { useTrainingForm } from "@/hooks";

interface TrainingFormProps {
    categories: TrainingCategory[];
    initialData?: InitialTrainingData | null;
    trainingId?: string;
}

const TrainingForm = ({ categories, initialData, trainingId }: TrainingFormProps) => {
    const {
        title, slug, image, description, categoryId, certification,
        autosaveStatus, publishedStatus, isPublishing, hasUnsavedChanges,
        isPublished, isExisting, updateField, handleSaveChanges,
        handleManualSaveDraft, handlePublish,
    } = useTrainingForm({ categories, initialData, trainingId });

    return (
        <div className="space-y-6 max-w-(--breakpoint-2xl) mx-auto pb-16">
            <FormHeader
                title="Training"
                backHref="training"
                isExisting={isExisting}
                subtitleEdit="Perbarui detail atau status publikasi training"
                subtitleCreate="Buat data training K3 atau sertifikasi alat berat baru"
                publishedStatus={publishedStatus}
                autosaveStatus={autosaveStatus}
                isPublishing={isPublishing}
                isPublished={isPublished}
                hasUnsavedChanges={hasUnsavedChanges}
                onSaveDraft={handleManualSaveDraft}
                onSaveChanges={handleSaveChanges}
                onPublish={handlePublish}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                    <TitleSlugField
                        title={title}
                        slug={slug}
                        basePath="/training/"
                        titleLabel="Judul Training"
                        titlePlaceholder="Masukkan judul training yang menarik..."
                        onTitleChange={(newTitle, newSlug) =>
                            updateField({ title: newTitle, slug: newSlug })
                        }
                        onSlugChange={(newSlug) => updateField({ slug: newSlug })}
                    />

                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Deskripsi Training <span className="text-red-500">*</span>
                            </label>
                            <span className="text-xs text-gray-400">
                                Gunakan toolbar untuk format teks, gambar, & link
                            </span>
                        </div>
                        {/* <textarea
                            rows={10}
                            placeholder="Jelaskan cakupan materi, target peserta, dan manfaat training ini..."
                            value={description}
                            onChange={(e) => updateField({ description: e.target.value })}
                            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        /> */}
                        <ContentEditor
                            value={description}
                            onChange={(html) => updateField({ description: html })}
                        />
                    </div>
                </div>

                <TrainingSidebar
                    categories={categories}
                    categoryId={categoryId}
                    certification={certification}
                    image={image}
                    trainingStatus={publishedStatus}
                    initialData={initialData}
                    onCategoryChange={(catId) => updateField({ categoryId: catId })}
                    onCertificationChange={(cert) => updateField({ certification: cert })}
                    onImageChange={(imgUrl) => updateField({ image: imgUrl })}
                />
            </div>
        </div>
    );
};

export default TrainingForm;