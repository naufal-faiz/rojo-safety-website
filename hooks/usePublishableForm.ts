import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useDebouncedCallback from "./useDebouncedCallback";
import { PublishedStatus } from "@/lib/generated/prisma/enums";
import { AutosaveStatus } from "@/types";

interface UsePublishableFormConfig<TFields extends Record<string, unknown>> {
    initialId?: string;
    initialStatus?: PublishedStatus;
    initialFields: TFields;
    /** Kapan draft dianggap "kosong" sehingga autosave tidak perlu jalan */
    isEmpty: (fields: TFields) => boolean;
    /** Ubah field form + id + status target jadi payload untuk saveDraft */
    buildDraftInput: (fields: TFields, ctx: { id?: string; status: PublishedStatus }) => unknown;
    saveDraft: (input: any) => Promise<{ id: string }>;
    /** Opsional: kalau entity ini tidak punya alur publish terpisah, boleh dikosongkan */
    publish?: (id: string) => Promise<unknown>;
    getEditUrl: (id: string) => string;
    listUrl: string;
    requiredFieldError?: string;
    autosaveDelay?: number;
}

export default function usePublishableForm<TFields extends Record<string, unknown>>(
    config: UsePublishableFormConfig<TFields>
) {
    const router = useRouter();
    const idRef = useRef<string | undefined>(config.initialId);

    const [fields, setFields] = useState<TFields>(config.initialFields);
    const [autosaveStatus, setAutosaveStatus] = useState<AutosaveStatus>("idle");
    const [publishedStatus, setPublishedStatus] = useState<PublishedStatus>(
        config.initialStatus ?? "DRAFT"
    );
    const [isPublishing, setIsPublishing] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const isPublished = publishedStatus === "PUBLISHED";
    const isExisting = Boolean(config.initialId);

    const autosave = useDebouncedCallback(async (next: TFields) => {
        if (config.isEmpty(next)) return;

        try {
            setAutosaveStatus("saving");
            const result = await config.saveDraft(
                config.buildDraftInput(next, { id: idRef.current, status: "DRAFT" })
            );
            idRef.current = result.id;
            if (!config.initialId && typeof window !== "undefined") {
                window.history.replaceState(null, "", config.getEditUrl(result.id));
            }
            setAutosaveStatus("saved");
        } catch (err) {
            console.error("Autosave error:", err);
            setAutosaveStatus("error");
        }
    }, config.autosaveDelay ?? 1500);

    function updateField(patch: Partial<TFields>) {
        const next = { ...fields, ...patch };
        setFields(next);

        if (isPublished) {
            // Jangan autosave ke record yang sedang live dibaca publik
            setHasUnsavedChanges(true);
            setAutosaveStatus("idle");
        } else {
            autosave(next);
        }
    }

    async function handleSaveChanges() {
        try {
            setAutosaveStatus("saving");
            const result = await config.saveDraft(
                config.buildDraftInput(fields, { id: idRef.current, status: "PUBLISHED" })
            );
            idRef.current = result.id;
            setAutosaveStatus("saved");
            setHasUnsavedChanges(false);
            router.refresh();
        } catch (err) {
            console.error("Save changes error:", err);
            setAutosaveStatus("error");
            alert("Gagal menyimpan perubahan.");
        }
    }

    async function handleManualSaveDraft() {
        try {
            setAutosaveStatus("saving");
            const result = await config.saveDraft(
                config.buildDraftInput(fields, { id: idRef.current, status: "DRAFT" })
            );
            idRef.current = result.id;
            setPublishedStatus("DRAFT");
            setAutosaveStatus("saved");
            if (!config.initialId) {
                router.replace(config.getEditUrl(result.id));
            }
        } catch (err) {
            console.error("Save draft error:", err);
            setAutosaveStatus("error");
        }
    }

    async function handlePublish() {
        if (config.isEmpty(fields)) {
            alert(config.requiredFieldError ?? "Harap lengkapi data sebelum mempublikasikan.");
            return;
        }
        if (!config.publish) return;

        try {
            setIsPublishing(true);
            const draftResult = await config.saveDraft(
                config.buildDraftInput(fields, { id: idRef.current, status: "PUBLISHED" })
            );
            await config.publish(draftResult.id);
            setPublishedStatus("PUBLISHED");
            router.push(config.listUrl);
            router.refresh();
        } catch (err) {
            console.error("Publish error:", err);
            alert("Gagal mempublikasikan.");
        } finally {
            setIsPublishing(false);
        }
    }

    useEffect(() => {
        if (!isPublished || !hasUnsavedChanges) return;
        const handler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };
        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [isPublished, hasUnsavedChanges]);

    return {
        fields,
        updateField,
        autosaveStatus,
        publishedStatus,
        isPublishing,
        hasUnsavedChanges,
        isPublished,
        isExisting,
        handleSaveChanges,
        handleManualSaveDraft,
        handlePublish,
    };
}