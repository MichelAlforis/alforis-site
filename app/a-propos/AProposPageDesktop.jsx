// app/a-propos/page.jsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PremiumButton from '@/components/ui/PremiumButton';
import { pageConfig } from './pageConfig';
import { SVGConfig } from '@/components/Navbar/navbarLogoConfig';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 } }),
};

export default function AProposDesktop() {
  return (
    <PageLayout 
    title={pageConfig.title}
    mdTitle={pageConfig.mdtitle}
    description={pageConfig.description}
    >

  <div className="bg-ivoire dark:bg-acier/80 rounded-xl shadow overflow-hidden">
      {/* 1. En-tête riche et immersif */}


      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
      <motion.img 
      className="top-0 right-0" src="./assets/img/me-desktop.png"
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      />
      </motion.div>
        
      <motion.section
        
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        id="Section Titre"
        className="space-y-12 px-4 py-8 text-center max-w-3xl mx-auto"
      >

        <h1 className="mb-4">
          Michel Marques&nbsp;: Artisan de trajectoires de vie
        </h1>
        <p className="italic font-serif text-2xl text-anthracite/80">
          Une approche humaine et premium du conseil patrimonial, façonnée par
          l’exigence, la bienveillance et l’innovation.
        </p>
      </motion.section>

      {/* 2. Bloc « Qui suis-je ? » */}
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      id="section-qui-je-suis"
      className="
        grid 
        grid-cols-1 
        md:grid-cols-5 
        gap-0 
        md:gap-8 
        max-w-3xl 
        ml-4 pr-0
        overflow-hidden
      "
    >
      {/* Texte (80% sur desktop, 100% sur mobile) */}
      <div className="md:col-span-4 space-y-6">
        <p>
          Je suis <strong>Michel Marques</strong>, fondateur d’Alforis, un cabinet
          haut de gamme spécialisé en <strong>design de trajectoire de vie</strong>.
          Mon ambition&nbsp;? Réconcilier la rigueur financière avec une écoute
          authentique et une expérience client sublimée.
        </p>
        <p>
          Après plus de dix ans passés au sein de grandes institutions financières,
          où j’ai accompagné entrepreneurs, cadres dirigeants et familles
          patrimoniales, j’ai ressenti le besoin de proposer un <strong>conseil
          sur-mesure</strong>, centré sur la personne avant tout. J’ai ainsi
          développé une méthodologie unique, alliant outils numériques de pointe
          (Airtable, parcours digitaux interactifs) et savoir-faire humain, pour
          guider mes clients dans chacun de leurs choix de vie.
        </p>
      </div>

      {/* Logo animé (20% sur desktop, caché en dessous sur mobile) */}
      <div className="
        md:col-span-1  
        bg-acier dark:bg-ivoire
        flex items-center justify-center
        h-full
      ">
        <motion.svg
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid meet"
          className="h-auto w-28 stroke-doré fill-doré dark:stroke-acier  dark:fill-acier"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <motion.path
            d={SVGConfig.d1}
            strokeWidth="4"
            fillRule="evenodd"
            clipRule="evenodd"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
          />
        </motion.svg>
      </div>
    </motion.section>
      {/* 3. Bloc « Ma vision » */}
      <motion.section
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-ivoire to-ardoise/20 dark:dark:bg-acier/80 py-16 px-12 max-w-4xl mx-auto"
      >
        <h2 className="mb-4">
          Concilier rigueur financière et accompagnement humain
        </h2>
        <p className="text-lg leading-relaxed">
          <em>Convaincu que chaque trajectoire de vie mérite une attention singulière,</em> j’ai placé au cœur de
          ma démarche une approche introspective et profondément humaine.
        </p>
        <p className="mt-4 text-lg leading-relaxed">
          Chaque recommandation naît d’un <strong>processus de co-création</strong> : échanges approfondis, ateliers
          de projection et simulations visuelles. L’objectif ? Proposer des stratégies patrimoniales <strong>claires,
          lisibles & alignées</strong> avec vos aspirations personnelles, professionnelles et familiales.
        </p>
      </motion.section>

      {/* 4. Bloc « Mon parcours professionnel » */}
      <motion.section
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <h3>Mon parcours professionnel</h3>
        <ul className="space-y-4">
          {[
            {
              title: 'Bilans patrimoniaux spécifiques',
              text: 'Analyse détaillée et précise de vos actifs, identification des leviers et plan d’action personnalisé.'
            },
            {
              title: 'Conseil stratégique',
              text: 'Optimisation fiscale, préparation de la transmission, diversification des investissements.'
            },
            {
              title: 'Tarification transparente',
              text: 'Honoraires annuels entre 0,4 % et 0,9 % des encours gérés, grille dégressive selon les actifs.'
            }
          ].map((item, idx) => (
            <motion.li
              key={idx}
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="mt-1 h-3 w-3 rounded-full bg-doré flex-shrink-0" />
              <div>
                <strong>{item.title} :</strong> {item.text}
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* 5. Bloc « Le design de trajectoire de vie » */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-ardoise/10 dark:bg-acier/80 py-16 px-12 max-w-4xl mx-auto rounded-lg"
      >
        <h3 className="mb-4">Le design de trajectoire de vie</h3>
        <ol className="list-decimal list-inside space-y-3 text-lg">
          <li><strong>Cartographie</strong> : situation actuelle et objectifs à court, moyen et long terme.</li>
          <li><strong>Scénarisation</strong> : options d’investissement, transmission et diversification.</li>
          <li><strong>Simulation</strong> : impacts financiers, fiscaux et patrimoniaux en temps réel.</li>
          <li><strong>Sélection & ajustement</strong> : collaboration jusqu’à la stratégie idéale.</li>
        </ol>
      </motion.section>

      {/* 6. Bloc « Mes engagements » */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center"
      >
        {[
          { title: 'Excellence & Discrétion', text: 'Accompagnement rigoureux et confidentiel.' },
          { title: 'Innovation constante', text: 'Veille technologique & méthodologique.' },
          { title: 'Transparence & Intégrité', text: 'Indépendance totale et confiance absolue.' }
        ].map((item, idx) => (
          <div key={idx} className="space-y-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="h-12 w-12 mx-auto"
            >
              {/* Icône personnalisée ici */}
              <div className="h-full w-full rounded-full border-2 border-doré" />
            </motion.div>
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-sm">{item.text}</p>
          </div>
        ))}
      </motion.section>

      {/* 7. Bloc « Me rencontrer » */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-ardoise dark:bg-ivoire py-16 px-12 text-center max-w-3xl mx-auto"
      >
        <h3 className="mb-4">Je vous reçois dans un cadre premium et serein</h3>
        <p className="mb-6 text-lg text-ivoire dark:text-acier leading-relaxed">
          Je vous invite à échanger sur vos projets, vos ambitions et vos préoccupations patrimoniales.
          Chaque rendez-vous est conçu comme un moment d’écoute profonde pour bâtir ensemble une trajectoire sûre et épanouissante.
        </p>
        <a
          href="/prendre-rendez-vous"
          className="inline-block px-10 py-4 font-semibold border-2 border-doré rounded-full hover:shadow-lg transition-shadow"
        >
          Prendre rendez-vous
        </a>
      </motion.section>
    </div>
    </PageLayout>
  );
}
