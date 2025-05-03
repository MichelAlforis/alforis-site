// utils/validerDonnees.js

export function validerDonnees(data) {
    const erreurs = []
  
    const isText = (val) => typeof val === 'string' && val.trim() !== ''
    const isLongText = (val) => typeof val === 'string'
    const isEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    const isNumber = (val) => typeof val === 'number' && !isNaN(val)
    const isCheckbox = (val) => typeof val === 'boolean'
    const isPhone = (val) => /^\+?[0-9\s-]{7,20}$/.test(val)
    const situationOptions = ["Célibataire", "Marié", "Divorcé", "Veuf"]
  
    if (!isText(data.Nom)) erreurs.push('Champ "Nom" invalide')
    if (!isEmail(data.Email)) erreurs.push('Champ "Email" invalide')
    if (!isNumber(data.Age)) erreurs.push('Champ "Age" invalide')
    if (!isCheckbox(data.RGPD)) erreurs.push('Champ "RGPD" invalide')
    if (!isText(data.Profil)) erreurs.push('Champ "Profil" invalide')
    if (!isLongText(data.PhraseLibre)) erreurs.push('Champ "PhraseLibre" invalide')
    if (!isNumber(data.PatrimoineActuel)) erreurs.push('Champ "PatrimoineActuel" invalide')
    if (!situationOptions.includes(data.SituationActuelle)) erreurs.push('Champ "SituationActuelle" invalide')
    if (!isCheckbox(data.ObjectifVie)) erreurs.push('Champ "ObjectifVie" invalide')
    if (!isNumber(data.RevenusAnnuels)) erreurs.push('Champ "RevenusAnnuels" invalide')
    if (!isLongText(data.RisquePercu)) erreurs.push('Champ "RisquePercu" invalide')
  
    for (let i = 1; i <= 9; i++) {
      if (!isLongText(data[`Q${i}`])) erreurs.push(`Champ "Q${i}" invalide`)
    }
  
    if (!isPhone(data.NumeroTelephone)) erreurs.push('Champ "NumeroTelephone" invalide')
  
    return erreurs
  }