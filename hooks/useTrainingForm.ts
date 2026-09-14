import usePublishableForm from "./usePublishableForm";
import { publishTraining, saveDraft } from "@/lib/data/training/trainingAction";
import { TrainingCategory, InitialTrainingData } from "@/types";
import { slugify } from "@/lib/utils/slugify";
import { CertificationType } from "@/lib/generated/prisma/enums";

interface TrainingFormProps {
    categories: TrainingCategory[];
    /** Nilai default sertifikasi untuk training BARU. Bukan array — cukup satu nilai. */
    defaultCertification?: CertificationType;
    initialData?: InitialTrainingData | null;
    trainingId?: string;
}

type TrainingFields = {
    title: string;
    slug: string;
    image: string;
    description: string;
    categoryId: string;
    certification: CertificationType;
};

const useTrainingForm = ({
    categories,
    defaultCertification = "KEMNAKER",
    initialData,
    trainingId,
}: TrainingFormProps) => {
    const form = usePublishableForm<TrainingFields>({
        initialId: trainingId || initialData?.id,
        initialStatus: initialData?.status,
        initialFields: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            image: initialData?.image || "",
            description: initialData?.description || "",
            categoryId: initialData?.trainingCategoryId || categories[0]?.id || "",
            certification: initialData?.certification || defaultCertification,
        },
        isEmpty: (f) => !f.title.trim() && !f.description.trim(),
        buildDraftInput: (f, { id, status }) => ({
            id,
            title: f.title,
            slug: f.slug || slugify(f.title) || `training-${Date.now()}`,
            image: f.image,
            description: f.description,
            trainingCategoryId: f.categoryId,
            certification: f.certification,
            status,
        }),
        saveDraft,
        publish: publishTraining,
        getEditUrl: (id) => `/admin/training/${id}`,
        listUrl: "/admin/training",
        requiredFieldError: "Harap masukkan judul training sebelum mempublikasikan.",
    });

    return {
        title: form.fields.title,
        slug: form.fields.slug,
        image: form.fields.image,
        description: form.fields.description,
        categoryId: form.fields.categoryId,
        certification: form.fields.certification,
        autosaveStatus: form.autosaveStatus,
        publishedStatus: form.publishedStatus,
        isPublishing: form.isPublishing,
        hasUnsavedChanges: form.hasUnsavedChanges,
        isPublished: form.isPublished,
        isExisting: form.isExisting,
        updateField: form.updateField,
        handleSaveChanges: form.handleSaveChanges,
        handleManualSaveDraft: form.handleManualSaveDraft,
        handlePublish: form.handlePublish,
    };
};

export default useTrainingForm;