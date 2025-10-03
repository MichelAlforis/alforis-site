# Checklist de déploiement B2B Multilingue

## Avant le build
- [ ] Toutes les traductions sont complètes (FR, EN, ES, PT)
- [ ] Images OG créées pour chaque langue
- [ ] Variables d'environnement configurées (.env.production)
- [ ] URL de base correcte dans NEXT_PUBLIC_BASE_URL

## Build et tests
- [ ] `npm run build` réussit sans erreur
- [ ] Tester toutes les langues en local
- [ ] Vérifier le sitemap : `/sitemap.xml`
- [ ] Vérifier robots.txt : `/robots.txt`
- [ ] Tester les redirections : `/b2b` → `/fr/b2b`

## SEO
- [ ] Balises hreflang présentes sur toutes les pages
- [ ] Open Graph tags corrects pour chaque langue
- [ ] JSON-LD structuré présent
- [ ] Tester avec Google Rich Results Test

## Performance
- [ ] Lighthouse score > 90
- [ ] Images optimisées (WebP/AVIF)
- [ ] Core Web Vitals verts
- [ ] Temps de chargement < 3s

## Sécurité
- [ ] Headers de sécurité configurés
- [ ] HTTPS activé
- [ ] CSP configuré si nécessaire

## Post-déploiement
- [ ] Soumettre sitemap à Google Search Console
- [ ] Soumettre sitemap à Bing Webmaster Tools
- [ ] Configurer Google Analytics (si applicable)
- [ ] Tester depuis différents pays/langues