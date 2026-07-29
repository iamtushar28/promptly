'use client';

import React, { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import ThemeToggle from "./ThemeToggle";

import { RootState } from "@/redux/store";
import { openAddPromptModal } from "@/redux/features/modal/modalSlice";

import { loginWithGoogle, logoutUser } from "@/firebase/auth";
import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
    const dispatch = useDispatch();

    // ================= Getting User State =================
    const { user, loading } = useSelector(
        (state: RootState) => state.auth
    );

    // ================= Dropdown State =================
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // ================= User Login =================
    const handleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error(error);
        }
    };

    // ================= User Logout =================
    const handleLogout = async () => {
        try {
            await logoutUser();
            setIsOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    // ================= Close Dropdown on Outside Click =================
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

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

                    {/* ================= Show Theme Toggle Only Before Login ================= */}
                    {user && <ThemeToggle />}

                    {/* ================= Authentication Section ================= */}

                    {loading ? (

                        /* ================= Authentication Loading ================= */
                        <div className="h-10 w-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />

                    ) : user ? (

                        /* ================= Logged In User ================= */
                        <ProfileDropdown
                            user={user}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            dropdownRef={dropdownRef}
                            handleLogout={handleLogout}
                        />

                    ) : (

                        /* ================= User Login Button ================= */
                        <button
                            onClick={handleLogin}
                            className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 active:scale-95"
                        >
                            Login
                        </button>

                    )}

                </div>

            </div>

        </nav>
    );
};

export default Navbar;