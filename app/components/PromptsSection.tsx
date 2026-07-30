'use client'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import { Prompt } from "@/types/prompt";
import { PromptService } from "@/services/prompt.service";
import { RootState } from "@/redux/store";
import { useSelector } from 'react-redux';
import PromptCardSkeleton from './PromptCardSkeleton';

type Props = {}

const PromptsSection = (props: Props) => {


    const user = useSelector((state: RootState) => state.auth.user);

    const [loading, setLoading] = useState(true);
    const [prompts, setPrompts] = useState<Prompt[]>([]);

    useEffect(() => {
        if (!user) return;

        let unsubscribe: (() => void) | undefined;

        const loadPrompts = async () => {
            try {
                // Initial fetch
                const data = await PromptService.getAll(user.uid);
                setPrompts(data);

                // Hide skeleton after first fetch
                setLoading(false);

                // Start realtime updates
                unsubscribe = PromptService.subscribe(user.uid, (data) => {
                    setPrompts(data);
                });
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        loadPrompts();

        return () => {
            unsubscribe?.();
        };
    }, [user]);

    return (
        <section className="-mt-6 w-full h-auto rounded-b-lg border border-zinc-200 p-4 flex flex-col gap-4 dark:border-zinc-800">

            {/* title */}
            <h4 className="font-semibold dark:text-white">
                All Prompts
            </h4>

            {/* prompt cards section */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-4">


                {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <PromptCardSkeleton key={index} />
                    ))
                ) : prompts && prompts.length > 0 ? (
                    prompts.map((prompt) => (
                        <PromptCard
                            key={prompt.id}
                            prompt={prompt}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-16 text-center text-zinc-500 dark:text-zinc-400">
                        No prompts yet.
                    </div>
                )}

            </section>

        </section>
    )
}

export default PromptsSection