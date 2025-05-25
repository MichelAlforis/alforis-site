import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)

export async function saveRDV({ nom, prenom, telephone, email, rdv }) {
  return new Promise((resolve, reject) => {
    base('RDV').create(
      {
        "NOM": nom,
        "PRENOM": prenom,
        "TELEPHONE": telephone,
        "EMAIL": email,
        "RDV": rdv,
      },
      (err, record) => {
        if (err) return reject(err)
        resolve(record.getId())
      }
    )
  })
}
