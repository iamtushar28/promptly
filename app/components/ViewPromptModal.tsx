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
            className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4"
        >
            {/* ================= Modal Wrapper ================= */}
            <div className="flex min-h-full items-center justify-center py-6">

                {/* ================= Modal ================= */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-3xl rounded-xl bg-white shadow-xl"
                >

                    {/* ================= Header ================= */}
                    <div className="flex items-start justify-between border-b border-zinc-200 p-4 md:p-6">

                        <div className="space-y-2">

                            <h2 className="text-lg md:text-xl font-semibold">
                                Customer Support Reply
                            </h2>

                            <div className="flex flex-wrap items-center gap-2">

                                {/* Category */}
                                <span className="rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                                    Customer Support
                                </span>

                                {/* Favourite */}
                                <span className="rounded-md bg-zinc-50 px-3 py-1 text-xs text-zinc-500 border border-zinc-200">
                                    Pinned
                                </span>

                                {/* Created */}
                                <span className="text-xs text-zinc-400">
                                    Created 3 days ago
                                </span>

                            </div>

                        </div>

                        {/* Close */}
                        <button
                            onClick={() => dispatch(closeViewPromptModal())}
                            className="hidden md:flex h-10 w-10 items-center justify-center rounded-lg hover:bg-zinc-100 cursor-pointer"
                        >
                            <IoClose className="text-xl" />
                        </button>

                    </div>

                    {/* ================= Prompt ================= */}
                    <div className="space-y-6 p-4 md:p-6">

                        {/* Prompt */}
                        <div>

                            <div className="mb-3 flex items-center justify-between">

                                <h4 className="text-sm font-semibold">
                                    Prompt
                                </h4>

                                <button className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50 cursor-pointer">
                                    <BsCopy />
                                    Copy
                                </button>

                            </div>

                            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">

                                <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-zinc-700">
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

                            <h4 className="mb-2 text-sm font-semibold text-zinc-900">
                                Description
                            </h4>

                            <p className="text-sm leading-7 text-zinc-600">
                                Professional customer support response template
                                for refund and complaint requests.
                            </p>

                        </div>

                    </div>

                    {/* ================= Footer ================= */}
                    <div className="flex flex-col gap-3 border-t border-zinc-200 p-4 md:p-5 md:flex-row md:items-center md:justify-between">

                        {/* Left Actions */}
                        <div className="flex items-center gap-2">

                            <button className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 px-4 hover:bg-zinc-50 cursor-pointer">

                                <AiOutlineLike />

                            </button>

                            <button className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 px-4 hover:bg-zinc-50 cursor-pointer">

                                <TiPinOutline />

                            </button>

                            <button className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 px-4 hover:bg-zinc-50 cursor-pointer">

                                <BsThreeDotsVertical />

                                More

                            </button>

                        </div>

                        {/* Right Actions */}
                        <div className="flex flex-col gap-3 md:flex-row">

                            <button className="h-10 rounded-lg border border-zinc-200 px-5 hover:bg-zinc-50 cursor-pointer">
                                Edit
                            </button>

                            <button className="h-10 rounded-lg bg-blue-600 px-5 font-medium text-white hover:bg-blue-700 cursor-pointer">
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