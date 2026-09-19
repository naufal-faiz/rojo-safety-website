import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrainingDataBySlug } from "@/lib/data/training/training";
import { getPublicSchedulesByTraining } from "@/lib/data/training/trainingSchedule/trainingSchedule";
import TrainingRegistrationForm from "@/components/public/Training/TrainingRegistrationForm";

type PageProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ jadwal?: string }>;
};

export const dynamic = "force-dynamic";

const TrainingFormPage = async ({ params, searchParams }: PageProps) => {
    const { slug } = await params;
    const { jadwal } = await searchParams;

    const training = await getTrainingDataBySlug(slug);
    if (!training || training.status !== "PUBLISHED") {
        notFound();
    }

    const schedules = await getPublicSchedulesByTraining(training.id);

    // Prioritas: schedule dari query ?jadwal=, lalu fallback ke schedule OPEN pertama,
    // lalu fallback ke schedule manapun (biar tetap bisa tampil pesan "sudah tutup/penuh")
    const selectedSchedule =
        schedules.find((s) => s.id === jadwal) ??
        schedules.find((s) => s.displayStatus === "OPEN") ??
        schedules[0];

    return (
        <div className="pb-20 pt-30">
            <section id="support" className="px-4 md:px-8 2xl:px-0">
                <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
                    <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-linear-to-t from-transparent to-[#dee7ff47] dark:bg-linear-to-t dark:to-[#252A42]"></div>
                    <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
                        <Image src="/images/shape/shape-dotted-light.svg" alt="Dotted" className="dark:hidden" fill />
                        <Image src="/images/shape/shape-dotted-dark.svg" alt="Dotted" className="hidden dark:block" fill />
                    </div>

                    {!selectedSchedule ? (
                        <div className="mx-auto max-w-xl rounded-lg bg-white p-10 text-center shadow-solid-8 dark:border dark:border-strokedark dark:bg-black">
                            <h1 className="mb-3 text-2xl font-semibold text-black dark:text-white">
                                Belum Ada Jadwal Tersedia
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Training <span className="font-medium">{training.title}</span> saat ini belum
                                memiliki jadwal yang dibuka untuk pendaftaran publik.
                            </p>
                            <Link
                                href="/training/formulir"
                                className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
                            >
                                Lihat training lain →
                            </Link>
                        </div>
                    ) : (
                        <>
                            {schedules.length > 1 && (
                                <div className="relative z-1 mb-8 flex flex-wrap gap-2">
                                    {schedules.map((s) => (
                                        <Link
                                            key={s.id}
                                            href={`/training/formulir/${slug}?jadwal=${s.id}`}
                                            className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                                                s.id === selectedSchedule.id
                                                    ? "border-primary bg-primary text-white"
                                                    : "border-stroke text-black hover:border-primary dark:border-strokedark dark:text-white"
                                            }`}
                                        >
                                            Batch {s.batch} · {s.displayStatus === "OPEN" ? "Tersedia" : "Tidak Tersedia"}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <TrainingRegistrationForm
                                trainingTitle={training.title}
                                schedule={selectedSchedule}
                            />
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default TrainingFormPage;