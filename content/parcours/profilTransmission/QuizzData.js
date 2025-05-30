export const questions = [
  {
    text: "Avez-vous déjà mis en place des dispositifs de transmission (donation, testament, SCI) ?",
    options: [
      "Oui, tout est déjà organisé.",
      "Quelques éléments, mais c'est partiel.",
      "Non, je n'ai encore rien fait.",
      "Je connais les outils mais n'ai pas agi.",
      "Je ne savais pas comment m'y prendre."
    ]
  },
  {
    text: "Quelle importance accordez-vous à la transmission auprès de vos proches ?",
    options: [
      "Prioritaire, je veux protéger mes héritiers.",
      "Important, mais j'ai d'autres priorités.",
      "Modéré, j'y pense parfois.",
      "Faible, je veux garder le contrôle jusqu'au bout.",
      "Aucun, je n'ai pas d'héritiers désignés."
    ]
  },
  {
    text: "Votre connaissance de la fiscalité de succession est :",
    options: [
      "Expert, j'ai déjà optimisé.",
      "Avancé, je comprends la plupart des règles.",
      "Intermédiaire, j'ai besoin de conseils.",
      "Débutant, je découvre ce sujet.",
      "Ignorant, il me manque des bases."
    ]
  },
  {
    text: "Comment préférez-vous préparer la transmission ?",
    options: [
      "Donation anticipée (donation-partage).",
      "Testament personnalisé.",
      "Constitution d'une SCI familiale.",
      "Assurance-vie dédiée.",
      "Je ne sais pas."
    ]
  },
  {
    text: "Quel est votre degré de confiance envers vos héritiers ?",
    options: [
      "Total confiance.",
      "Bonne confiance, mais je veux des garde-fous.",
      "Moyenne, je souhaite un intermédiaire.",
      "Basse, je préfère un professionnel.",
      "Aucune, je veux tout gérer moi-même."
    ]
  },
  {
    text: "Quel horizon de transmission ciblez-vous ?",
    options: [
      "Immédiat (dans les 5 ans).",
      "Moyen terme (5-10 ans).",
      "Long terme (>10 ans).",
      "À ma succession uniquement.",
      "Pas de calendrier défini."
    ]
  },
  {
    text: "En une phrase, quel est votre plus grand frein à la transmission ?",
    options: null
  }
]

export const scoringMatrix = [
  // Q1
  {
    "Le Préparé": [5, 3, 1, 2, 1],
    "L'Indécis": [1, 3, 5, 4, 5],
    "Le Délégateur": [2, 3, 4, 3, 2],
  },
  // Q2
  {
    "Le Préparé": [5, 4, 3, 2, 1],
    "L'Indécis": [3, 4, 3, 2, 1],
    "Le Délégateur": [2, 2, 3, 4, 5],
  },
  // Q3
  {
    "Le Préparé": [5, 4, 3, 2, 1],
    "L'Indécis": [2, 3, 4, 5, 5],
    "Le Délégateur": [3, 3, 3, 3, 3],
  },
  // Q4
  {
    "Le Préparé": [5, 4, 4, 4, 1],
    "L'Indécis": [3, 2, 2, 2, 5],
    "Le Délégateur": [2, 3, 3, 3, 2],
  },
  // Q5
  {
    "Le Préparé": [5, 4, 3, 2, 1],
    "L'Indécis": [2, 3, 3, 2, 2],
    "Le Délégateur": [3, 3, 4, 5, 5],
  },
  // Q6
  {
    "Le Préparé": [5, 4, 3, 2, 1],
    "L'Indécis": [2, 3, 3, 3, 4],
    "Le Délégateur": [3, 3, 3, 4, 5],
  }
]
