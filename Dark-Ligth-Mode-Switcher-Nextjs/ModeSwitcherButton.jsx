"use client";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { space_grotesk } from "@/icons/font";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = useMemo(() => theme === "system" ? systemTheme : theme, [systemTheme, theme])

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <label className="theme animate-appear">
            <span className="theme__toggle-wrap">
                <input id="theme" className="theme__toggle cursor-pointer" onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")} type="checkbox" role="switch" defaultChecked={currentTheme === "dark"} />
                <span className="theme__fill"></span>
                <span className="theme__icon">
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                </span>
            </span>
        </label>
    );
};