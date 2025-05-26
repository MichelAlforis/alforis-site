export const questions = [
  {
    text: "Avez-vous déjà entrepris des démarches d'optimisation fiscale ?",
    options: [
      "Oui, j'ai mis en place plusieurs dispositifs efficaces",
      "Quelques-uns, mais sans vraie stratégie globale",
      "Je commence tout juste à y réfléchir",
      "Non, je n'ai jamais envisagé cela",
      "Je ne comprends pas vraiment comment procéder"
    ]
  },
  {
    text: "Quelle importance accordez-vous à l'équilibre entre optimisation fiscale et sécurité financière ?",
    options: [
      "C’est primordial, l’équilibre est ma priorité absolue",
      "Important, mais je privilégie légèrement l'optimisation",
      "Important, mais je privilégie légèrement la sécurité",
      "Je privilégie totalement l’optimisation fiscale",
      "Je privilégie totalement la sécurité financière"
    ]
  },
  {
    text: "Votre connaissance des dispositifs fiscaux existants est :",
    options: [
      "Très avancée, je maîtrise parfaitement",
      "Bonne, mais j'ai besoin de validation externe",
      "Intermédiaire, j'ai besoin d'accompagnement",
      "Faible, je découvre à peine",
      "Nulle, ce sujet me dépasse totalement"
    ]
  },
  {
    text: "Quelle démarche correspond le mieux à votre état d'esprit actuel ?",
    options: [
      "Agir vite pour bénéficier rapidement des avantages fiscaux",
      "Prendre le temps nécessaire pour sécuriser chaque étape",
      "Optimiser uniquement les aspects faciles à gérer",
      "Confier entièrement cette démarche à un professionnel",
      "Je ne suis pas sûr(e) de la démarche à adopter"
    ]
  },
  {
    text: "À quel horizon souhaitez-vous optimiser votre fiscalité ?",
    options: [
      "Immédiatement (dans l'année)",
      "Court terme (1 à 3 ans)",
      "Moyen terme (3 à 5 ans)",
      "Long terme (> 5 ans)",
      "Aucune échéance précise pour l'instant"
    ]
  },
  {
    text: "En une phrase, quel est votre principal frein à l'optimisation fiscale ?",
    options: null
  }
]

export const scoringMatrix = [
  // Q1
  {
    "L'Optimisateur": [5, 4, 3, 1, 1],
    "Le Chercheur d'équilibre": [3, 5, 4, 2, 1],
    "Le Néophyte": [1, 2, 3, 5, 5]
  },
  // Q2
  {
    "L'Optimisateur": [4, 5, 3, 5, 1],
    "Le Chercheur d'équilibre": [5, 4, 5, 2, 3],
    "Le Néophyte": [1, 2, 3, 1, 5]
  },
  // Q3
  {
    "L'Optimisateur": [5, 4, 3, 2, 1],
    "Le Chercheur d'équilibre": [3, 4, 5, 3, 1],
    "Le Néophyte": [1, 2, 3, 5, 5]
  },
  // Q4
  {
    "L'Optimisateur": [5, 3, 4, 2, 1],
    "Le Chercheur d'équilibre": [4, 5, 3, 3, 1],
    "Le Néophyte": [1, 2, 3, 5, 5]
  },
  // Q5
  {
    "L'Optimisateur": [5, 4, 3, 2, 1],
    "Le Chercheur d'équilibre": [4, 5, 5, 3, 1],
    "Le Néophyte": [1, 2, 3, 5, 5]
  }
]
