import { getAllTrainingCategories } from "@/lib/data/training/trainingcategory/trainingCategory";
import { TrainingForm } from "@/components/admin/main/Training";

const NewTrainingPage = async () => {
    const categories = await getAllTrainingCategories();

    return <TrainingForm categories={categories.data} />;
};

export default NewTrainingPage