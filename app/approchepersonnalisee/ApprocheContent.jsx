'use client'
/* app/approchepersonnalisee/ApprocheContent.jsx */


import Animated from '@/components/animated/Animated'
import NoWidowText from '@/components/animated/NoWindowText'
import CallToAction from '@/components/ui/CallToAction'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings, DollarSign, Star, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: Settings,
    title: 'L’écoute stratégique',
    subtitle: 'Poser les fondations de votre trajectoire',
    description:
      'Tout commence par une écoute active, sans filtre ni préjugé, pour comprendre vos aspirations profondes.',
    citation: 'Toute stratégie lucide commence par une écoute sincère.',
  },
  {
    icon: DollarSign,
    title: 'Modélisation patrimoniale',
    subtitle: 'Transformer la complexité en clarté',
    description:
      'Visualisez chaque scénario, anticipez chaque décision et structurez votre capital avec précision.',
    citation: 'On ne pilote bien que ce que l’on visualise clairement.',
  },
  {
    icon: Star,
    title: 'Stratégie sur-mesure',
    subtitle: 'Choisir les bons leviers au bon moment',
    description:
      'Nous construisons un plan unique, aligné avec vos objectifs et votre rythme de vie.',
    citation: 'Une bonne décision patrimoniale est toujours synchronisée avec la vie.',
  },
  {
    icon: Users,
    title: 'Suivi vivant',
    subtitle: 'Votre trajectoire évolue, votre stratégie aussi',
    description:
      'Un accompagnement continu pour ajuster chaque étape à vos nouveaux besoins.',
    citation: 'La valeur d’une stratégie se mesure à sa capacité d’adaptation.',
  },
]

export default function ApprocheContent() {
  return (
    <Animated.Page>
      <main className="bg-ivoire text-anthracite py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-title text-center leading-snug"
          >
            Une approche patrimoniale à la hauteur de vos enjeux
          </motion.h1>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-doré/40 h-full" />
            <div className="space-y-16">
              {steps.map((step, i) => {
                const Icon = step.icon
                const isEven = i % 2 === 0
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                    className={`relative flex flex-col md:flex-row items-center gap-6 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="z-10 flex items-center justify-center bg-doré text-white rounded-full p-5 shadow-lg">
                      <Icon size={28} />
                    </div>
                    <Card className="flex-1 bg-white bg-opacity-90 rounded-2xl shadow-xl border border-doré/20">
                      <CardHeader>
                        <NoWidowText
                          as="h2"
                          className="text-2xl md:text-3xl font-serif text-doré font-semibold"
                        >
                          {step.title}
                        </NoWidowText>
                        <p className="text-acier italic mt-1">{step.subtitle}</p>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-lg leading-relaxed">{step.description}</p>
                        <p className="italic opacity-70 mt-4">“{step.citation}”</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <CallToAction className="px-8 py-4 font-semibold" />
          </div>
        </div>
      </main>
    </Animated.Page>
  )
}