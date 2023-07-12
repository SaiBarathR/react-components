"use client"
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

//Wrapper for your layout.js children
export function ThemeProvider({ children, ...props }) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}