"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { RootState } from "@/redux/store";
import { closeAddPromptModal } from "@/redux/features/modal/modalSlice";

import {
    createPromptSchema,
    CreatePromptForm,
} from "@/validation/prompt.schema";

import { useCreatePrompt } from "@/hooks/useCreatePrompt";

const AddPromptModal = () => {
    const dispatch = useDispatch();

    const isOpen = useSelector(
        (state: RootState) => state.modal.isAddPromptOpen
    );

    const { user } = useSelector(
        (state: RootState) => state.auth
    );

    // ✅ Always call hooks
    const { loading, submit } = useCreatePrompt();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreatePromptForm>({
        resolver: zodResolver(createPromptSchema),
        defaultValues: {
            title: "",
            prompt: "",
            description: "",
            category: "",
            tags: "",
        },
    });

    // ✅ Return after all hooks
    if (!isOpen) return null;

    /* ================= Categories ================= */

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

    /* ================= Submit ================= */

    const onSubmit = async (
        values: CreatePromptForm
    ) => {
        if (!user) {
            toast.error("Please login first.");
            return;
        }

        const payload = {
            title: values.title.trim(),
            prompt: values.prompt.trim(),
            description:
                values.description?.trim() || "",
            category: values.category,
            tags:
                values.tags
                    ?.split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean) || [],
        };

        try {
            await submit(user.uid, payload);

            toast.success(
                "Prompt created successfully!"
            );

            reset();

            dispatch(closeAddPromptModal());
        } catch (error) {
            console.error(error);

            toast.error(
                "Failed to create prompt."
            );
        }
    };

    return (
        <section
            onClick={() =>
                dispatch(closeAddPromptModal())
            }
            className="fixed inset-0 z-50 overflow-y-auto bg-white/20 p-4 backdrop-blur-xs transition-all duration-300 dark:bg-black/30"
        >
            <div className="flex min-h-full items-center justify-center py-6">

                <div
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                    className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-5 shadow-2xl transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900 md:p-6"
                >
                    {/* ================= Header ================= */}

                    <div>
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                            New Prompt
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            Create a new prompt to save
                            and reuse anytime.
                        </p>
                    </div>

                    {/* ================= Form ================= */}

                    <form
                        onSubmit={handleSubmit(
                            onSubmit
                        )}
                        className="mt-4 flex flex-col gap-4"
                    >

                        {/* ================= Title ================= */}

                        <div className="flex flex-col gap-2">

                            <label
                                htmlFor="title"
                                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            >
                                Title
                            </label>

                            <input
                                id="title"
                                type="text"
                                placeholder="e.g. Social Media Post"
                                disabled={loading}
                                {...register("title")}
                                className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-blue-600 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 ${errors.title
                                    ? "border-red-500"
                                    : "border-zinc-200 dark:border-zinc-700"
                                    }`}
                            />

                            {errors.title && (
                                <p className="text-xs text-red-500">
                                    {
                                        errors
                                            .title
                                            .message
                                    }
                                </p>
                            )}

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
                                rows={5}
                                disabled={loading}
                                placeholder="Write your prompt here..."
                                {...register(
                                    "prompt"
                                )}
                                className={`w-full resize-none rounded-lg border bg-white p-4 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-blue-600 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 ${errors.prompt
                                    ? "border-red-500"
                                    : "border-zinc-200 dark:border-zinc-700"
                                    }`}
                            />

                            {errors.prompt && (
                                <p className="text-xs text-red-500">
                                    {
                                        errors
                                            .prompt
                                            .message
                                    }
                                </p>
                            )}

                        </div>

                        {/* ================= Category ================= */}

                        <div className="flex flex-col gap-2">

                            <label
                                htmlFor="category"
                                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            >
                                Category
                            </label>

                            <select
                                id="category"
                                disabled={loading}
                                {...register(
                                    "category"
                                )}
                                className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-zinc-900 outline-none transition-all duration-300 focus:border-blue-600 dark:bg-zinc-950 dark:text-white ${errors.category
                                    ? "border-red-500"
                                    : "border-zinc-200 dark:border-zinc-700"
                                    }`}
                            >
                                <option value="">
                                    Select Category
                                </option>

                                {categories.map(
                                    (category) => (
                                        <option
                                            key={
                                                category
                                            }
                                            value={
                                                category
                                            }
                                        >
                                            {
                                                category
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            {errors.category && (
                                <p className="text-xs text-red-500">
                                    {
                                        errors
                                            .category
                                            .message
                                    }
                                </p>
                            )}

                        </div>

                        {/* ================= Tags ================= */}

                        <div className="flex flex-col gap-2">

                            <label
                                htmlFor="tags"
                                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            >
                                Tags

                                <span className="ml-1 text-zinc-400">
                                    (comma separated)
                                </span>
                            </label>

                            <input
                                id="tags"
                                type="text"
                                disabled={loading}
                                placeholder="react, firebase, typescript"
                                {...register(
                                    "tags"
                                )}
                                className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-blue-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
                            />

                        </div>

                        {/* ================= Description ================= */}

                        <div className="flex flex-col gap-2">

                            <label
                                htmlFor="description"
                                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            >
                                Description

                                <span className="ml-1 text-zinc-400">
                                    (Optional)
                                </span>
                            </label>

                            <textarea
                                id="description"
                                rows={3}
                                disabled={loading}
                                placeholder="Add a short description..."
                                {...register(
                                    "description"
                                )}
                                className="w-full resize-none rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-blue-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
                            />
                        </div>

                        {/* ================= Footer ================= */}

                        <div className="mt-2 flex flex-col-reverse gap-3 md:flex-row md:justify-end">

                            {/* Cancel Button */}

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() =>
                                    dispatch(closeAddPromptModal())
                                }
                                className="h-11 w-full cursor-pointer rounded-lg border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-700 transition-all duration-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 md:w-auto"
                            >
                                Cancel
                            </button>

                            {/* Create Button */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 md:w-auto"
                            >
                                {loading ? (
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

                                        Adding...
                                    </>
                                ) : (
                                    "Add Prompt"
                                )}
                            </button>

                        </div>

                    </form>

                </div>


            </div>

        </section>
    );
};

export default AddPromptModal;