// QUESTIONS
export const questions = [
  {
    text: "Avez-vous déjà réalisé un inventaire complet de vos biens et dettes en vue de la séparation ?",
    options: [
      "Oui, l'inventaire est exhaustif et à jour",
      "Un inventaire partiel est fait",
      "Je viens de commencer",
      "Non, rien n'a été entrepris",
      "Je ne sais pas comment procéder"
    ]
  },
  {
    text: "Votre connaissance du régime matrimonial et de ses conséquences fiscales est :",
    options: [
      "Très avancée, je maîtrise parfaitement",
      "Bonne, mais des zones d'ombre subsistent",
      "Intermédiaire, je comprends l'essentiel",
      "Faible, je découvre le sujet",
      "Inexistante, je suis perdu(e)"
    ]
  },
  {
    text: "Votre priorité majeure concernant votre patrimoine est :",
    options: [
      "Protéger mes intérêts et ceux de mes enfants",
      "Préserver un maximum d'équité",
      "Obtenir un accord amiable rapide",
      "Préparer ma reconstruction financière future",
      "Je ne sais pas encore"
    ]
  },
  {
    text: "Quelle approche envisagez-vous pour régler le partage patrimonial ?",
    options: [
      "Stratégie proactive orientée négociation",
      "Approche prudente et sécurisée",
      "Minimaliste, uniquement les démarches obligatoires",
      "Délégation totale à un professionnel",
      "Je n'ai pas encore décidé"
    ]
  },
  {
    text: "Dans quel délai souhaitez-vous finaliser le règlement patrimonial ?",
    options: [
      "Le plus rapidement possible (< 3 mois)",
      "Court terme (3 à 6 mois)",
      "Moyen terme (6 à 12 mois)",
      "Long terme (> 12 mois)",
      "Sans échéance précise"
    ]
  },
  {
    text: "En une phrase, quelle est votre plus grande inquiétude concernant votre patrimoine lors du divorce ?",
    options: null
  }
]

// SCORING MATRIX
export const scoringMatrix = [
  // Q1
  {
    "Le Résilient": [5,4,3,2,1],
    "Le Protecteur Prudent": [3,5,4,2,1],
    "Le Nouveau Départ": [1,2,3,5,5]
  },
  // Q2
  {
    "Le Résilient": [5,4,3,2,1],
    "Le Protecteur Prudent": [4,5,4,3,2],
    "Le Nouveau Départ": [1,2,3,4,5]
  },
  // Q3
  {
    "Le Résilient": [5,4,3,2,1],
    "Le Protecteur Prudent": [4,5,4,3,2],
    "Le Nouveau Départ": [1,2,3,4,5]
  },
  // Q4
  {
    "Le Résilient": [5,3,4,2,1],
    "Le Protecteur Prudent": [4,5,3,4,2],
    "Le Nouveau Départ": [1,2,3,5,5]
  },
  // Q5
  {
    "Le Résilient": [5,4,3,2,1],
    "Le Protecteur Prudent": [4,5,4,3,2],
    "Le Nouveau Départ": [1,2,3,4,5]
  }
]
