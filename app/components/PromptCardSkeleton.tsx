"use client";

import React from "react";

const PromptCardSkeleton = () => {
    return (
        <article className="flex h-44 animate-pulse flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="h-5 w-3/5 rounded bg-zinc-200 dark:bg-zinc-800" />

                <div className="h-8 w-8 rounded-md bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Category */}
            <div className="h-6 w-24 rounded-md bg-zinc-200 dark:bg-zinc-800" />

            {/* Footer */}
            <div className="flex items-center justify-between">
                <div className="h-3 w-14 rounded bg-zinc-200 dark:bg-zinc-800" />

                <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-md bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-8 w-8 rounded-md bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-8 w-8 rounded-md bg-zinc-200 dark:bg-zinc-800" />
                </div>
            </div>
        </article>
    );
};

export default PromptCardSkeleton;