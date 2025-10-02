export const questions = [
  {
    text: "Quel est votre horizon d'investissement immobilier ?",
    options: [
      "Court terme (moins de 5 ans)",
      "Moyen terme (5 à 10 ans)",
      "Long terme (plus de 10 ans)",
      "Très court terme (moins de 2 ans)",
      "Je n’ai pas d’idée précise"
    ]
  },
  {
    text: "Quel niveau de risque êtes-vous prêt à accepter ?",
    options: [
      "Très faible (capital garanti)",
      "Faible (légères fluctuations)",
      "Modéré (revenus variables)",
      "Élevé (fortes variations)",
      "Très élevé (rendements potentiels maximum)"
    ]
  },
  {
    text: "Quel type de bien privilégiez-vous ?",
    options: [
      "Résidentiel (logements)",
      "Commercial (bureaux, commerces)",
      "Mixte (résidentiel + commerçant)",
      "Neuf (défiscalisation)",
      "Ancien (rénovation)",
    ]
  },
  {
    text: "Quel rendement locatif ciblez-vous ?",
    options: [
      "< 3 %",
      "3–4 %",
      "4–5 %",
      "5–6 %",
      "> 6 %"
    ]
  },
  {
    text: "Quelle place accordez-vous à la diversification de votre patrimoine immobilier ?",
    options: [
      "Très importante (plusieurs biens)",
      "Importante (2–3 biens)",
      "Moyenne (un seul bien)",
      "Peu importante (pas encore décidé)",
      "Pas du tout (un seul projet unique)"
    ]
  },
  {
    text: "Quel est votre niveau de connaissance de la fiscalité immobilière ?",
    options: [
      "Expert (j’ai déjà optimisé)",
      "Avancé (je comprends la plupart)",
      "Intermédiaire (je me documente)",
      "Débutant (je découvre)",
      "Nul (je cherche un guide complet)"
    ]
  },
  {
    text: "En cas de vacance locative, vous :",
    options: [
      "Préférez un loyer plus faible mais garanti (bail longue durée)",
      "Acceptez un loyer plus élevé avec risque de vacance",
      "Choisissez un investissement en SCPI pour mutualiser le risque",
      "Investissez dans du meublé touristique",
      "Je n’ai pas réfléchi à cette question"
    ]
  },
  {
    text: "Quelle part de dette êtes-vous prêt à contracter ?",
    options: [
      "Faible (≤ 50 % du prix)",
      "Modérée (50–70 %)",
      "Élevée (70–90 %)",
      "Très élevée (> 90 %)",
      "Je préfère payer comptant"
    ]
  },
  {
    text: "En une phrase, quel est votre principal objectif avec l'immobilier ?",
    options: null
  }
]

export const scoringMatrix = [
// Q1
  {
    "Le Conservateur": [5, 4, 2, 1, 1],
    "L'Audacieux": [1, 2, 4, 5, 3],
    "Le Stratège": [3, 3, 4, 3, 5],
  },
  // Q2
  {
    "Le Conservateur": [5, 4, 3, 2, 1],
    "L'Audacieux": [1, 2, 3, 4, 5],
    "Le Stratège": [2, 3, 5, 3, 2],
  },
  // Q3
  {
    "Le Conservateur": [5, 2, 4, 1, 3],
    "L'Audacieux": [2, 5, 3, 4, 5],
    "Le Stratège": [3, 3, 5, 3, 4],
  },
  // Q4
  {
    "Le Conservateur": [5, 4, 3, 2, 1],
    "L'Audacieux": [1, 2, 3, 4, 5],
    "Le Stratège": [2, 3, 5, 4, 3],
  },
  // Q5
  {
    "Le Conservateur": [5, 4, 2, 1, 1],
    "L'Audacieux": [2, 3, 4, 5, 1],
    "Le Stratège": [3, 4, 5, 3, 2],
  },
  // Q6
  {
    "Le Conservateur": [5, 4, 3, 2, 1],
    "L'Audacieux": [1, 2, 3, 4, 5],
    "Le Stratège": [2, 3, 5, 4, 2],
  },
  // Q7
  {
    "Le Conservateur": [5, 3, 2, 1, 2],
    "L'Audacieux": [1, 5, 3, 4, 2],
    "Le Stratège": [3, 4, 5, 2, 1],
  },
  // Q8
  {
    "Le Conservateur": [5, 4, 3, 2, 1],
    "L'Audacieux": [1, 2, 3, 4, 5],
    "Le Stratège": [2, 3, 5, 4, 2],
  }
]