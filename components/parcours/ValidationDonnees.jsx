// components/parcours/ValidationDonnees.jsx

/**
 * Valide les données du formulaire.
 * Retourne un tableau d’erreurs, vide si tout est valide.
 */
export function validerDonnees(data) {
  const erreurs = []

  const isText = (val) => typeof val === 'string' && val.trim() !== ''
  const isLongText = (val) => typeof val === 'string'
  const isEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  const isNumber = (val) => typeof val === 'number' && !isNaN(val)
  const isCheckbox = (val) => typeof val === 'boolean'
  const isPhone = (val) => /^\+?[0-9\s-]{7,20}$/.test(val)
  const situationOptions = ["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)"]

  if (!isText(data.Nom)) erreurs.push('Champ "Nom" invalide')
  if (!isEmail(data.Email)) erreurs.push('Champ "Email" invalide')
  if (!isNumber(data.Age)) erreurs.push('Champ "Age" invalide')
  if (!isCheckbox(data.RGPD)) erreurs.push('Champ "RGPD" invalide')
  if (!isLongText(data.PhraseLibre)) erreurs.push('Champ "PhraseLibre" invalide')
  if (!isNumber(data.PatrimoineActuel) && data.PatrimoineActuel !== '') erreurs.push('Champ "PatrimoineActuel" invalide')
  if (!situationOptions.includes(data.SituationActuelle)) erreurs.push('Champ "SituationActuelle" invalide')
  if (!isCheckbox(data.ObjectifVie)) erreurs.push('Champ "ObjectifVie" invalide')
  if (!isNumber(data.RevenusAnnuels) && data.RevenusAnnuels !== '') erreurs.push('Champ "RevenusAnnuels" invalide')
  if (!isLongText(data.RisquePercu) && data.RisquePercu !== '') erreurs.push('Champ "RisquePercu" invalide')
  if (!isPhone(data.NumeroTelephone)) erreurs.push('Champ "NumeroTelephone" invalide')

  for (let i = 1; i <= 9; i++) {
    if (!isLongText(data[`Q${i}`])) erreurs.push(`Champ "Q${i}" invalide`)
  }

  return erreurs
}

/**
 * Nettoie les valeurs de formData : trim des chaînes de caractères
 * et conversion de certains champs si nécessaire.
 */
export function sanitizeFormData(data) {
  const sanitized = {}
  for (const [key, value] of Object.entries(data)) {
    sanitized[key] = typeof value === 'string' ? value.trim() : value
  }
  return sanitized
}

/**
 * Filtre les champs pour ne conserver que ceux utiles à la mise à jour Airtable.
 * Retire les champs vides, null, undefined.
 */
export function filterFormData(data) {
  const filtered = {}
  for (const [key, value] of Object.entries(data)) {
    // On exclut les valeurs vides ou non définies
    if (value === '' || value == null) continue
    filtered[key] = value
  }
  return filtered
}
