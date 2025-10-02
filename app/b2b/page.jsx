import HomeB2BClient from '@/app/b2b/HomeB2BClient'

export const metadata = {
  title: 'Alforis B2B - Distribution Asset Management Europe | France, Luxembourg, Espagne, Portugal',
  description: 'Accélérateur de distribution pour sociétés de gestion internationales. Connectez votre offre aux distributeurs locaux et institutionnels avec une approche sélective et indépendante. Membre AFTPM.',
  keywords: 'third party marketing, distribution asset management, Luxembourg, France, Espagne, Portugal, AFTPM, institutionnels, CGP, private banking',
  openGraph: {
    title: 'Alforis B2B - Votre accélérateur de distribution en Europe',
    description: 'Solutions de distribution cross-border pour asset managers en France, Luxembourg, Espagne et Portugal',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function B2BPage() {
  return <HomeB2BClient />
}