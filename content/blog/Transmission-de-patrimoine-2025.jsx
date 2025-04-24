'use client'
import React from 'react';

const BlogArticle = () => {
  return (

      <article className="max-w-3xl mx-auto fade-anim">
        <h1 className="text-4xl font-title text-ardoise mb-6 mt-40">
          Transmission de patrimoine : les stratégies gagnantes en 2025
        </h1>

        <img
          src="/img/transmission-patrimoine-2025.jpg"
          alt="Transmission de patrimoine en 2025"
          className="w-full max-h-[400px] h-auto mb-8 rounded-lg shadow object-cover"
        />

        <p className="text-lg text-anthracite/80 mb-4">
          En 2025, transmettre son patrimoine nécessite une approche structurée, adaptée à l’évolution des valeurs immobilières, aux contraintes fiscales, et aux nouvelles dynamiques familiales. Dans un contexte de réforme des droits de succession, il est essentiel de combiner anticipation, outils juridiques performants et stratégie sur mesure.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">🏛️ Les outils à privilégier pour une transmission optimisée</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Donations en démembrement de propriété</strong> : donation de la nue-propriété tout en conservant l’usufruit pour garder le contrôle</li>
          <li><strong>SCI familiale</strong> : transformation des biens en parts sociales, transmission progressive facilitée, valorisation adaptée</li>
          <li><strong>Assurance vie</strong> : clause bénéficiaire bien rédigée, exonération des droits jusqu’à 152 500 € par bénéficiaire</li>
          <li><strong>Pacte Dutreil</strong> : réduction des droits de mutation pour les transmissions d’entreprises</li>
          <li><strong>Testament avec clause résiduelle</strong> : organisation précise en cas de pré-décès ou d’exclusion volontaire</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">📊 Exemple de transmission familiale réussie</h2>
        <p className="mb-4">
          Une mère seule détient un patrimoine de 1,2 million €. En combinant donation de nue-propriété, assurance vie et création d’une SCI avec ses enfants, elle parvient à transmettre plus de 900 000 € en optimisant la fiscalité et sans perdre l’usage des biens transmis. La transmission se fait sans conflit grâce à un cadre juridique anticipé.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">⚖️ Points de vigilance en 2025</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Réforme potentielle des abattements successoraux : surveiller l’évolution législative</li>
          <li>Risque de requalification des montages s’ils ne reposent pas sur un intérêt patrimonial réel</li>
          <li>Importance d’un accompagnement juridique (notaire, avocat fiscaliste, conseiller patrimonial)</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">📍 Le conseil Alforis</h2>
        <p className="mb-4">
          Chaque situation familiale est unique. Chez Alforis, nous analysons vos actifs, vos volontés et les contraintes juridiques pour bâtir une stratégie de transmission robuste, humaine et fiscalement efficiente.
        </p>

        <p className="text-lg font-semibold mt-8">📆 Vous envisagez une transmission anticipée en 2025 ?</p>

      </article>

  );
};

export default BlogArticle;

export const meta = {
  title: "Transmission de patrimoine : les stratégies gagnantes en 2025",
  description: "Donations, assurance vie, SCI, Dutreil… Découvrez les meilleurs leviers pour transmettre votre patrimoine efficacement en 2025.",
  image: "/assets/blog/transmission-patrimoine-2025.png",
};
