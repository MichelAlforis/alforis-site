'use client'

import PortraitSVG from "../components/home/PortraitSVG";
import SignatureSVG from "@/assets/illustrations/SignatureSVG";
import { motion } from 'framer-motion'

export default function ChatGptWelcomePage() {
  return (
    <section
      className="
        relative
        bg-gradient-to-br from-ivoire via-ivoire to-ardoise
        text-anthracite
        py-12 px-4 sm:py-16 sm:px-6 md:py-24 md:px-20
        overflow-hidden
      "
    >
      {/* 1. PortraitSVG en couche intermédiaire (cache sur mobile) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 flex justify-end items-end overflow-hidden">
          <PortraitSVG className="h-full max-h-[180vh] w-auto opacity-70" />
        </div>
      </div>

      {/* 2. Boîte de contenu semi-opaque (fond ivoire) */}
      <div
        className="
          relative z-10
          bg-ivoire bg-opacity-60
          rounded-2xl shadow-lg
          space-y-12 sm:space-y-16 md:space-y-20
          max-w-3xl sm:max-w-4xl md:max-w-5xl
          mx-auto
          py-12 sm:py-16 md:py-20
          px-4 sm:px-6 md:px-12
        "
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-4 sm:mb-6 md:mb-8">
          Bienvenue depuis ChatGPT
        </h1>

        <p className="text-base sm:text-lg md:text-lg mb-6 sm:mb-8 md:mb-8 leading-relaxed">
          Si vous êtes arrivé ici après avoir interrogé ChatGPT sur un sujet lié à votre patrimoine,
          votre retraite, un contrat financier ou une stratégie d’investissement, vous êtes au bon endroit.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6">
          Ce que vous cherchez probablement
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6 sm:mb-8 md:mb-8 text-base sm:text-base md:text-lg">
          <li>Une explication claire et fiable sur un sujet complexe</li>
          <li>Un avis indépendant, sans biais commercial</li>
          <li>Un cadre de réflexion pour prendre une bonne décision</li>
        </ul>

        <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6">
          Ce que nous faisons chez Alforis
        </h2>

        <SignatureSVG className="mt-4 text-doré h-16 md:h-28 w-auto" />
        
        <p className="text-base sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-8 leading-relaxed">
          Nous sommes un cabinet de conseil patrimonial indépendant. Notre approche repose sur trois piliers :
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6 sm:mb-8 md:mb-8 text-base sm:text-base md:text-lg">
          <li><strong>Stratégie :</strong> chaque situation mérite une vision globale et sur mesure</li>
          <li><strong>Pédagogie :</strong> nous vous aidons à comprendre les choix que vous faites</li>
          <li><strong>Accompagnement :</strong> nous vous suivons dans la durée, à votre rythme</li>
        </ul>

        <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6">
          Au-delà de l'information, la stratégie
        </h2>
        <p className="text-base sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-8 leading-relaxed">
          Vous avez utilisé l’IA pour y voir plus clair. Faites maintenant le lien avec la réalité de vos objectifs de vie.
          ChatGPT est un outil formidable pour explorer des sujets financiers. Chez Alforis, nous allons plus loin en traduisant
          ces informations en une stratégie patrimoniale concrète, adaptée à <em>votre</em> situation unique et à vos objectifs de vie.
          Nous sommes là pour être votre partenaire de confiance dans la durée.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6">
          3 façons d’aller plus loin
        </h2>
        <ol className="list-decimal list-inside space-y-4 sm:space-y-6 md:space-y-6 mb-6 sm:mb-8 md:mb-8 text-base sm:text-base md:text-lg">
          <li>
            📚 <strong>Lire nos contenus pédagogiques :</strong>&nbsp;
            <a
              href="https://www.alforis.fr/blog-studio"
              className="underline text-orange-430 hover:text-orange-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Accéder au blog
            </a>
          </li>
          <li>
            📩 <strong>Besoin d'un avis humain ?</strong>&nbsp;
            <br className="block sm:hidden" />
            Posez votre question (mentionnez ChatGPT pour un contexte rapide) et un conseiller vous répondra personnellement :
            <a
              href="/contact"
              className="mt-2 inline-block bg-orange-430 text-ivoire font-medium py-2 px-4 rounded-lg hover:bg-orange-500 transition text-sm sm:text-base md:text-base"
            >
              Échanger avec un expert
            </a>
          </li>
          <li>
            📞 <strong>Un premier échange, sans engagement</strong>&nbsp;
            <br className="block sm:hidden" />
            Réservez 15 minutes offertes avec un conseiller pour clarifier vos interrogations et voir comment nous pouvons vous aider :
            <a
              href="/prendre-rendez-vous"
              className="mt-2 inline-block border-2 border-orange-430 text-orange-430 font-medium py-2 px-4 rounded-lg hover:bg-orange-430 hover:text-ivoire transition text-sm sm:text-base md:text-base"
            >
              Bloquer un créneau
            </a>
          </li>
        </ol>

        <p className="text-xs sm:text-sm md:text-sm text-anthracite/60">
          Chez Alforis, nous ne vendons ni produits ni promesses. Nous vous aidons à concevoir votre trajectoire de vie financière.
        </p>
      </div>
    </section>
  );
}
