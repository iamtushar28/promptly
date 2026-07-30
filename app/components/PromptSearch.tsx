"use client";

import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";

import {
    setCategory,
    setFavouriteOnly,
    setSearch,
    setSort,
} from "@/redux/features/prompt/promptSlice";

import { categories } from "@/redux/features/prompt/promptSelectors";
import ExportPromptsButton from "./ExportPromptsButton";

const PromptSearch = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        search,
        category,
        favouritesOnly,
        sort,
    } = useSelector((state: RootState) => state.prompt);

    // Local state for debounce
    const [searchValue, setSearchValue] = useState(search);

    // ==========================================
    // Debounce Search
    // ==========================================

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSearch(searchValue));
        }, 300);

        return () => clearTimeout(timer);
    }, [searchValue, dispatch]);

    return (
        <section className="w-full rounded-t-lg border border-b-0 border-zinc-200 bg-white p-4 transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900">

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                {/* Search */}
                <div className="flex h-10 w-full overflow-hidden rounded-lg border border-zinc-200 bg-white transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-950 md:max-w-2xl">

                    <div className="flex h-10 w-10 items-center justify-center text-lg text-zinc-500 dark:text-zinc-400">
                        <IoSearch />
                    </div>

                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search title or prompt..."
                        className="h-10 w-full bg-transparent pr-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-500"
                    />

                </div>

                <div className="flex items-center gap-2 overflow-x-auto">

                    {/* Favourite */}

                    <button
                        onClick={() =>
                            dispatch(
                                setFavouriteOnly(!favouritesOnly)
                            )
                        }
                        className={`h-10 rounded-lg border px-4 text-sm transition-all duration-300 whitespace-nowrap cursor-pointer

                        ${favouritesOnly
                                ? "border-blue-500 bg-blue-500 text-white"
                                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            }`}
                    >
                        Favourite
                    </button>

                    {/* Category */}

                    <select
                        value={category}
                        onChange={(e) =>
                            dispatch(setCategory(e.target.value))
                        }
                        className="h-10 rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-700 outline-none transition-colors dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 cursor-pointer"
                    >
                        {categories.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>
                        ))}
                    </select>

                    {/* Sort */}

                    <select
                        value={sort}
                        onChange={(e) =>
                            dispatch(
                                setSort(
                                    e.target.value as
                                    | "newest"
                                    | "oldest"
                                    | "az"
                                    | "za"
                                )
                            )
                        }
                        className="h-10 rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-700 outline-none transition-colors dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 cursor-pointer"
                    >
                        <option value="newest">
                            Newest
                        </option>

                        <option value="oldest">
                            Oldest
                        </option>

                        <option value="az">
                            A → Z
                        </option>

                        <option value="za">
                            Z → A
                        </option>
                    </select>

                    {/* Export */}
                    <ExportPromptsButton />

                </div>

            </div>

        </section>
    );
};

export default PromptSearch;