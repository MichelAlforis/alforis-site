// lib/airtable/saveRDV.js

import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_RDV_API_KEY })
  .base(process.env.AIRTABLE_RDV_BASE_ID)

const tableName = process.env.AIRTABLE_RDV_TABLE_NAME || 'RDV'  // ou votre table

/**
 * Enregistre un nouveau RDV dans Airtable.
 * @param {{ nom:string, prenom:string, telephone:string, email:string, rdv:string, calbookingid?:string }} params
 */
export function saveRDV({ nom, prenom, telephone, email, rdv, calbookingid }) {
  return new Promise((resolve, reject) => {
    base(tableName).create(
      [
        {
          fields: {
            NOM:           nom,
            PRENOM:        prenom,
            TELEPHONE:     telephone,
            EMAIL:         email,
            RDV:           rdv,
            CALBOOKINGID:  calbookingid || null    // ← on récupère bien calbookingid
          }
        }
      ],
      (err, records) => {
        if (err) return reject(err)
        resolve(records[0])
      }
    )
  })
}
