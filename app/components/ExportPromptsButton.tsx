"use client";

import React from "react";
import { PiExport } from "react-icons/pi";
import { useSelector } from "react-redux";

import { selectAllPrompts } from "@/redux/features/prompt/promptSelectors";

const ExportPromptsButton = () => {
    const prompts = useSelector(selectAllPrompts);

    const handleExport = () => {
        const exportData = {
            exportedAt: new Date().toISOString(),
            totalPrompts: prompts.length,
            prompts,
        };

        const blob = new Blob(
            [JSON.stringify(exportData, null, 2)],
            {
                type: "application/json",
            }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        const date = new Date().toISOString().split("T")[0];

        link.href = url;
        link.download = `prompt-library-${date}.json`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleExport}
            disabled={!prompts.length}
            className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-700 transition-all duration-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
        >
            Export

            <PiExport className="text-lg" />
        </button>
    );
};

export default ExportPromptsButton;