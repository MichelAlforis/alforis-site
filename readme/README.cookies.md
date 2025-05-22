# Gestion des cookies Alforis

## 1. Fonctionnalité

Le site utilise [vanilla-cookieconsent](https://github.com/orestbida/cookieconsent) pour gérer l’affichage d’une bannière de consentement cookies conforme au RGPD/CNIL.

- Bannière affichée à la première visite  
- Boutons « Tout accepter », « Tout refuser », et lien « Personnaliser »  
- Choix enregistré pour 13 mois  
- Possibilité de rouvrir la bannière via le lien « Gérer mes cookies » dans le footer  

## 2. Conformité RGPD / Loi Européenne

L’implémentation respecte :

- **Consentement préalable** : aucun cookie non-nécessaire n’est déposé avant choix  
- **Boutons clairs** : « Accepter » et « Refuser » visibles et non pré-cochés  
- **Lien « Gérer mes cookies »** : accessible en permanence depuis le footer  
- **Choix conservé moins de 13 mois**  
- **Absence du bouton automatique `cc-revoke`** : caché via CSS pour éviter tout doublon/confusion  

## 3. Architecture technique

### a. Initialisation de CookieConsent

Dans `RootClientLayout.jsx` (ou équivalent), le script `/public/cookieconsent.js` est chargé côté client.

À l’initialisation :

- On empêche l’apparition de la bannière si un choix a déjà été enregistré
- On neutralise le bouton `cc-revoke` natif (patch CSS + JS)
- On stocke l’instance de bannière dans `window.cc_popup` pour la piloter manuellement

**Exemple d’init :**

```js
const initializeCookieConsent = () => {
  const existing = window.localStorage.getItem('cookieconsent_status');
  if (existing) return;

  // Patch pour désactiver le bouton de révocation natif
  if (window.cookieconsent?.Popup?.prototype) {
    window.cookieconsent.Popup.prototype.applyRevokeButton = function() {};
  }

  try {
    window.cookieconsent.initialise({
      palette: {
        popup:  { background: 'var(--ardoise)', text: 'var(--ivoire)' },
        button: { background: 'var(--doré)',   text: 'var(--anthracite)' }
      },
      position: 'top',
      theme: 'classic',
      type: 'opt-in',
      layout: 'basic',
      content: { /* ... */ },
      onInitialise:   s => ['allow','deny'].includes(s) && document.body.classList.add('banner-dismissed'),
      onStatusChange: s => ['allow','deny'].includes(s) && document.body.classList.add('banner-dismissed')
    });

    // Stocke l'instance du popup dans window.cc_popup pour la gestion manuelle
    setTimeout(() => {
      for (let key in window.cookieconsent) {
        if (
          window.cookieconsent[key] &&
          typeof window.cookieconsent[key] === "object" &&
          typeof window.cookieconsent[key].revokeChoice === "function"
        ) {
          window.cc_popup = window.cookieconsent[key];
          break;
        }
      }
    }, 100);
  } catch (err) {
    console.error('Erreur lors de l’initialisation de CookieConsent :', err);
  }
};
```

### b. Désactivation du bouton revoke natif

Ajoute ce CSS global (par exemple dans `globals.css`) :

```css
.cc-revoke {
  display: none !important;
  pointer-events: none !important;
  visibility: hidden !important;
}
```

### c. Bouton « Gérer mes cookies » (dans le footer)

Dans ton composant Footer :

```jsx
<Link
  href="#"
  onClick={e => { e.preventDefault(); window.cc_popup?.revokeChoice(); }}
  className="hover:text-doré"
>
  Gérer mes cookies
</Link>
```

## 4. Fichiers concernés

- `/public/cookieconsent.js` : script vanilla-cookieconsent customisé
- `RootClientLayout.jsx` : injection du script + initialisation
- `Footer.jsx` : bouton de gestion des cookies
- `globals.css` (ou équivalent) : patch CSS du bouton cc-revoke

## 5. Points de vigilance

- Vérifier que le lien « Gérer mes cookies » reste visible sur toutes les pages
- Tester en navigation privée : la bannière doit disparaître après consentement/refus, et se rouvrir via le footer
- Mettre à jour la politique de confidentialité si le fonctionnement de tracking/mesure évolue

## 6. FAQ

**Q : Pourquoi désactiver le bouton revoke natif ?**  
R : Pour maîtriser le design et éviter d’avoir deux boutons de gestion des cookies affichés. Le bouton natif est peu personnalisable et mal intégré UX.

**Q : Et côté SEO / conformité ?**  
R : La solution est strictement conforme aux exigences CNIL/RGPD, si la bannière s’affiche avant tout dépôt de cookie non-nécessaire.

---

**Dernière vérification : Mai 2025**
