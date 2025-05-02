import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)

export async function sendPartialToAirtable(fields) {
  try {
    const createdRecord = await base(process.env.AIRTABLE_TABLE_NAME).create([
      {
        fields: {
          Nom: fields?.nom || '',
          Email: fields?.email || '',
          NumeroTelephone: fields?.NumeroTelephone || '',
          Age: Number(fields?.age || 0),
          RGPD: !!fields?.rgpd,
          Profil: fields?.profil || '',
          NomDuFormulaire: fields?.NomDuFormulaire || 'Parcours inconnu',
          Q1: fields?.q1 || '',
          Q2: fields?.q2 || '',
          Q3: fields?.q3 || '',
          Q4: fields?.q4 || '',
          Q5: fields?.q5 || '',
          Q6: fields?.q6 || '',
          Q7: fields?.q7 || '',
          Q8: fields?.q8 || '',
          Q9: fields?.q9 || '',
          Q10: fields?.q10 || ''
        }
      }
    ])
    return createdRecord[0].id
  } catch (error) {
    console.error('Erreur Airtable Phase 1 :', error)
    throw error
  }
}

export async function updateRecordInAirtable(recordId, fields) {
  try {
    await base(process.env.AIRTABLE_TABLE_NAME).update([{
      id: recordId,
      fields: {
        Nom: fields?.nom || '',
        Email: fields?.email || '',
        NumeroTelephone: fields?.NumeroTelephone || '',
        Age: Number(fields?.age || 0),
        RGPD: !!fields?.rgpd,
        RevenusAnnuels: Number(fields?.revenusAnnuels || 0),
        RisquePercu: fields?.risquePercu || '',
        NomDuFormulaire: fields?.NomDuFormulaire || 'Parcours inconnu',
        Profil: fields?.profil || '',
        Q1: fields?.q1 || '',
        Q2: fields?.q2 || '',
        Q3: fields?.q3 || '',
        Q4: fields?.q4 || '',
        Q5: fields?.q5 || '',
        Q6: fields?.q6 || '',
        Q7: fields?.q7 || '',
        Q8: fields?.q8 || '',
        Q9: fields?.q9 || '',
        Q10: fields?.q10 || ''
      }
    }])

    return true
    
  } catch (error) {
    console.error('Erreur Airtable Phase 2 :', error)
    throw error
  }
}
