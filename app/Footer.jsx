import { useEffect,useState } from 'react'
import FooterMobile from './components/footer/FooterMobile';
import FooterDesktop from './components/footer/FooterDesktop';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);


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
    {!isMobile && (<FooterDesktop/>)}

    {/* MENU MOBILE */}
    {isMobile && (<FooterMobile/>)}

    </>
  )
}
