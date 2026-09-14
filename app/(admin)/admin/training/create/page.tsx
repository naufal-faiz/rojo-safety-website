import { getAllTrainingCategories } from "@/lib/data/training";
import { TrainingForm } from "@/components/admin/main/Training";

const NewTrainingPage = async () => {
    const categories = await getAllTrainingCategories();

    return <TrainingForm categories={categories} />;
};

export default NewTrainingPage