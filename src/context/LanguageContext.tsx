"use client";

import React, { createContext, useContext, useState } from "react";
import en from "@/locales/en";
import hi from "@/locales/hi";
import gu from "@/locales/gu";
import mr from "@/locales/mr";
import kn from "@/locales/kn";
import ta from "@/locales/ta";
import ml from "@/locales/ml";
import te from "@/locales/te";
import bn from "@/locales/bn";
import pa from "@/locales/pa";

export type Locale = string;

const translations: Record<string, Record<string, string>> = {
    en,
    hi,
    gu,
    mr,
    kn,
    ta,
    ml,
    te,
    bn,
    pa,
};

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    locale: "en",
    setLocale: () => { },
    t: (k) => (en as Record<string, string>)[k] || k,
});

export function LanguageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // lazy initialize from localStorage so we don't trigger an effect warning
    const [locale, setLocaleState] = useState<Locale>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("lang");
            if (saved) {
                return saved;
            }
        }
        return "en";
    });

    const setLocale = (l: Locale) => {
        setLocaleState(l);
        try {
            localStorage.setItem("lang", l);
        } catch {
            // ignore
        }
    };

    const t = (key: string) => {
        const dict = (translations[locale] as Record<string, string>) || (translations["en"] as Record<string, string>);
        return dict[key] || (translations["en"] as Record<string, string>)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
