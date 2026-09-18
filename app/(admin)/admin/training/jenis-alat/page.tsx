import Link from "next/link";
import { getAllHeavyEquipments } from "@/lib/data/training/heavyEquipments/heavyEquipment";
import { HeavyEquipmentListClient } from "@/components/admin/main/HeavyEquipment";

export const dynamic = "force-dynamic";

type PageProps = {
    searchParams: Promise<{ search?: string; page?: string }>;
};

const HeavyEquipmentPage = async ({ searchParams }: PageProps) => {
    const params = await searchParams;
    const search = params.search ?? "";
    const page = Math.max(1, Number(params.page ?? "1") || 1);
    const limit = 10;

    const equipmentsResult = await getAllHeavyEquipments({
        search,
        page,
        limit,
    });

    const totalCount = equipmentsResult.totalItems;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Manajemen Alat Berat
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Kelola data alat berat dan peralatan training K3
                    </p>
                </div>
                <Link
                    href="/admin/training/jenis-alat/create"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Buat Alat Berat Baru</span>
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Alat Berat</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalCount}</h3>
            </div>

            <HeavyEquipmentListClient
                equipments={equipmentsResult.data}
                pagination={equipmentsResult.pagination}
                searchQuery={search}
            />
        </div>
    );
};

export default HeavyEquipmentPage;
