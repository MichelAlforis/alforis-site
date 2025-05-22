'use client'

import { useTheme } from "@/styles/ThemeDark";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggleButton() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full hover:bg-light dark:hover:bg-acier/70 transition"
    >
      {dark ? (
        <Sun className="w-5 h-5 sm:w-8 sm:h-8 text-ardoise dark:text-ivoire" />
      ) : (
        <Moon className="w-5 h-5 sm:w-8 sm:h-8 text-ardoise dark:text-ivoire" />
      )}
    </button>
  )
}
