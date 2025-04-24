'use client'
import React from 'react';

const BlogArticle = () => {
  return (

      <article className="max-w-3xl mx-auto fade-anim">
        <h1 className="text-4xl font-title text-ardoise mb-6 mt-40">
          Fiscalité et succession dans le Val-de-Marne : ce qu’il faut savoir en 2025
        </h1>

        <img
          src="/img/fiscalite-succession-valdemarne-2025.jpg"
          alt="Droit de succession et fiscalité locale dans le Val-de-Marne"
          className="w-full max-h-[400px] h-auto mb-8 rounded-lg shadow object-cover"
        />

        <p className="text-lg text-anthracite/80 mb-4">
          Transmettre un patrimoine dans le Val-de-Marne implique de connaître à la fois les règles fiscales nationales et les spécificités locales. Avec un tissu urbain dense (Nogent-sur-Marne, Vincennes, Saint-Maur, Créteil…), la valorisation des biens et la fiscalité associée peuvent fortement varier. Voici les points à maîtriser.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">🏡 Valeur des biens et pression fiscale</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Les biens situés à Vincennes, Saint-Mandé ou Charenton-le-Pont peuvent dépasser largement les abattements successoraux (100 000 €/parent/enfant).</li>
          <li>Une évaluation juste est primordiale pour éviter une requalification fiscale en cas de sous-estimation.</li>
          <li>La pression foncière locale peut rendre pertinent le démembrement ou la création de SCI pour limiter la fiscalité future.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">📜 Optimiser sa succession : outils et stratégies</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Donation en nue-propriété avec réserve d’usufruit</li>
          <li>Assurance vie avec clause bénéficiaire adaptée au contexte familial</li>
          <li>Création d’une SCI patrimoniale familiale</li>
          <li>Pacte Dutreil pour les transmissions d’entreprises locales</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">📍 Les villes du Val-de-Marne concernées</h2>
        <p className="mb-4">
          Nos clients résident à Nogent-sur-Marne, Le Perreux, Saint-Maur-des-Fossés, Vincennes, Maisons-Alfort, Fontenay-sous-Bois, Saint-Mandé, Ivry-sur-Seine, Créteil, Alfortville, Charenton-le-Pont, Joinville-le-Pont, Champigny, L’Haÿ-les-Roses… Chaque situation locale nécessite une adaptation fine des montages patrimoniaux.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">📎 Le conseil Alforis (spécial Val-de-Marne)</h2>
        <p className="mb-4">
          Nous connaissons parfaitement les enjeux patrimoniaux de votre territoire. Nous adaptons les stratégies fiscales et successorales à votre situation familiale, aux prix de marché local et à vos objectifs à long terme.
        </p>

        <p className="text-lg font-semibold mt-8">📆 Besoin d’un audit successoral à Nogent ou ailleurs dans le Val-de-Marne ?</p>

      </article>

  );
};

export default BlogArticle;

export const meta = {
  title: "Fiscalité et succession dans le Val-de-Marne : ce qu’il faut savoir en 2025",
  description: "Découvrez les leviers d’optimisation fiscale pour transmettre votre patrimoine dans le Val-de-Marne (Nogent, Vincennes, Saint-Maur…).",
  image: "/assets/blog/transmission-valdemarne-2025.png",
};
