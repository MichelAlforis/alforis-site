'use client'
import React from 'react';

const BlogArticle = () => {
  return (

      <article className="max-w-3xl mx-auto fade-anim">
        <h1 className="text-4xl font-title text-ardoise mb-6 mt-40">
          Réforme des droits de succession en France : ce qui pourrait changer en 2025
        </h1>

        <img
          src="/img/reforme-succession-2025.jpg"
          alt="Réforme des droits de succession 2025 en France"
          className="w-full max-h-[400px] h-auto mb-8 rounded-lg shadow object-cover"
        />

        <p className="text-lg text-anthracite/80 mb-4">
          En 2025, le sujet des droits de succession revient au cœur du débat public, attisé par la pression fiscale croissante et la volonté de justice intergénérationnelle. La France affiche toujours l’un des taux d’imposition les plus élevés d’Europe sur les successions, ce qui pousse de nombreuses familles à rechercher des stratégies d’anticipation patrimoniale, notamment via le démembrement, la donation-partage ou le pacte Dutreil.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">📊 Les pistes de réforme actuellement en discussion</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Augmentation de l’abattement en ligne directe de 100 000 € à 150 000 € par parent et par enfant</li>
          <li>Réduction du délai de rappel fiscal de 15 à 10 ans (article 784 du CGI)</li>
          <li>Création d’un barème plus progressif au-delà de 12 millions d’euros</li>
          <li>Remise en cause de certaines niches patrimoniales (Dutreil passif, assurance-vie à usage successoral abusif, démembrements artificiels)</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">🧮 Impact sur votre stratégie patrimoniale</h2>
        <p className="mb-4">
          La réforme, si elle est votée, ne concernera pas seulement les très hauts patrimoines. Elle pourrait affecter toute transmission familiale, y compris les classes moyennes aisées. Il est donc essentiel de revoir dès maintenant vos dispositifs : calendrier des donations, structuration des biens immobiliers, clauses bénéficiaires des contrats d’assurance-vie, et mise à jour du pacte Dutreil si vous êtes chef d’entreprise.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">⚖️ L’analyse du fiscaliste</h2>
        <p className="mb-4">
          Cette réforme marque un tournant : elle s’oriente vers un durcissement du traitement fiscal des transmissions complexes et mal anticipées. En tant que juriste fiscaliste, nous recommandons d’opérer une revue stratégique de votre organisation patrimoniale. Il est probable que les transmissions précoces et structurées – via démembrement, donations avant 70 ans, société holding familiale – soient les grandes gagnantes du nouveau cadre. L’anticipation devient la clé.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">📍 Le conseil Alforis</h2>
        <p className="mb-4">
          Chez Alforis, nous accompagnons chaque client dans la lecture fine du texte fiscal, en modélisant des scénarios d’optimisation intergénérationnelle. Grâce à nos outils de projection, nous identifions les leviers d’action concrets (abattements optimisés, gestion de la réserve héréditaire, donations transgénérationnelles) et assurons la liaison avec vos notaires et experts comptables.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">📌 Résumé synthétique</h2>
        <table className="w-full text-left border mt-4 mb-8">
          <thead>
            <tr className="bg-ardoise text-white">
              <th className="px-4 py-2">⚖️ Ce qui pourrait changer</th>
              <th className="px-4 py-2">🎯 Ce que vous pouvez faire</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Barème progressif au-delà de 12 M €</td>
              <td className="px-4 py-2">Réaliser un audit patrimonial complet</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Abattement augmenté à 150 000 €</td>
              <td className="px-4 py-2">Mettre en place des donations successives</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Rappel fiscal réduit à 10 ans</td>
              <td className="px-4 py-2">Anticiper la transmission avant 60 ans</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Niches patrimoniales restreintes</td>
              <td className="px-4 py-2">Réviser vos pactes Dutreil et clauses d’assurance-vie</td>
            </tr>
          </tbody>
        </table>

        <p className="text-lg font-semibold mt-8">🔍 Vous souhaitez savoir ce que cette réforme changerait pour votre propre situation ?</p>

      </article>

  );
};

export default BlogArticle;

export const meta = {
  title: "Réforme des droits de succession en France : ce qui pourrait changer en 2025",
  description: "Fiscalité successorale 2025 : abattement, rappel fiscal, niches, barème progressif. Anticipez les changements avec un audit patrimonial.",
  image: "/assets/blog/reforme-succession-2025.png",
};
