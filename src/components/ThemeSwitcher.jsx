"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"


export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // When mounted on client, now we can show the UI
    React.useEffect(() => setMounted(true), [])

    if (!mounted) return null


    return (
        <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="cursor-pointer rounded p-3 h-10 w-10"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? (
                <Moon className="text-gray-400 dark:text-gray-200" />
            ) : (
                <Sun className="text-gray-400 dark:text-gray-200" />
            )}
        </button>
    )
}
