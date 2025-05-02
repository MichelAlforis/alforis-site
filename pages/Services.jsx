
'use client'
import AlforisHead from '@/components/AlforisHead'
import { Animated } from '@/components/animated/Animated'
import CallToAction from '@/components/ui/CallToAction'
import NoWidowText from '@/components/animated/NoWindowText'



const services = [
  {
    title: "Ingénierie patrimoniale",
    subtitle: "Structurer votre patrimoine, sans trahir vos valeurs",
    description:
      "Nous concevons des stratégies sur mesure, adaptées à votre structure personnelle, professionnelle et familiale. L’objectif : fluidifier, optimiser, transmettre, tout en respectant ce qui vous est essentiel.\n\nConcrètement, cela signifie comprendre vos enjeux profonds, vos préférences de gouvernance, et vos impératifs de transmission. Nous faisons dialoguer droit, finance, psychologie familiale et projection à long terme.\n\nChaque scénario est modélisé, testé, challengé. Vous choisissez en connaissance de cause, avec une visibilité claire sur les conséquences juridiques, fiscales et humaines.",
    citation: "Un bon conseil patrimonial respecte d’abord ce qui vous est cher.",
    image: "/assets/img/engineering.svg",
    alt: "Icône ingénierie patrimoniale",
  },
  {
    title: "Trésorerie long terme",
    subtitle: "Faire fructifier sans dénaturer vos réserves",
    description:
      "Nous accompagnons les dirigeants dans la valorisation de leur trésorerie excédentaire, avec une approche sécurisée, structurée et alignée avec les objectifs de l’entreprise.\n\nNous analysons la nature des excédents (ponctuels ou structurels), leur horizon d’utilisation, et les contraintes internes de gouvernance.\n\nNos solutions vont des produits garantis aux structures plus dynamiques, en veillant toujours à articuler performance, liquidité, et cohérence stratégique.",
    citation: "La prudence n’empêche pas la performance, si elle est bien guidée.",
    image: "/assets/img/cash-flow.svg",
    alt: "Icône trésorerie long terme",
  },
  {
    title: "Gouvernance familiale",
    subtitle: "Préserver l’harmonie tout en préparant l’avenir",
    description:
      "La famille est souvent un atout… à condition d’être organisée. Nous aidons à structurer la gouvernance, anticiper les enjeux successoraux et préserver l’harmonie dans la durée.\n\nCela peut passer par la rédaction d’une charte, la mise en place d’un pacte familial, ou la création d’un organe de concertation.\n\nL’enjeu est toujours de pacifier les transmissions, protéger les plus vulnérables, et rendre la solidarité familiale efficiente et non pesante.",
    citation: "Un héritage serein se prépare bien avant d’être transmis.",
    image: "/assets/img/family.svg",
    alt: "Icône gouvernance familiale",
  },
  {
    title: "Conciergerie premium",
    subtitle: "Vous libérer du temps, sans perdre le fil",
    description:
      "Un seul interlocuteur pour coordonner vos besoins patrimoniaux, juridiques, immobiliers, administratifs. Notre conciergerie simplifie votre vie et vous libère du temps.\n\nNous intervenons pour faire avancer vos démarches, vous représenter, organiser les rendez-vous avec vos conseils et assurer un suivi de vos projets patrimoniaux.\n\nC’est une assistance proactive, personnalisée, pilotée par nous mais pensée pour vous, dans le respect de vos priorités et de votre niveau d’implication souhaité.",
    citation: "La tranquillité d’esprit est une richesse que l’on peut orchestrer.",
    image: "/assets/img/concierge.svg",
    alt: "Icône conciergerie premium",
  },
]

export default function Services() {
  return (
    <>
      <AlforisHead title="Services – Alforis" description="Découvrez notre approche patrimoniale sur mesure à travers notre page services." path="/Services" />

<Animated.Page>
      <main className="bg-ivoire text-anthracite pt-[var(--nav-height)] pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Animated.H1 className="text-4xl sm:text-5xl font-title font-semibold text-center mb-24">
            Des expertises au service de votre trajectoire de vie
          </Animated.H1>

          <section className="space-y-24">
            {services.map((service, index) => (
              <Animated.Article className="relative bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-lg group border border-doré/20">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="w-full md:w-48 flex justify-center md:justify-start items-center">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <NoWidowText as="h2" className="text-2xl md:text-3xl font-title text-anthracite group-hover:text-doré transition font-semibold mb-1">
                      {service.title}
                    </NoWidowText>
                    <NoWidowText as="p" className="text-acier text-sm italic mb-2">
                      {service.subtitle}
                    </NoWidowText>
                    <p className="text-acier text-base sm:text-lg md:text-xl font-light leading-relaxed whitespace-pre-line">
                      {service.description}
                    </p>
                    <NoWidowText as="p" className="text-acier text-base italic opacity-70 mt-4">
                      “{service.citation}”
                    </NoWidowText>
                  </div>
                </div>
              </Animated.Article>
            ))}
          </section>

          <CallToAction />
        </div>
      </main>
</Animated.Page>
    </>
  )
}
