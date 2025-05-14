// utils/sanitizeFormData.js

export function sanitizeFormData(data) {
    const sanitized = { ...data }
  
    const fieldsToSanitize = [
      'age',
      'patrimoineActuel',
      'revenusAnnuels',
      'risquePercu'
    ]
  
    fieldsToSanitize.forEach((field) => {
      if (sanitized[field] === '') {
        sanitized[field] = null
      }
    })
  
    return sanitized
  }
  
  // utils/filterFormData.js

export function filterFormData(data) {
  const allowedFields = [
    'nom',
    'email',
    'age',
    'phraseLibre',
    'patrimoineActuel',
    'situationActuelle',
    'revenusAnnuels',
    'risquePercu',
    'NomDuFormulaire',
    'q1',
    'q2',
    'q3',
    'q4',
    'q5',
    'q6',
    'q7',
    'q8',
    'q9',
    'NumeroTelephone',
    'rgpd',
    'marketingOk',
    'profil'
  ]

  const filtered = {}

  allowedFields.forEach((key) => {
    if (key in data) {
      filtered[key] = data[key]
    }
  })

  return filtered
}
