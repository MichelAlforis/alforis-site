'use client'

import { Calendar, ExternalLink } from 'lucide-react'

const EVENTS = {
  partnership: {
    url: 'https://cal.com/alforis/partenariat-strategique',
    label: "Discuter d'un partenariat",
    duration: '60 min'
  },
  discovery: {
    url: 'https://cal.com/alforis/decouverte-solution',
    label: 'Découvrir nos solutions',
    duration: '30 min'
  },
  info: {
    url: 'https://cal.com/alforis/information-tpm',
    label: 'Poser une question',
    duration: '15 min'
  }
}

export default function CalComButtonB2B({ type = 'discovery', className = '' }) {
  const event = EVENTS[type] || EVENTS.discovery

  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-alforis-retro inline-flex items-center justify-center space-x-2 hover:scale-105 transition-transform ${className}`}
    >
      <Calendar className="h-5 w-5" />
      <span>{event.label}</span>
      <span className="text-xs opacity-70">({event.duration})</span>
      <ExternalLink className="h-4 w-4 opacity-60" />
    </a>
  )
}