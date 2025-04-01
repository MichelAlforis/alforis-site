import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import FadeSection from "../components/FadeSection";
import AnimatedPage from "../components/AnimatedPage";

// Hook personnalisé pour gérer l'animation
function useCountUp(to, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    setCount(0); // Réinitialisation du compteur

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * to)); // Mise à jour du compteur

      if (progress < duration) {
        requestAnimationFrame(step); // Continuation de l'animation
      } else {
        setCount(to); // Finalisation de l'animation
      }
    };

    requestAnimationFrame(step); // Démarre l'animation

  }, [start, to, duration]);  // Dépendances du useEffect

  return count;  // Retourne la valeur du compteur
}


const services = [
  {
    title: "Ingénierie Patrimoniale Globale",
    description:
      "Structuration de votre patrimoine personnel et professionnel avec une approche juridique, fiscale et financière sur mesure.",
    icon: "🏛️",
  },
  {
    title: "Gestion d’Investissements",
    description:
      "Stratégies d’investissement long terme alignées sur vos objectifs de performance et de stabilité.",
    icon: "📈",
  },
  {
    title: "Transmission & Gouvernance Familiale",
    description:
      "Accompagnement sur les successions, pacte Dutreil, holdings familiales et gestion intergénérationnelle.",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    title: "Optimisation Fiscale & Retraite",
    description:
      "Bilan de retraite, arbitrages et solutions fiscales durables pour chefs d’entreprise et professions libérales.",
    icon: "💼",
  },
  {
    title: "Immobilier & Courtage en Prêt",
    description:
      "Recherche de financement optimisé pour l’immobilier personnel ou locatif. Une porte d’entrée stratégique pour les jeunes actifs.",
    icon: "🏠",
  },
  {
    title: "Trésorerie d’Entreprise & Conciergerie",
    description:
      "Solutions d’investissement pour excédents de trésorerie, et accompagnement administratif sur-mesure pour dirigeants exigeants.",
    icon: "🤝",
  },
];

export default function Home() {

  const { ref: counterRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const countExperience = useCountUp(15, 1500, inView);
  const countEncours = useCountUp(400, 1500, inView);
  const countIndependance = useCountUp(100, 1500, inView);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scaleValue = 1 + Math.min(scrollY / 2000, 0.08);

  return (
    <AnimatedPage>


{/* Section 1 & 2 englobées dans une même image de fond */}
<section className="snap-start w-full min-h-[400vh] relative flex flex-col items-center justify-center text-center px-4 overflow-hidden">

  {/* Background parallax avec effet progressif */}
  <div
    className="absolute inset-0 z-0 bg-fixed bg-center bg-cover transition-transform duration-700 ease-out"
    style={{
      backgroundImage: "url('/images/Hero.png')",
    }}
  />

  {/* Overlay fondu en dégradé progressif */}
  <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1D1D1D]/30 via-[#1D1D1D]/70 to-[#2E3A48]/90 transition-opacity duration-1000 ease-in-out" />

  {/* Brume dorée subtile */}
  <div className="absolute inset-0 z-20 bg-[#C8A765]/10 mix-blend-soft-light" />

  {/* Contenu général */}
  <div className="relative z-30 max-w-5xl mx-auto space-y-32 py-48">
    
    {/* Section 1 – Hero */}
    <FadeSection id="accueil">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        <h1 className="text-4xl md:text-5xl font-title font-bold text-white">
          Comprendre. Décider. Avancer.
        </h1>
        <p className="text-[#C8A765] text-lg italic">
          La gestion de patrimoine ne devrait pas être obscure.<br />
          Chez Alforis, on vous explique tout, clairement. Vous gardez le contrôle. Et vous avancez.
        </p>
        <a
          href="#contact"
          className="inline-block bg-[#C8A765] text-[#1D1D1D] px-6 py-3 font-semibold rounded-md hover:opacity-90 transition"
        >
          Je veux reprendre la main
        </a>
      </div>
    </FadeSection>

    {/* Section 2 – Triptyque */}
    <FadeSection id="triptyque">
      <div className="space-y-20">
        <FadeSection id="comprendre">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-title text-[#C8A765]">Comprendre</h2>
            <p className="text-lg">
              Mon rôle est de traduire, clarifier, et vous aider à mieux lire votre propre situation.
              Pas de jargon, pas de tour de passe-passe. Juste des mots simples pour des choix solides.
            </p>
          </motion.div>
        </FadeSection>

        <FadeSection id="decider">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-title text-[#C8A765]">Décider</h2>
            <p className="text-lg">
              Vous n'êtes pas un spectateur : vous êtes l’acteur principal.
              Je vous donne tous les éléments pour choisir en conscience.
              On avance à deux, mais c’est toujours vous qui décidez.
            </p>
            <p className="text-sm text-white/60 italic">
              On ne vous vend pas un produit. On construit une stratégie.
            </p>
          </motion.div>
        </FadeSection>

        <FadeSection id="avancer">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-title text-[#C8A765]">Avancer</h2>
            <p className="text-lg">
              Ce que vous voulez, c’est avancer sereinement.
              Et c’est exactement ce que je rends possible avec clarté, constance et précision.
            </p>
          </motion.div>
        </FadeSection>
      </div>
    </FadeSection>




    <section className="snap-start w-full min-h-[200vh] relative flex flex-col items-center justify-center text-center px-4 overflow-hidden">

{/* Background parallax avec effet progressif */}

{/* Contenu textuel animé */}
<div className="relative z-30 max-w-4xl mx-auto space-y-16 py-48">
  <FadeSection id="flow">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <h2 className="text-3xl md:text-4xl font-title text-[#C8A765]">
        Le Flow Patrimonial
      </h2>
      <p className="text-white/90 text-lg">
        Comme un flux d’énergie maîtrisé, nous traduisons vos ambitions en trajectoires concrètes.
        Avec Alforis, chaque décision s’inscrit dans une dynamique fluide, claire, maîtrisée.
      </p>
    </motion.div>
  </FadeSection>
</div>
</section>



    {/* Section 3 – Valeur ajoutée */}
    <FadeSection>
      <div className="flex items-center justify-center min-h-[100vh] px-4"
      id="valeur-ajoutee"
      >
        <div className="text-center max-w-3xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#C8A765]">
            Notre Valeur Ajoutée
          </h2>
          <p className="leading-relaxed text-white/90 text-base md:text-lg">
            Alforis vous accompagne dans toutes les étapes clés de votre patrimoine personnel et professionnel.
            Grâce à une approche innovante et une expertise reconnue, nous offrons des conseils sur-mesure
            basés sur la confiance, la performance, et une vision long terme.
          </p>
        </div>
      </div>
    </FadeSection>
  </div>
</section>


      {/* Section 3 - Services avec animation */}
          <section className="snap-start w-full min-h-[200vh] flex flex-col justify-center items-center bg-[#2E3A48] px-4 py-20"
                style={{ backgroundImage: "url('/images/Section2.png')" }}
                className="snap-start w-full min-h-[200vh] flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat px-4 py-20"
                id="services"
              >
                  
                  
                  
                  <FadeSection> 
                            <h2 className="text-2xl md:text-3xl font-title text-[#C8A765] mb-12 text-center">
                              Nos Services
                              
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
                              {services.map((service, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 50 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.6, delay: index * 0.1 }}
                                  viewport={{ once: true, amount: 0.3 }}
                                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl hover:ring-2 hover:ring-[#C8A765]/50"
                                >
                                  <div className="text-4xl mb-4">{service.icon}</div>
                                  <h3 className="text-lg md:text-xl font-semibold text-[#C8A765] mb-2">{service.title}</h3>
                                  <p className="text-white/80 text-sm leading-relaxed">{service.description}</p>
                                </motion.div>                              
                              ))}
                              
                            </div>
                    </FadeSection>
          </section>

            {/* Section 4 & 5 - Finance haut de gamme (fond immersif + animations premium) */}
            <section className="snap-start w-full min-h-[200vh] relative flex flex-col items-center justify-center text-center px-4 overflow-hidden"
            id="approche"
            >

              {/* Background parallax */}
              <div
                className="absolute inset-0 z-0 bg-fixed bg-center bg-cover transition-transform duration-700 ease-out"
                style={{ backgroundImage: "url('/images/Section3.png')" }}
              ></div>

              {/* Overlays pour lisibilité et ambiance */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1D1D1D]/60 to-[#2E3A48]/90" />
              <div className="absolute inset-0 z-20 bg-[#C8A765]/10 mix-blend-soft-light" />

              {/* Contenu animé */}
              <div className="relative z-30 max-w-5xl mx-auto space-y-32 py-48">

                {/* Bloc 1 - Partenaires */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl font-title text-[#C8A765] drop-shadow-lg">
                    Un Réseau de Partenaires Experts
                  </h2>
                  <p className="text-white text-base md:text-lg">
                    Notaires, fiscalistes, avocats et experts du chiffre nous accompagnent...
                  </p>
                </motion.div>

                {/* Bloc 2 - Expertise */}
                <FadeSection >
                  <motion.div
                    ref={counterRef}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="space-y-10"
                  >
                    <h2 className="text-3xl md:text-4xl font-title text-[#C8A765] drop-shadow-lg">
                      L’Expertise derrière Alforis
                    </h2>
                    <p className="text-white text-base md:text-lg">
                      Plus de 15 ans d’expérience dans la structuration d’investissements...
                    </p>
                  </motion.div>
                </FadeSection>

                {/* Bloc 3 - Chiffres clés animés */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white/90 text-center text-lg font-semibold">
                  <div>
                    <p className="text-white text-4xl font-bold drop-shadow-md">
                      {countExperience}+
                    </p>
                    <p>années d’expérience</p>
                  </div>
                  <div>
                    <p className="text-white text-4xl font-bold drop-shadow-md">
                      {countEncours} M€
                    </p>
                    <p>d’encours structurés</p>
                  </div>
                  <div>
                    <p className="text-white text-4xl font-bold drop-shadow-md">
                      {countIndependance}%
                    </p>
                    <p>indépendant & confidentiel</p>
                  </div>
                </div>

              </div>
            </section>


        {/* Section 6 - Contact */}
        <section className="snap-start w-full min-h-[200vh] flex items-center justify-center bg-[#2E3A48] px-4">
        <FadeSection id="contact">
          <div className="text-center max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-title text-[#C8A765] mb-6">Contact</h2>
            <form
              action="https://formspree.io/f/mwkgzezn"
              method="POST"
              className="space-y-6 text-left"
            >
              <input
                type="text"
                name="name"
                placeholder="Nom"
                required
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white border border-[#D1C5B0] focus:outline-none focus:ring-2 focus:ring-[#C8A765]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white border border-[#D1C5B0] focus:outline-none focus:ring-2 focus:ring-[#C8A765]"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Votre message..."
                required
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white border border-[#D1C5B0] focus:outline-none focus:ring-2 focus:ring-[#C8A765]"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#C8A765] text-[#1D1D1D] font-semibold py-2 rounded-md hover:opacity-90 transition"
              >
                Envoyer
              </button>
            </form>
          </div>
          </FadeSection>
        </section>
    
    
    </AnimatedPage>
  );
}