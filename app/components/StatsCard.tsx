import React from "react";

type StatsCardProps = {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
};

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
    return (
        <div className="h-28 rounded-xl border border-zinc-200 bg-white p-4 flex items-center">
            <div className="flex items-start gap-3">
                {icon && (
                    <div className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100">
                        {icon}
                    </div>
                )}

                <div>
                    <h4 className="text-sm font-medium text-zinc-500">
                        {title}
                    </h4>

                    <h2 className="mt-2 text-3xl font-semibold text-zinc-900">
                        {value}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;