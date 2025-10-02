import { questions, scoringMatrix } from './profilretraite/QuizzData.js'
import { profilesData, keywords } from './profilretraite/profilesData.js'

export const meta = {
  title: "Quelle stratégie pour votre retraite ?",
  slug: "profil-strategie-retraite",
  type: "Parcours",
  description: "Quel est votre niveau de préparation à la retraite ? Découvrez-le avec ce parcours introspectif.",
  image: "/assets/img/parcours/stratretraite.png",
  tags: ["retraite", "anticipation", "protection", "préparation", "transmission"],
  questions,
  profilesData,
  keywords,
  scoringMatrix
}
