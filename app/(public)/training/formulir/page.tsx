import { getRegistrableSchedules } from "@/lib/data/training/trainingSchedule/trainingSchedule";
import TrainingSchedulePicker from "@/components/public/Training/TrainingSchedulePicker";

export const dynamic = "force-dynamic";

const GeneralTrainingFormPage = async () => {
    const schedules = await getRegistrableSchedules();

    return (
        <div className="pb-20 pt-35">
            <section className="mx-auto max-w-c-1280 px-4 md:px-8 xl:px-0">
                <div className="mx-auto max-w-2xl rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:p-12.5">
                    <h1 className="mb-3 text-2xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                        Daftar Training K3
                    </h1>
                    <p className="mb-8 text-gray-500 dark:text-gray-400">
                        Pilih kegiatan training dan batch yang tersedia, lalu lanjutkan ke formulir pendaftaran.
                    </p>

                    <TrainingSchedulePicker
                        schedules={schedules.map((s) => ({
                            id: s.id,
                            batch: s.batch,
                            startAt: s.startAt,
                            training: s.training,
                        }))}
                    />
                </div>
            </section>
        </div>
    );
};

export default GeneralTrainingFormPage;