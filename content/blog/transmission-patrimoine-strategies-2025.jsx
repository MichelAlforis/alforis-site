'use client'
import React from 'react';

const BlogArticle = () => {
  return (
      <article className="max-w-3xl mx-auto fade-anim">
        <h1 className="text-4xl font-title text-ardoise mb-6 mt-40">
          Transmission de patrimoine : stratégies efficaces en 2025
        </h1>

        <img
          src="/img/transmission-2025.jpg"
          alt="Transmission patrimoniale 2025"
          className="w-full max-h-[400px] h-auto mb-8 rounded-lg shadow object-cover"
        />

        <p className="text-lg text-anthracite/80 mb-4">
          Transmettre son patrimoine ne se résume pas à rédiger un testament. En 2025, une transmission réussie repose sur une
          stratégie globale mêlant fiscalité, juridique, émotionnel et vision long terme. Voici les approches à privilégier cette année.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">📋 Pourquoi anticiper ?</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Profiter des abattements fiscaux renouvelables tous les 15 ans</li>
          <li>Organiser l’harmonie familiale pour éviter les conflits</li>
          <li>Adapter le patrimoine à la maturité des héritiers</li>
          <li>Optimiser les flux financiers au fil du temps</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">📊 Les leviers à connaître</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Donation simple ou donation-partage</strong> : pour donner en pleine propriété ou en démembrement</li>
          <li><strong>Assurance vie</strong> : exonération de droits jusqu'à 152 500 € par bénéficiaire pour les primes versées avant 70 ans. Pour les versements après 70 ans, seul l'abattement global de 30 500 € s’applique, au prorata entre les bénéficiaires, mais seuls les capitaux versés sont imposables (pas les intérêts).</li>
          <li><strong>SCI familiale</strong> : transmettre progressivement tout en conservant le contrôle</li>
          <li><strong>Pacte Dutreil</strong> : exonération jusqu’à 75 % sur la transmission d’entreprises</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">👨‍👩‍👧‍👦 Exemple concret</h2>
        <p className="mb-4">
          Un couple avec deux enfants dispose d’un patrimoine de 1,5 M€. En combinant :
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Des donations en nue-propriété pour 400 000 €</li>
          <li>Deux contrats d’assurance vie à hauteur de 300 000 €</li>
          <li>La transmission d’une SCI valorisée à 500 000 €</li>
        </ul>
        <p>Ils réduisent considérablement les droits à payer tout en gardant la gestion de leur patrimoine.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">🔍 Le conseil Alforis</h2>
        <p className="mb-4">
          Chaque transmission est unique. Chez Alforis, nous vous accompagnons dans une approche humaine, technique et confidentielle.
          Nous modélisons plusieurs scénarios et proposons une stratégie sur-mesure, adaptée à vos valeurs et à vos objectifs.
        </p>

        <p className="text-lg font-semibold mt-8">📆 Vous souhaitez transmettre dans les meilleures conditions ?</p>

      </article>
  );
};

export default BlogArticle;
