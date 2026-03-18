"use client";

import { SpinnerCustom } from "@/components/ui/spinner";
import { LANGUAGE_NAMES, useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

function detectLanguageFromCoords(lat: number, lon: number) {
    if (lat >= 20 && lat <= 25 && lon >= 68 && lon <= 74) return "gu"; // Gujarat
    if (lat >= 16 && lat <= 22 && lon >= 73 && lon <= 80) return "mr"; // Maharashtra
    if (lat >= 11 && lat <= 18 && lon >= 74 && lon <= 78) return "kn"; // Karnataka
    if (lat >= 8 && lat <= 13 && lon >= 76 && lon <= 80) return "ta"; // Tamil Nadu
    if (lat >= 8 && lat <= 12 && lon >= 74 && lon <= 77) return "ml"; // Kerala
    if (lat >= 14 && lat <= 19 && lon >= 76 && lon <= 81) return "te"; // Telangana
    if (lat >= 21 && lat <= 26 && lon >= 86 && lon <= 89) return "bn"; // West Bengal
    if (lat >= 29 && lat <= 32 && lon >= 73 && lon <= 77) return "pa"; // Punjab
    if (lat >= 6.5 && lat <= 35.5 && lon >= 68.0 && lon <= 97.5) return "hi"; // Hindi default for India
    return "en";
}

export default function GeoPrompt() {
    const { setLocale, t, addAvailableLocale } = useLanguage();
    const [phase, setPhase] = useState<"prompt" | "denied" | "checking" | "select" | "done">("prompt");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            const seen = sessionStorage.getItem("geoprompt_seen");
            if (seen === "true") {
                setPhase("done");
            }
        } catch {
            // ignore
        }
    }, []);

    useEffect(() => {
        if (mounted && phase === "prompt") {
            try {
                const timer = setTimeout(() => {
                    sessionStorage.setItem("geoprompt_seen", "true");
                }, 500);
                return () => clearTimeout(timer);
            } catch {
                // ignore
            }
        }
    }, [mounted, phase]);
    const [detected, setDetected] = useState<string | null>(null);

    const askLocation = () => {
        if (!navigator?.geolocation) {
            setPhase("denied");
            return;
        }
        setPhase("checking");
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const d = detectLanguageFromCoords(pos.coords.latitude, pos.coords.longitude);
                setDetected(d);
                addAvailableLocale(d);
                setTimeout(() => setPhase("select"), 700);
            },
            (err) => {
                setPhase("denied");
            },
            { timeout: 10000 }
        );
    };

    const choose = (l: string) => {
        console.log("Choosing language:", l);
        setLocale(l);
        try {
            sessionStorage.setItem("lang", l);
        } catch {
            // ignore
        }
        setPhase("done");
    };

    if (!mounted || phase === "done") return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
                {phase === "prompt" && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Allow location?
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            We can detect a suitable language based on your location. Allow location to automatically detect, or choose a language manually.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={askLocation}
                                className="flex-1 rounded bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800"
                            >
                                Allow
                            </button>
                            <button
                                type="button"
                                onClick={() => setPhase("denied")}
                                className="flex-1 rounded border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
                            >
                                Choose language
                            </button>
                        </div>
                    </div>
                )}

                {phase === "denied" && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Choose language
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            You denied location access. Pick a language to continue.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => choose("en")}
                                className="flex-1 rounded bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800"
                            >
                                English
                            </button>
                            <button
                                type="button"
                                onClick={() => choose("hi")}
                                className="flex-1 rounded border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
                            >
                                हिंदी
                            </button>
                        </div>
                    </div>
                )}

                {phase === "checking" && (
                    <div className="flex flex-col items-center justify-center py-6">
                        <SpinnerCustom />
                        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                            {t("loading")}
                        </p>
                    </div>
                )}

                {phase === "select" && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Detected language
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            We detected <strong>{LANGUAGE_NAMES[detected ?? ""] || (detected ?? "")}</strong>. You can choose it or pick another.
                        </p>
                        <div className="mt-6 grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => choose("en")}
                                className="rounded border border-gray-300 px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
                            >
                                English
                            </button>
                            <button
                                type="button"
                                onClick={() => choose("hi")}
                                className="rounded border border-gray-300 px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
                            >
                                हिंदी
                            </button>
                            <button
                                type="button"
                                onClick={() => choose(detected ?? "en")}
                                className="rounded bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 active:bg-blue-800"
                            >
                                {LANGUAGE_NAMES[detected ?? "en"] || (detected ?? "en")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
