import Airtable from 'airtable'

// Config Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const tableName = process.env.AIRTABLE_TABLE_NAME || 'Parcours' // Fallback de sécurité

/**
 * Crée ou récupère un enregistrement partiel dans Airtable selon l'email.
 * @param {Object} data - Les champs à enregistrer (doit contenir Email).
 * @returns {Promise<string>} L'id de l'enregistrement créé ou existant.
 */
export async function sendPartialToAirtable(data) {
  if (!data?.Email) throw new Error('Email requis pour le traitement Airtable.')

  // Recherche un enregistrement existant avec le même email
  const existing = await base(tableName)
    .select({
      filterByFormula: `{Email} = '${data.Email}'`,
      maxRecords: 1,
    })
    .firstPage()

  if (existing.length > 0) {
    return existing[0].id
  }

  // Crée le nouvel enregistrement si non trouvé
  const [created] = await base(tableName).create([{ fields: data }])
  return created.id
}
