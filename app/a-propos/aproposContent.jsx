// app/a-propos/page.jsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PremiumButton from '@/components/ui/PremiumButton';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 } }),
};

export default function AProposPage() {
  return (
    <PageLayout
      title="Michel Marques"
      mdTitle="Fondateur d'Alforis"
      description="Découvrez la vision et le parcours de Michel Marques, expert en design de trajectoire de vie patrimoniale."
    >
      <article className="prose max-w-3xl mx-auto py-16">
        {/* Photos haut de page */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            className="overflow-hidden rounded-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
          >
            <Image
              src="/images/office1.jpg"
              alt="Bureau moderne et lumineux"
              width={800}
              height={600}
              className="object-cover w-full h-full"
            />
          </motion.div>
          <motion.div
            className="overflow-hidden rounded-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeInUp}
          >
            <Image
              src="/images/office2.jpg"
              alt="Espace de travail premium Alforis"
              width={800}
              height={600}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        {/* Contenu animé */}
        <motion.h1
          className="mb-6"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeInUp}
        >
          Michel Marques : une approche humaine et premium du conseil patrimonial
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeInUp}
        >
          Je suis <strong>Michel Marques</strong>, fondateur d'Alforis, cabinet haut de gamme spécialisé en design de trajectoire de vie. Mon parcours, combinant expertise financière approfondie, passion pour l’innovation technologique, et sens aigu de l’esthétique, m’a conduit à créer Alforis pour accompagner mes clients avec exigence, bienveillance et sérénité.
        </motion.p>

        <motion.h2
          className="mt-12 mb-4"
          initial="hidden"
          animate="visible"
          custom={4}
          variants={fadeInUp}
        >
          Ma vision : Concilier rigueur financière et accompagnement humain
        </motion.h2>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={5}
          variants={fadeInUp}
        >
          Convaincu que chaque trajectoire de vie mérite une attention singulière, j’ai placé au cœur de ma démarche une approche introspective et profondément humaine. Chaque conseil est ainsi conçu sur mesure, avec un soin particulier accordé à l’écoute et à la compréhension des besoins réels de mes clients.
        </motion.p>

        <motion.h2
          className="mt-10 mb-4"
          initial="hidden"
          animate="visible"
          custom={6}
          variants={fadeInUp}
        >
          Mon parcours professionnel
        </motion.h2>
        <motion.ul
          className="list-disc list-inside space-y-2"
          initial="hidden"
          animate="visible"
          custom={7}
          variants={fadeInUp}
        >
          <li><strong>Bilans patrimoniaux spécifiques</strong> : analyse détaillée et précise des actifs et des objectifs à atteindre.</li>
          <li><strong>Conseil stratégique</strong> : optimisation fiscale, succession, investissements personnalisés.</li>
          <li><strong>Tarification transparente et équitable</strong> : valorisation de la confiance à travers une tarification claire, comprise entre 0,4% et 0,9% selon les encours gérés.</li>
        </motion.ul>

        <motion.h2
          className="mt-10 mb-4"
          initial="hidden"
          animate="visible"
          custom={8}
          variants={fadeInUp}
        >
          Une méthode unique, le design de trajectoire de vie
        </motion.h2>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={9}
          variants={fadeInUp}
        >
          Le concept de « design de trajectoire de vie » représente l’ADN d’Alforis. Il s’agit de modéliser et de visualiser clairement les choix possibles pour mes clients, les guidant ainsi vers des décisions sereines et informées.
        </motion.p>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={10}
          variants={fadeInUp}
        >
          Grâce à une approche structurée et des outils technologiques innovants (Airtable, parcours digitaux interactifs, intégrations personnalisées), je rends les stratégies patrimoniales plus accessibles, plus humaines, et infiniment plus agréables à vivre.
        </motion.p>

        <motion.h2
          className="mt-10 mb-4"
          initial="hidden"
          animate="visible"
          custom={11}
          variants={fadeInUp}
        >
          Mes engagements
        </motion.h2>
        <motion<ul
          className="list-disc list-inside space-y-2"
          initial="hidden"
          animate="visible"
          custom={12}
          variants={fadeInUp}
        >
          <li><strong>Excellence et discrétion</strong> : accompagnement discret, rigoureux et toujours conforme à vos intérêts.</li>
          <li><strong>Innovation constante</strong> : rester à la pointe de la technologie et des nouvelles pratiques du conseil patrimonial.</li>
          <li><strong>Transparence et intégrité</strong> : recommandations délivrées en toute indépendance, sans conflits d’intérêts.</li>
        </motion.ul>

        <motion.h2
          className="mt-10 mb-4"
          initial="hidden"
          animate="visible"
          custom={13}
          variants={fadeInUp}
        >
          Me rencontrer
        </motion.h2>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={14}
          variants={fadeInUp}
        >
          Je vous reçois avec plaisir pour échanger sur votre situation, vos ambitions et vos préoccupations patrimoniales, dans un cadre premium et serein, fidèle aux valeurs que j’incarne à travers Alforis.
        </motion.p>

        <motion.p
          className="mt-6"
          initial="hidden"
          animate="visible"
          custom={15}
          variants={fadeInUp}
        >
          <PremiumButton href="/prendre-rendez-vous">Prendre rendez-vous</PremiumButton>
        </motion.p>
      </article>
    </PageLayout>
  );
}
