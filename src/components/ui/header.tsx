"use client";

import * as React from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
    return (
        <header className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    MyApp
                </h1>
                <LanguageSwitcher />
            </div>
        </header>
    );
}
