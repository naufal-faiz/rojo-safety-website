import { getAllRegistrations, getTotalRegistrations } from "@/lib/data/training/trainingRegistration/trainingRegistration";
import { RegistrationListClient } from "@/components/admin/main/Registration";
import { RegistrationStatus } from "@/lib/generated/prisma/enums";

export const dynamic = "force-dynamic";

type PageProps = {
    searchParams: Promise<{ search?: string; status?: string; page?: string }>;
};

const RegistrationPage = async ({ searchParams }: PageProps) => {
    const params = await searchParams;
    const search = params.search ?? "";
    const status =
        params.status && params.status !== "ALL"
            ? (params.status as RegistrationStatus)
            : undefined;
    const page = Math.max(1, Number(params.page ?? "1") || 1);
    const limit = 10;

    const [registrationsResult, totalCount, pendingCount, approvedCount] = await Promise.all([
        getAllRegistrations({ search, status, page, limit }),
        getTotalRegistrations(),
        getTotalRegistrations({ status: "PENDING" }),
        getTotalRegistrations({ status: "APPROVED" }),
    ]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Review Pendaftaran Training
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Tinjau formulir pendaftaran peserta — terima untuk menghitung kuota, tolak untuk melepas slot
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Pendaftaran</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalCount}</h3>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Menunggu Review</p>
                    <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">{pendingCount}</h3>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-green-600 dark:text-green-400">Diterima</p>
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mt-1">{approvedCount}</h3>
                </div>
            </div>

            <RegistrationListClient
                registrations={registrationsResult.data}
                pagination={registrationsResult.pagination}
                searchQuery={search}
                selectedStatus={status ?? "ALL"}
            />
        </div>
    );
};

export default RegistrationPage