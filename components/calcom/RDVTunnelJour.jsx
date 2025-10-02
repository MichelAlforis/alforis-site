'use client'
import PremiumButton from "../ui/PremiumButton";

// Fonction utilitaire pour mélanger un tableau (Fisher-Yates)
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const formatDateLabel = dateStr =>
  new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

export default function RDVTunnelJour({
  dateOptions,
  weekOffset,
  onSelectDate,
  onNextWeek,
  onPrevWeek,
  onFallback
}) {
  // Trie, puis randomise, puis ajoute samedi si absent (mais dispo)
  const sortedDates = [...dateOptions].sort((a, b) => new Date(a.date) - new Date(b.date));
  const saturdayObj = sortedDates.find(d => new Date(d.date).getDay() === 6);

  // Randomize days (hors samedi)
  let randomDays = shuffle(sortedDates.filter(d => saturdayObj ? d.date !== saturdayObj.date : true));

  // On garde les 3 premiers random, puis on force le samedi en dernier si absent
  let proposedDays = randomDays.slice(0, 3);
  if (saturdayObj && !proposedDays.some(d => d.date === saturdayObj.date)) {
    if (proposedDays.length === 3) {
      proposedDays[2] = saturdayObj;
    } else {
      proposedDays.push(saturdayObj);
    }
  }

  const weekLabel = weekOffset === 0
    ? "cette semaine"
    : weekOffset === 1
    ? "la semaine prochaine"
    : `la semaine ${weekOffset + 1}`;

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
          <div className="w-full flex justify-between mt-6">
            <PremiumButton
              onClick={onPrevWeek}
              disabled={weekOffset === 0}
              variant="outline"
              className="min-w-[160px]"
            >
              &lt; Semaine précédente
            </PremiumButton>
            <PremiumButton
              onClick={onNextWeek}
              disabled={weekOffset >= 3}
              variant="outline"
              className="min-w-[160px]"
            >
              Semaine suivante &gt;
            </PremiumButton>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-doré text-lg">
            Aucun créneau disponible {weekLabel}.
          </p>
          <div className="flex justify-center gap-4">
            <PremiumButton
              onClick={onPrevWeek}
              disabled={weekOffset === 0}
              variant="outline"
              className="min-w-[160px]"
            >
              &lt; Semaine précédente
            </PremiumButton>
            {weekOffset < 3 ? (
              <PremiumButton
                onClick={onNextWeek}
                variant="outline"
                className="min-w-[160px]"
              >
                Semaine suivante &gt;
              </PremiumButton>
            ) : (
              <PremiumButton
                onClick={onFallback}
                className="min-w-[160px]"
              >
                Proposer mes disponibilités
              </PremiumButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
