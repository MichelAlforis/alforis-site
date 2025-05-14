'use client'

import AlforisHead from '@/components/AlforisHead'
import Animated from '@/components/animated/Animated'
import NoWidowText from '@/components/animated/NoWindowText'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Button from '@/components/ui/Button'
import { Search, Settings, DollarSign, Users, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'

const services = [
  {
    id: 1,
    icon: Settings,
    title: 'Ingénierie patrimoniale',
    subtitle: 'Structurer votre patrimoine, sans trahir vos valeurs',
    description: `Stratégies sur mesure alliant droit, finance et psychologie familiale...`,
  },
  {
    id: 2,
    icon: DollarSign,
    title: 'Trésorerie long terme',
    subtitle: 'Faire fructifier sans dénaturer vos réserves',
    description: `Solutions sécurisées et dynamiques pour vos excédents de trésorerie...`,
  },
  {
    id: 3,
    icon: Users,
    title: 'Gouvernance familiale',
    subtitle: 'Préserver l’harmonie tout en préparant l’avenir',
    description: `Charte familiale, pacte ou organe de concertation pour un héritage serein...`,
  },
  {
    id: 4,
    icon: Star,
    title: 'Conciergerie premium',
    subtitle: 'Vous libérer du temps, sans perdre le fil',
    description: `Assistance proactive pour orchestrer tous vos projets patrimoniaux...`,
  },
]

export default function Services() {
  const [filter, setFilter] = useState('')
  const filtered = useMemo(
    () => services.filter(s =>
      s.title.toLowerCase().includes(filter.toLowerCase()) ||
      s.description.toLowerCase().includes(filter.toLowerCase())
    ),
    [filter]
  )

  return (
    <>
      <AlforisHead
        title="Services – Alforis"
        description="Explorez nos expertises pour piloter votre trajectoire de vie"
        path="/services"
      />
      <Animated.Page>
        <main className="main-content bg-ivoire text-anthracite py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <Animated.H1 className="text-4xl md:text-5xl font-title text-center mb-8">
              Nos expertises, votre sérénité
            </Animated.H1>
            <div className="flex justify-center mb-8">
              <Input
                placeholder="Rechercher un service..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="max-w-md"
                icon={<Search className="mr-2" />}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(service => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card className="border border-doré/20 rounded-2xl shadow-sm hover:shadow-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-doré text-white p-3 rounded-full mr-4">
                          <Icon size={20} />
                        </div>
                        <div>
                          <NoWidowText as="h2" className="text-2xl font-title text-anthracite">
                            {service.title}
                          </NoWidowText>
                          <p className="text-acier italic text-sm">{service.subtitle}</p>
                        </div>
                      </div>
                      <CardContent>
                        <p className="text-base leading-relaxed mb-4">{service.description}</p>
                      </CardContent>
                      <Button className="btn-alforis-outline">En savoir plus</Button>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
            <div className="mt-12 text-center">
              <Button className='btn-alforis-outline'>Contactez-nous</Button>
            </div>
          </div>
        </main>
      </Animated.Page>
    </>
  )
}
