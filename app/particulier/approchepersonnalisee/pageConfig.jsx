import { Settings, DollarSign, Star, Users } from 'lucide-react'
// ─── PAGE CONFIG ─────────────────────────────────────────────────────────────
export const pageConfig = {
  title: 'Notre approche',
  mdtitle: 'Une approche patrimoniale à la hauteur de vos enjeux',
  description: 'Notre approche : un diagnostic sur-mesure, une stratégie patrimoniale innovante et un accompagnement continu pour bâtir et protéger votre capital en toute confiance.',
  showTabs: false,
    tabs: [
      {
          icon: Settings,
          title: 'L’écoute stratégique',
          subtitle: 'Poser les fondations de votre trajectoire',
          description:
            'Tout commence par une écoute active, sans filtre ni préjugé, pour comprendre vos aspirations profondes.',
          citation: 'Toute stratégie lucide commence par une écoute sincère.',
        },
        {
          icon: DollarSign,
          title: 'Modélisation patrimoniale',
          subtitle: 'Transformer la complexité en clarté',
          description:
            'Visualisez chaque scénario, anticipez chaque décision et structurez votre capital avec précision.',
          citation: 'On ne pilote bien que ce que l’on visualise clairement.',
        },
        {
          icon: Star,
          title: 'Stratégie sur-mesure',
          subtitle: 'Choisir les bons leviers au bon moment',
          description:
            'Nous construisons un plan unique, aligné avec vos objectifs et votre rythme de vie.',
          citation: 'Une bonne décision patrimoniale est toujours synchronisée avec la vie.',
        },
        {
          icon: Users,
          title: 'Suivi vivant',
          subtitle: 'Votre trajectoire évolue, votre stratégie aussi',
          description:
            'Un accompagnement continu pour ajuster chaque étape à vos nouveaux besoins.',
          citation: 'La valeur d’une stratégie se mesure à sa capacité d’adaptation.',
        },
      ]
}