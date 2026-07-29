"use client";

import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { closeAddPromptModal } from "@/redux/features/modal/modalSlice";

const AddPromptModal = () => {
    const dispatch = useDispatch();

    /* ================= Redux State ================= */
    const isOpen = useSelector(
        (state: RootState) => state.modal.isAddPromptOpen
    );

    /* Don't render if modal is closed */
    if (!isOpen) return null;

    // prompt categories
    const categories = [
        "Coding",
        "Marketing",
        "Content Writing",
        "Email",
        "Resume",
        "SQL",
        "Design",
        "Social Media",
        "Productivity",
        "Others",
    ];

    return (
        /* ================= Overlay ================= */
        <section
            onClick={() => dispatch(closeAddPromptModal())}
            className="fixed inset-0 z-50 overflow-y-auto bg-white/20 backdrop-blur-xs transition-all duration-300 dark:bg-black/30 p-4"
        >
            {/* ================= Modal Wrapper ================= */}
            <div className="flex min-h-full items-center justify-center py-6">

                {/* ================= Modal ================= */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-5 shadow-2xl transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900 md:p-6"
                >
                    {/* ================= Header ================= */}
                    <div>
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                            New Prompt
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            Create a new prompt to save and reuse anytime.
                        </p>
                    </div>

                    {/* ================= Form ================= */}
                    <form className="mt-4 flex flex-col gap-4">

                        {/* ================= Title ================= */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="promptTitle"
                                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            >
                                Title
                            </label>

                            <input
                                id="promptTitle"
                                type="text"
                                placeholder="e.g. Social Media Post"
                                className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-blue-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
                            />
                        </div>

                        {/* ================= Prompt ================= */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="prompt"
                                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            >
                                Prompt
                            </label>

                            <textarea
                                id="prompt"
                                rows={3}
                                placeholder="Write your prompt here..."
                                className="w-full resize-none rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-blue-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
                            />
                        </div>

                        {/* ================= Category ================= */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="category" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                Category
                            </label>

                            <select
                                id="category"
                                className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-blue-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select Category
                                </option>

                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* ================= Description ================= */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="description"
                                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            >
                                Description

                                <span className="ml-1 text-zinc-400 dark:text-zinc-500">
                                    (Optional)
                                </span>
                            </label>

                            <textarea
                                id="description"
                                rows={2}
                                placeholder="Add a short description..."
                                className="w-full resize-none rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-blue-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
                            />
                        </div>

                        {/* ================= Footer ================= */}
                        <div className="mt-2 flex flex-col-reverse gap-3 md:flex-row md:justify-end">

                            {/* Cancel Button */}
                            <button
                                type="button"
                                onClick={() => dispatch(closeAddPromptModal())}
                                className="h-11 w-full cursor-pointer rounded-lg border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-700 transition-all duration-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 md:w-auto"
                            >
                                Cancel
                            </button>

                            {/* Create Button */}
                            <button
                                type="submit"
                                className="h-11 w-full cursor-pointer rounded-lg bg-blue-600 px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 md:w-auto"
                            >
                                Create Prompt
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddPromptModal;