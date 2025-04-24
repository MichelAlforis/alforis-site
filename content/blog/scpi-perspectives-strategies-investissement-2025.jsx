'use client'
import React from 'react';

const BlogArticle = () => {
  return (

      <article className="max-w-3xl mx-auto fade-anim">
        <h1 className="text-4xl font-title text-ardoise mb-6 mt-40">
          SCPI : perspectives et stratégies d'investissement en 2025
        </h1>

        <img
          src="/img/scpi-2025.jpg"
          alt="SCPI et stratégie patrimoniale"
          className="w-full max-h-[400px] h-auto mb-8 rounded-lg shadow object-cover"
        />

        <p className="text-lg text-anthracite/80 mb-4">
          Les Sociétés Civiles de Placement Immobilier (SCPI) permettent d’investir dans l’immobilier sans en assumer la gestion. En 2025, elles continuent d’offrir une solution attractive face à la volatilité des marchés, avec des rendements compétitifs, une mutualisation du risque et une fiscalité adaptable.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">📈 Top 10 des SCPI les plus performantes en 2024</h2>
        <div className="overflow-x-auto text-sm mb-4">
          <table className="min-w-full text-left border-collapse border border-gray-300">
            <thead className="bg-ardoise text-white">
              <tr>
                <th className="px-3 py-2 border">Rang</th>
                <th className="px-3 py-2 border">SCPI</th>
                <th className="px-3 py-2 border">Société de Gestion</th>
                <th className="px-3 py-2 border">Taux de Distribution 2024</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-t'><td className='px-3 py-2 border'>1</td><td className='px-3 py-2 border'>Comète</td><td className='px-3 py-2 border'>Alderan</td><td className='px-3 py-2 border'>11,18%</td></tr>
              <tr className='border-t'><td className='px-3 py-2 border'>2</td><td className='px-3 py-2 border'>Osmo Énergie</td><td className='px-3 py-2 border'>Mata Capital</td><td className='px-3 py-2 border'>9,33%</td></tr>
              <tr className='border-t'><td className='px-3 py-2 border'>3</td><td className='px-3 py-2 border'>Transitions Europe</td><td className='px-3 py-2 border'>Arkéa REIM</td><td className='px-3 py-2 border'>8,25%</td></tr>
              <tr className='border-t'><td className='px-3 py-2 border'>4</td><td className='px-3 py-2 border'>Upêka</td><td className='px-3 py-2 border'>Axipit REP</td><td className='px-3 py-2 border'>7,96%</td></tr>
              <tr className='border-t'><td className='px-3 py-2 border'>5</td><td className='px-3 py-2 border'>Remake Live</td><td className='px-3 py-2 border'>Remake AM</td><td className='px-3 py-2 border'>7,50%</td></tr>
              <tr className='border-t'><td className='px-3 py-2 border'>6</td><td className='px-3 py-2 border'>Iroko Zen</td><td className='px-3 py-2 border'>Iroko</td><td className='px-3 py-2 border'>7,32%</td></tr>
              <tr className='border-t'><td className='px-3 py-2 border'>7</td><td className='px-3 py-2 border'>NCap Continent</td><td className='px-3 py-2 border'>Norma Capital</td><td className='px-3 py-2 border'>7,01%</td></tr>
              <tr className='border-t'><td className='px-3 py-2 border'>8</td><td className='px-3 py-2 border'>My Share Education</td><td className='px-3 py-2 border'>My Share Company</td><td className='px-3 py-2 border'>7,00%</td></tr>
              <tr className='border-t'><td className='px-3 py-2 border'>9</td><td className='px-3 py-2 border'>Capiforce Pierre</td><td className='px-3 py-2 border'>Fiducial Gérance</td><td className='px-3 py-2 border'>6,83%</td></tr>
              <tr className='border-t'><td className='px-3 py-2 border'>10</td><td className='px-3 py-2 border'>Epargne Pierre Europe</td><td className='px-3 py-2 border'>Atland Voisin</td><td className='px-3 py-2 border'>6,75%</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">🎯 Stratégies d’investissement recommandées</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Diversification sectorielle et géographique</strong> : mutualiser les risques via des SCPI spécialisées et paneuropéennes</li>
          <li><strong>Analyse de la régularité des revenus</strong> : privilégier les SCPI affichant une performance stable sur 3 à 5 ans</li>
          <li><strong>Fiscalité maîtrisée</strong> : intégrer les SCPI dans une enveloppe adaptée (assurance vie, démembrement, société)</li>
          <li><strong>Accompagnement professionnel</strong> : sélectionner les SCPI en fonction de votre situation patrimoniale globale</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">📍 Le conseil Alforis</h2>
        <p className="mb-4">
          Chez Alforis, nous construisons des allocations SCPI sur mesure. Chaque portefeuille est élaboré en fonction du profil investisseur, des objectifs de revenus complémentaires ou de transmission, et de l’arbitrage fiscal souhaité.
        </p>

        <p className="text-lg font-semibold mt-8">📆 Vous souhaitez intégrer des SCPI dans votre stratégie patrimoniale ?</p>

      </article>

  );
};

export default BlogArticle;

export const meta = {
  title: "SCPI : perspectives et stratégies d’investissement en 2025",
  description: "Rendements, sélection, diversification et fiscalité : tout ce qu’il faut savoir sur les SCPI en 2025 pour construire une stratégie immobilière performante.",
  image: "/assets/blog/scpi-2025.png",
};
