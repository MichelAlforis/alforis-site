// /components/ui/SwitchDarkMode.js
'use client';

import { useTheme } from "@/styles/ThemeDark"; // Import du contexte
import { Moon,Sun } from "lucide-react";

export default function SwitchDarkMode() {
  const { dark, toggleTheme } = useTheme(); // Utilisation du thème du contexte

  const isLight = !dark;

  return (
    <button
      type="button"
      aria-label="Basculer mode sombre/clair"
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-between
        w-16 h-10 p-2 rounded-full border-2 border-anthracite
        ${isLight ? 'bg-ivoire' : 'bg-ardoise'}
        transition-colors duration-1000
      `}
    >
      {/* Icônes placées en justify-between */}
      <Moon className={`w-6 h-6 text-doré transition-opacity duration-1000 ${isLight ? 'opacity-100' : 'opacity-0'}`} />
      <Sun className={`w-6 h-6 text-doré transition-opacity duration-1000 ${isLight ? 'opacity-0' : 'opacity-100'}`} />

      {/* Le rond : position absolute, à 4px du bord */}
      <span
        className={`
          absolute top-1
          bg-white w-7 h-7 rounded-full shadow-lg
          transition-all duration-1000
          ${isLight ? 'left-1' : 'right-1'}
        `}
      />
    </button>
  );
}
