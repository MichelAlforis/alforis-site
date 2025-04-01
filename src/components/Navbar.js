import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);

  const internalSections = [
    { id: "accueil", label: "Accueil" },
    { id: "valeur-ajoutee", label: "Valeur ajoutée" },
    { id: "services", label: "Nos Services" },
    { id: "approche", label: "Approche personnalisée" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavScroll = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let current = "accueil";
      for (const section of internalSections) {
        const el = document.getElementById(section.id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname]);

  const isActualitesActive = location.pathname === "/actualites";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-slate-900 bg-opacity-90 shadow backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
      <img
            src="/logo_alforis_transparent.png"
            alt="Logo Alforis"
            className="h-14 w-auto"
            style={{ maxHeight: '56px' }}
      />


</div>


        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {internalSections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavScroll(id)}
              className={`relative transition-all duration-300 ease-out transform px-1 ${
                activeSection === id
                  ? "text-gold scale-105 tracking-wide after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gold after:rounded-full"
                  : "text-white opacity-70 hover:text-gold"
              }`}
            >
              {label}
            </button>
          ))}

          <Link
            to="/actualites"
            className={`relative transition-all duration-300 ease-out transform px-1 ${
              isActualitesActive
                ? "text-gold scale-105 tracking-wide after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gold after:rounded-full"
                : "text-white opacity-70 hover:text-gold"
            }`}
          >
            Blog / Actualité
          </Link>
        </div>

        {/* CTA + Burger Menu */}
        <div className="flex items-center space-x-4">
          <Link
            to="/rendezvous"
            className="bg-gold text-slate-900 px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
          >
            Prendre un RDV
          </Link>
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-800 text-white px-6 py-4 space-y-4">
          {internalSections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavScroll(id)}
              className={`block w-full text-left transition duration-300 ${
                activeSection === id ? "text-gold" : "hover:text-gold"
              }`}
            >
              {label}
            </button>
          ))}

          <Link
            to="/actualites"
            onClick={() => setMenuOpen(false)}
            className={`block w-full text-left transition duration-300 ${
              isActualitesActive ? "text-gold" : "hover:text-gold"
            }`}
          >
            Blog / Actualité
          </Link>

          <Link
            to="/rendezvous"
            onClick={() => setMenuOpen(false)}
            className="block bg-gold text-slate-900 px-4 py-2 rounded-md text-sm font-semibold text-center hover:opacity-90 transition"
          >
            Prendre un RDV
          </Link>
        </div>
      )}
    </motion.nav>
  );
}
