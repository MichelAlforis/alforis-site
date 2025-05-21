// /components/ui/SwitchDarkMode.js
'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function SwitchDarkMode() {
  const [dark, setDark] = useState(false);

  // applique/enlève la classe `dark` sur <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const isLight = !dark;

  return (
    <button
      type="button"
      aria-label="Basculer mode sombre/clair"
      onClick={() => setDark(prev => !prev)}
      className={`
        relative flex items-center justify-between
        w-14 h-8 p-1 rounded-full border-doré
        ${isLight ? 'bg-ivoire' : 'bg-ardoise'}
        transition-colors duration-1000
      `}
    >
      {/* Icônes placées en justify-between */}
      <Moon className={`w-5 h-5 text-doré transition-opacity duration-1000 ${isLight ? 'opacity-100' : 'opacity-0'}`} />
      <Sun  className={`w-5 h-5 text-doré transition-opacity duration-1000 ${isLight ? 'opacity-0' : 'opacity-100'}`} />

      {/* Le rond : position absolute, à 4px du bord */}
      <span
        className={`
          absolute top-1
          bg-white w-6 h-6 rounded-full shadow-lg
          transition-all duration-1000
          ${isLight ? 'left-1' : 'right-1'}
        `}
      />
    </button>
  );
}
