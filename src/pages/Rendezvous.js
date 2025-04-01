import React from "react";
import { InlineWidget } from "react-calendly";
import AnimatedPage from "../components/AnimatedPage";

export default function Rendezvous() {
  return (
    <AnimatedPage>
    <div className="min-h-screen bg-navy text-white font-body px-6 py-16 max-w-4xl mx-auto">
      <section className="text-center">
        <h2 className="text-3xl font-title text-gold mb-6">Prendre Rendez-vous</h2>
        <p className="text-white/90 mb-6">
          Choisissez un créneau directement selon vos disponibilités : appel 30 min, visio 30 min ou présentiel 1h00.
        </p>
        <div className="bg-white rounded-md shadow-lg overflow-hidden">
          <InlineWidget
            url="https://calendly.com/michel-marques-alforis"
            styles={{ height: "700px" }}
          />
        </div>
      </section>
    </div>
    </AnimatedPage>
  );
}
