
'use client'

import AlforisHead from '@/components/AlforisHead'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Animated } from '@/components/animated/Animated'

const calMap = {
  appel: "https://cal.com/alforis/appel-telephonique",
  visio: "https://cal.com/alforis/visio",
  rdv: "https://cal.com/alforis/rdv-patrimonial",
}

export default function ContactSection() {
  const router = useRouter()
  const [calUrl, setCalUrl] = useState(calMap["appel"])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const type = params.get("type")
    if (type && calMap[type]) {
      setCalUrl(calMap[type])
    }

    // Scroll automatique vers l'ancre #rdv avec décalage
    setTimeout(() => {
      const anchor = document.getElementById("rdv")
      if (anchor) {
        const yOffset = -300
        const y = anchor.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })
      }
    }, 300)
  }, [router.asPath]) // déclenche quand l’URL change

  return (
    <>
      <AlforisHead
        title="Prendre rendez-vous – Alforis"
        description="Choisissez le format de rendez-vous qui vous convient : appel, visio ou rencontre patrimoniale."
        path="/prendre-rendez-vous"
      />

      <section className="bg-ivoire py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Animated.H2
            className="text-3xl font-semibold text-anthracite mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Prêt à faire le premier pas ?
          </Animated.H2>

          <Animated.P
            className="text-base md:text-lg text-acier font-light mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choisissez le format qui vous convient le mieux.
          </Animated.P>

          <div id="rdv" className="scroll-mt-[300px]" />

          <Animated.Div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <iframe
              src={calUrl}
              width="100%"
              height="600"
              frameBorder="0"
              className="rounded-2xl shadow-lg"
              title="Réservation Alforis"
            />
          </Animated.Div>
        </div>
      </section>
    </>
  )
}
