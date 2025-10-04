// app/components/navbar/NavbarConfig.jsx
export const NavConfig = {
  // Configuration B2B
  b2b: {
    title: 'NavBar B2B',
    description: 'Solutions patrimoniales institutionnelles',
    showTabs: true,
    tabs: [
      { href: '/b2b',             label: 'Accueil',        alwaysVisible: true },
      { href: '/b2b/solutions',   label: 'Solutions',      alwaysVisible: true },
      { href: '/b2b/partenaires', label: 'Partenaires' },
      { href: '/b2b/ressources',  label: 'Ressources' },
      { href: '/b2b/contact',     label: 'Contact',        alwaysVisible: true },
    ]
  },
  
  // Configuration Particuliers
  particulier: {
    title: 'NavBar',
    description: 'Vision libre et sans filtre du patrimoine – articles, vidéos et réflexions.',
    showTabs: true,
    tabs: [
      { href: '/particulier/parcours', label: 'Parcours', alwaysVisible: true },
      { href: '/particulier/blog-studio', label: 'Blog', alwaysVisible: true },
      { href: '/particulier/marketplace', label: 'Tarifs', alwaysVisible: true },
      { href: '/particulier/services', label: 'Services' },
      { href: '/particulier/approchepersonnalisee', label: 'Approche' },
      { href: '/particulier/a-propos', label: 'A-propos' },
      { href: '/shared/contact', label: 'Contact', alwaysVisible: true }
    ]
  }
}