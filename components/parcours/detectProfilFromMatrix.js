import { scoringMatrix } from '../../archives/scoringMatrix'
import { keywords } from '@/archives/datas'

export function detectProfilFromMatrix(answers, textAnswer) {
  const profiles = Object.keys(scoringMatrix[0])
  const scores = profiles.reduce((acc, profil) => ({ ...acc, [profil]: 0 }), {})

  // Traitement des réponses à choix
  answers.forEach((repIndex, qIndex) => {
    if (scoringMatrix[qIndex]) {
      Object.entries(scoringMatrix[qIndex]).forEach(([profil, values]) => {
        scores[profil] += values[repIndex] || 0
      })
    }
  })

  // Traitement de la réponse libre (question 10)
  if (textAnswer) {
    Object.entries(keywords).forEach(([profil, mots]) => {
      mots.forEach((mot) => {
        if (textAnswer.toLowerCase().includes(mot.toLowerCase())) {
          scores[profil] += 2
        }
      })
    })
  }

  // Tri décroissant des scores
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const [profilPrincipal, scorePrincipal] = sorted[0]
  const [profilSecondaire, scoreSecondaire] = sorted[1]

  const ecart = scorePrincipal - scoreSecondaire

  return {
    profilPrincipal,
    profilSecondaire: ecart <= 2 ? profilSecondaire : null,
    scores,
  }
}
