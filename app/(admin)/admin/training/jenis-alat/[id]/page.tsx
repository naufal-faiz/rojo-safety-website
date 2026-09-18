import { notFound } from "next/navigation";
import { getAllTrainingCategories } from "@/lib/data/training/trainingCategory";
import { getHeavyEquipmentById } from "@/lib/data/training/heavyEquipment";
import { HeavyEquipmentForm } from "@/components/admin/main/HeavyEquipment";

type PageProps = {
    params: Promise<{ id: string }>;
};

const EditHeavyEquipmentPage = async ({ params }: PageProps) => {
    const { id } = await params;
    const [equipment, categoriesResult] = await Promise.all([
        getHeavyEquipmentById(id),
        getAllTrainingCategories({ limit: 100 }),
    ]);

    if (!equipment) {
        notFound();
    }

    return (
        <HeavyEquipmentForm
            categories={categoriesResult.data}
            initialData={equipment}
            equipmentId={id}
        />
    );
};

export default EditHeavyEquipmentPage;
