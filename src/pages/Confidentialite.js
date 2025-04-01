import React from "react";
import AnimatedPage from "../components/AnimatedPage";

export default function Confidentialite() {
  return (
    <AnimatedPage>
    <div className="min-h-screen bg-navy text-white font-body px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-title text-gold mb-6">Politique de confidentialité</h1>
      <p className="mb-4">Nous nous engageons à protéger vos données personnelles conformément au RGPD (Règlement Général sur la Protection des Données).</p>

      <h2 className="text-xl font-semibold text-gold mt-8 mb-2">Données collectées</h2>
      <p>Nom, email, et message via le formulaire de contact.</p>

      <h2 className="text-xl font-semibold text-gold mt-8 mb-2">Utilisation des données</h2>
      <p>Ces données sont uniquement utilisées pour répondre à vos demandes. Elles ne sont jamais vendues ou transmises à des tiers.</p>

      <h2 className="text-xl font-semibold text-gold mt-8 mb-2">Droit d'accès</h2>
      <p>Vous pouvez demander la consultation, modification ou suppression de vos données à tout moment par email : michel.marques@alforis.fr</p>
    </div>
    </AnimatedPage>
  );
}