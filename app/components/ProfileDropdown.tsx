'use client';

import React from "react";
import Image from "next/image";
import { FaAngleDown, FaUser } from "react-icons/fa6";

interface ProfileDropdownProps {
    user: {
        name: string;
        email: string;
        photo: string;
    };
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    handleLogout: () => void;
}

const ProfileDropdown = ({
    user,
    isOpen,
    setIsOpen,
    dropdownRef,
    handleLogout,
}: ProfileDropdownProps) => {
    return (
        <div
            className="relative"
            ref={dropdownRef}
        >

            {/* ================= User Profile ================= */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex cursor-pointer items-center gap-2 rounded-lg p-1 transition-colors duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >

                {/* User Avatar */}
                {user.photo ? (
                    <Image
                        src={user.photo}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white">
                        <FaUser />
                    </div>
                )}

                {/* Dropdown Arrow */}
                <FaAngleDown
                    className={`transition-all dark:text-white duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />

            </button>

            {/* ================= Profile Dropdown ================= */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">

                    {/* ================= User Info ================= */}
                    <div className="flex items-center gap-3 border-b border-zinc-200 p-4 dark:border-zinc-800">

                        {user.photo ? (
                            <Image
                                src={user.photo}
                                alt={user.name}
                                width={48}
                                height={48}
                                className="h-12 w-12 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
                                <FaUser />
                            </div>
                        )}

                        <div className="overflow-hidden">
                            <p className="truncate font-semibold text-zinc-900 dark:text-white">
                                {user.name}
                            </p>

                            <p className="truncate text-sm text-zinc-500">
                                {user.email}
                            </p>
                        </div>

                    </div>

                    {/* ================= Logout ================= */}
                    <button
                        onClick={handleLogout}
                        className="w-full cursor-pointer px-4 py-3 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
                    >
                        Logout
                    </button>

                </div>
            )}

        </div>
    );
};

export default ProfileDropdown;