export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' })
  }

  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = "Profil"

  if (!apiKey || !baseId) {
    return res.status(500).json({ message: 'Clé API ou ID de base manquant' })
  }

  const data = req.body

  const format = {
    fields: {
      Nom: data.nom || "",
      Email: data.email || "",
      Âge: data.age || "",
      RGPD: data.rgpd ? "Oui" : "Non",
      Profil: data.profil || "",
      PhraseLibre: data.phraseLibre || "",
      ...data.reponses?.reduce((acc, rep, i) => {
        acc[`Q${i + 1}`] = rep
        return acc
      }, {})
    },
  }

  try {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: [format] }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      return res.status(500).json({ message: 'Erreur Airtable', details: errorBody })
    }

    const json = await response.json()
    return res.status(200).json(json)
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}
  