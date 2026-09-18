import { getAllTrainingCategories } from "@/lib/data/training/trainingCategory";
import { HeavyEquipmentForm } from "@/components/admin/main/HeavyEquipment";

const CreateHeavyEquipmentPage = async () => {
    const categoriesResult = await getAllTrainingCategories({ take: 100 });

    return (
        <HeavyEquipmentForm
            categories={categoriesResult.data}
            initialData={null}
        />
    );
};

export default CreateHeavyEquipmentPage;
