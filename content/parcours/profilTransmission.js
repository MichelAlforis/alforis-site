import { questions,scoringMatrix } from './profilTransmission/QuizzData.js'
import { profilesData, keywords } from './profilTransmission/profilesData.js'

export const meta = {
  title: "Transmission de patrimoine",
  slug: "profil-transmission",
  type: "Parcours",
  description: "Évaluez votre niveau de préparation à la transmission de patrimoine.",
  image: "/assets/img/parcours/transmission.png",
  tags: ["transmission", "héritage", "donation", "testament", "SCI"],
  questions,
  profilesData,
    keywords,
  scoringMatrix
}