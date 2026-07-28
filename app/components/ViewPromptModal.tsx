"use client";

import React from "react";
import {
    BsCopy,
    BsThreeDotsVertical,
} from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { closeViewPromptModal } from "@/redux/features/modal/modalSlice";
import { TiPinOutline } from "react-icons/ti";

const ViewPromptModal = () => {
    const dispatch = useDispatch();

    /* ================= Redux State ================= */
    const isOpen = useSelector(
        (state: RootState) => state.modal.isViewPromptOpen
    );

    if (!isOpen) return null;

    return (
        /* ================= Overlay ================= */
        <section
            onClick={() => dispatch(closeViewPromptModal())}
            className="fixed inset-0 z-50 overflow-y-auto bg-white/20 backdrop-blur-md p-4 transition-all duration-300 dark:bg-black/30"
        >
            {/* ================= Modal Wrapper ================= */}
            <div className="flex min-h-full items-center justify-center py-6">

                {/* ================= Modal ================= */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-3xl rounded-xl border border-zinc-200 bg-white shadow-2xl transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900"
                >

                    {/* ================= Header ================= */}
                    <div className="flex items-start justify-between border-b border-zinc-200 p-4 transition-colors duration-300 dark:border-zinc-800 md:p-6">

                        <div className="space-y-2">

                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white md:text-xl">
                                Customer Support Reply
                            </h2>

                            <div className="flex flex-wrap items-center gap-2">

                                {/* Category */}
                                <span className="rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 transition-colors duration-300 dark:bg-blue-950/50 dark:text-blue-400">
                                    Customer Support
                                </span>

                                {/* Favourite */}
                                <span className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-500 transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                                    Pinned
                                </span>

                                {/* Created */}
                                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                    Created 3 days ago
                                </span>

                            </div>

                        </div>

                        {/* Close */}
                        <button
                            onClick={() => dispatch(closeViewPromptModal())}
                            className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-zinc-600 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white md:flex"
                        >
                            <IoClose className="text-xl" />
                        </button>

                    </div>

                    {/* ================= Prompt ================= */}
                    <div className="space-y-6 p-4 md:p-6">

                        {/* Prompt */}
                        <div>

                            <div className="mb-3 flex items-center justify-between">

                                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                                    Prompt
                                </h4>

                                <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 transition-all duration-300 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                                    <BsCopy />
                                    Copy
                                </button>

                            </div>

                            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-950">

                                <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                                    {`You are an experienced customer support executive.
Respond politely, professionally and empathetically.
Acknowledge the customer's concern.
Provide a clear solution.
End the response with a friendly closing statement.
Keep the response under 150 words.`}
                                </pre>

                            </div>

                        </div>

                        {/* Description */}
                        <div>

                            <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">
                                Description
                            </h4>

                            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                                Professional customer support response template
                                for refund and complaint requests.
                            </p>

                        </div>

                    </div>

                    {/* ================= Footer ================= */}
                    <div className="flex flex-col gap-3 border-t border-zinc-200 p-4 transition-colors duration-300 dark:border-zinc-800 md:flex-row md:items-center md:justify-between md:p-5">

                        {/* Left Actions */}
                        <div className="flex items-center gap-2">

                            <button className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 px-4 text-zinc-700 transition-all duration-300 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                                <AiOutlineLike />
                            </button>

                            <button className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 px-4 text-zinc-700 transition-all duration-300 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                                <TiPinOutline />
                            </button>

                            <button className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 px-4 text-zinc-700 transition-all duration-300 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                                <BsThreeDotsVertical />
                                More
                            </button>

                        </div>

                        {/* Right Actions */}
                        <div className="flex flex-col gap-3 md:flex-row">

                            <button className="h-10 cursor-pointer rounded-lg border border-zinc-200 px-5 text-zinc-700 transition-all duration-300 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                                Edit
                            </button>

                            <button className="h-10 cursor-pointer rounded-lg bg-blue-600 px-5 font-medium text-white transition-all duration-300 hover:bg-blue-700">
                                Use Prompt
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default ViewPromptModal;