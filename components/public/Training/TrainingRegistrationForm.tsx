"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { submitTrainingRegistration } from "@/lib/data/training/trainingRegistration/trainingRegistrationAction";
import { ScheduleDisplayStatus } from "@/lib/utils/trainingScheduleStatus";

type ScheduleForForm = {
    id: string;
    batch: number;
    type: "PUBLIC" | "INHOUSE";
    startAt: Date | string;
    endAt: Date | string;
    location: string | null;
    price: number;
    quota: number;
    approvedCount: number;
    displayStatus: ScheduleDisplayStatus;
};

type TrainingRegistrationFormProps = {
    trainingTitle: string;
    schedule: ScheduleForForm;
};

const formatDateRange = (start: Date | string, end: Date | string) => {
    const s = new Date(start);
    const e = new Date(end);
    const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    const sameDay = s.toDateString() === e.toDateString();
    if (sameDay) return s.toLocaleDateString("id-ID", opts);
    const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
    if (sameMonth) {
        return `${s.getDate()} - ${e.toLocaleDateString("id-ID", opts)}`;
    }
    return `${s.toLocaleDateString("id-ID", opts)} - ${e.toLocaleDateString("id-ID", opts)}`;
};

const formatTimeRange = (start: Date | string, end: Date | string) => {
    const fmt = (d: Date | string) =>
        new Date(d).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    return `${fmt(start)} - ${fmt(end)} WIB`;
};

const formatPrice = (price: number) => {
    if (price === 0) return "Gratis";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
};

export default function TrainingRegistrationForm({ trainingTitle, schedule }: TrainingRegistrationFormProps) {
    const [fields, setFields] = useState({ name: "", email: "", phone: "", company: "" });
    const [agreed, setAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateField = (patch: Partial<typeof fields>) => setFields((f) => ({ ...f, ...patch }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!fields.name.trim() || !fields.email.trim()) {
            setError("Nama dan email wajib diisi.");
            return;
        }
        if (!agreed) {
            setError("Anda harus menyetujui pernyataan pendaftaran terlebih dahulu.");
            return;
        }

        try {
            setIsSubmitting(true);
            await submitTrainingRegistration({
                trainingScheduleId: schedule.id,
                name: fields.name.trim(),
                email: fields.email.trim(),
                phone: fields.phone.trim() || undefined,
                company: fields.company.trim() || undefined,
            });
            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Gagal mengirim formulir. Coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
                variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
            >
                <h2 className="mb-4 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                    Form Pendaftaran Training K3
                </h2>
                <p className="mb-10 text-gray-500 dark:text-gray-400">{trainingTitle}</p>

                {submitted ? (
                    <div className="rounded-lg border border-primary/30 bg-primary/5 p-7.5 text-center dark:bg-primary/10">
                        <p className="text-lg font-semibold text-black dark:text-white">
                            Pendaftaran berhasil dikirim!
                        </p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Tim kami akan meninjau formulir Anda dan mengirimkan konfirmasi melalui email
                            ke <span className="font-medium">{fields.email}</span>.
                        </p>
                    </div>
                ) : schedule.displayStatus !== "OPEN" ? (
                    <div className="rounded-lg border border-stroke bg-gray-50 p-7.5 text-center dark:border-strokedark dark:bg-blacksection">
                        <p className="font-medium text-black dark:text-white">
                            {schedule.displayStatus === "FULL" && "Mohon maaf, kuota jadwal ini sudah penuh."}
                            {schedule.displayStatus === "CLOSED" && "Pendaftaran untuk jadwal ini sudah ditutup."}
                            {schedule.displayStatus === "COMPLETED" && "Training ini sudah selesai dilaksanakan."}
                            {schedule.displayStatus === "CANCELLED" && "Jadwal ini telah dibatalkan."}
                            {schedule.displayStatus === "DRAFT" && "Jadwal ini belum dibuka untuk pendaftaran."}
                        </p>
                        <Link
                            href="/training/formulir"
                            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                        >
                            Lihat jadwal training lain →
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                            <input
                                type="text"
                                value={fields.name}
                                onChange={(e) => updateField({ name: e.target.value })}
                                placeholder="Nama Lengkap"
                                required
                                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                            />
                            <input
                                type="email"
                                value={fields.email}
                                onChange={(e) => updateField({ email: e.target.value })}
                                placeholder="Email"
                                required
                                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                            />
                        </div>

                        <div className="mb-12.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                            <input
                                type="tel"
                                value={fields.phone}
                                onChange={(e) => updateField({ phone: e.target.value })}
                                placeholder="No Whatsapp / Telepon"
                                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                            />
                            <input
                                type="text"
                                value={fields.company}
                                onChange={(e) => updateField({ company: e.target.value })}
                                placeholder="Perusahaan / Instansi (opsional)"
                                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                            />
                        </div>

                        {error && (
                            <p className="mb-6 text-sm text-red-600 dark:text-red-400">{error}</p>
                        )}

                        <div className="flex flex-wrap gap-4 xl:justify-between">
                            <div className="mb-4 flex md:mb-0">
                                <input
                                    id="agreement-checkbox"
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="peer sr-only"
                                />
                                <span className="border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700 group mt-2 flex h-5 min-w-[20px] items-center justify-center rounded-sm peer-checked:bg-primary dark:peer-checked:bg-primary">
                                    <svg
                                        className="opacity-0 in-[.group]:peer-checked:opacity-100"
                                        width="10"
                                        height="8"
                                        viewBox="0 0 10 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.70704 0.792787C9.89451 0.980314 9.99983 1.23462 9.99983 1.49979C9.99983 1.76495 9.89451 2.01926 9.70704 2.20679L4.70704 7.20679C4.51951 7.39426 4.26521 7.49957 4.00004 7.49957C3.73488 7.49957 3.48057 7.39426 3.29304 7.20679L0.293041 4.20679C0.110883 4.01818 0.0100885 3.76558 0.0123669 3.50339C0.0146453 3.24119 0.119814 2.99038 0.305222 2.80497C0.490631 2.61956 0.741443 2.51439 1.00364 2.51211C1.26584 2.50983 1.51844 2.61063 1.70704 2.79279L4.00004 5.08579L8.29304 0.792787C8.48057 0.605316 8.73488 0.5 9.00004 0.5C9.26521 0.5 9.51951 0.605316 9.70704 0.792787Z"
                                            fill="white"
                                        />
                                    </svg>
                                </span>
                                <label
                                    htmlFor="agreement-checkbox"
                                    className="flex max-w-[500px] cursor-pointer select-none pl-5"
                                >
                                    Dengan mengisi formulir ini, saya bermaksud untuk mendaftar kegiatan training yang akan diselenggarakan oleh Rojo Safety
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                aria-label="kirim formulir pendaftaran"
                                className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark disabled:opacity-50"
                            >
                                {isSubmitting ? "Mengirim..." : "Kirim"}
                                {!isSubmitting && (
                                    <svg className="fill-white" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z" fill="" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </motion.div>

            <motion.div
                variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 2, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
            >
                <h2 className="mb-6 text-2xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                    {trainingTitle}
                </h2>

                <div className="mb-7">
                    <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">Batch</h3>
                    <p>
                        Batch {schedule.batch} · {schedule.type === "PUBLIC" ? "Publik" : "Inhouse"}
                    </p>
                </div>

                <div className="mb-7">
                    <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">Lokasi</h3>
                    <p>{schedule.location || "Rojo Safety Training Center"}</p>
                </div>

                <div className="mb-7">
                    <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">Tanggal</h3>
                    <p>{formatDateRange(schedule.startAt, schedule.endAt)}</p>
                </div>

                <div className="mb-7">
                    <h4 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">Waktu Kegiatan</h4>
                    <p>{formatTimeRange(schedule.startAt, schedule.endAt)}</p>
                </div>

                <div className="mb-7">
                    <h4 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">Biaya</h4>
                    <p>{formatPrice(schedule.price)}</p>
                </div>

                <div>
                    <h4 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">Kuota Tersisa</h4>
                    <p>{Math.max(0, schedule.quota - schedule.approvedCount)} dari {schedule.quota} peserta</p>
                </div>
            </motion.div>
        </div>
    );
}