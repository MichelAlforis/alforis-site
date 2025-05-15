import { questions,scoringMatrix } from './profilretraite/QuizzData.js'
import { profilesData, keywords } from './profilretraite/profilesData.js'

// meta export
export const meta = {
  title: "Préparer sa retraite",
  slug: "profil-retraite",
  type: "Parcours",
  description: "Quel est votre niveau de préparation à la retraite ? Découvrez-le avec ce parcours introspectif.",
  image: "/assets/img/parcours/retraite.png",
  tags: ["retraite", "anticipation", "protection", "préparation", "transmission"],
  questions,
  profilesData,
  keywords,
  scoringMatrix
}
