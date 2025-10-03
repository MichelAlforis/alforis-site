'use client'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'

export default function LanguagePersistence() {
  const locale = useLocale()
  
  useEffect(() => {
    // Sauvegarder la préférence de langue
    localStorage.setItem('alforis-preferred-locale', locale)
    
    // Optionnel : Envoyer au serveur via cookie
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`
  }, [locale])
  
  return null // Ce composant ne rend rien
}