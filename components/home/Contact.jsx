'use client'

import AlforisHead from '@/components/AlforisHead'
import useButtonHover from '@/hooks/useButtonHover'
import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'

export default function Contact({ extraClass = '' }) {
  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()

  return (
    <>
      <AlforisHead
        title="Contact – Alforis"
        description="Découvrez notre approche patrimoniale sur mesure à travers notre page contact."
        path="/contact"
      />
<main className={`pt-[var(--nav-height)] min-h-screen py-12 px-4 md:px-0 flex items-center justify-center ${extraClass}`}>


        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Bloc texte et infos */}
          <ClientOnlyMotion
            as="div"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl text-doré font-semibold mb-6">
              Entrer en contact avec Alforis
            </h1>
            <p className="text-base text-white font-light mb-6">
              Vous souhaitez poser une question, planifier une rencontre ou recevoir une documentation ?  
              Laissez-nous un message ou prenez directement rendez-vous.
            </p>

            <ul className="text-sm text-white space-y-2">
              <li><strong>Email :</strong> michel.marques@alforis.fr</li>
              <li><strong>Téléphone :</strong> 06 46 46 22 91</li>
              <li><strong>Adresse :</strong> 10 rue de la Bourse, 75002 Paris</li>
            </ul>
          </ClientOnlyMotion>

          {/* Bloc formulaire */}
          <ClientOnlyMotion
            as="div"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <form className="bg-white bg-opacity-80 rounded-2xl shadow-md p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold">Nom complet</label>
                <input type="text" id="name" className="w-full border border-beigeClair rounded-md px-4 py-2 mt-1" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                <input type="email" id="email" className="w-full border border-beigeClair rounded-md px-4 py-2 mt-1" required />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold">Message</label>
                <textarea id="message" rows="4" className="w-full border border-beigeClair rounded-md px-4 py-2 mt-1" required />
              </div>

              <button
                type="submit"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="btn-alforis-rdv"
              >
                Envoyer le message
              </button>
            </form>
          </ClientOnlyMotion>

        </div>
      </main>
    </>
  )
}
