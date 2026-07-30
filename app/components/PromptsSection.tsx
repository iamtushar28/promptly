"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PromptCard from "./PromptCard";
import PromptCardSkeleton from "./PromptCardSkeleton";

import { PromptService } from "@/services/prompt.service";

import { RootState, AppDispatch } from "@/redux/store";

import { setPrompts } from "@/redux/features/prompt/promptSlice";
import { selectFilteredPrompts } from "@/redux/features/prompt/promptSelectors";
import { openAddPromptModal } from "@/redux/features/modal/modalSlice";
import { IoMdAdd } from "react-icons/io";

const PromptsSection = () => {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.auth.user);

    // Filtered + Sorted + Pinned First
    const prompts = useSelector(selectFilteredPrompts);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        let unsubscribe: (() => void) | undefined;

        const loadPrompts = async () => {
            try {
                // Initial Fetch
                const data = await PromptService.getAll(user.uid);

                dispatch(setPrompts(data));

                setLoading(false);

                // Realtime Updates
                unsubscribe = PromptService.subscribe(
                    user.uid,
                    (prompts) => {
                        dispatch(setPrompts(prompts));
                    }
                );
            } catch (error) {
                console.error("Failed to load prompts:", error);
                setLoading(false);
            }
        };

        loadPrompts();

        return () => {
            unsubscribe?.();
        };
    }, [user, dispatch]);

    return (
        <section className="-mt-6 w-full h-auto rounded-b-lg border border-zinc-200 p-4 flex flex-col gap-4 dark:border-zinc-800">
            {/* Title */}
            <h4 className="font-semibold dark:text-white">
                All Prompts
            </h4>

            {/* Prompt Cards */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <PromptCardSkeleton key={index} />
                    ))
                ) : prompts.length > 0 ? (
                    prompts.map((prompt) => (
                        <PromptCard
                            key={prompt.id}
                            prompt={prompt}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-16 text-center text-zinc-500 dark:text-zinc-400 flex flex-col gap-2 justify-center items-center">
                        <p>
                            No prompts found.
                        </p>
                        <button
                            onClick={() => dispatch(openAddPromptModal())}
                            className="flex cursor-pointer items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 active:scale-95 md:px-4"
                        >
                            {/* Add Icon */}
                            <IoMdAdd className="text-lg" />

                            Add Prompt
                        </button>
                    </div>
                )}
            </section>
        </section>
    );
};

export default PromptsSection;