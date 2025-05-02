import { questions,scoringMatrix } from '@/content/parcours/profildevie/QuizzData'
import { profilesData, keywords } from '@/content/parcours/profildevie/profilesData'

export const meta = {
  title: "Profil de Vie",
  slug: "profil-de-vie",
  type: "Parcours",
  description: "Découvrez quel type de trajectoire patrimoniale vous correspond le mieux.",
  image: "/assets/parcours/pvd.png",
  tags: ["profil", "patrimoine", "introspection", "parcours de vie"],
  questions,
  profilesData,
  keywords,
  scoringMatrix
}
