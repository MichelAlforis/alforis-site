// content/parcours/profilretraite/QuizzData.js
export const questions = [
  {
    text: "Avez-vous déjà commencé à préparer financièrement votre retraite ?",
    options: [
      "Oui, j'ai déjà mis en place plusieurs stratégies",
      "J'ai commencé, mais de façon limitée",
      "Je suis en phase de réflexion uniquement",
      "Non, pas du tout",
      "Je ne sais pas comment m'y prendre"
    ]
  },
  {
    text: "Quel est votre niveau de connaissance des dispositifs fiscaux liés à la retraite ?",
    options: [
      "Très élevé, je les utilise activement",
      "Correct, mais j'aimerais mieux les comprendre",
      "Faible, j'en ai entendu parler mais sans plus",
      "Très limité, c'est un sujet nouveau pour moi",
      "Aucun, je suis totalement novice"
    ]
  },
  {
    text: "Votre priorité principale concernant votre retraite est :",
    options: [
      "Générer un maximum de revenus complémentaires",
      "Protéger mon capital existant",
      "Optimiser fiscalement mes placements",
      "Préparer la transmission à mes proches",
      "Je ne suis pas encore sûr(e)"
    ]
  },
  {
    text: "Quelle est votre attitude face au risque financier en vue de la retraite ?",
    options: [
      "Très prudent(e), je privilégie la sécurité",
      "Modéré(e), je veux un équilibre rendement/risque",
      "Ouvert(e), je suis prêt(e) à prendre des risques calculés",
      "Très ouvert(e), la performance prime",
      "Je ne sais pas encore"
    ]
  },
  {
    text: "À quelle échéance prévoyez-vous votre départ en retraite ?",
    options: [
      "Dans moins de 5 ans",
      "Entre 5 et 10 ans",
      "Entre 10 et 15 ans",
      "Plus de 15 ans",
      "Aucune échéance claire pour l'instant"
    ]
  },
  {
    text: "En une phrase, quelle est votre plus grande inquiétude concernant votre retraite ?",
    options: null // réponse ouverte
  }
]

export const scoringMatrix = [
  // Question 1
  {
    "Le Visionnaire": [5, 4, 3, 2, 1],
    "Le Pragmatique": [4, 5, 3, 2, 1],
    "L'Inquiet": [1, 2, 3, 4, 5]
  },
  // Question 2
  {
    "Le Visionnaire": [5, 4, 3, 2, 1],
    "Le Pragmatique": [3, 4, 5, 2, 1],
    "L'Inquiet": [1, 2, 3, 4, 5]
  },
  // Question 3
  {
    "Le Visionnaire": [3, 5, 4, 5, 1],
    "Le Pragmatique": [5, 3, 5, 3, 1],
    "L'Inquiet": [1, 4, 2, 3, 5]
  },
  // Question 4
  {
    "Le Visionnaire": [5, 4, 3, 2, 1],
    "Le Pragmatique": [3, 5, 4, 2, 1],
    "L'Inquiet": [1, 2, 3, 4, 5]
  },
  // Question 5
  {
    "Le Visionnaire": [2, 3, 4, 5, 1],
    "Le Pragmatique": [5, 4, 3, 2, 1],
    "L'Inquiet": [5, 4, 3, 2, 1]
  }
]

// detectProfilFromMatrix.js et meta export seront ajoutés ensuite