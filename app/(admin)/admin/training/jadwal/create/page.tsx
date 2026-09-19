import { getAllTrainings } from "@/lib/data/training/training";
import { ScheduleForm } from "@/components/admin/main/Schedule/";

const CreateSchedulePage = async () => {
    const trainingsResult = await getAllTrainings({ status: "PUBLISHED", limit: 100 });

    return (
        <ScheduleForm
            trainings={trainingsResult.data.map((t) => ({ id: t.id, title: t.title }))}
            initialData={null}
        />
    );
};

export default CreateSchedulePage;