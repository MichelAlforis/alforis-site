// Footer.js
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 py-10 px-6 text-center text-white/60 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Alforis Finance. Tous droits réservés.</p>
        <div className="space-x-4">
          <Link to="/mentions-legales" className="hover:text-white">Mentions légales</Link>
          <Link to="/confidentialite" className="hover:text-white">Politique de confidentialité</Link>
          <a href="mailto:michel.marques@alforis.fr" className="hover:text-white">michel.marques@alforis.fr</a>
        </div>
      </div>
    </footer>
  );
}