import Link from 'next/link'
import { FooterConfig } from './FooterConfig'
import { couleurs } from '@/styles/generated-colors.mjs'

const handleCookiePrefs = () => {
  if (window.cc_popup && typeof window.cc_popup.revokeChoice === 'function') {
    window.cc_popup.revokeChoice();
  } else {
    setTimeout(() => {
      if (window.cc_popup && typeof window.cc_popup.revokeChoice === 'function') {
        window.cc_popup.revokeChoice();
      } else {
        alert("La gestion des cookies n'est pas encore prête. Merci de réessayer dans un instant.");
      }
    }, 300);
  }
};


export default function FooterMobile() {
  return (

<footer className="bg-ardoise py-8 px-6">
    <div>
      <h3 className="text-2xl font-title font-bold mb-3 text-doré">{FooterConfig.title}</h3>
      <p className="text-sm font-light text-vertSauge max-w-xs">{FooterConfig.description}</p>
    </div>
    <div className="grid grid-cols-[20%_80%] gap-2 mt-4">
      <div className='flex flex-col items-start justify-center space-y-2 mt-4'>  
        {FooterConfig.tabsReseaux.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="hover:opacity-80 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox={item.viewBox} className="w-auto h-6">
              <path d={item.d} fill={couleurs.ivoire} stroke={couleurs.vertSauge} />
            </svg>
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-1 text-vertSauge text-sm items-end justify-center">
        <p className="text-ivoire mb-2">&copy; Alforis. Tous droits réservés.</p>
        {FooterConfig.tabsLinks.map((item, i) =>
          item.label === 'Gérer mes cookies' ? (
            <button
              key={i}
              onClick={e => { e.preventDefault(); handleCookiePrefs() }}
              className="hover:text-doré transition text-left"
            >
              {item.label}
            </button>
          ) : item.href.startsWith('mailto:') ? (
            <a
              key={i}
              href={item.href}
              className="hover:text-doré transition text-left"
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={i}
              href={item.href}
              className="hover:text-doré transition text-left"
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </div>
</footer>

  )
}

