import { questions,scoringMatrix } from '@/content/parcours/profilretraite/QuizzData'
import { profilesData, keywords } from '@/content/parcours/profilretraite/profilesData'

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
