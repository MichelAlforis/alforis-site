'use client'
import { useState, useEffect, useMemo, useRef } from 'react'
import PremiumButton from '../ui/PremiumButton'
import Progress from '../ui/progress'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import RDVTunnelJour from './RDVTunnelJour'
import RDVTunnelHour from './RDVTunnelHour'
import RdvDisponibiliteFallback from './RdvDisponibiliteFallback'

const EVENT_TYPE_ID = {
  appel: '2283473',
  visio: '2283484',
  patrimonial: '2283489',
}

const WEEK_MILLIS = 7 * 24 * 60 * 60 * 1000

export default function RDVTunnel({ type, onConfirm, onFallback }) {
  const [step, setStep] = useState(1)
  const [allSlots, setAllSlots] = useState([])
  const [chosenDate, setChosenDate] = useState(null)
  const [hourOptions, setHourOptions] = useState([])
  const [weekOffset, setWeekOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showFallback, setShowFallback] = useState(false)   // <-- ici !
  const MAX_WEEKS = 3 // ou la valeur que tu veux

  // Focus sur le titre à chaque étape
  const titleRef = useRef()
  useEffect(() => {
    titleRef.current?.focus()
  }, [step])

  // Charger toutes les dispos
  useEffect(() => {
    if (!type) return
    setLoading(true)
    fetch(`/api/calcom/slots?type=${type}`)
      .then(r => r.json())
.then(data => {
  if (Array.isArray(data)) {
    setAllSlots(data)
  } else {
    console.warn('Slots API did not return an array:', data)
    setAllSlots([])
  }
  setWeekOffset(0)
  setStep(1)
})

      .catch(() => setAllSlots([]))
      .finally(() => setLoading(false))
  }, [type])

  // Dates disponibles pour la semaine courante ou suivante
  const dateOptions = useMemo(() => {
    const now = Date.now()
    const start = now + weekOffset * WEEK_MILLIS
    const end = start + WEEK_MILLIS
    return allSlots.filter(s => {
      const t = new Date(s.date).getTime()
      return t >= start && t < end
    })
  }, [allSlots, weekOffset])

  // Handlers
  const handleSelectDate = (date, hours) => {
    setChosenDate(date)
    setHourOptions(hours)
    setStep(2)
    toast.success("Date sélectionnée ! Choisissez votre horaire.", { icon: "📅" })
  }
 
  const handleSelectHour = (hour) => {
    onConfirm({
      slot: {
        eventTypeId: EVENT_TYPE_ID[type],
        start: new Date(`${chosenDate}T${hour}:00`).toISOString()
      },
      date: chosenDate,
      time: hour,
      type
    });
    toast.success("Horaire réservé ! On vous confirme par email sous 24h.", { icon: "⏰" });
}


  // Handler pour fallback depuis enfants
  const handleFallback = () => setShowFallback(true)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <span className="animate-pulse text-doré text-xl">Chargement des créneaux…</span>
      </div>
    )
  }

  return (
    <>
      {!showFallback ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
            className="
              w-full max-w-xl mx-auto my-12
              bg-ivoire/90 dark:bg-acier/90
              rounded-2xl shadow-xl 
              p-0 md:p-10 pt-6
              flex flex-col items-center
              border border-doré/10
            "
          >
            {/* Progress Bar */}
            <Progress value={step} max={2} className="w-2/3 mb-8" />
            {/* Titre éditorial avec accessibilité */}
            <motion.h2
              ref={titleRef}
              tabIndex={-1}
              className="text-2xl font-bold mb-6 text-center tracking-tight text-ardoise dark:text-ivoire outline-none"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {step === 1 ? "Planifiez votre rendez-vous personnalisé" : "Choisissez l’horaire idéal"}
            </motion.h2>

            {/* Étape 1 */}
            {step === 1 && (
              <RDVTunnelJour
                dateOptions={dateOptions}
                weekOffset={weekOffset}
                onSelectDate={handleSelectDate}
                onNextWeek={() => setWeekOffset(w => Math.min(w + 1, MAX_WEEKS))}
                onPrevWeek={() => setWeekOffset(w => Math.max(0, w - 1))}
                onFallback={handleFallback}
                disabled={loading}
              />
            )}
            {/* Étape 2 */}
            {step === 2 && (
              <RDVTunnelHour
                hourOptions={hourOptions}
                chosenDate={chosenDate}
                onSelectHour={handleSelectHour}
                onBack={() => {
                  setStep(1)
                  setHourOptions([])
                }}
                onFallback={handleFallback}
                disabled={loading}
              />
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <RdvDisponibiliteFallback
          onSubmit={() => setShowFallback(false)}
          onBack={() => setShowFallback(false)}
        />
      )}
    </>
  )
}
