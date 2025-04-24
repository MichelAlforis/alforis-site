'use client'
import React from 'react';

const BlogArticle = () => {
  return (

      <article className="max-w-3xl mx-auto fade-anim">
        <h1 className="text-4xl font-title text-ardoise mb-6 mt-40">
          Créer une SCI familiale dans le Val-de-Marne : avantages et démarches spécifiques en 2025
        </h1>

        <img
          src="/img/sci-valdemarne-2025.jpg"
          alt="SCI familiale et immobilier dans le Val-de-Marne"
          className="w-full max-h-[400px] h-auto mb-8 rounded-lg shadow object-cover"
        />

        <p className="text-lg text-anthracite/80 mb-4">
          La SCI familiale est un excellent outil de gestion et de transmission de patrimoine immobilier, particulièrement pertinent dans des zones à forte valeur foncière comme le Val-de-Marne. Encore faut-il bien comprendre les enjeux locaux et les étapes à suivre.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">📌 Pourquoi créer une SCI dans le Val-de-Marne ?</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Valorisation élevée des biens à Vincennes, Saint-Mandé, Nogent ou Le Perreux : intérêt pour la gestion collective</li>
          <li>Souplesse dans la transmission des parts sociales entre membres de la famille</li>
          <li>Protection du patrimoine familial (indivision évitée, gestion assurée par la gérance)</li>
          <li>Fiscalité optimisée en cas de démembrement (donation en nue-propriété)</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">🛠️ Étapes concrètes de création en 2025</h2>
        <ol className="list-decimal list-inside mb-4">
          <li>Rédiger les statuts avec l’aide d’un professionnel (notaire, avocat fiscaliste)</li>
          <li>Choisir le régime fiscal (IR ou IS selon les objectifs patrimoniaux)</li>
          <li>Effectuer l’immatriculation au greffe du tribunal de commerce de Créteil</li>
          <li>Ouvrir un compte bancaire au nom de la SCI</li>
          <li>Effectuer les apports (numéraires ou en nature)</li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-4">🏘️ Cas pratique : SCI familiale à Saint-Maur-des-Fossés</h2>
        <p className="mb-4">
          Une famille décide de loger deux biens immobiliers situés à Saint-Maur dans une SCI. Les parents conservent la gérance et l’usufruit, tandis que les enfants reçoivent progressivement les parts en nue-propriété. Avantages : transmission sans indivision, pilotage de la gestion locative, anticipation successorale.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">📍 Quelles communes du Val-de-Marne sont concernées ?</h2>
        <p className="mb-4">
          Cette stratégie est particulièrement adaptée à Vincennes, Le Perreux-sur-Marne, Nogent, Saint-Maur-des-Fossés, Créteil, Maisons-Alfort, Joinville-le-Pont, Alfortville, Charenton-le-Pont… où les tensions immobilières rendent la structuration du patrimoine incontournable.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">📎 Le conseil Alforis (territoire du 94)</h2>
        <p className="mb-4">
          Chez Alforis, nous vous aidons à créer votre SCI familiale dans le respect des contraintes juridiques et fiscales locales. Nous veillons à ce que l’outil serve vos projets : transmission, gestion locative, répartition équitable… avec une modélisation précise.
        </p>

        <p className="text-lg font-semibold mt-8">📆 Vous envisagez de créer une SCI dans le Val-de-Marne ?</p>

      </article>

  );
};

export default BlogArticle;

export const meta = {
  title: "Créer une SCI familiale dans le Val-de-Marne : avantages et démarches spécifiques en 2025",
  description: "Pourquoi et comment créer une SCI familiale dans le Val-de-Marne ? Avantages, fiscalité locale, étapes pratiques et optimisation patrimoniale.",
  image: "/assets/blog/sci-valdemarne-2025.png",
};
