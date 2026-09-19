"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type PickerSchedule = {
    id: string;
    batch: number;
    startAt: Date | string;
    training: { title: string; slug: string } | null;
};

export default function TrainingSchedulePicker({ schedules }: { schedules: PickerSchedule[] }) {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState(schedules[0]?.id || "");

    const handleGo = () => {
        const selected = schedules.find((s) => s.id === selectedId);
        if (!selected?.training) return;
        router.push(`/training/formulir/${selected.training.slug}?jadwal=${selected.id}`);
    };

    if (schedules.length === 0) {
        return (
            <p className="text-gray-500 dark:text-gray-400">
                Saat ini belum ada jadwal training yang dibuka untuk pendaftaran. Silakan cek kembali nanti.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-white px-4 py-3 text-sm text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-blacksection dark:text-white sm:flex-1"
            >
                {schedules.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.training?.title} — Batch {s.batch} (
                        {new Date(s.startAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        )
                    </option>
                ))}
            </select>
            <button
                type="button"
                onClick={handleGo}
                className="rounded-full bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-blackho dark:bg-btndark whitespace-nowrap"
            >
                Lanjut Daftar
            </button>
        </div>
    );
}