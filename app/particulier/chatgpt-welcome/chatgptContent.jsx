'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Animated from '@/components/animated/Animated';
import Button from '@/components/ui/Button';
import PortraitSVG from '../../components/home/PortraitSVG'

function ShareButton() {
  const [copied, setCopied] = useState(false);
  const link = 'https://www.alforis.fr/chatgpt-welcome';

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-sm text-anthracite hover:underline mt-4"
    >
      {copied ? 'Lien copié ✅' : '📎 Copier cette page pour la partager'}
    </button>
  );
}

export default function ChatGptWelcomePage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  return (
    <Animated.Page>
      {/* Bandeau Intro Contexte */}
      <div className="bg-ardoise text-ivoire text-sm text-center py-3 px-4">
        Cette page vous est proposée après un échange avec ChatGPT. Elle vise à prolonger votre réflexion vers une stratégie humaine et personnalisée.
      </div>

      {/* Section 1 : Hero */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-ivoire text-anthracite overflow-hidden min-h-[70vh] flex items-center justify-center py-20 px-6 md:px-20 text-center"
      >
        <div className="relative z-10 max-w-2xl">
          {/* Badge ChatGPT */}
          <div className="text-sm font-medium text-anthracite/80 mb-4 bg-ivoire/60 rounded-full px-4 py-2 w-fit mx-auto border border-anthracite/10">
            🔍 Pour les utilisateurs de ChatGPT
          </div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            L'IA vous a éclairé. Prêt à dessiner le chemin qui vous est propre ?
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Vous avez utilisé l’IA pour y voir plus clair. Chez Alforis, nous transformons vos découvertes en une stratégie patrimoniale personnelle, adaptée à vos projets et à votre vision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button to="/approchepersonnalisee" className="btn-alforis-rdv text-lg py-3 px-8">
              Découvrir notre approche personnalisée
            </Button>

            {/* Share Button */}
            <ShareButton />
          </motion.div>
        </div>
      </motion.section>

      {/* Section 2 : Engagements + Portrait */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative bg-anthracite text-ivoire py-20 px-6 md:px-20 text-center overflow-hidden"
      >
        <div className="absolute inset-0 z-base flex justify-end items-end pointer-events-none">
          <PortraitSVG className="h-full max-h-[80vh] w-auto opacity-70" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-anthracite to-black opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-6 text-doré">
            Votre Prochain Chapitre Financier Commence Ici
          </h2>
          <p className="text-base sm:text-lg text-ivoire md:text-xl mb-6 leading-relaxed">
            Une <strong className="font-semibold">stratégie</strong> sur mesure, une <strong className="font-semibold">pédagogie</strong> accessible, et un <strong className="font-semibold">accompagnement</strong> humain et durable.
          </p>
          <p className="text-base sm:text-lg text-ivoire md:text-xl mb-8 leading-relaxed">
            Imaginez la sérénité d’un patrimoine actif, la confiance de faire les bons choix au bon moment.
          </p>
        </div>
      </motion.section>

      {/* Témoignage */}
      <div className="bg-overlay bg-opacity-20 text-sm italic text-center px-6 py-4 rounded-xl max-w-xl mx-auto my-10">
        “J’avais plein d’infos, mais aucune stratégie claire. Cette page m’a permis de passer à l’action, sans pression.” — utilisateur ChatGPT
      </div>

      {/* Section 3 : Micro-interaction */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-ivoire text-anthracite py-20 px-6 md:px-20"
      >
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-4">
            Pour mieux vous orienter
          </h2>
          <p className="text-base sm:text-lg md:text-lg mb-8 leading-relaxed">
            Quel est votre besoin principal aujourd’hui ?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button className="btn-alforis-retro w-full py-4 text-md">
              Approfondir un sujet
            </Button>
            <Button className="btn-alforis-retro w-full py-4 text-md">
              Obtenir un avis
            </Button>
            <Button className="btn-alforis-retro w-full py-4 text-md">
              Définir mes étapes
            </Button>
          </div>
          <p className="text-md italic">
            Un conseiller est à votre écoute pour affiner ces pistes.
          </p>
        </div>
      </motion.section>

      {/* Section 4 : CTA */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-ardoise text-ivoire py-24 px-6 md:px-20 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-6 text-doré">
            Transformons Votre Réflexion en Résultats Concrets
          </h2>
          <p className="text-base text-ivoire sm:text-lg md:text-lg mb-10 leading-relaxed">
            Le rendez-vous d’orientation de 15 minutes est offert. C’est le premier pas vers une stratégie claire, personnalisée, et alignée avec vos projets de vie.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button
              to="/prendre-rendez-vous"
              className="btn-alforis-rdv text-base px-6 py-2 w-fit mx-auto"
            >
              Réserver mon appel découverte
            </Button>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <Button
              to="/contact"
              className="btn-alforis-retro text-base px-6 py-2 w-fit mx-auto"
            >
              J’ai une question spécifique
            </Button>
            <a
              href="/blog-studio"
              className="text-ivoire/80 hover:text-ivoire underline text-sm"
            >
              Explorer nos articles de fond
            </a>
          </div>
        </div>
      </motion.section>
    </Animated.Page>
  );
}
