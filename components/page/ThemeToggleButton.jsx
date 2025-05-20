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
        <Sun className="w-5 h-5 sm:w-8 sm:h-8 text-ardoise dark:text-ivoire" />
      ) : (
        <Moon className="w-5 h-5 sm:w-8 sm:h-8 text-ardoise dark:text-ivoire" />
      )}
    </button>
  )
}
