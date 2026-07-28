import React from "react";
import StatsCard from "./StatsCard";

/* ================= Stats Data ================= */
const stats = [
    {
        title: "Total Prompts",
        value: 100,
    },
    {
        title: "Categories",
        value: 12,
    },
    {
        title: "Favorites",
        value: 28,
    },
    {
        title: "Recently Added",
        value: 54,
    },
];

const Greeting = () => {
    return (
        <section className="w-full space-y-5">

            {/* ================= Greeting Section ================= */}
            <div>
                <h2 className="text-xl font-semibold md:text-2xl">
                    Welcome back, Tushar! 👋
                </h2>

                <p className="text-sm text-zinc-400">
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