'use client'
import PremiumButton from "../ui/PremiumButton";

const formatDateLabel = dateStr =>
  new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long'
  })

export default function RDVTunnelJour({ dateOptions, weekOffset, onSelectDate, onNextWeek, onFallback }) {
  // Tri et sélection logic
  const sortedDates = [...dateOptions].sort((a, b) => new Date(a.date) - new Date(b.date));
  const saturdayObj = sortedDates.find(d => new Date(d.date).getDay() === 6);
  let proposedDays = sortedDates.slice(0, 3);
  if (saturdayObj && !proposedDays.some(d => d.date === saturdayObj.date)) {
    if (proposedDays.length === 3) {
      proposedDays[2] = saturdayObj;
    } else {
      proposedDays.push(saturdayObj);
    }
  }

  return (
    <div>
      {proposedDays.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {proposedDays.map(d => (
            <PremiumButton
              key={d.date}
              onClick={() => onSelectDate(d.date, d.hours)}
              className="max-w-[170px] ring-1 ring-doré/20 hover:ring-doré transition-all mb-2"
            >
              {formatDateLabel(d.date)}
            </PremiumButton>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-doré text-lg">
            {weekOffset === 0
              ? "Aucun créneau disponible cette semaine."
              : "Aucun créneau disponible la semaine suivante."}
          </p>
          {weekOffset === 0 ? (
            <PremiumButton onClick={onNextWeek}>
              Voir la semaine suivante
            </PremiumButton>
          ) : (
            <PremiumButton onClick={onFallback}>
              Proposer mes disponibilités
            </PremiumButton>
          )}
        </div>
      )}
    </div>
  )
}
