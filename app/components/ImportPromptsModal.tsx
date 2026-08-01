"use client";

import { useRef, useState } from "react";
import { PiUploadSimple, PiX } from "react-icons/pi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-hot-toast";
import { useImportPrompts } from "@/hooks/useImportPrompts";

interface ImportPromptsModalProps {
    open: boolean;
    onClose: () => void;
}

const ImportPromptsModal = ({
    open,
    onClose,
}: ImportPromptsModalProps) => {
    const user = useSelector((state: RootState) => state.auth.user);

    const { loading, importPrompts } = useImportPrompts();

    const [file, setFile] = useState<File | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    if (!open) return null;

    const handleImport = async () => {
        if (!file || !user) return;

        try {
            const result = await importPrompts(user.uid, file);

            if (result.failed === 0) {
                toast.success(
                    `${result.success} prompt${result.success !== 1 ? "s" : ""} imported successfully.`
                );
            } else {
                toast.error(
                    `Imported ${result.success}, Failed ${result.failed}`
                );
            }

            setFile(null);
            onClose();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Import failed."
            );
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4 dark:text-white">
            <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
                    <h2 className="text-lg font-semibold">
                        Import Prompts
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                        <PiX size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4 p-6">
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={(e) =>
                            setFile(e.target.files?.[0] ?? null)
                        }
                    />

                    <button
                        onClick={() => inputRef.current?.click()}
                        className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-300 transition-all hover:border-blue-500 dark:border-zinc-700 cursor-pointer duration-300"
                    >
                        <PiUploadSimple size={30} />
                        <span className="text-sm">
                            {file
                                ? file.name
                                : "Choose JSON file"}
                        </span>
                    </button>

                    <p className="text-xs text-zinc-500">
                        Select an exported prompt library (.json).
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-zinc-700">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={!file || loading}
                        onClick={handleImport}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer flex justify-center items-center"
                    >
                        {loading
                            ?
                            <>
                                <svg
                                    className="mr-2 h-4 w-4 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        className="opacity-25"
                                    />

                                    <path
                                        fill="currentColor"
                                        className="opacity-75"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>

                                Importing...
                            </>
                            : "Import"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImportPromptsModal;