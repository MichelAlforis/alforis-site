import { Settings, DollarSign, Users, Star } from 'lucide-react'
// ─── PAGE CONFIG ─────────────────────────────────────────────────────────────
export const pageConfig = {
  title: "Nos expertises, votre sérénité",
  showTabs: true,
  tabs: [
  {
    id: 1,
    icon: Settings,
    label: 'Ingénierie patrimoniale',
    key: 'ingenierie',
    subtitle: 'Structurer votre patrimoine sans trahir vos valeurs',
    description:
    "Nous concevons des stratégies sur mesure, adaptées à votre structure personnelle, professionnelle et familiale. L’objectif : fluidifier, optimiser, transmettre, tout en respectant ce qui vous est essentiel.\n\nConcrètement, cela signifie comprendre vos enjeux profonds, vos préférences de gouvernance, et vos impératifs de transmission. Nous faisons dialoguer droit, finance, psychologie familiale et projection à long terme.\n\nChaque scénario est modélisé, testé, challengé. Vous choisissez en connaissance de cause, avec une visibilité claire sur les conséquences juridiques, fiscales et humaines.",
    citation: "Un bon conseil patrimonial respecte d’abord ce qui vous est cher.",
},
  {
    id: 2,
    icon: DollarSign,
    label: 'Trésorerie long terme',
    key: 'tresorerie',
    subtitle: 'Faire fructifier sans dénaturer vos réserves',
    description:
    "Nous accompagnons les dirigeants dans la valorisation de leur trésorerie excédentaire, avec une approche sécurisée, structurée et alignée avec les objectifs de l’entreprise.\n\nNous analysons la nature des excédents (ponctuels ou structurels), leur horizon d’utilisation, et les contraintes internes de gouvernance.\n\nNos solutions vont des produits garantis aux structures plus dynamiques, en veillant toujours à articuler performance, liquidité, et cohérence stratégique.",
    citation: "La prudence n’empêche pas la performance, si elle est bien guidée.",
  },
  {
    id: 3,
    icon: Users,
    label: 'Gouvernance familiale',
    key: 'gouvernance',
    subtitle: 'Préserver l’harmonie tout en préparant l’avenir',
    description:
    "La famille est souvent un atout… à condition d’être organisée. Nous aidons à structurer la gouvernance, anticiper les enjeux successoraux et préserver l’harmonie dans la durée.\n\nCela peut passer par la rédaction d’une charte, la mise en place d’un pacte familial, ou la création d’un organe de concertation.\n\nL’enjeu est toujours de pacifier les transmissions, protéger les plus vulnérables, et rendre la solidarité familiale efficiente et non pesante.",
    citation: "Un héritage serein se prépare bien avant d’être transmis.",
  },
  {
    id: 4,
    icon: Star,
    label: 'Conciergerie Financière',
    key: 'conciergerie',
    subtitle: 'Vous libérer du temps, sans perdre le fil',
    description:
      "Un seul interlocuteur pour coordonner vos besoins patrimoniaux, juridiques, immobiliers, administratifs. Notre conciergerie simplifie votre vie et vous libère du temps.\n\nNous intervenons pour faire avancer vos démarches, vous représenter, organiser les rendez-vous avec vos conseils et assurer un suivi de vos projets patrimoniaux.\n\nC’est une assistance proactive, personnalisée, pilotée par nous mais pensée pour vous, dans le respect de vos priorités et de votre niveau d’implication souhaité.",
    citation: "La tranquillité d’esprit est une richesse que l’on peut orchestrer.",
  },
  ]
}