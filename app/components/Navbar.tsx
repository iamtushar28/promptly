'use client'
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { openAddPromptModal } from "@/redux/features/modal/modalSlice";

type Props = {};

const Navbar = (props: Props) => {

    const dispatch = useDispatch();

    return (
        <nav className="fixed inset-x-0 top-0 z-20 h-16 border-b border-zinc-200 bg-white px-4 md:px-6">

            {/* ================= Navigation Container ================= */}
            <div className="mx-auto flex h-full w-full items-center justify-between">

                {/* ================= Logo ================= */}
                <h2 className="text-lg font-semibold md:text-xl">
                    Promptly
                </h2>

                {/* ================= Right Section ================= */}
                <div className="flex items-center gap-2 md:gap-4">

                    {/* Add New Prompt Button */}
                    <button
                        onClick={() => dispatch(openAddPromptModal())}
                        className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 md:px-4 cursor-pointer">

                        <IoMdAdd className="text-lg" />

                        <span>
                            Add
                        </span>
                        {/* Hide text on very small screens */}
                        <span className="hidden sm:block">
                            New
                        </span>

                    </button>

                    {/* ================= User Profile ================= */}
                    <button className="flex items-center gap-1 rounded-lg p-1 hover:bg-zinc-100 transition-colors cursor-pointer">

                        {/* Avatar */}
                        <div className="h-8 w-8 rounded-full bg-zinc-100 md:h-10 md:w-10" />

                        {/* Dropdown Icon */}
                        <FaAngleDown className="text-sm text-zinc-600 md:text-base" />

                    </button>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;