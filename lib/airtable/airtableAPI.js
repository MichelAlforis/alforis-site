import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_CRM_API_KEY })
  .base(process.env.AIRTABLE_CRM_BASE_ID)

const tableName = process.env.AIRTABLE_CRM_TABLE_NAME || 'Parcours' // fallback de sécurité

// PHASE 1 : Création partielle
export async function sendPartialToAirtable(fields) {
  try {
    const [created] = await base(tableName).create([
      {
        fields: {
          Nom: fields.Nom || '',
          Email: fields.Email || '',
          NumeroTelephone: fields.NumeroTelephone || '',
          Age: Number(fields.Age) || 0,
          RGPD: !!fields.RGPD,
          Profil: fields.Profil || '',
          NomDuFormulaire: fields.NomDuFormulaire || 'Parcours inconnu',
          Q1: fields.Q1 || '',
          Q2: fields.Q2 || '',
          Q3: fields.Q3 || '',
          Q4: fields.Q4 || '',
          Q5: fields.Q5 || '',
          Q6: fields.Q6 || '',
          Q7: fields.Q7 || '',
          Q8: fields.Q8 || '',
          Q9: fields.Q9 || '',
          Q10: fields.Q10 || '',         // Si tu utilises Q10, sinon PhraseLibre
          PhraseLibre: fields.PhraseLibre || '',
        }
      }
    ])
    return created.id
  } catch (error) {
    console.error('❌ Erreur Airtable Phase 1 (sendPartialToAirtable) :', error)
    throw error
  }
}

// PHASE 2 : Mise à jour complète
export async function updateRecordInAirtable(recordId, fields) {
  try {
    await base(tableName).update([
      {
        id: recordId,
        fields: {
          Nom: fields.Nom || '',
          Email: fields.Email || '',
          NumeroTelephone: fields.NumeroTelephone || '',
          Age: Number(fields.Age) || 0,
          RGPD: !!fields.RGPD,
          RevenusAnnuels: Number(fields.RevenusAnnuels) || 0,
          RisquePercu: fields.RisquePercu || '',
          NomDuFormulaire: fields.NomDuFormulaire || fields.NomDuFormulaire || 'Parcours inconnu',
          SituationActuelle: fields.SituationActuelle || '',
          PatrimoineActuel: Number(fields.PatrimoineActuel) || 0,
          Profil: fields.Profil || '',
          Q1: fields.Q1 || '',
          Q2: fields.Q2 || '',
          Q3: fields.Q3 || '',
          Q4: fields.Q4 || '',
          Q5: fields.Q5 || '',
          Q6: fields.Q6 || '',
          Q7: fields.Q7 || '',
          Q8: fields.Q8 || '',
          Q9: fields.Q9 || '',
          Q10: fields.Q10 || '',
          PhraseLibre: fields.PhraseLibre || '',
        }
      }
    ])
    return true
  } catch (error) {
    console.error('❌ Erreur Airtable Phase 2 (updateRecordInAirtable) :', error)
    throw error
  }
}
