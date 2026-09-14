import { getAllTrainingCategories } from "@/lib/data/training";
import { getTrainingById } from "@/lib/data/training";
import { TrainingForm } from "@/components/admin/main/Training";
import { notFound } from "next/navigation";

type EditTrainingProps = { params: Promise<{ id: string }> };

const EditTrainingPage = async ({ params }: EditTrainingProps) => {
    const { id } = await params;

    const [categories, training] = await Promise.all([
        getAllTrainingCategories(),
        getTrainingById(id),
    ]);

    if (!training) {
        notFound();
    }

    return (
        <TrainingForm
            categories={categories}
            initialData={training}
            trainingId={id}
        />
    );
};

export default EditTrainingPage;