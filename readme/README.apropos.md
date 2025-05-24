# README — Section « À propos »

Ce document décrit l'implémentation et l'intégration de la section "À propos" sur votre site Alforis.

---

## 1. Vue d'ensemble

La section "À propos" a pour vocation de présenter Michel Marques et la philosophie d'Alforis avec :

* Un paragraphe narratif déployé sur 80 % de la largeur (desktop) ou 100 % (mobile).
* Un logo animé (SVG) occupant 20 % de la largeur (desktop) ou placé sous le texte (mobile).
* Un fond dégradé dynamique, du gris foncé (ardoise) vers ivoire.
* Des animations au scroll grâce à Framer Motion.
* Une mise en page responsive (mobile → colonne unique, desktop → deux colonnes).

## 2. Installation

1. Placez le fichier `SectionQuiSuis.jsx` dans `components/Section` (ou dossier équivalent).

2. Installez Framer Motion si ce n'est pas déjà fait :

   ```bash
   npm install framer-motion
   # ou
   yarn add framer-motion
   ```

3. Assurez-vous d'avoir votre configuration Tailwind CSS prête avec :

   * Couleurs : `ivoire`, `ardoise`, `acier`, `doré`, etc.
   * Utility classes pour `grid`, `md:grid-cols-5`, etc.

4. Importez et utilisez la section dans votre page `/a-propos/page.jsx` :

   ```jsx
   import SectionQuiSuis from '@/components/Section/SectionQuiSuis'

   export default function AProposPage() {
     return (
       <main>
         <SectionQuiSuis />
         {/* autres sections... */}
       </main>
     )
   }
   ```

## 3. Structure du composant

```jsx
<motion.section
  id="section-qui-je-suis"
  className="
    grid grid-cols-1 md:grid-cols-5
    gap-0 md:gap-8
    max-w-3xl mx-auto
    px-4
    overflow-hidden
  "
>
  {/* Texte */}
  <div className="md:col-span-4 space-y-6">...</div>

  {/* Logo animé */}
  <div className="md:col-span-1 bg-gradient-to-br from-ardoise via-acier to-ivoire
                  flex items-center justify-center h-full">
    <motion.svg ...>...
    </motion.svg>
  </div>
</motion.section>
```

### 3.1 Classes principales

* `grid grid-cols-1 md:grid-cols-5` : une colonne en mobile, cinq en desktop.
* `md:col-span-4` & `md:col-span-1` : partition 80/20.
* `gap-0 md:gap-8` : suppression de l'écart en mobile, écart de 2 rem en desktop.
* `max-w-3xl mx-auto px-4` : conteneur centré jusqu'à 48 rem + padding lateral.
* `overflow-hidden` : masque les débordements indésirables.
* `bg-gradient-to-br from-ardoise via-acier to-ivoire` : gradient de fond stylé pour le logo.

## 4. Personnalisation

* **Texte** : modifiez les paragraphes dans le `div` texte.
* **Image** : si vous préférez un portrait, remplacez le SVG par une balise `<img>` ou un autre `<svg>`.
* **Couleurs** : adaptez le gradient et les couleurs via vos tokens Tailwind.
* **Taille du SVG** : jouez avec `viewBox` et `h-full w-auto`, ou fixez `h-[80vh]` si nécessaire.
* **Animations** : ajustez les props Framer Motion (`initial`, `whileInView`, `transition`).

## 5. Bonnes pratiques

* Utilisez `viewport={{ once: true, amount: 0.3 }}` pour déclencher les animations juste au moment souhaité.
* Testez sur différentes largeurs d'écran pour vérifier la colonne unique vs. double.
* Gardez le parent `<main>` sans `overflow-hidden` global pour ne pas couper d'autres sections.

---

> **Astuces** :
>
> * Si le SVG reste coupé, élargissez son `viewBox` ou utilisez un wrapper `overflow-visible`.
> * Pour un centrage horizontal différent, remplacez `mx-auto px-4` par `ml-4 pr-0`.

*Document généré par l’équipe technique Alforis.*
