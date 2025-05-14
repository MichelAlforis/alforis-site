  import Airtable from 'airtable'

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
  
  export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' })
    }
  
    const data = req.body
  
    const format = {
      fields: {
        Nom: data.nom || '',
        Email: data.email || '',
        Age: Number(data.age) || 0,
        RGPD: data.rgpd === true,
        Profil: data.profil || '',
        PhraseLibre: data.phraseLibre || '',
        PatrimoineActuel: Number(data.patrimoineActuel) || 0,
        SituationActuelle: ['Célibataire', 'Marié', 'Divorcé', 'En union libre'].includes(data.situationActuelle)
          ? data.situationActuelle
          : undefined, // Ne pas envoyer si valeur invalide
        ObjectifVie: data.objectifVie === true,
        RevenusAnnuels: Number(data.revenusAnnuels) || 0,
        RisquePercu: ['1', '2', '3', '4', '5'].includes(data.risquePercu) ? data.risquePercu : undefined,
        NumeroTelephone: data.numeroTelephone || '',
        Q1: data.reponses?.[0] || '',
        Q2: data.reponses?.[1] || '',
        Q3: data.reponses?.[2] || '',
        Q4: data.reponses?.[3] || '',
        Q5: data.reponses?.[4] || '',
        Q6: data.reponses?.[5] || '',
        Q7: data.reponses?.[6] || '',
        Q8: data.reponses?.[7] || '',
        Q9: data.reponses?.[8] || '',
      }
    }
    
    try {

      const record = await base('Reponse').create([format]).then(res => res[0])
      res.status(200).json({ success: true, id: record.id })
  
    } catch (error) {
      console.error("❌ Erreur Airtable :", error)
      res.status(500).json({ error: error.message })
    }
  }
  