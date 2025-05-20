'use client'
/* app/approchepersonnalisee/ApprocheContent.jsx */

import Animated from '@/components/animated/Animated'
import NoWidowText from '@/components/animated/NoWindowText'
import CallToAction from '@/components/ui/CallToAction'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings, DollarSign, Star, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState,useEffect } from 'react'
import { pageConfig } from './pageConfig'

const steps = pageConfig.tabs
  
export default function ApprocheContent() {
  
  // état thème jour/nuit
    const [dark, setDark] = useState(false)
    useEffect(() => {
      document.documentElement.classList.toggle('dark', dark)
    }, [dark])

  return (
    <Animated.Page>
      <main className="bg-ivoire text-anthracite dark:bg-acier text-ivoire py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-doré/40 dark:bg-acier/40 h-full" />
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
                    <div className="z-base flex items-center justify-center bg-vertSauge text-ivoire dark:bg-doré rounded-full p-5 shadow-lg">
                      <Icon size={28} />
                    </div>
                    <Card className="flex-1 bg-white bg-opacity-90 dark:bg-ivoire/20 bg-opacity-80 text-ivoire rounded-2xl shadow-xl border border-doré/20 dark:border-vertSauge">
                      <CardHeader>
                        <NoWidowText
                          as="h2"
                          className="text-2xl md:text-3xl font-serif text-doré dark:text-vertSauge font-semibold"
                        >
                          {step.title}
                        </NoWidowText>
                        <p className="text-acier dark:text-ivoire italic mt-1">{step.subtitle}</p>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-lg text-anthracite dark:text-white leading-relaxed">{step.description}</p>
                        <p className="italic text-anthracite dark:text-white opacity-70 mt-4">“{step.citation}”</p>
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