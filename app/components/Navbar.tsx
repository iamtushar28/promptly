'use client';

import React from "react";
import { IoMdAdd } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { openAddPromptModal } from "@/redux/features/modal/modalSlice";
import ThemeToggle from "./ThemeToggle";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        // ================= Navigation Bar =================
        <nav className="fixed inset-x-0 top-0 z-20 h-16 border-b border-zinc-200 bg-white transition-colors duration-300 dark:border-zinc-800 dark:bg-black">

            {/* ================= Navigation Container ================= */}
            <div className="mx-auto flex h-full items-center justify-between px-4 md:px-6">

                {/* ================= Logo ================= */}
                <h2 className="text-lg font-semibold text-zinc-900 transition-colors duration-300 dark:text-white md:text-xl">
                    Promptly
                </h2>

                {/* ================= Right Section ================= */}
                <div className="flex items-center gap-2 md:gap-4">

                    {/* ================= Add New Prompt Button ================= */}
                    <button
                        onClick={() => dispatch(openAddPromptModal())}
                        className="flex cursor-pointer items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 active:scale-95 md:px-4"
                    >
                        {/* Add Icon */}
                        <IoMdAdd className="text-lg" />

                        {/* Button Text */}
                        <span>Add</span>

                        {/* Hide on Small Screens */}
                        <span className="hidden sm:block">
                            New
                        </span>
                    </button>

                    {/* ================= Theme Toggle ================= */}
                    <ThemeToggle />

                    {/* ================= User Profile ================= */}
                    <button
                        className="flex cursor-pointer items-center gap-2 rounded-lg p-1 transition-colors duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    >
                        {/* User Avatar */}
                        <div className="h-8 w-8 rounded-full border border-zinc-200 bg-zinc-200 transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-800 md:h-10 md:w-10 flex justify-center items-center dark:text-white">
                            <FaUserAlt />
                        </div>

                        {/* Dropdown Arrow */}
                        <FaAngleDown className="text-sm text-zinc-600 transition-colors duration-300 dark:text-zinc-400 md:text-base" />
                    </button>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;