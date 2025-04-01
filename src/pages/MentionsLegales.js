// MentionsLegales.js
import React from "react";
import AnimatedPage from "../components/AnimatedPage";

export default function MentionsLegales() {
  return (
    <AnimatedPage>
    <div className="min-h-screen bg-navy text-white font-body px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-title text-gold mb-6">Mentions légales</h1>
      <p className="mb-4">Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique :</p>

      <h2 className="text-xl font-semibold text-gold mt-8 mb-2">Éditeur du site</h2>
      <p>Ce site est édité par la société Alforis Finance, SARL au capital de 5 000 €.</p>
      <p>Adresse : 15 rue de l’Excellence, 75000 Paris</p>
      <p>SIRET : 123 456 789 00010</p>
      <p>Directeur de la publication : Michel Marques</p>
      <p>Email : michel.marques@alforis.fr</p>

      <h2 className="text-xl font-semibold text-gold mt-8 mb-2">Hébergement</h2>
      <p>Le site est hébergé par Vercel Inc. – vercel.com</p>

      <h2 className="text-xl font-semibold text-gold mt-8 mb-2">Crédits</h2>
      <p>Conception & réalisation : Michel Marques</p>
      <p>Design UI : basé sur TailwindCSS</p>
    </div>
    </AnimatedPage>
  );
}
