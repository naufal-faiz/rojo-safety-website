"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type UseUrlFiltersOptions = {
    /** Nama param yang didebounce (biasanya "search"), dan berapa ms delay-nya */
    debouncedKey?: string;
    debounceMs?: number;
};

export default function useUrlFilters(options: UseUrlFiltersOptions = {}) {
    const { debouncedKey = "search", debounceMs = 400 } = options;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [debouncedValue, setDebouncedValue] = useState(searchParams.get(debouncedKey) ?? "");

    useEffect(() => {
        setDebouncedValue(searchParams.get(debouncedKey) ?? "");
    }, [searchParams, debouncedKey]);

    // Sinkron nilai yang didebounce (search) ke URL
    useEffect(() => {
        const timeout = setTimeout(() => {
            const current = searchParams.get(debouncedKey) ?? "";
            if (debouncedValue === current) return;

            const params = new URLSearchParams(searchParams.toString());
            if (debouncedValue.trim()) {
                params.set(debouncedKey, debouncedValue.trim());
            } else {
                params.delete(debouncedKey);
            }
            params.set("page", "1");
            router.replace(`${pathname}?${params.toString()}`);
        }, debounceMs);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, pathname, router]);

    /** Untuk filter select/dropdown (kategori, sertifikasi, dll) — langsung apply, tanpa debounce */
    const setFilter = (key: string, value: string | undefined) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "ALL") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`);
    };

    /** Untuk ganti halaman pagination */
    const setPage = (page: number, totalPages?: number) => {
        if (page < 1 || (totalPages && page > totalPages)) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.replace(`${pathname}?${params.toString()}`);
    };

    const getFilter = (key: string) => searchParams.get(key) ?? "ALL";

    return {
        debouncedValue,
        setDebouncedValue,
        setFilter,
        getFilter,
        setPage,
    };
}