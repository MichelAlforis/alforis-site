'use client'
import React from 'react';

const BlogArticle = () => {
  return (

      <article className="max-w-3xl mx-auto fade-anim">
        <h1 className="text-4xl font-title text-ardoise mb-6 mt-40">
          SCI familiale : l’outil central pour transmettre un patrimoine immobilier structuré
        </h1>

        <img
          src="/img/sci-familiale-2025.jpg"
          alt="SCI familiale et transmission patrimoniale"
          className="w-full max-h-[400px] h-auto mb-8 rounded-lg shadow object-cover"
        />

        <p className="text-lg text-anthracite/80 mb-4">
          La Société Civile Immobilière (SCI) familiale est un pilier méconnu mais redoutablement efficace pour transmettre un patrimoine immobilier en préservant l’équilibre familial et en optimisant la fiscalité. En 2025, elle s’impose comme un levier patrimonial incontournable pour les familles anticipatrices.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">📌 Définition et principes fondamentaux</h2>
        <p className="mb-4">
          Une SCI familiale est une société civile composée uniquement de membres d’une même famille. Elle permet de détenir collectivement un ou plusieurs biens immobiliers. Chaque membre détient des parts sociales, proportionnelles à son apport ou à la transmission reçue. Ce mécanisme transforme la propriété en parts transmissibles, souples et juridiquement encadrées.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">🎯 Transmission : pourquoi la SCI est-elle si efficace ?</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Possibilité de donations successives des parts sociales avec un abattement de 100 000 € par parent et par enfant tous les 15 ans</li>
          <li>Maintien du pouvoir de gestion via la gérance même après la donation</li>
          <li>Évite les blocages de l’indivision classique (vente, travaux, mise en location)</li>
          <li>Permet le démembrement (donation de la nue-propriété, conservation de l’usufruit)</li>
          <li>Valorisation optimisée des parts transmises (décote, non-liquidité…)</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">📊 Exemple patrimonial en 2025</h2>
        <p className="mb-4">
          Un couple détient un bien immobilier d’une valeur de 900 000 €, qu’ils logent dans une SCI. Ils en conservent l’usufruit et donnent la nue-propriété des parts à leurs deux enfants. Résultat :
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Chaque parent donne 100 000 € de parts exonérées à chaque enfant → 400 000 € transmis en franchise de droits</li>
          <li>La pleine propriété sera reconstituée au décès des parents sans droits supplémentaires</li>
          <li>Les parents gardent le contrôle de la gestion locative ou des arbitrages</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">⚖️ Les points de vigilance juridiques et fiscaux</h2>
        <p className="mb-4">
          La création d’une SCI doit s’accompagner d’une rigueur juridique : statuts solides, clause d’agrément ou de préemption, choix du régime fiscal (IR ou IS), et valorisation sérieuse des parts. L’accompagnement par un conseiller patrimonial et un notaire est vivement recommandé pour anticiper toute contestation ou requalification.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">📍 Le conseil Alforis</h2>
        <p className="mb-4">
          Nous structurons avec vous une SCI à l’image de votre histoire familiale : transmission intergénérationnelle, fiscalité allégée, sécurisation juridique. Chaque cas fait l’objet d’une étude sur mesure, intégrant les objectifs successoraux, la composition familiale et les projections fiscales à long terme.
        </p>

        <p className="text-lg font-semibold mt-8">📆 Vous envisagez une SCI familiale en 2025 ?</p>

      </article>

  );
};

export default BlogArticle;

export const meta = {
  title: "SCI familiale : l’outil central pour transmettre un patrimoine immobilier structuré",
  description: "Pourquoi et comment structurer une SCI familiale en 2025 ? Cas concrets, fiscalité, précautions juridiques et stratégie patrimoniale.",
  image: "/assets/blog/sci-familiale-2025.png",
};
