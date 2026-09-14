import Link from "next/link";
import { getAllTrainingsForAdmin, getTotalTrainings } from "@/lib/data/training/training";
import { TrainingListClient } from "@/components/admin/main/Training";

export const dynamic = "force-dynamic";

const TrainingDataPage = async () => {
    const [trainings, totalCount, publishedCount, draftCount] = await Promise.all([
        getAllTrainingsForAdmin(),
        getTotalTrainings(),
        getTotalTrainings({ status: "PUBLISHED" }),
        getTotalTrainings({ status: "DRAFT" }),
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Manajemen Training
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Kelola data training K3 dan sertifikasi alat berat
                    </p>
                </div>
                <Link
                    href="/admin/training/create"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Buat Training Baru</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Training</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {totalCount}
                    </h3>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-green-600 dark:text-green-400">Dipublikasikan</p>
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mt-1">
                        {publishedCount}
                    </h3>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Draf</p>
                    <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">
                        {draftCount}
                    </h3>
                </div>
            </div>

            <TrainingListClient initialTrainings={trainings} />
        </div>
    );
};

export default TrainingDataPage