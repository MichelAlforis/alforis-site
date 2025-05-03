import AnimatedSVGRenderer from "@/components/animated/AnimatedSVGRenderer";
import Buste from '@/assets/illustrations/buste';
import Approche from '@/assets/illustrations/approche';
import LifePic from '@/assets/illustrations/Lifepic'
import { couleurs } from "@/styles/colors";  // Chemin correct vers votre fichier couleurs.js



// Définir les SVG animés sous forme de JSX
const SvgLP = (
  <AnimatedSVGRenderer
    SvgComponent={LifePic}
    hoverEffect={true}
    scrollEffect={true}
    strokeColor={couleurs.ardoise}
    fillColor={couleurs.doré}
    strokeWidth={7}
    duration={3}
    delayStep={0.5}
    tiltIntensity={1.5}
    className="block w-[120%] h-[120%]" 
    preserveAspectRatio="xMidYMid meet"
  />
);

const SvgHA = (
  <AnimatedSVGRenderer
    SvgComponent={Approche}
    strokeColor={couleurs.ardoise}
    fillColor={couleurs.doré}
    strokeWidth={15}
    duration={5}
    delayStep={0.8}
    className="block w-[120%] h-[120%]" 
    preserveAspectRatio="xMidYMid meet"
  />
);

const SvgCA = (
  <AnimatedSVGRenderer
    SvgComponent={Buste}
    strokeColor={couleurs.ardoise}
    fillColor={couleurs.doré}
    strokeWidth={7}
    duration={5}
    delayStep={0.8}
    tiltIntensity={1.5}
    className="block w-full h-full" 
    preserveAspectRatio="xMidYMid meet"
  />
);

// Tableau des sections avec SVG animés, titres, paragraphes et liens
export const sections = [
  {
    SvgComponent: Approche,
    title: "Notre approche est d’abord humaine.",
    paragraph: "Avant de parler stratégie ou fiscalité, nous écoutons ce qui vous a forgé. Vos intuitions, vos blessures, vos moteurs. Car comprendre une trajectoire, c’est d’abord écouter son histoire.",
    link: "/ApprochePersonnalisee",  // Lien associé à cette section
  },
  {
    SvgComponent: LifePic,
    title: "Prêt à vous découvrir autrement ?",
    paragraph: "Le Profil de Vie vous permet de faire le point, en quelques questions clés, sur ce qui compte vraiment pour vous aujourd’hui, et ce que vous souhaitez faire grandir demain.",
    link: "/ProfilDeVie",  // Lien associé à cette section
  },
  {
    SvgComponent: Buste,
    title: "Chaque trajectoire est unique.",
    paragraph: "Nous ne croyons pas aux solutions toutes faites. Chaque accompagnement Alforis commence par une cartographie de vos objectifs profonds, de votre horizon personnel, et de vos contraintes concrètes.",
    link: "/Services",  // Lien associé à cette section
  },
];
