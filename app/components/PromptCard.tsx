"use client";

import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsCopy, BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";

import { openViewPromptModal } from "@/redux/features/modal/modalSlice";
import { TiPin } from "react-icons/ti";

type Props = {};

const PromptCard = (props: Props) => {
    const dispatch = useDispatch();

    /* ================= Open View Modal ================= */
    const handleOpenPrompt = () => {
        dispatch(openViewPromptModal());
    };

    return (
        <article
            onClick={handleOpenPrompt}
            className="flex h-44 cursor-pointer flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-xs"
        >

            {/* ================= Header ================= */}
            <div className="flex items-start justify-between">

                {/* Prompt Title */}
                <h4 className="flex-1 truncate font-semibold text-zinc-900">
                    Customer Support Reply
                </h4>

                {/* More Options */}
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-zinc-100"
                >
                    <BsThreeDotsVertical />
                </button>

            </div>

            {/* ================= Prompt Description ================= */}
            <p className="line-clamp-2 text-sm text-zinc-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi amet at nostrum hic nemo architecto ratione
                laudantium cumque.
            </p>

            {/* ================= Category Badge ================= */}
            <div className="w-fit rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                Content
            </div>

            {/* ================= Footer ================= */}
            <div className="flex items-center justify-between">

                {/* Created Time */}
                <p className="text-xs text-zinc-400">
                    1h ago
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">

                    {/* Pinned Badge */}
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-lg transition-colors hover:bg-zinc-100"
                    >
                        <TiPin />
                    </button>

                    {/* Like Button */}
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-lg transition-colors hover:bg-zinc-100"
                    >
                        <AiOutlineLike />
                    </button>

                    {/* Copy Button */}
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-lg transition-colors hover:bg-zinc-100"
                    >
                        <BsCopy />
                    </button>

                </div>

            </div>

        </article>
    );
};

export default PromptCard;