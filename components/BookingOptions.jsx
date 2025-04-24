'use client'

import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'

const rendezvous = [
  {
    type: "appel-telephonique",
    title: "Appel téléphonique",
    duration: "15 min",
    description: "Un appel court pour faire connaissance et comprendre votre situation.",
    link: "https://cal.com/alforis/appel-telephonique",
  },
  {
    type: "visio",
    title: "Visio",
    duration: "30 min",
    description: "Un rendez-vous en visio pour prendre le temps d’échanger en profondeur.",
    link: "https://cal.com/alforis/visio",
  },
  {
    type: "rdv-patrimonial",
    title: "RDV Patrimonial",
    duration: "60 min",
    description:
      "Un entretien complet pour explorer votre trajectoire, vos priorités de vie et la façon dont votre patrimoine peut les soutenir.",
    link: "https://cal.com/alforis/rdv-patrimonial",
  },
]

export default function BookingOptions() {
  return (
    <section className="bg-ivoire py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <ClientOnlyMotion
          as="h2"
          className="text-3xl font-semibold text-anthracite mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Choisissez votre format de rendez-vous
        </ClientOnlyMotion>

        <ClientOnlyMotion
          as="p"
          className="text-base md:text-lg text-acier font-light mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Appel, visio ou rendez-vous patrimonial. C’est vous qui décidez ce qui vous convient le mieux.
        </ClientOnlyMotion>

        <ClientOnlyMotion
          as="div"
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          viewport={{ once: true }}
        >
          {rendezvous.map(({ type, title, duration, description, link }) => (
            <ClientOnlyMotion
              as="div"
              key={type}
              className="bg-white border border-light rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <h3 className="text-xl font-semibold text-anthracite mb-2">{title}</h3>
              <p className="text-sm text-muted mb-4 italic">Durée : {duration}</p>
              <p className="text-base text-steel mb-6">{description}</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-alforis-retro"
              >
                Réserver ce créneau
              </a>
            </ClientOnlyMotion>
          ))}
        </ClientOnlyMotion>
      </div>
    </section>
  )
}
