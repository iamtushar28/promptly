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

    return (
        /* ================= Overlay ================= */
        <section
            onClick={() => dispatch(closeAddPromptModal())}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4"
        >
            {/* ================= Modal Wrapper ================= */}
            <div className="flex min-h-full items-center justify-center py-6">

                {/* ================= Modal ================= */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-xl rounded-xl bg-white p-5 shadow-xl md:p-6"
                >
                    {/* ================= Header ================= */}
                    <div>
                        <h2 className="text-xl font-semibold">
                            New Prompt
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            Create a new prompt to save and reuse anytime.
                        </p>
                    </div>

                    {/* ================= Form ================= */}
                    <form className="mt-4 flex flex-col gap-4">

                        {/* ================= Title ================= */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="promptTitle"
                                className="text-sm font-medium"
                            >
                                Title
                            </label>

                            <input
                                id="promptTitle"
                                type="text"
                                placeholder="e.g. Social Media Post"
                                className="h-11 w-full rounded-lg border border-zinc-200 px-4 text-sm outline-none transition-colors focus:border-blue-600"
                            />
                        </div>

                        {/* ================= Prompt ================= */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="prompt"
                                className="text-sm font-medium"
                            >
                                Prompt
                            </label>

                            <textarea
                                id="prompt"
                                rows={3}
                                placeholder="Write your prompt here..."
                                className="w-full resize-none rounded-lg border border-zinc-200 p-4 text-sm outline-none transition-colors focus:border-blue-600"
                            />
                        </div>

                        {/* ================= Category ================= */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="category"
                                className="text-sm font-medium"
                            >
                                Category
                            </label>

                            <button
                                id="category"
                                type="button"
                                className="flex h-11 w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-500 transition-colors hover:bg-zinc-50"
                            >
                                Select Category

                                <FaAngleDown className="text-xs" />
                            </button>
                        </div>

                        {/* ================= Description ================= */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="description"
                                className="text-sm font-medium"
                            >
                                Description
                                <span className="ml-1 text-zinc-400">
                                    (Optional)
                                </span>
                            </label>

                            <textarea
                                id="description"
                                rows={2}
                                placeholder="Add a short description..."
                                className="w-full resize-none rounded-lg border border-zinc-200 p-4 text-sm outline-none transition-colors focus:border-blue-600"
                            />
                        </div>

                        {/* ================= Footer ================= */}
                        <div className="mt-2 flex flex-col-reverse gap-3 md:flex-row md:justify-end">

                            {/* Cancel Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    dispatch(closeAddPromptModal())
                                }
                                className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-6 text-sm font-medium transition-colors hover:bg-zinc-50 md:w-auto cursor-pointer"
                            >
                                Cancel
                            </button>

                            {/* Create Button */}
                            <button
                                type="submit"
                                className="h-11 w-full rounded-lg bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-700 md:w-auto cursor-pointer"
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