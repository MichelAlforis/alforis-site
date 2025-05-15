import { questions,scoringMatrix } from './profilInvestisseurImmo/QuizzData.js'
import { profilesData, keywords } from './profilInvestisseurImmo/profilesData.js'


// content/parcours/profilInvestisseurImmo/meta.js
export const meta = {
  title: "Investisseur immobilier",
  slug: "profil-investisseur-immo",
  type: "Parcours",
  description: "Quel type d'investisseur immobilier êtes-vous ? Découvrez-le en quelques questions.",
  image: "/assets/img/parcours/investisseur-immo.png",
  tags: ["immobilier", "investissement", "patrimoine", "risque", "rendement"],
  questions,
  profilesData,
  keywords,
  scoringMatrix
  }