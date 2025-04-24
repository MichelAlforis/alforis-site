import { Animated } from '@/components/animated/Animated'
'use client'
import AlforisHead from '@/components/AlforisHead'

import { useEffect } from 'react'
import Head from 'next/head'
import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'
import CallToAction from '@/components/ui/CallToAction'
import NoWidowText from '@/components/animated/NoWindowText'
import { Animated.Page,AnimatedWrapper,AnimatedH1,AnimatedH2} from '@/components/animated/AnimatedHeadings'

export default function ApprochePersonnalisee() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const steps = [
    {
      title: 'L’écoute stratégique',
      subtitle: 'Poser les fondations de votre trajectoire',
      description: `Tout commence par l’écoute. Une écoute sans filtre...`,
      citation: 'Toute stratégie lucide commence par une écoute sincère.',
    },
    {
      title: 'Modélisation patrimoniale',
      subtitle: 'Transformer la complexité en clarté',
      description: `Cette étape est celle où l’invisible devient visible...`,
      citation: 'On ne pilote bien que ce que l’on visualise clairement.',
    },
    {
      title: 'Stratégie sur-mesure',
      subtitle: 'Choisir les bons leviers au bon moment',
      description: `Nous n’imposons pas une stratégie. Nous construisons un plan...`,
      citation: 'Une bonne décision patrimoniale est toujours une décision synchronisée avec la vie.',
    },
    {
      title: 'Suivi vivant',
      subtitle: 'Parce que votre vie évolue, votre stratégie aussi',
      description: `Le monde bouge, vos projets changent, la législation évolue...`,
      citation: 'Ce qui fait la valeur d’une stratégie, c’est sa capacité d’adaptation.',
    },
  ]

  return (
    <>
      <AlforisHead title="ApprochePersonnalisee – Alforis" description="Découvrez notre approche patrimoniale sur mesure à travers notre page approchepersonnalisee." path="/ApprochePersonnalisee" />
<Head>
        <title>Approche personnalisée de gestion patrimoniale | Alforis</title>
        <meta
          name="description"
          content="Découvrez la méthode Alforis : une approche structurée et humaine de la gestion patrimoniale."
        />
        <meta
          name="keywords"
          content="approche gestion de patrimoine, stratégie patrimoniale, modélisation patrimoniale"
        />
        <link rel="canonical" href="https://www.alforis.fr/approche-personnalisee" />
      </Head>
    
    <Animated.Page>
      <main className="bg-ivoire text-anthracite pt-[var(--nav-height)] pb-24 px-6">
        <div className="max-w-6xl mx-auto">
        <AnimatedH1 className="mb-20">
            Une approche patrimoniale à la hauteur de vos enjeux de vie
          </Animated.H1>

          <section className="relative border-l-2 border-doré/30 pl-6 md:pl-12 space-y-24">
            {steps.map((step, index) => (
              <ClientOnlyMotion.article
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative ml-2 md:ml-0 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-doré/20"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-12 top-2 flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-doré rounded-full shadow-md z-10">
                  {index + 1}
                </div>

                {/* Titre */}
                <NoWidowText
                  as="h2"
                  className="text-2xl md:text-3xl font-serif text-doré font-semibold mb-2"
                >
                  {step.title}
                </NoWidowText>

                {/* Sous-titre */}
                {step.subtitle && (
                  <p className="text-acier text-base font-light mt-2">
                    {step.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-acier text-lg md:text-xl font-light leading-relaxed mt-4">
                  {step.description}
                </p>

                {/* Citation */}
                {step.citation && (
                  <p className="text-acier text-base italic opacity-70 mt-4">
                    “{step.citation}”
                  </p>
                )}
              </ClientOnlyMotion.article>
            ))}
          </section>

          <CallToAction />
        </div>
      </main>
    </Animated.Page>
    </>
  )
}
