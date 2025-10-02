import ChatGptWelcomePage from './chatgptContent';

export async function generateMetadata() {
  return {
    title: 'Bienvenue depuis ChatGPT – Alforis',
    description:
      'Vous avez commencé à explorer votre situation patrimoniale avec ChatGPT. Chez Alforis, nous vous aidons à transformer cette réflexion en stratégie concrète.',
    openGraph: {
      title: 'Bienvenue depuis ChatGPT – Alforis',
      description:
        'Transformez votre exploration via l’IA en action concrète avec un conseiller humain. Découvrez notre approche personnalisée.',
      url: 'https://www.alforis.fr/chatgpt-welcome',
      siteName: 'Alforis',
      locale: 'fr_FR',
      type: 'website',
      images: ['/assets/img/og/home.png'], // À créer si besoin
    },
    alternates: {
      canonical: 'https://www.alforis.fr/chatgpt-welcome',
    },
  };
}

export default function Page() {
  return <ChatGptWelcomePage />;
}
