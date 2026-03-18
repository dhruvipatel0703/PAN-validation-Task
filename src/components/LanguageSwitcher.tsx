"use client";

import { Locale, useLanguage, LANGUAGE_NAMES } from "@/context/LanguageContext";
import React from "react";

export function LanguageSwitcher() {
    const { locale, setLocale, availableLocales } = useLanguage();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocale(e.target.value as Locale);
    };

    return (
        <select
            value={locale}
            onChange={handleChange}
            className="rounded border px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
        >
            {availableLocales.map(loc => (
                <option key={loc} value={loc}>
                    {LANGUAGE_NAMES[loc] || loc}
                </option>
            ))}
        </select>
    );
}
