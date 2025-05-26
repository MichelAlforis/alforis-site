export const questions = [
  {
    text: "Avez-vous déjà entrepris des démarches fiscales spécifiques à votre expatriation ?",
    options: [
      "Oui, tout est parfaitement structuré",
      "Quelques démarches seulement",
      "Je suis au début du processus",
      "Non, rien n'est fait encore",
      "Je ne sais pas par où commencer"
    ]
  },
  {
    text: "Quelle est votre connaissance des conventions fiscales internationales ?",
    options: [
      "Très bonne, j'ai une maîtrise complète",
      "Correcte, mais j'aimerais approfondir",
      "Limitée, j'ai quelques notions",
      "Très faible, je découvre ce sujet",
      "Inexistante, cela m’est totalement inconnu"
    ]
  },
  {
    text: "Votre priorité principale concernant votre expatriation fiscale est :",
    options: [
      "Optimiser pleinement mes avantages fiscaux",
      "Protéger mon patrimoine efficacement",
      "Comprendre clairement mes obligations",
      "Trouver un équilibre fiscal international",
      "Je ne suis pas encore certain(e)"
    ]
  },
  {
    text: "Quelle approche préférez-vous adopter face aux complexités fiscales internationales ?",
    options: [
      "Une approche proactive et optimisée",
      "Une stratégie prudente et sécurisée",
      "Une démarche simple et facilement compréhensible",
      "Je préfère déléguer entièrement",
      "Je n'ai pas encore décidé"
    ]
  },
  {
    text: "À quel horizon envisagez-vous votre expatriation ?",
    options: [
      "Déjà expatrié(e)",
      "Dans les prochains mois",
      "D'ici un à deux ans",
      "À plus long terme",
      "Sans date précise actuellement"
    ]
  },
  {
    text: "En une phrase, quel est votre principal défi ou inquiétude lié à l'expatriation fiscale ?",
    options: null
  }
]

// SCORING MATRIX
export const scoringMatrix = [
  // Q1
  {
    "Le Globe-trotteur averti": [5, 4, 3, 1, 1],
    "L'Expatrié prudent": [3, 5, 4, 2, 1],
    "Le Nouveau départ": [1, 2, 3, 5, 5]
  },
  // Q2
  {
    "Le Globe-trotteur averti": [5, 4, 3, 2, 1],
    "L'Expatrié prudent": [3, 4, 4, 3, 1],
    "Le Nouveau départ": [1, 2, 3, 4, 5]
  },
  // Q3
  {
    "Le Globe-trotteur averti": [5, 4, 2, 3, 1],
    "L'Expatrié prudent": [3, 5, 4, 4, 2],
    "Le Nouveau départ": [1, 3, 5, 2, 4]
  },
  // Q4
  {
    "Le Globe-trotteur averti": [5, 3, 2, 4, 1],
    "L'Expatrié prudent": [3, 5, 3, 4, 2],
    "Le Nouveau départ": [2, 3, 5, 1, 4]
  },
  // Q5
  {
    "Le Globe-trotteur averti": [5, 4, 3, 2, 1],
    "L'Expatrié prudent": [4, 5, 4, 3, 2],
    "Le Nouveau départ": [1, 2, 3, 4, 5]
  }
]
