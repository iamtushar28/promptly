"use client";

import React from "react";
import { useSelector } from "react-redux";

import StatsCard from "./StatsCard";
import { RootState } from "@/redux/store";

const Greeting = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const prompts = useSelector((state: RootState) => state.prompt.prompts);

    //user name
    const firstName =
        user?.name?.trim().split(" ")[0] || "User";

    // Total prompts
    const totalPrompts = prompts.length;

    // Favourite prompts
    const favourites = prompts.filter(
        (prompt) => prompt.favourite
    ).length;

    // Prompts added in the last 24 hours
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

    const recentlyAdded = prompts.filter(
        (prompt) => prompt.createdAt >= oneDayAgo
    ).length;

    const stats = [
        {
            title: "Total Prompts",
            value: totalPrompts,
        },
        {
            title: "Categories",
            value: 10,
        },
        {
            title: "Favorites",
            value: favourites,
        },
        {
            title: "Recently Added",
            value: recentlyAdded,
        },
    ];

    return (
        <section className="w-full space-y-5">

            {/* ================= Greeting Section ================= */}
            <div>
                <h2 className="text-xl font-semibold text-zinc-900 transition-colors duration-300 dark:text-white md:text-2xl">
                    Welcome back, {firstName}! 👋
                </h2>

                <p className="mt-1 text-sm text-zinc-500 transition-colors duration-300 dark:text-zinc-400">
                    Here's what's happening with your prompts today.
                </p>
            </div>

            {/* ================= Stats Cards ================= */}
            <section className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">

                {/* Render Stats Cards */}
                {stats.map((stat) => (
                    <StatsCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                    />
                ))}

            </section>

        </section>
    );
};

export default Greeting;