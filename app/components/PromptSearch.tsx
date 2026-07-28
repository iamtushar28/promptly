import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { PiExport } from "react-icons/pi";

type Props = {};

const PromptSearch = (props: Props) => {
    return (
        <section className="w-full rounded-t-lg border border-b-0 border-zinc-200 bg-white p-4">

            {/* ================= Search & Filters Container ================= */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                {/* ================= Search Bar ================= */}
                <div className="flex h-10 w-full overflow-hidden rounded-lg border border-zinc-200 bg-white md:max-w-2xl">

                    {/* Search Icon */}
                    <div className="flex h-10 w-10 items-center justify-center text-lg text-zinc-500">
                        <IoSearch />
                    </div>

                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search prompts..."
                        className="h-10 w-full pr-4 text-sm outline-none placeholder:text-zinc-400"
                    />

                </div>

                {/* ================= Filter Options ================= */}
                <div className="flex items-center gap-2 overflow-x-auto">

                    {/* Favourite Filter */}
                    <button className="h-10 rounded-lg border border-zinc-200 bg-white px-4 text-sm transition-colors hover:bg-zinc-50">
                        Favourite
                    </button>

                    {/* Category Filter */}
                    <button className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm transition-colors hover:bg-zinc-50">
                        Category
                        <FaAngleDown className="text-xs" />
                    </button>

                    {/* Sort Filter */}
                    <button className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm transition-colors hover:bg-zinc-50">
                        Sort by: Newest
                        <FaAngleDown className="text-xs" />
                    </button>

                    {/* export prompts */}
                    <button className="h-10 rounded-lg border border-zinc-200 bg-white px-4 text-sm transition-colors hover:bg-zinc-50 flex gap-2 items-center">
                        Export
                        <PiExport className="text-lg" />
                    </button>

                </div>

            </div>

        </section>
    );
};

export default PromptSearch;