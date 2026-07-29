"use client";

import { useEffect } from "react";
import { initializeAuth } from "@/redux/features/auth/authListener";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    useEffect(() => {
        initializeAuth();
    }, []);

    return children;
}