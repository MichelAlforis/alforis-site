import { questions, scoringMatrix } from "./ProfilExpat/QuizzData"
import { profilesData, keywords } from "./ProfilExpat/profilData"

// content/parcours/ProfilExpat.js
export const meta = {
  title: "Investisseur expatrié",
  slug: "profil-investisseur-expatrie",
  type: "Parcours",
  description: "Quel type d’investisseur êtes-vous en tant qu’expatrié ? Évaluez votre stratégie fiscale et de retraite à l’international.",
  image: "/assets/img/parcours/investisseur-expatrie.png",
  tags: [
    "expatriation",
    "fiscalité internationale",
    "retraite",
    " investissement",
    "patrimoine",
    "risque",
    "rendement"
  ],
  questions,
  profilesData,
  keywords,
  scoringMatrix
}
