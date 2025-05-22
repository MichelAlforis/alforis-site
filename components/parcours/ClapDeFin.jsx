'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PremiumButton from '@/components/ui/PremiumButton'

export default function ClapDeFinAnimated({
  profilPrincipal,
  profilSecondaire,
  meta,
  slug,
}) {
  const data = meta.profilesData?.[profilPrincipal]
  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 bg-acier text-ivoire">
        <p className="text-center text-lg">Désolé, nous n’avons pas trouvé votre profil.</p>
      </div>
    )
  }

  const { icon, title, description, color, paragraphs, citation, cta } = data
  const isExternal = cta?.href?.startsWith('http')
  let href = cta?.href || `/parcours/${slug}`

  // Variants Framer Motion
  const container = {
    hidden: { opacity: 0, scale: 0.97 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.15 }
    }
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="pt-[calc(var(--nav-height)+1rem)] pb-16 bg-acier"
    >
      <motion.div
        variants={item}
        className="mx-auto max-w-3xl px-6 md:px-8 py-12 bg-black/40 rounded-2xl shadow-2xl backdrop-blur-lg flex flex-col items-center space-y-8 border-2"
        style={{ borderColor: color }}
      >
        {/* Icone */}
        <motion.div variants={item} className="text-[4rem]">
          {icon}
        </motion.div>

        {/* Titre */}
        <motion.h1
          variants={item}
          className="text-4xl md:text-5xl font-title text-ivoire leading-tight text-center"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          className="max-w-xl text-base md:text-lg text-ivoire/80 text-center"
        >
          {description}
        </motion.p>

        {/* Paragraphes */}
        <motion.div variants={item} className="w-full space-y-4 text-left">
          {paragraphs.map((p, i) => (
            <motion.p key={i} variants={item} className="text-base leading-relaxed text-ivoire/90">
              {p}
            </motion.p>
          ))}
        </motion.div>

        {/* Citation */}
        {citation && (
          <motion.blockquote
            variants={item}
            className="italic text-ivoire/70 self-start pl-4 border-l-4"
            style={{ borderColor: color }}
          >
            <span className="mr-2">{citation.emoji}</span>
            {citation.text}
          </motion.blockquote>
        )}

        {/* CTA principal */}
        {cta?.label && (
          <motion.div variants={item}>
            {isExternal ? (
              <PremiumButton
                as="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto max-w-xs"
              >
                {cta.label}
              </PremiumButton>
            ) : (
              <Link href={href} className="w-full md:w-auto max-w-xs">
                <PremiumButton className="w-full">{cta.label}</PremiumButton>
              </Link>
            )}
          </motion.div>
        )}

        {/* Badge profil secondaire */}
        {profilSecondaire && (
          <motion.span
            variants={item}
            className="inline-block px-4 py-1 text-sm bg-doré/20 text-doré rounded-full"
          >
            Profil secondaire : <strong>{profilSecondaire}</strong>
          </motion.span>
        )}

        {/* Bouton retour */}
        <motion.div variants={item} className="mt-4">
          <Link href="/parcours">
            <PremiumButton variant="outline" className="w-full md:w-auto max-w-xs">
              ← Revenir à la sélection
            </PremiumButton>
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
