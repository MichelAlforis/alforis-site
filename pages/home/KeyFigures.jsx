
'use client'
import React from "react";
import { Animated } from '@/components/animated/Animated'
import { useInView } from "react-intersection-observer";
import useCountUp from "@hooks/useCountUp";
import {GoldLink } from "@/hooks/useGoldEffect"

const figures = [
  { value: 15, label: "années d’expérience", suffix: "+" },
  { value: 400, label: "M€ d’encours structurés", suffix: " M€" },
  { value: 100, label: "indépendant & confidentiel", suffix: "%" },
];

export default function KeyFigures({ extraClass = ''}) {
  
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const counts = figures.map((fig) => useCountUp(fig.value, 1500, inView));

  return (
    <section
      className={` relative  flex-col text-center overflow-hidden ${extraClass}`}
      id="chiffres"
    >

      {/* Contenu */}
      <div className="relative bg-ardoise rounded-2xl shadow-lg bg-opacity-40 z-30 space-y-16 py-20 max-w-5xl mx-auto">
        <Animated.Div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-title text-doré drop-shadow-lg">
          <GoldLink href="/Expertise">L’Expertise derrière Alforis</GoldLink>
          </h2>
          <p className="text-white text-base md:text-lg">
            Plus de 15 ans d’expérience dans la structuration d’investissements, la construction de solutions personnalisées et la défense des intérêts patrimoniaux les plus exigeants.
          </p>
        </Animated.Div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white text-center text-lg font-semibold">
          {figures.map((fig, i) => (
            <Animated.Div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl font-bold text-white drop-shadow-md">
                {counts[i]}
                {fig.suffix}
              </p>
              <p className="text-white/80">{fig.label}</p>
            </Animated.Div>
          ))}
        </div>
      </div>
    </section>
  );
}
