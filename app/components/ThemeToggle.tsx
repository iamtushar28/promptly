import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    }, []);

    const toggleTheme = () => {
        const dark = !isDark;

        setIsDark(dark);

        document.documentElement.classList.toggle("dark", dark);

        localStorage.setItem("theme", dark ? "dark" : "light");
    };

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-full dark:text-white bg-zinc-100 dark:bg-zinc-800 text-lg transition h-10 w-10 cursor-pointer"
        >
            {isDark ? <MdLightMode /> : <MdDarkMode />}
        </button>
    );
};

export default ThemeToggle;