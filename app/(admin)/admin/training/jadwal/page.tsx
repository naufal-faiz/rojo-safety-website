import Link from "next/link";
import { getAllSchedules, getTotalSchedules } from "@/lib/data/training/trainingSchedule/trainingSchedule";
import { ScheduleListClient } from "@/components/admin/main/Schedule";
import { TrainingScheduleStatus } from "@/lib/generated/prisma/enums";

export const dynamic = "force-dynamic";

type PageProps = {
    searchParams: Promise<{ search?: string; status?: string; page?: string }>;
};

const SchedulePage = async ({ searchParams }: PageProps) => {
    const params = await searchParams;
    const search = params.search ?? "";
    const status =
        params.status && params.status !== "ALL"
            ? (params.status as TrainingScheduleStatus)
            : undefined;
    const page = Math.max(1, Number(params.page ?? "1") || 1);
    const limit = 10;

    const [schedulesResult, totalCount, openCount, draftCount] = await Promise.all([
        getAllSchedules({ search, status, page, limit }),
        getTotalSchedules(),
        getTotalSchedules({ status: "OPEN" }),
        getTotalSchedules({ status: "DRAFT" }),
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Manajemen Jadwal Training
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Kelola penyelenggaraan (batch) dari setiap training
                    </p>
                </div>
                <Link
                    href="/admin/training/jadwal/create"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Buat Jadwal Baru</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Jadwal</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalCount}</h3>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-green-600 dark:text-green-400">Terbuka (niat admin)</p>
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mt-1">{openCount}</h3>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Draf</p>
                    <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">{draftCount}</h3>
                </div>
            </div>

            <ScheduleListClient
                schedules={schedulesResult.data}
                pagination={schedulesResult.pagination}
                searchQuery={search}
                selectedStatus={status ?? "ALL"}
            />
        </div>
    );
};

export default SchedulePage;