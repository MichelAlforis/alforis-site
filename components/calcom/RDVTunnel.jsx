'use client'
import { useState, useEffect } from 'react'

const WEEK_MILLIS = 7 * 24 * 60 * 60 * 1000
const formatDateLabel = dateStr =>
  new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long'
  })

export default function RDVTunnel({ type, onConfirm, onFallback }) {
  const [step, setStep] = useState(1)
  const [allSlots, setAllSlots] = useState([])
  const [dateOptions, setDateOptions] = useState([])
  const [chosenDate, setChosenDate] = useState(null)
  const [hourOptions, setHourOptions] = useState([])
  const [weekOffset, setWeekOffset] = useState(0)

  // 1) Charger toutes les dispos
  useEffect(() => {
    if (!type) return
    fetch(`/api/calcom/slots?type=${type}`)
      .then(r => r.json())
      .then(data => {
        setAllSlots(data)
        setWeekOffset(0)
        setStep(1)
      })
      .catch(() => setAllSlots([]))
  }, [type])

  // 2) Filtrer selon semaine courante ou suivante
  useEffect(() => {
    const now = Date.now()
    const start = now + weekOffset * WEEK_MILLIS
    const end = start + WEEK_MILLIS
    const filtered = allSlots.filter(s => {
      const t = new Date(s.date).getTime()
      return t >= start && t < end
    })
    setDateOptions(filtered)
  }, [allSlots, weekOffset])

  // Étape 1 : choix de la date
  if (step === 1) {
    return (
      <div className="space-y-6 text-center">
        <h3 className="text-xl font-semibold">1. Choisissez une date</h3>
        {dateOptions.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {dateOptions.map(d => (
              <button
                key={d.date}
                className="px-6 py-3 bg-acier text-ivoire rounded-xl hover:bg-doré transition"
                onClick={() => {
                  setChosenDate(d.date)
                  setHourOptions(d.hours)
                  setStep(2)
                }}
              >
                {formatDateLabel(d.date)}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <p>
              {weekOffset === 0
                ? "Aucun créneau disponible cette semaine."
                : "Aucun créneau disponible la semaine suivante."}
            </p>
            {weekOffset === 0 ? (
              <button
                className="underline"
                onClick={() => setWeekOffset(1)}
              >
                Voir la semaine suivante
              </button>
            ) : (
              <button
                className="underline"
                onClick={() => onFallback && onFallback(type)}
              >
                Proposer mes disponibilités
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

  // Étape 2 : choix de l'horaire
  if (step === 2) {
    return (
      <div className="space-y-6 text-center">
        <h3 className="text-xl font-semibold">2. Choisissez un horaire</h3>
        {hourOptions.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {hourOptions.map(h => (
              <button
                key={h}
                className="px-6 py-3 bg-acier text-ivoire rounded-xl hover:bg-doré transition"
                onClick={() => onConfirm({ type, date: chosenDate, time: h })}
              >
                {h}
              </button>
            ))}
          </div>
        ) : (
          <p>Aucun horaire disponible pour {formatDateLabel(chosenDate)}.</p>
        )}
        <div className="flex justify-center gap-6 mt-4">
          <button className="underline" onClick={() => setStep(1)}>
            ← Revenir aux dates
          </button>
          <button
            className="underline"
            onClick={() => onFallback && onFallback(type)}
          >
            Proposer mes disponibilités
          </button>
        </div>
      </div>
    )
  }

  return null
}
