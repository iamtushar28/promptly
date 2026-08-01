"use client";

import React from "react";
import { IoWarningOutline } from "react-icons/io5";

interface DeleteConfirmModalProps {
    open: boolean;
    title?: string;
    description?: string;
    loading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmModal = ({
    open,
    title = "Delete Prompt?",
    description = "This action cannot be undone. Are you sure you want to permanently delete this prompt?",
    loading = false,
    onClose,
    onConfirm,
}: DeleteConfirmModalProps) => {
    if (!open) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm dark:text-white"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            >
                <div className="p-6">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                        <IoWarningOutline className="text-3xl text-red-600" />
                    </div>

                    <h2 className="text-center text-xl font-semibold text-zinc-900 dark:text-white">
                        {title}
                    </h2>

                    <p className="mt-3 text-center text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                        {description}
                    </p>
                </div>

                <div className="flex gap-3 border-t border-zinc-200 p-4 dark:border-zinc-800">
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-zinc-300 py-2.5 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={onConfirm}
                        className="flex-1 rounded-lg bg-red-600 py-2.5 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer flex justify-center items-center gap-1"
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
                                <span>
                                    Deleting
                                </span>
                            </>
                            :
                            "Delete"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;