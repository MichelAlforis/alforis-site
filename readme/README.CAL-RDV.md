Prise de rendez-vous Cal.com avec tunnel dynamique (Next.js)
Objectif
Permettre aux visiteurs de choisir un créneau de rendez-vous parmi les créneaux réellement disponibles (récupérés dynamiquement depuis Cal.com), à travers un tunnel interactif :

Étape 1 : choix d’une date

Étape 2 : choix d’un horaire

Fallback : choix d’une autre semaine, puis possibilité de proposer ses propres disponibilités

1. Arborescence et fichiers clés
bash
Copier
Modifier
/app/api/calcom/slots/route.js            # API route : expose les créneaux Cal.com (adapté au tunnel)
/components/RDVTunnel.jsx                 # Composant React du tunnel de prise de RDV
/components/CustomDisponibilityForm.jsx   # Fallback : formulaire pour proposer d'autres dispos
/app/prendre-rendez-vous/PrendreRDVContent.jsx # Intégration du tunnel + fallback dans la page RDV
.env.local                                # Contient la clé API privée Cal.com
2. Configuration Cal.com
Va sur https://cal.com/ et connecte-toi à ton dashboard.

Crée au moins 1 Event Type (ex : « Appel téléphonique »)

Clique sur l’event, copie son ID (id dans l’API ou l’URL, ex : 2283473)

Configure tes availabilities (jours, heures où tu es joignable)

Génère une API key (Settings > API Keys > "Full access" ou "Slots read")

3. Variables d’environnement (sécurité)
Dans .env.local à la racine du projet, mets :

ini
Copier
Modifier
CAL_COM_TOKEN=ta_clé_API_cal_live_xxx
Redémarre toujours le serveur Next.js après toute modification de .env.local.

4. Backend : route /api/calcom/slots
js
Copier
Modifier
// app/api/calcom/slots/route.js
export const runtime = 'nodejs'
import { NextResponse } from 'next/server'

export async function GET(req) {
  // ... voir code complet dans ce fichier ...
}
Ce que fait la route :

Lit le type de rendez-vous en query (type=appel, type=visio...)

Cherche l’ID Cal.com correspondant (2283473 etc.)

Interroge Cal.com REST /v1/slots pour la période demandée (range en jours, par défaut 14)

Transforme le format { slots: { 'YYYY-MM-DD': [ { time } ] } } en [ { date, hours: [...] } ]

Retourne le tout au frontend

Exemple d’appel :

pgsql
Copier
Modifier
GET /api/calcom/slots?type=appel&range=14
Réponse :

json
Copier
Modifier
[
  {
    "date": "2025-05-26",
    "hours": ["09:00","09:15","09:30","10:00"]
  },
  {
    "date": "2025-05-27",
    "hours": ["09:00","09:15","10:30"]
  }
]
5. Frontend : composant tunnel RDV
Fichier : /components/RDVTunnel.jsx

Au mount, fetch /api/calcom/slots?type=...

Affiche 3 à 4 dates aléatoires disponibles

À chaque date, propose 2 horaires

Si aucun créneau ne convient, bouton pour passer à la semaine suivante, puis formulaire libre si aucun créneau jamais trouvé

6. Fallback : formulaire manuel
Fichier : /components/CustomDisponibilityForm.jsx

Si l’utilisateur ne trouve aucun créneau parmi ceux proposés, il accède à un formulaire où il peut suggérer ses propres disponibilités.

7. Intégration globale
Fichier : /app/prendre-rendez-vous/PrendreRDVContent.jsx

Monte le tunnel si pas encore de créneau choisi

Passe au composant de contact/confirmation quand créneau sélectionné

Affiche le fallback formulaire manuel sinon

8. Dépannage courant
→ Rien n’est proposé côté frontend ?

Vérifie que tes Event Types ont bien des horaires définis côté Cal.com

Allonge la période recherchée (?range=21 par ex)

Regarde dans la console serveur si la log Réponse Cal.com slots: affiche bien des créneaux bruts

Vérifie le mapping EVENT_TYPE_ID dans ta route

→ Erreur 401 / 400 de Cal.com ?

Re-génère une clé API "Full access" sur Cal.com et remplace-la dans .env.local

Vérifie que tu passes le bon ID d’event

→ Je veux afficher les rendez-vous déjà pris ?

Utilise /v1/bookings de Cal.com pour récupérer la liste des bookings confirmés

9. Astuces & évolutions
Tu peux randomiser la sélection de dates ou d’horaires pour dynamiser l’UX (ex : slice 3 dates au hasard dans la réponse).

Pour forcer l’exécution Node (et voir tes logs serveur), ajoute tout en haut de la route :

js
Copier
Modifier
export const runtime = 'nodejs'
Pour debugger les créneaux côté backend, logue la réponse Cal.com :

js
Copier
Modifier
console.log('Réponse Cal.com slots:', JSON.stringify(json).slice(0, 500))
10. Exemples d’appel API (pour tests)
bash
Copier
Modifier
curl 'http://localhost:3000/api/calcom/slots?type=appel&range=14'
curl 'http://localhost:3000/api/calcom/slots?type=visio&range=7'
11. Liens utiles
Cal.com API docs

Dashboard Cal.com

Next.js API routes (App Router)

12. Résumé
Clé API et ID d’event à jour dans le code

Plages horaires bien définies dans Cal.com

Tunnel React fetch et affiche dynamiquement les créneaux

Fallback vers formulaire si aucun créneau ne convient

Logs côté backend pour debug en cas de problème

Pour toute évolution ou debug, consulte ce README !