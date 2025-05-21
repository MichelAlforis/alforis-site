import { useEffect,useState } from 'react'
import { NavConfig } from './components/navbar/NavbarConfig'
import NavbarDesktop from './components/navbar/NavbarDesktop'
import NavbarMobile from './components/navbar/NavbarMobile'

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const links = NavConfig.tabs

  // Détection taille du mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);  // Détecte la largeur de l'écran
    };

    handleResize();  // Appel initial pour déterminer la taille de l'écran au chargement
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>

    {/* Menu Desktop */}
    {!isMobile && (<NavbarDesktop links={links}/>)}

    {/* MENU MOBILE */}
    {isMobile && (<NavbarMobile links={links}/>)}

    </>
  )
}
