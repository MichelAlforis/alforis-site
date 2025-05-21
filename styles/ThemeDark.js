'use client'
// styles/ThemeDark.js
import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  // Charger le thème sauvegardé dans localStorage
  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDark(false);
    }
  }, []);

  // Changer le thème et sauvegarder dans localStorage
  const toggleTheme = () => {
    setDark((prev) => {
      const newDark = !prev;
      if (newDark) {
        document.documentElement.classList.add('dark');
        window.localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        window.localStorage.setItem('theme', 'light');
      }
      return newDark;
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
