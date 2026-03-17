"use client";

import { Locale, useLanguage } from "@/context/LanguageContext";
import React from "react";

export function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocale(e.target.value as Locale);
    };

    return (
        <select
            value={locale}
            onChange={handleChange}
            className="rounded border px-2 py-1 text-sm"
        >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
        </select>
    );
}
