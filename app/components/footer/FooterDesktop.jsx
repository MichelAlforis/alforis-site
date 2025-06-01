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


export default function FooterDesktop() {
  return (

<footer className="bg-ardoise text-ivoire py-8 px-6">
  <div className="max-w-7xl mx-auto hidden md:grid grid-cols-2 gap-x-10 gap-y-2">
    {/* Col 1, Row 1: Logo + baseline */}
    <div className="flex flex-col justify-center col-start-1 row-start-1">
      <h2 className="mb-3 text-doré">{FooterConfig.title}</h2>
      <p className="text-vertSauge">{FooterConfig.description}</p>
    {/* Col 1, Row 2: Réseaux sociaux CENTRÉS sous logo */}     
      <div className='flex flex-row auto-cols-auto items-center mt-4 space-x-8 ml-8'>
        {FooterConfig.tabsReseaux.map((item, i) => (
        <Link key={item.label} href={item.href}>
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" fill="currentColor" viewBox={item.viewBox} className="w-auto h-10">
            <path d={item.d} fill={couleurs.ivoire} stroke={couleurs.vertSauge}  />
          </svg>
        </Link>
      ))}
      </div>
    </div>
    {/* Col 2, Row 1: Mentions/links */}
    <div className="flex flex-col items-end col-start-2 row-start-1 text-vertSauge">
      <p className="text-ivoire mb-2">&copy; Alforis. Tous droits réservés.</p>
      {FooterConfig.tabsLinks.map((item, i) =>
        item.label === 'Gérer mes cookies' ? (
          <button
            key={i}
            onClick={e => { e.preventDefault(); handleCookiePrefs() }}
            className="hover:text-doré transition text-right"
          >
            {item.label}
          </button>
        ) : item.href.startsWith('mailto:') ? (
          <a
            key={i}
            href={item.href}
            className="hover:text-doré transition text-right"
          >
            {item.label}
          </a>
        ) : (
          <Link
            key={i}
            href={item.href}
            className="hover:text-doré transition text-right"
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

