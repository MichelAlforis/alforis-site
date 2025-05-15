import { questions,scoringMatrix } from './profildevie/QuizzData.js'
import { profilesData, keywords } from './profildevie/profilesData.js'

export const meta = {
  title: "Profil de Vie",
  slug: "profil-de-vie",
  type: "Parcours",
  description: "Découvrez quel type de trajectoire patrimoniale vous correspond le mieux.",
  image: "/assets/img/parcours/pvd.png",
  tags: ["profil", "patrimoine", "introspection", "parcours de vie"],
  questions,
  profilesData,
  keywords,
  scoringMatrix
}
