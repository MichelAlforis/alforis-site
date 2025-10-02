// content/parcours/profilretraite/QuizzData.js
export const questions = [
  {
    text: "À quel point votre retraite est-elle un sujet que vous anticipez activement ?",
    options: [
      "C’est une priorité, je m’y prépare depuis longtemps.",
      "J’ai commencé récemment à m’en soucier.",
      "Je sais que je devrais m’y mettre, mais je repousse.",
      "Je n’y pense pas du tout.",
      "Je préfère ne pas y penser tant que ce n’est pas urgent."
    ]
  },
  {
    text: "Savez-vous estimer le montant de votre future pension (ou vos revenus passifs) ?",
    options: [
      "Oui, je connais précisément le chiffre.",
      "J’ai une estimation approximative.",
      "J’ai quelques informations éparses.",
      "Pas du tout.",
      "Je n’ai jamais regardé."
    ]
  },
  {
    text: "Disposez-vous déjà d’un ou plusieurs dispositifs d’épargne retraite ?",
    options: [
      "Oui, plusieurs.",
      "Oui, un seul.",
      "J’ai une assurance-vie mais ce n’est pas dédié.",
      "Non, rien de structuré.",
      "Je ne sais pas."
    ]
  },
  {
    text: "Êtes-vous propriétaire de votre résidence principale ?",
    options: [
      "Oui, totalement.",
      "Oui, avec un crédit en cours.",
      "Non, je suis locataire.",
      "Je vis dans un bien familial.",
      "Je prévois un achat dans les années à venir."
    ]
  },
  {
    text: "Avez-vous déjà fait un point chiffré sur vos besoins à la retraite ?",
    options: [
      "Oui, en détail.",
      "Une idée générale.",
      "Un calcul rapide, sans trop y croire.",
      "Jamais.",
      "Je ne sais pas par où commencer."
    ]
  },
  {
    text: "Quelle place accordez-vous à la transmission dans votre stratégie patrimoniale ?",
    options: [
      "Très importante.",
      "Importante mais non prioritaire.",
      "J’y pense mais ce n’est pas clair.",
      "Je n’ai rien prévu.",
      "Je n’en ai pas."
    ]
  },
  {
    text: "La retraite rime pour vous avec :",
    options: [
      "Liberté",
      "Inquiétude",
      "Opportunité de réinvention",
      "Ralentissement",
      "Inconnu"
    ]
  },
  {
    text: "Si vous aviez un budget retraite de 3000€/mois demain, que feriez-vous en priorité ?",
    options: [
      "Voyager",
      "Investir",
      "Aider mes proches",
      "Me reposer",
      "Me reconvertir"
    ]
  },
  {
    text: "En une phrase : comment rêvez-vous votre vie à la retraite ?",
    options: null
  }
]

export const keywords = {
  "Le Prévoyant": ["anticiper", "sécurité", "retraite", "planification", "objectif"],
  "Le Retardataire": ["retard", "repousser", "inquiétude", "manque", "jamais"],
  "L’Optimiste": ["rêver", "liberté", "repos", "voyager", "reconversion"],
  "Le Stratège Familial": ["proches", "aider", "transmettre", "famille", "héritage"]
}

export const scoringMatrix = [
  {
    "Le Prévoyant": [5, 4, 3, 2, 1],
    "Le Retardataire": [1, 2, 3, 4, 5],
    "L’Optimiste": [3, 3, 3, 2, 1],
    "Le Stratège Familial": [3, 2, 2, 2, 1]
  },
  {
    "Le Prévoyant": [5, 4, 3, 2, 1],
    "Le Retardataire": [1, 2, 3, 4, 5],
    "L’Optimiste": [2, 3, 3, 3, 2],
    "Le Stratège Familial": [2, 2, 2, 1, 1]
  },
  {
    "Le Prévoyant": [5, 4, 3, 2, 1],
    "Le Retardataire": [1, 2, 3, 4, 5],
    "L’Optimiste": [3, 3, 3, 2, 1],
    "Le Stratège Familial": [2, 2, 2, 2, 1]
  },
  {
    "Le Prévoyant": [5, 4, 3, 2, 1],
    "Le Retardataire": [2, 2, 3, 3, 4],
    "L’Optimiste": [3, 3, 3, 2, 2],
    "Le Stratège Familial": [2, 2, 2, 3, 3]
  },
  {
    "Le Prévoyant": [5, 4, 3, 2, 1],
    "Le Retardataire": [1, 2, 3, 4, 5],
    "L’Optimiste": [3, 3, 3, 2, 2],
    "Le Stratège Familial": [2, 2, 2, 2, 2]
  },
  {
    "Le Prévoyant": [4, 3, 2, 1, 0],
    "Le Retardataire": [1, 2, 2, 3, 3],
    "L’Optimiste": [2, 2, 3, 3, 3],
    "Le Stratège Familial": [5, 4, 3, 2, 1]
  },
  {
    "Le Prévoyant": [4, 1, 3, 2, 1],
    "Le Retardataire": [1, 4, 2, 2, 3],
    "L’Optimiste": [3, 2, 4, 3, 2],
    "Le Stratège Familial": [1, 1, 2, 3, 2]
  },
  {
    "Le Prévoyant": [2, 4, 2, 1, 3],
    "Le Retardataire": [1, 1, 2, 2, 3],
    "L’Optimiste": [5, 3, 2, 4, 5],
    "Le Stratège Familial": [2, 2, 5, 1, 1]
  }
]

// detectProfilFromMatrix.js et meta export seront ajoutés ensuite