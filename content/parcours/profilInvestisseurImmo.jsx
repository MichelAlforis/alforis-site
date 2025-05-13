import { questions,scoringMatrix } from '@/content/parcours/profilInvestisseurImmo/QuizzData'
import { profilesData, keywords } from '@/content/parcours/profilInvestisseurImmo/profilesData'


// content/parcours/profilInvestisseurImmo/meta.js
export const meta = {
  title: "Investisseur immobilier",
  slug: "profil-investisseur-immo",
  type: "Parcours",
  description: "Quel type d'investisseur immobilier êtes-vous ? Découvrez-le en quelques questions.",
  image: "/assets/img/parcours/investisseur-immo.png",
  tags: ["immobilier", "investissement", "patrimoine", "risque", "rendement"],
  questions,
  profilesData
  }