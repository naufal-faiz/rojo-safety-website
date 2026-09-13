import { AutosaveStatus, InitialTrainingData, TrainingCategory } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useDebouncedCallback from "./useDebouncedCallback";
import { publishTraining, saveDraft } from "@/lib/data/training/trainingAction";
import { slugify } from "@/lib/utils/slugify";
import { CertificationType, PublishedStatus } from "@/lib/generated/prisma/enums";

interface TrainingFormProps {
    categories: TrainingCategory[]
    certificationType?: CertificationType | "KEMNAKER"
    initialData?: InitialTrainingData | null
    trainingId?: string
}

type FormFields = {
    title: string
    slug: string
    image: string
    description: string
    categoryId: string
    certification: CertificationType
}

const useTrainingForm = ({ categories, certificationType, initialData, trainingId }: TrainingFormProps) => {
    const router = useRouter();
    const idRef = useRef<string | undefined>(trainingId || initialData?.id)

    // Form State
    const [title, setTitle] = useState(initialData?.title || "")
    const [slug, setSlug] = useState(initialData?.slug || "")
    const [image, setImage] = useState(initialData?.image || "")
    const [description, setDescription] = useState(initialData?.description || "")
    const [categoryId, setCategoryId] = useState(
        initialData?.trainingCategoryId || categories[0]?.id || ""
    )
    const [certification, setCertification] = useState<CertificationType>(initialData?.certificationType || certificationType[0]?.id || "KEMNAKER")
    const [autosaveStatus, setAutosaveStatus] = useState<AutosaveStatus>("idle")
    const [publishedStatus, setPublishedStatus] = useState<PublishedStatus>(
        initialData?.status || "DRAFT"
    )
    const [isPublishing, setIsPublishing] = useState(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    const isPublished = publishedStatus === "PUBLISHED"
    const isExisting = Boolean(trainingId || initialData?.id)

    // Buat callback autosave delay 1500ms
    const autosave = useDebouncedCallback(
        async (data: FormFields) => {
            if (!data.title.trim() && !data.description.trim()) return

            try {
                setAutosaveStatus("saving")
                const result = await saveDraft({
                    id: idRef.current,
                    title: data.title,
                    slug: data.slug || slugify(data.title) || `training-${Date.now()}`,
                    image: data.image,
                    description: data.description,
                    trainingCategoryId: data.categoryId,
                    status: "DRAFT",
                    certification: "KEMNAKER"
                })

                idRef.current = result.id
                if (!trainingId && typeof window !== undefined) {
                    window.history.replaceState(null, "", `admin/training/${result.id}`)
                }
                setAutosaveStatus("saved")
            } catch (err) {
                console.error("Autosave error:", err)
                setAutosaveStatus("error")
            }
        },
        1500
    )

    function updateField(
        patch: Partial<FormFields>
    ) {
        const next = { title, slug, image, description, categoryId, certification, ...patch }
        if (patch.title !== undefined) setTitle(next.title)
        if (patch.slug !== undefined) setSlug(next.slug)
        if (patch.image !== undefined) setImage(next.image)
        if (patch.description !== undefined) setDescription(next.description)
        if (patch.categoryId !== undefined) setCategoryId(next.categoryId)
        if (patch.certification !== undefined) setCertification(next.certification)
        if (isPublished) {
            setHasUnsavedChanges(true)
            setAutosaveStatus("idle")
        } else {
            autosave(next)
        }
    }

    async function handleSaveChanges() {
        try {
            setAutosaveStatus("saving")
            const result = await saveDraft({
                id: idRef.current,
                title: title.trim(),
                slug: slug.trim() || slugify(title) || `training-${Date.now()}`,
                image, description, certification,
                trainingCategoryId: categoryId,
                status: "PUBLISHED",
            })
            idRef.current = result.id
            setAutosaveStatus("saved")
            setHasUnsavedChanges(false)
            router.refresh()
        } catch (err) {
            console.error("Save changes error: ", err)
            alert("Gagal menyimpan detail training")
        }
    }

    async function handleManualSaveDraft() {
        try {
            setAutosaveStatus("saving");
            const result = await saveDraft({
                id: idRef.current,
                title: title.trim() || "Draft Baru",
                slug: slug.trim() || slugify(title) || `draft-${Date.now()}`,
                image,
                description,
                certification,
                trainingCategoryId: categoryId,
                status: "DRAFT",
            });
            idRef.current = result.id;
            setPublishedStatus("DRAFT");
            setAutosaveStatus("saved");
            if (!trainingId) {
                router.replace(`/admin/training/${result.id}`);
            }
            router.push("/admin/training")
        } catch (err) {
            console.error("Save draft error:", err);
            setAutosaveStatus("error");
        }
    }
    
    async function handlePublish() {
            if (!title.trim()) {
                alert("Harap masukkan judul artikel sebelum mempublikasikan.");
                return;
            }
    
            try {
                setIsPublishing(true);
                const draftResult = await saveDraft({
                    id: idRef.current,
                    title: title.trim(),
                    slug: slug.trim() || slugify(title) || `artikel-${Date.now()}`,
                    image,
                    description,
                    certification,
                    trainingCategoryId: categoryId,
                    status: "PUBLISHED",
                });
    
                await publishTraining(draftResult.id);
                setPublishedStatus("PUBLISHED");
                router.push("/admin/training");
                router.refresh();
            } catch (err) {
                console.error("Publish error: ", err);
                alert("Gagal mempublikasikan detail training.");
            } finally {
                setIsPublishing(false);
            }
        }

        useEffect(() => {
                if (!isPublished || !hasUnsavedChanges) return;
        
                const handler = (e: BeforeUnloadEvent) => {
                    e.preventDefault()
                    e.returnValue = ""
                }
                window.addEventListener("beforeunload", handler)
                return () => window.removeEventListener("beforeunload", handler)
            }, [isPublished, hasUnsavedChanges])
        
            return {
                // fields
                title, slug, image, description, certification, categoryId,
                // status
                autosaveStatus, publishedStatus, isPublishing, hasUnsavedChanges, isPublished, isExisting,
                // actions
                updateField, handleSaveChanges, handleManualSaveDraft, handlePublish
            }
}

export default useTrainingForm