import Link from 'next/link'
import { FooterConfig } from './FooterConfig'
import { couleurs } from '@/styles/generated-colors'

const handleCookiePrefs = () => {
  window.cc_popup?.revokeChoice()
}


export default function FooterDesktop() {
  return (


<footer className="bg-ardoise text-ivoire py-12 px-6">
  <div className="max-w-7xl mx-auto hidden md:grid grid-cols-2 gap-x-10 gap-y-2">
    {/* Col 1, Row 1: Logo + baseline */}
    <div className="flex flex-col justify-center col-start-1 row-start-1">
      <h3 className="text-2xl font-title font-bold mb-3 text-doré">{FooterConfig.title}</h3>
      <p className="text-sm font-light text-vertSauge max-w-xs">{FooterConfig.description}</p>
    {/* Col 1, Row 2: Réseaux sociaux CENTRÉS sous logo */}     
      <div className='flex flex-row overflow-auto mt-4'>
        {FooterConfig.tabsReseaux.map((item, i) => (
        <Link key={item.label} href={item.href}>
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" wrapperClassName="w-24 h-24 stroke-ardoise fill-doré">
            <path d={item.d} fill={couleurs.ivoire} stroke={couleurs.vertSauge}  />
          </svg>
        </Link>
      ))}
      </div>
    </div>
    {/* Col 2, Row 1: Mentions/links */}
    <div className="flex flex-col items-end col-start-2 row-start-1 text-sm text-vertSauge">
      <p className="text-ivoire mb-2">&copy; {new Date().getFullYear()} Alforis. Tous droits réservés.</p>
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

