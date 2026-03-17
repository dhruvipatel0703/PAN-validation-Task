"use client";

import Form from "@/components/Form/form";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <h1 className="mb-6 text-2xl font-semibold text-black dark:text-white">
        {t("welcome")}
      </h1>
      <Form />
    </div>
  );
}
