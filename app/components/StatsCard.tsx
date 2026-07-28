import React from "react";

type StatsCardProps = {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
};

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
    return (

        /* ================= Stats Card ================= */
        <div className="flex h-28 items-center rounded-xl border border-zinc-200 bg-white p-4 transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900">

            <div className="flex items-start gap-3">

                {/* ================= Card Icon ================= */}
                {icon && (
                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-colors duration-300 dark:bg-zinc-800 dark:text-zinc-300 md:flex">
                        {icon}
                    </div>
                )}

                {/* ================= Card Content ================= */}
                <div>

                    {/* Card Title */}
                    <h4 className="text-sm font-medium text-zinc-500 transition-colors duration-300 dark:text-zinc-400">
                        {title}
                    </h4>

                    {/* Card Value */}
                    <h2 className="mt-2 text-3xl font-semibold text-zinc-900 transition-colors duration-300 dark:text-white">
                        {value}
                    </h2>

                </div>

            </div>

        </div>
    );
};

export default StatsCard;