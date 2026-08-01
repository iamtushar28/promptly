"use client";

import { useEffect, useRef, useState } from "react";
import { PiCaretDown, PiDownload, PiUpload } from "react-icons/pi";
import { useSelector } from "react-redux";

import { selectAllPrompts } from "@/redux/features/prompt/promptSelectors";
import ImportPromptsModal from "./ImportPromptsModal";

const PromptActionsDropdown = () => {
    const prompts = useSelector(selectAllPrompts);

    const [open, setOpen] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

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

        const date = new Date()
            .toISOString()
            .split("T")[0];

        link.href = url;
        link.download = `prompt-library-${date}.json`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        setOpen(false);
    };

    const handleImport = () => {
        setOpen(false);
        setShowImportModal(true);
    };

    return (
        <>
            <div
                ref={dropdownRef}
            >
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                >
                    Actions

                    <PiCaretDown
                        className={`transition-transform ${open ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {open && (
                    <div className="absolute right-2 z-50 mt-2 w-52 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                        <button
                            onClick={handleExport}
                            disabled={!prompts.length}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                        >
                            <PiDownload className="text-lg" />
                            Export Prompts
                        </button>

                        <button
                            onClick={handleImport}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                        >
                            <PiUpload className="text-lg" />
                            Import Prompts
                        </button>
                    </div>
                )}
            </div>

            <ImportPromptsModal
                open={showImportModal}
                onClose={() => setShowImportModal(false)}
            />
        </>
    );
};

export default PromptActionsDropdown;