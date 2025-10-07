// app/components/footer/FooterConfigB2B.js
import { openCookieSettings } from '@/lib/cookieConsent';

export const FooterConfigB2B = {
  title: 'Alforis',
  description: 'Solutions patrimoniales pour les professionnels',
  logo: '/assets/icons/Logo.png',
  
  // Informations de contact professionnelles
  contact: {
    phone: '+33 6 46 46 22 91',
    email: 'pro@alforis.fr', // Email dédié B2B
    address: 'France • Espagne • Portugal',
    support: 'support@alforis.fr'
  },
  
  // Réseaux sociaux avec icônes SVG
  tabsReseaux: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/alforis",
      ariaLabel: "Suivez Alforis sur LinkedIn",
      viewBox: "0 0 16 16",
      d: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@alforis_finance",
      ariaLabel: "Suivez Alforis sur YouTube",
      viewBox: "0 0 16 16",
      d: "M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"
    }
  ],

  // Sections du footer B2B
  sections: [
    {
      title: "Solutions",
      links: [
        { label: "Gestion de patrimoine", href: "/solutions/gestion-patrimoine" },
        { label: "Conseil financier", href: "/solutions/conseil-financier" },
        { label: "Optimisation fiscale", href: "/solutions/optimisation-fiscale" },
        { label: "Transmission", href: "/solutions/transmission" }
      ]
    },
    {
      title: "Partenaires",
      links: [
        { label: "Devenir partenaire", href: "/partenaires/rejoindre" },
        { label: "Espace partenaire", href: "/partenaires/espace" },
        { label: "Programme d'affiliation", href: "/partenaires/affiliation" },
        { label: "API & Intégrations", href: "/partenaires/api" }
      ]
    },
    {
      title: "Ressources",
      links: [
        { label: "Documentation", href: "/ressources/documentation" },
        { label: "Études de cas", href: "/ressources/etudes-cas" },
        { label: "Webinaires", href: "/ressources/webinaires" },
        { label: "Blog professionnel", href: "/blog" }
      ]
    },
    {
      title: "Entreprise",
      links: [
        { label: "À propos", href: "/entreprise/a-propos" },
        { label: "Équipe", href: "/entreprise/equipe" },
        { label: "Carrières", href: "/entreprise/carrieres" },
        { label: "Presse", href: "/entreprise/presse" }
      ]
    }
  ],

  // Liens légaux
  tabsLinks: [
    { 
      label: "Mentions légales", 
      href: "/b2b/mentionslegales",
      ariaLabel: "Consulter les mentions légales"
    },
    { 
      label: "CGU Professionnels", 
      href: "/b2b/cgu",
      ariaLabel: "Consulter les CGU professionnels"
    },
    { 
      label: "Politique de confidentialité", 
      href: "/b2b/confidentialite",
      ariaLabel: "Consulter notre politique de confidentialité"
    },
  { 
      label: "Gérer mes cookies", 
      href: "#",
       onClick: () => openCookieSettings(false), // ← Fonction réelle, pas string
      ariaLabel: "Gérer vos préférences de cookies"
    },
  ],

  // Informations légales professionnelles
  legalInfo: {
    copyright: `© ${new Date().getFullYear()} Alforis. Tous droits réservés.`,
    companyInfo: {
      name: "Alforis",
      status: "SAS au capital de 5 000€",
      rcs: "Immatriculée au RCS de Paris : 943 007 229",
      tva: "TVA intracommunautaire : FR 159 430 072 29",
      director: "Directeur de publication : Michel Marques"
    },
    compliance: [
      "Membre de la Chambre Nationale des Conseils en Gestion de Patrimoine",
      "Certifié ISO 27001",
      "Conforme RGPD"
    ]
  },

  // Partenaires stratégiques
  partners: [
    {
      name: "Ursus-3 Capital",
      url: "https://ursus-3capital.com",
      logo: "/assets/partners/ursus3.png"
    }
  ],

  // CTA Newsletter B2B
  newsletter: {
    title: "Restez informé des actualités professionnelles",
    description: "Recevez nos analyses de marché, études et conseils réservés aux professionnels.",
    placeholder: "Email professionnel",
    button: "S'abonner",
    consent: "En vous inscrivant, vous acceptez de recevoir nos communications professionnelles et notre politique de confidentialité."
  },

  // Certifications et labels
  certifications: [
    { name: "ORIAS", logo: "/assets/certifications/orias.png" },
    { name: "ISO 27001", logo: "/assets/certifications/iso27001.png" }
  ]
};