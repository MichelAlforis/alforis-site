'use client'
import AlforisHead from '@/components/AlforisHead'
import Animated from '@/components/animated/Animated'
import NoWidowText from '@/components/animated/NoWindowText'
import CallToAction from '@/components/ui/CallToAction'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings, DollarSign, Users, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: Settings,
    title: 'L’écoute stratégique',
    subtitle: 'Poser les fondations de votre trajectoire',
    description: `Tout commence par une écoute active, sans filtre ni préjugé...`,
    citation: 'Toute stratégie lucide commence par une écoute sincère.',
  },
  {
    icon: DollarSign,
    title: 'Modélisation patrimoniale',
    subtitle: 'Transformer la complexité en clarté',
    description: `Visualisez chaque scénario et anticipez chaque décision...`,
    citation: 'On ne pilote bien que ce que l’on visualise clairement.',
  },
  {
    icon: Star,
    title: 'Stratégie sur-mesure',
    subtitle: 'Choisir les bons leviers au bon moment',
    description: `Nous construisons un plan unique, aligné avec vos aspirations...`,
    citation: 'Une bonne décision patrimoniale est toujours synchronisée avec la vie.',
  },
  {
    icon: Users,
    title: 'Suivi vivant',
    subtitle: 'Parce que votre vie évolue, votre stratégie aussi',
    description: `Un accompagnement continu pour ajuster chaque étape...`,
    citation: 'Ce qui fait la valeur d’une stratégie, c’est sa capacité d’adaptation.',
  },
]

export default function ApprochePersonnalisee() {
  return (
    <>
      <AlforisHead
        title="Approche Personnalisée – Alforis"
        description="Découvrez notre approche patrimoniale sur mesure"
        path="/approche"
      />
      <Animated.Page>
        <main className="main-content bg-ivoire text-anthracite py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <Animated.H1 className="text-4xl md:text-5xl font-title text-center mb-12">
              Une approche patrimoniale à la hauteur de vos enjeux
            </Animated.H1>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1 bg-doré/30 w-1 h-full" />
              <div className="space-y-16">
                {steps.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.2 }}
                      viewport={{ once: true }}
                      className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                      <div className="z-10 bg-doré text-white rounded-full p-4 shadow-lg">
                        <Icon size={24} />
                      </div>
                      <Card className="flex-1 ml-6 md:ml-12 p-6 rounded-2xl shadow-xl border border-doré/20">
                        <CardHeader>
                          <NoWidowText as="h2" className="text-2xl font-serif text-doré font-semibold">
                            {step.title}
                          </NoWidowText>
                          <p className="text-acier italic mt-2">{step.subtitle}</p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg leading-relaxed">{step.description}</p>
                          <p className="italic opacity-70 mt-4">“{step.citation}”</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
            <div className="mt-12 text-center">
              <CallToAction />
            </div>
          </div>
        </main>
      </Animated.Page>
    </>
  )
}