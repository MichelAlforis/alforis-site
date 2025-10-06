import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_B2B_API_KEY })
  .base(process.env.AIRTABLE_B2B_BASE_ID)

const tableName = process.env.AIRTABLE_B2B_TABLE_NAME || 'RDV_B2B'

const VALID_TYPES = ['partenariat', 'decouverte', 'info']

export function saveRDV_B2B({
  nom,
  prenom,
  telephone,
  email,
  entreprise,
  fonction,
  type,
  date,
  heure,
  calbookingid
}) {
  return new Promise((resolve, reject) => {
    // Validation du type
    if (!VALID_TYPES.includes(type)) {
      return reject(new Error(`Type invalide: ${type}. Valeurs acceptées: ${VALID_TYPES.join(', ')}`))
    }

    const fields = {
      NOM: nom || '',
      PRENOM: prenom || '',
      TELEPHONE: telephone || '',
      EMAIL: email,
      ENTREPRISE: entreprise || '',
      FONCTION: fonction || '',
      TYPE_RDV: type,
      DATE: date,
      HEURE: heure,
      STATUT: 'demandé',
      CALBOOKINGID: calbookingid || ''
    }

    base(tableName).create(
      [{ fields }],
      (err, records) => {
        if (err) {
          console.error('❌ Erreur Airtable B2B:', err)
          return reject(err)
        }
        console.log('✅ RDV B2B créé:', records[0].id)
        resolve(records[0])
      }
    )
  })
}