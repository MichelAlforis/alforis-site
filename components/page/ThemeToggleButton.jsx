// components/ThemeToggleButton.jsx
'use client'

import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('theme')
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    window.localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(prev => !prev)}
      aria-label="Toggle theme"
      className="p-2 rounded-full hover:bg-light dark:hover:bg-acier/70 transition"
    >
      {isDark ? (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-ardoise dark:text-acier-100" />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-ardoise" />
      )}
    </button>
  )
}
