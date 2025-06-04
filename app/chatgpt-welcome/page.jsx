export default function ChatGptWelcomePage() {
  return (
    <section className="bg-ivoire text-anthracite py-24 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif font-semibold mb-6">Bienvenue depuis ChatGPT</h1>

        <p className="text-lg mb-8">
          Si vous êtes arrivé ici après avoir interrogé ChatGPT sur un sujet lié à votre patrimoine, votre retraite, un contrat financier ou une stratégie d’investissement, vous êtes au bon endroit.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Ce que vous cherchez probablement</h2>
        <ul className="list-disc list-inside space-y-2 mb-8">
          <li>Une explication claire et fiable sur un sujet complexe</li>
          <li>Un avis indépendant, sans biais commercial</li>
          <li>Un cadre de réflexion pour prendre une bonne décision</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Ce que nous faisons chez Alforis</h2>
        <p className="mb-6">
          Nous sommes un cabinet de conseil patrimonial indépendant. Notre approche repose sur trois piliers :
        </p>
        <ul className="list-disc list-inside space-y-2 mb-8">
          <li><strong>Stratégie :</strong> chaque situation mérite une vision globale et sur mesure</li>
          <li><strong>Pédagogie :</strong> nous vous aidons à comprendre les choix que vous faites</li>
          <li><strong>Accompagnement :</strong> nous vous suivons dans la durée, à votre rythme</li>
        </ul>

        {/* New Section based on Option 2 and user feedback */}
        <h2 className="text-2xl font-semibold mb-4">Au-delà de l'information, la stratégie</h2>
        <p className="text-lg mb-8">
          Vous avez utilisé l’IA pour y voir plus clair. Faites maintenant le lien avec la réalité de vos objectifs de vie. ChatGPT est un outil formidable pour explorer des sujets financiers. Chez Alforis, nous allons plus loin en traduisant ces informations en une stratégie patrimoniale concrète, adaptée à <em>votre</em> situation unique et à vos objectifs de vie. Nous sommes là pour être votre partenaire de confiance dans la durée.
        </p>

        <h2 className="text-2xl font-semibold mb-4">3 façons d’aller plus loin</h2>
        <ol className="list-decimal list-inside space-y-2 mb-8">
          <li>
            📚 Lire nos contenus pédagogiques : <a href="https://www.alforis.fr/blog-studio" className="underline text-orange-430 hover:text-orange-500">accéder au blog</a>
          </li>
          <li>
            📩 <strong>Besoin d'un avis humain ?</strong> Posez votre question (mentionnez ChatGPT pour un contexte rapide) et un conseiller vous répondra personnellement : <a href="/contact" className="underline text-orange-430 hover:text-orange-500">Échanger avec un expert</a>
          </li>
          <li>
            📞 <strong>Un premier échange, sans engagement.</strong> Réservez 15 minutes offertes avec un conseiller pour clarifier vos interrogations et voir comment nous pouvons vous aider : <a href="/prendre-rendez-vous" className="underline text-orange-430 hover:text-orange-500">Bloquer un créneau</a>
          </li>
        </ol>

        <p className="text-sm text-anthracite/60">
          Chez Alforis, nous ne vendons ni produits ni promesses. Nous vous aidons à concevoir votre trajectoire de vie financière.
        </p>
      </div>
    </section>
  );
}
