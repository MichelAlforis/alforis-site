'use client' // Ensure client component for framer-motion and hooks

import React from 'react';
import { motion } from 'framer-motion';
import Animated from '../components/animated/Animated';
import Button from '../../components/ui/Button';
import PortraitSVG from '../components/home/PortraitSVG';
import SignatureSVG from '../components/home/SignatureSVG';

export default function ChatGptWelcomePage() {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Placeholder for micro-interaction state if we make it more dynamic later
  // const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Animated.Page>
      {/* Section 1: Hero */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-ivoire text-anthracite py-20 px-6 md:px-20 text-center min-h-[70vh] flex flex-col justify-center"
      >
        <div className="max-w-2xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-serif font-semibold mb-8"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            L'IA vous a éclairé. Prêt à dessiner le chemin qui vous est propre ?
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          >
            Vous avez utilisé l’IA pour y voir plus clair. C'est une excellente première étape. Chez Alforis, nous vous aidons à faire le lien avec la réalité de vos objectifs de vie et à transformer ces informations en une stratégie patrimoniale véritablement personnelle.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button to="/approchepersonnalisee" className="btn-alforis-retro text-lg py-3 px-8">
              Découvrir notre approche personnalisée
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 2: Votre Prochain Chapitre */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-anthracite text-ivoire py-20 px-6 md:px-20 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6 text-doré">Votre Prochain Chapitre Financier Commence Ici.</h2>
          <p className="text-lg md:text-xl mb-8">
            Au-delà des algorithmes, notre engagement est triple : une <strong className="font-semibold">stratégie</strong> taillée sur mesure pour votre situation unique, une <strong className="font-semibold">pédagogie</strong> pour que chaque décision soit comprise et maîtrisée, et un <strong className="font-semibold">accompagnement</strong> humain et durable.
          </p>
          <p className="text-lg md:text-xl mb-12">
            Imaginez la sérénité d'un patrimoine qui travaille activement pour vos projets de vie, la confiance renouvelée de faire les bons choix, au bon moment. C'est notre promesse.
          </p>
          <div className="flex justify-center">
            <SignatureSVG className="h-20 md:h-28 text-doré" />
          </div>
        </div>
      </motion.section>

      {/* Section 3: Micro-Interaction */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-ivoire text-anthracite py-20 px-6 md:px-20"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Pour mieux vous orienter :</h2>
          <p className="text-lg mb-8">Quel est votre besoin principal aujourd'hui suite à vos échanges avec ChatGPT ?</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <Button className="btn-alforis-retro w-full py-4 text-md">Approfondir un sujet précis</Button>
            <Button className="btn-alforis-retro w-full py-4 text-md">Obtenir un avis sur ma situation</Button>
            <Button className="btn-alforis-retro w-full py-4 text-md">Définir mes prochaines étapes</Button>
          </div>
          <div className="flex justify-center items-center space-x-4">
             {/* Assuming PortraitSVG is decorative or illustrative here. Adjust styling as needed. */}
            <PortraitSVG className="h-24 w-24 opacity-70" /> {/* Example styling */}
            <p className="text-md italic">Un conseiller est à votre écoute pour affiner ces pistes.</p>
          </div>
        </div>
      </motion.section>

      {/* Section 4: Transformons Votre Réflexion */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-ardoise text-ivoire py-24 px-6 md:px-20 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6 text-doré">Transformons Votre Réflexion en Résultats Concrets</h2>
          <p className="text-lg md:text-xl mb-10">
            Le rendez-vous d'orientation de 15 minutes est le moyen idéal pour faire connaissance, discuter de vos interrogations et voir comment Alforis peut concrètement vous aider. C'est offert, personnalisé, et souvent le premier pas vers une stratégie plus claire et plus sereine.
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button to="/prendre-rendez-vous" className="btn-alforis-rdv text-lg py-4 px-10 w-full md:w-auto">
              Réserver mon appel découverte gratuit
            </Button>
            <Button to="/contact" className="btn-alforis-retro text-lg py-4 px-10 w-full md:w-auto mt-4 md:mt-0">
              J'ai une question spécifique
            </Button>
          </div>
          <div className="mt-10">
            <a href="/blog-studio" className="text-ivoire/80 hover:text-ivoire underline">
              Explorer nos analyses et articles de fond
            </a>
          </div>
        </div>
      </motion.section>
    </Animated.Page>
  );
}
