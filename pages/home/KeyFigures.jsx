import { Animated } from '@/components/animated/Animated'
'use client'
import React from "react";
import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'
import { useInView } from "react-intersection-observer";
import useCountUp from "@hooks/useCountUp";
import {GoldLink } from "@/hooks/useGoldEffect"

const figures = [
  { value: 15, label: "années d’expérience", suffix: "+" },
  { value: 400, label: "M€ d’encours structurés", suffix: " M€" },
  { value: 100, label: "indépendant & confidentiel", suffix: "%" },
];

export default function KeyFigures({ height = "min-h-[200vh]" }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const counts = figures.map((fig) => useCountUp(fig.value, 1500, inView));

  return (
    <section
      className={`snap-start w-full relative flex flex-col items-center justify-center text-center px-4 overflow-hidden ${height}`}
      id="chiffres"
    >
      {/* Background parallax */}
      <div
        className="absolute inset-0 z-0 bg-fixed bg-center bg-cover transition-transform duration-700 ease-out"
      ></div>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1D1D1D]/60 to-[#2E3A48]/90" />
      <div className="absolute inset-0 z-20 bg-[#C8A765]/10 mix-blend-soft-light" />

      {/* Contenu */}
      <div className="relative z-30 max-w-5xl mx-auto space-y-32 py-48">
        <Animated.Div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-title text-[#C8A765] drop-shadow-lg">
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
