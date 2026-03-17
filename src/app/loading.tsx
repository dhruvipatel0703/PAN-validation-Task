"use client";

import { SpinnerCustom } from "@/components/ui/spinner";
import { useLanguage } from "@/context/LanguageContext";

export default function Loading() {
    const { t } = useLanguage();

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
            <SpinnerCustom />
            <p className="mt-2 text-base text-black dark:text-white">
                {t("loading")}
            </p>
        </div>
    );
}
