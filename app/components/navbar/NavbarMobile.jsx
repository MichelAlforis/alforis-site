'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import NavbarLogoMobile from '@/components/Navbar/NavbarLogoMobile';
import clsx from 'clsx';
import SwitchDarkMode from '@/components/ui/SwitchDarkMode';

export default function NavbarMobile({ links }) {
  // 1) Page courante et état Open
  const pathname = usePathname()
  const isHome   = pathname === '/'
  const isActive = href => pathname === href
  const [isOpen, setIsOpen] = useState(false);

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);


  // Gérer l'activation du lien dans le menu
  const handleLinkClick = (href) => {
    // Votre logique pour gérer l'activation d'un lien
    console.log(`Navigating to ${href}`);
  };

  return (
    <header
      className={clsx(
        'site-header fixed inset-x-0 top-0 z-nav h-nav transition-shadow duration-300',

      )}
    >
      {/* Burger uniquement si le menu est fermé */}
      {!isOpen && (
        <div
          className={clsx("pt-0 grid grid-cols-2 h-full items-center",
                  isHome
          ? 'bg-transparent'
          : 'bg-ivoire/10 dark:bg-acier/10 backdrop-blur-2xl')}
          style={{ height: 'var(--nav-height)' }}
        >
        
          {/* Colonne 1 : logo mobile */}
          <div className="flex items-center">
            <NavbarLogoMobile className="navbar-logo" isHome={isHome} />
          </div>

          {/* Colonne 2 : bouton menu aligné à droite */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Ouvrir le menu"
              className={clsx(
                'lg:hidden z-nav p-3 focus:outline-none focus:ring-2 focus:ring-doré rounded',
                isHome ? 'text-ivoire' : 'text-acier'
              )}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* — En-tête mobile : skip-link, logo & bouton X */}
            <div className="flex items-center justify-between border-b border-ardoise/30">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only bg-doré text-ivoire p-2 rounded"
              >
                Aller au contenu
              </a>
              <Link
                href="/"
                onClick={() => {
                  handleLinkClick('/');
                  setIsOpen(false); // Fermer le menu après un clic
                }}
                className="flex items-center"
              >
                <span className="sr-only">Alforis – Accueil</span>
              </Link>
              {/* Déplacer le bouton X ici, dans la nav */}

            </div>

            {/* — Liens & actions */}
            <nav className=" 
            mobile-menu
            z-nav flex-1 flex flex-col 
            min-h-screen items-center justify-center 
            space-y-4 py-6 relative
            bg-ivoire/20 backdrop-blur-2xl text-acier

            ">
              {/* bouton fermeture*/}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Fermer le menu"
                className="p-2 z-nav focus:outline-none focus:ring-2 focus:ring-doré rounded absolute top-4 right-4"
              >
                <X size={28} />
              </button>

                {/* bouton fermeture */}
              <Link href="/" onClick={() => {
                handleLinkClick('/');
                setIsOpen(false);}}
                className={isActive ? 'text-doré' : 'text-acier'}
              >
                Accueil
              </Link>

              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => {
                    handleLinkClick(href);
                    setIsOpen(false); // Fermer le menu après un clic
                  }}
                  className={isActive ? 'text-doré' : 'text-acier'}
                >
                  {label}
                </Link>
              ))}

              {/* Changement de mode sombre/clair */}
              <SwitchDarkMode/>

              {/* Bouton RDV */}
              <Button
                to="/prendre-rendez-vous"
                className="btn-alforis-rdv font-semibold"
                onClick={() => {
                  handleLinkClick('/prendre-rendez-vous');
                  setIsOpen(false); // Fermer le menu après un clic
                }}
              >
                Prendre un RDV
              </Button>
            </nav>
          </motion.div>
        </AnimatePresence>
      )}
    </header>
  );
}
