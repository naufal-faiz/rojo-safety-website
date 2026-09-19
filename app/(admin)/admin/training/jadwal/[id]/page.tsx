import { notFound } from "next/navigation";
import { getAllTrainings } from "@/lib/data/training/training";
import { getScheduleById } from "@/lib/data/training/trainingSchedule/trainingSchedule";
import { ScheduleForm } from "@/components/admin/main/Schedule";

type PageProps = {
    params: Promise<{ id: string }>;
};

const EditSchedulePage = async ({ params }: PageProps) => {
    const { id } = await params;
    const [schedule, trainingsResult] = await Promise.all([
        getScheduleById(id),
        getAllTrainings({ status: "PUBLISHED", limit: 100 }),
    ]);

    if (!schedule) {
        notFound();
    }

    return (
        <ScheduleForm
            trainings={trainingsResult.data.map((t) => ({ id: t.id, title: t.title }))}
            initialData={schedule}
            scheduleId={id}
        />
    );
};

export default EditSchedulePage;