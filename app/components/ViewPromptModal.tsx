"use client";

import React, { useState } from "react";
import { BsCopy } from "react-icons/bs";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { TiPin, TiPinOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { closeViewPromptModal, openEditPromptModal } from "@/redux/features/modal/modalSlice";
import { usePromptActions } from "@/hooks/usePromptActions";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ViewPromptModal = () => {

    const {
        copied,
        copyPrompt,
        toggleFavourite,
        togglePinned,
        deletePrompt,
        formatTimeAgo,
    } = usePromptActions();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const dispatch = useDispatch();

    const { isViewPromptOpen, selectedPromptId } = useSelector(
        (state: RootState) => state.modal
    );

    const prompts = useSelector(
        (state: RootState) => state.prompt.prompts
    );

    const selectedPrompt =
        prompts.find((prompt) => prompt.id === selectedPromptId) ?? null;

    if (!isViewPromptOpen || !selectedPrompt) return null;

    return (
        <>
            <section
                onClick={() => dispatch(closeViewPromptModal())}
                className="fixed inset-0 z-50 overflow-y-auto bg-white/20 p-4 backdrop-blur-md dark:bg-black/30"
            >
                <div className="flex min-h-full items-center justify-center py-6">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-3xl rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-zinc-200 p-4 dark:border-zinc-800 md:p-6">
                            <div className="space-y-2">
                                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white md:text-xl">
                                    {selectedPrompt.title}
                                </h2>

                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                                        {selectedPrompt.category}
                                    </span>

                                    {selectedPrompt.pinned && (
                                        <span className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                                            Pinned
                                        </span>
                                    )}

                                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                        Created {formatTimeAgo(selectedPrompt.createdAt)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => dispatch(closeViewPromptModal())}
                                className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white cursor-pointer"
                            >
                                <IoClose className="text-xl" />
                            </button>
                        </div>

                        {/* Prompt content */}
                        <div className="space-y-6 p-4 md:p-6">

                            {/* prompt */}
                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                                        Prompt
                                    </h4>

                                    {/* copy prompt */}
                                    <button
                                        onClick={() => copyPrompt(selectedPrompt.prompt)}
                                        className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                                    >
                                        {copied ? "Copied" :
                                            <>
                                                <BsCopy />
                                                <span>
                                                    Copy
                                                </span>
                                            </>
                                        }
                                    </button>
                                </div>

                                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-950">
                                    <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                                        {selectedPrompt.prompt}
                                    </pre>
                                </div>
                            </div>

                            {/* discription */}
                            <div>
                                <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">
                                    Description
                                </h4>

                                <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                                    {selectedPrompt.description?.trim()
                                        ? selectedPrompt.description
                                        : "No description provided."}
                                </p>
                            </div>

                            {/* tags */}
                            <div>
                                <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">
                                    Tags
                                </h4>

                                {selectedPrompt.tags.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedPrompt.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full text-sm font-medium text-blue-700 dark:text-blue-400"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                        No tags
                                    </p>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex flex-col gap-3 border-t border-zinc-200 p-4 dark:border-zinc-800 md:flex-row md:items-center md:justify-between md:p-5">
                                <div className="flex items-center gap-2">

                                    {/* pin prompt */}
                                    <button
                                        onClick={() => togglePinned(selectedPrompt.id)}
                                        className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 px-4 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer text-lg"
                                    >
                                        {selectedPrompt.pinned ? (
                                            <TiPin className="text-blue-500" />
                                        ) : (
                                            <TiPinOutline />
                                        )}
                                    </button>

                                    {/* make favourite */}
                                    <button
                                        onClick={() => toggleFavourite(selectedPrompt.id)}
                                        className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 px-4 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer text-lg"
                                    >
                                        {selectedPrompt.favourite ? (
                                            <AiFillLike className="text-red-500" />
                                        ) : (
                                            <AiOutlineLike />
                                        )}
                                    </button>

                                    {/* delete */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowDeleteModal(true);
                                        }}
                                        className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 px-4 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer">
                                        Delete
                                    </button>

                                </div>

                                <div className="flex flex-col gap-3 md:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            dispatch(openEditPromptModal(selectedPrompt.id));
                                        }}
                                        className="h-10 cursor-pointer rounded-lg border border-zinc-200 px-5 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            const prompt = encodeURIComponent(selectedPrompt.prompt);

                                            window.open(
                                                `https://chatgpt.com/?q=${prompt}`,
                                                "_blank"
                                            );
                                        }}
                                        className="h-10 rounded-lg bg-blue-600 px-5 font-medium text-white hover:bg-blue-700 cursor-pointer">
                                        Use Prompt
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* delete prompt modal */}
            <DeleteConfirmModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => {
                    deletePrompt(selectedPrompt.id);
                    setShowDeleteModal(false);
                    dispatch(closeViewPromptModal());
                }}
            />
        </>
    );
};

export default ViewPromptModal;