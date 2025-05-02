// /components/profildevie/datas.js

export const questions = [
  { text: "Aujourd’hui, vous avez l’impression d’être…", 
    options: [
      "En mouvement, en quête de sens et d’équilibre, sans toujours savoir où cela mène.",
      "À un tournant, conscient(e) que des choix importants s’imposent dans votre trajectoire.",
      "Éteint(e), comme si vous aviez mis votre énergie sur pause sans savoir comment la rallumer.",
      "Aligné(e), avec une vraie cohérence entre vos actes, vos désirs et vos convictions.",
      "En attente d’un déclic, d’un signe clair ou d’un élan pour (re)prendre les rênes."
    ]
     },
  { text: "Votre rapport au patrimoine, aujourd’hui, c’est plutôt…", options: [
    "Une zone floue, difficile à définir ou à relier à vos priorités concrètes.",
    "Une source de stress, avec des incertitudes ou des décisions que vous repoussez.",
    "Une responsabilité, que vous prenez au sérieux mais qui pèse parfois sur vos épaules.",
    "Une ressource puissante, que vous voulez apprendre à maîtriser pour l’utiliser pleinement.",
    "Un sujet à maîtriser, car vous sentez qu’il est clé pour aller vers plus de liberté."
  ] },
  { text: "Dans 5 ans, vous aimeriez vous sentir…", options: [
    "Libre, avec l’impression de vivre selon vos choix, sans compromis majeurs.",
    "Fier/fière, d’avoir accompli des choses qui vous ressemblent vraiment.",
    "Apaisé(e), avec une vie plus simple, plus fluide, plus ancrée.",
    "Reconnu(e), pour vos engagements, vos talents, ou votre parcours singulier.",
    "Utile, à vos proches, à votre environnement, ou à une cause qui vous dépasse."
  ]
  },
  { text: "Ce que vous attendez de votre patrimoine, c’est…", options: [
    "La sécurité, pour vous et vos proches, aujourd’hui comme demain.",
    "La liberté, pour vous affranchir de contraintes et élargir le champ des possibles.",
    "La transmission, pour laisser une trace et accompagner ceux qui comptent.",
    "L’accomplissement personnel, parce que vous voulez que vos ressources servent un projet de vie.",
    "Une cohérence de vie, où vos choix patrimoniaux reflètent vos valeurs profondes."
  ]
   },
  { text: "Le plus beau compliment que quelqu’un pourrait vous faire sur votre trajectoire ?", options: [
    "Tu as toujours fait les bons choix, même quand ce n’était pas facile.",
    "Tu t’es écouté(e) jusqu’au bout, avec courage et honnêteté.",
    "Tu as transmis l’essentiel, bien au-delà du matériel.",
    "Tu as su sortir des cadres, pour créer une vie qui te ressemble.",
    "Tu as été utile aux autres, de façon sincère et durable."
  ]
   },
  { text: "Et ce que vous ne voulez plus jamais vivre, c’est…", options: [
    "L’impression d’être contraint(e), sans marge de manœuvre ou de respiration.",
    "Une mauvaise surprise financière, qui remet tout en cause du jour au lendemain.",
    "L’isolement, même si vous êtes entouré(e), faute de connexions profondes.",
    "Une trahison, personnelle ou professionnelle, qui ébranle vos fondations.",
    "Des choix à contre-cœur, faits pour plaire ou par peur, mais pas pour vous."
  ]
   },
  { text: "Ce qui vous a marqué négativement dans la gestion patrimoniale ?", options: [
    "Des conflits familiaux, où l’argent est devenu un sujet de rupture.",
    "Un manque d’anticipation, qui vous a laissé sans solution au mauvais moment.",
    "Une dépendance financière, pesante ou humiliante, envers quelqu’un ou quelque chose.",
    "Une logique purement financière, sans prise en compte de vos vraies priorités.",
    "Des décisions mal accompagnées, prises sans être écouté(e) ou compris(e)."
  ]
   },
  { text: "Vous êtes aujourd’hui dans une phase plutôt…", options: [
    "Stable mais en réflexion, comme si une nouvelle étape se dessinait à l’horizon.",
    "En transition, entre deux cycles de vie, à la recherche d’un nouveau cap.",
    "En construction, avec de nouveaux projets ou fondations qui prennent forme.",
    "En réinvention, où vous redéfinissez ce qui compte vraiment pour vous.",
    "En mouvement assumé, avec l’envie de faire avancer les choses concrètement."
  ]
   },
  { text: "Ce qui vous bloque aujourd’hui, c’est…", options: [
    "Le manque de clarté, sur vos priorités, votre vision ou vos moyens d’agir.",
    "La peur de faire une erreur, qui vous pousse à repousser ou à douter.",
    "Le flou sur l’avenir, dans un monde instable et difficile à lire.",
    "Le manque de soutien, humain, émotionnel ou stratégique.",
    "Des interlocuteurs inadaptés, qui ne parlent pas votre langage ou ne vous écoutent pas."
  ]
  },
  { text: "En une phrase, que voudriez-vous entendre de votre avenir ?", options: null }
]

export const profilesData = {
  "Le Stratège Libre": {
    title: "Le Stratège Libre",
    description: "Vous cherchez à garder le contrôle...",
    icon: "📊",
    color: "#1D1D1D"
  },
  "Le Voyageur Ambitieux": {
    title: "Le Voyageur Ambitieux",
    description: "Vous vivez avec intensité...",
    icon: "🌍",
    color: "#4A5A6A"
  },
  "Le Gardien Silencieux": {
    title: "Le Gardien Silencieux",
    description: "Discret mais déterminé...",
    icon: "🛡️",
    color: "#2E3A48"
  },
  "Le Rebelle Structuré": {
    title: "Le Rebelle Structuré",
    description: "Vous n’aimez pas les cadres...",
    icon: "🔥",
    color: "#C8A765"
  },
  "L’Épicurien Responsable": {
    title: "L’Épicurien Responsable",
    description: "Vous aimez vivre, mais pas à n’importe quel prix...",
    icon: "🍷",
    color: "#D1C5B0"
  }
}

export const keywords = {
  "Stratège Libre": ["puissante", "choix", "liberté", "maîtriser", "réinvention"],
  "Voyageur Ambitieux": ["déclic", "transition", "reconnu", "cadres", "mouvement"],
  "Gardien Silencieux": ["responsabilité", "sécurité", "anticipation", "isolement", "transmission"],
  "Rebelle Structuré": ["stress", "cadres", "contre-cœur", "soutien", "flou"],
  "Épicurien Responsable": ["utile", "apaisé", "accomplissement", "aligné", "cohérence"]
} 