import { questions,scoringMatrix } from '@/content/parcours/profilTransmission/QuizzData'
import { profilesData, keywords } from '@/content/parcours/profilTransmission/profilesData'

export const meta = {
  title: "Transmission de patrimoine",
  slug: "profil-transmission",
  type: "Parcours",
  description: "Évaluez votre niveau de préparation à la transmission de patrimoine.",
  image: "/assets/img/parcours/transmission.png",
  tags: ["transmission", "héritage", "donation", "testament", "SCI"],
  questions,
  profilesData
}