// components/parcours/ValidationDonnees.jsx

/**
 * Déclaration centralisée des règles de validation.
 * Pour chaque champ :
 *  - validate : fonction qui renvoie true si la valeur est valide
 *  - message  : message d'erreur associé
 *  - required : champ obligatoire à l'étape 1 ou 2
 */
const fieldConfig = {
  Nom: {
    validate: v => typeof v === 'string' && v.trim() !== '',
    message: 'Veuillez indiquer votre nom.',
    requiredOn: ['step1'],
  },
  Email: {
    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message: 'Veuillez saisir un e-mail valide.',
    requiredOn: ['step1'],
  },
  Age: {
    validate: v => {
      const n = Number(v);
      return !isNaN(n) && n >= 18;
    },
    message: 'Vous devez avoir au moins 18 ans.',
    requiredOn: ['step1'],
  },
  RGPD: {
    validate: v => v === true,
    message: 'Vous devez accepter la politique RGPD.',
    requiredOn: ['step1'],
  },
  SituationActuelle: {
    validate: v => ['Célibataire','Marié(e)','Divorcé(e)','Veuf(ve)'].includes(v),
    message: 'Veuillez sélectionner votre situation.',
    requiredOn: ['step2'],
  },
  NumeroTelephone: {
    validate: v => /^\+?[0-9\s-]{7,20}$/.test(v),
    message: 'Veuillez saisir un téléphone valide.',
    requiredOn: ['step2'],
  },
  // Les champs facultatifs / libres
  PhraseLibre: {
    validate: v => typeof v === 'string',
    message: 'Champ libre invalide.',
  },
  PatrimoineActuel: {
    validate: v => v === '' || !isNaN(Number(v)),
    message: 'Valeur patrimoine invalide.',
  },
  RevenusAnnuels: {
    validate: v => v === '' || !isNaN(Number(v)),
    message: 'Valeur revenus invalide.',
  },
  RisquePercu: {
    validate: v => typeof v === 'string',
    message: 'Valeur de risque invalide.',
  },
  // Q1 → Q9
  ...Object.fromEntries(
    Array.from({ length: 9 }, (_, i) => {
      const key = `Q${i + 1}`;
      return [key, {
        validate: v => typeof v === 'string',
        message: `Réponse à la question ${i+1} invalide.`
      }];
    })
  ),
};

/**
 * validerDonnees(data, step)
 *  - data : objet formData
 *  - step : 'step1' ou 'step2'
 * Retourne un objet { champ: message } vide si tout est OK.
 */
export function validerDonnees(data, step) {
  const errors = {};
  for (const [field, cfg] of Object.entries(fieldConfig)) {
    const isRequired = Array.isArray(cfg.requiredOn) && cfg.requiredOn.includes(step);
    const value = data[field];
    // Si requis ET invalide → on ajoute l'erreur
    if (isRequired && !cfg.validate(value)) {
      errors[field] = cfg.message;
    }
  }
  return errors;
}

/**
 * sanitizeFormData(data)
 *  - Trim des chaînes
 *  - Numérisation des champs numériques
 *  - Conversion des '' en null pour Airtable
 */
export function sanitizeFormData(data) {
  const out = {};
  for (const [key, value] of Object.entries(data)) {
    let v = value;
    if (typeof v === 'string') {
      v = v.trim();
      if (v === '') v = null;
    }
    if (['Age','PatrimoineActuel','RevenusAnnuels'].includes(key) && v != null) {
      v = Number(v);
      if (isNaN(v)) v = null;
    }
    out[key] = v;
  }
  return out;
}

/**
 * filterFormData(data)
 *  - Retire les champs null / undefined
 */
export function filterFormData(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => v != null)
  );
}
