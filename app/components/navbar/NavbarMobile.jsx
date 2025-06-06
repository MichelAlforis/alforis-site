'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import Button from '@/components/ui/Button';
import NavbarLogoMobile from '@/components/Navbar/NavbarLogoMobile';
import SwitchDarkMode from '@/components/ui/SwitchDarkMode';


export default function NavbarMobile({ links }) {
  const pathname = usePathname();
  const isTransparent = pathname === '/' || pathname === '/a-propos'
  const isActive = useCallback(
    (href) => pathname === href,
    [pathname]
  );
  const [isOpen, setIsOpen] = useState(false);
  const firstLinkRef = useRef(null);

  // Bloque le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Fermer au "Escape" et focus trap rudimentaire
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleLinkClick = (href) => {
    setIsOpen(false);
  };

  // Framer Motion variants
  const menuVariants = {
    closed: { x: '-100%' },
    open:   { x: 0, transition: { type: 'tween', duration: 0.3, when: 'beforeChildren' } }
  };
  const containerVariants = {
    closed: {},
    open:   { transition: { staggerChildren: 0.05, delayChildren: 0.15 } }
  };
  const itemVariants = {
    closed: { opacity: 0, y: 10 },
    open:   { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-nav h-nav transition-shadow duration-300',
        isTransparent ? 'text-ivoire' : 'dark:text-ivoire'
      )}
    >
      

      {/* BARRE PRINCIPALE (fermée) */}
      {!isOpen && (
        <div
          className={clsx(
            'grid grid-cols-2 h-full items-center px-4 rounded-xl',
            isTransparent
              ? 'bg-transparent'
              : 'bg-ivoire/10 dark:bg-acier/10 '
          )}
          style={{ height: 'var(--nav-height)' }}
        >
          <NavbarLogoMobile className={'h-full w-auto'} isTransparent={isTransparent} />

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={isOpen}
            className={clsx(
              'ml-auto p-3 focus:outline-none focus:ring-2 focus:ring-doré rounded',
              isTransparent ? 'text-ivoire' : 'text-acier'
            )}
          >
            <Menu size={28} />
          </button>
        </div>
      )}

      {/* DRAWER (ouvert) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* overlay semi-opaque */}
            <motion.div
              className="fixed inset-0 bg-opacity-90 bg-ivoire dark:bg-acier z-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <motion.nav
              role="dialog"
              aria-modal="true"
              className="
                fixed inset-y-0 left-0 
                z-nav 
                w-4/5 max-w-xs 
                flex flex-col 
                bg-ivoire/90 dark:bg-acier/90
                text-acier dark:text-ivoire
                backdrop-blur-xl
              "
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              {/* Entête du drawer */}
              <div
                className="flex items-center justify-between px-4"
                style={{ height: 'var(--nav-height)' }}
              >
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only bg-doré text-ivoire p-2 rounded"
                >
                  Aller au contenu
                </a>

                <Link
                  href="/"
                  onClick={() => handleLinkClick('/')}
                  className="flex items-center"
                >
                  <span className="sr-only">Alforis – Accueil</span>
                  <NavbarLogoMobile isTransparent={isTransparent} />
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer le menu"
                  className="p-2 focus:outline-none text-acier dark:text-ivoire font-semibold focus:ring-2 focus:ring-doré rounded"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Contenu du drawer */}
              <motion.div
                className="flex-1 overflow-visible px-4 py-6"
                variants={containerVariants}
              >
                <ul className="space-y-6">
                  {/* Accueil */}
                  <motion.li variants={itemVariants}>
                    <Link
                      href="/"
                      onClick={() => handleLinkClick('/')}
                      ref={firstLinkRef}
                      className={clsx(
                        'block text-xl space-y-1 uppercase font-semibold',
                        isActive('/') ? 'text-doré' : 'text-acier dark:text-ivoire'
                      )}
                    >
                      Accueil
                    </Link>
                  </motion.li>

                  {/* Liens dynamiques */}
                  {links.map(({ href, label }) => (
                    <motion.li key={href} variants={itemVariants}>
                      <Link
                        href={href}
                        onClick={() => handleLinkClick(href)}
                        className={clsx(
                          'block text-lg space-y-1 uppercase font-semibold',
                          isActive(href) ? 'text-doré' : 'text-acier dark:text-ivoire'
                        )}
                      >
                        {label}
                      </Link>
                    </motion.li>
                  ))}

                  {/* Switch mode */}
                  <motion.li variants={itemVariants}>
                    <SwitchDarkMode />
                  </motion.li>

                  {/* Bouton RDV */}
                  <motion.li variants={itemVariants}>
                    <Button
                      to="/prendre-rendez-vous"
                      onClick={() => handleLinkClick('/prendre-rendez-vous')}
                      className="w-full btn-alforis-rdv text-xl font-semibold"
                    >
                      Prendre un RDV
                    </Button>
                  </motion.li>
                </ul>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
