// Nouvelle version de detectProfilFromMatrix.js
// sans import, avec scoringMatrix et keywords passés en paramètre

export function detectProfilFromMatrix(answers, textAnswer, scoringMatrix, keywords) {
  if (!scoringMatrix || !Array.isArray(scoringMatrix) || scoringMatrix.length === 0) {
    throw new Error('scoringMatrix manquant ou invalide')
  }

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

  // Traitement de la réponse libre
  if (textAnswer && keywords) {
    Object.entries(keywords).forEach(([profil, mots]) => {
      mots.forEach((mot) => {
        if (textAnswer.toLowerCase().includes(mot.toLowerCase())) {
          scores[profil] += 2
        }
      })
    })
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const [profilPrincipal, scorePrincipal] = sorted[0]
  const [profilSecondaire, scoreSecondaire] = sorted[1] || []

  const ecart = scorePrincipal - scoreSecondaire

  return {
    profilPrincipal,
    profilSecondaire: ecart <= 2 ? profilSecondaire : null,
    scores,
  }
}
