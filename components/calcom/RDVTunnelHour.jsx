'use client'
import PremiumButton from "../ui/PremiumButton"

const formatDateLabel = dateStr =>
  new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long'
  })

const closestHours = (hours, targets) => {
  return targets
    .map(target => {
      const [tH, tM] = target.split(':').map(Number)
      return hours
        .map(h => ({
          h,
          score: Math.abs(Number(h.split(':')[0]) + Number(h.split(':')[1]) / 60 - (tH + tM / 60))
        }))
        .sort((a, b) => a.score - b.score)
        .map(a => a.h)
        .find((h, idx, arr) => arr.indexOf(h) === idx)
    })
    .filter(Boolean)
}

export default function RDVTunnelHour({ hourOptions, chosenDate, onSelectHour, onBack, onFallback }) {
  let morningSlots = hourOptions.filter(h => {
    const [hh] = h.split(':').map(Number)
    return hh >= 9 && hh < 12
  })
  let afternoonSlots = hourOptions.filter(h => {
    const [hh] = h.split(':').map(Number)
    return hh >= 14 && hh < 18
  })

  morningSlots = closestHours(morningSlots, ['10:00', '11:00'])
  afternoonSlots = closestHours(afternoonSlots, ['15:00', '16:00'])
  const fourSlots = [...new Set([...morningSlots, ...afternoonSlots])].filter(Boolean)

  return (
    <div>
      {fourSlots.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {fourSlots.map(h => (
            <PremiumButton
              key={h}
              onClick={() => onSelectHour(h)}
              className="max-w-[140px] ring-1 ring-doré/20 hover:ring-doré transition-all mb-2"
            >
              {h}
            </PremiumButton>
          ))}
        </div>
      ) : (
        <div className="text-doré text-lg mb-3">
          Aucun horaire disponible pour {formatDateLabel(chosenDate)}.
        </div>
      )}

      <div className="flex justify-center gap-4 mt-8 w-full">
        <PremiumButton className="max-w-[180px]" onClick={onBack}>
          ← Revenir aux dates
        </PremiumButton>
        <PremiumButton className="max-w-[180px]" onClick={onFallback}>
          Proposer mes disponibilités
        </PremiumButton>
      </div>
    </div>
  )
}
