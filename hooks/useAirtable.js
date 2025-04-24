// src/hooks/useAirtable.js
'use client'
import { useCallback } from "react"

export default function useAirtable() {
  const envoyerVersAirtable = useCallback(async ({ nom, email, message, answers, textAnswer, profile }) => {
    const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY
    const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID
    const tableName = "Profil"

    const fields = {
      "Nom": nom,
      "Email": email,
      "Objectif de vie": textAnswer || "",
      "Situation actuelle": answers[0] || "",
      "Risques perçus": answers[8] || "",
      "Alignement perso": answers.includes("Aligné(e)") || profile === "Le Stratège Libre",
      "Profil détecté": profile || "",
    }

    // Ajouter chaque réponse comme ligne distincte si souhaité dans Airtable
    answers.forEach((rep, idx) => {
      fields[`Q${idx + 1}`] = rep
    })

    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fields })
    })

    if (!response.ok) {
      console.error("Erreur Airtable:", await response.text())
    } else {
      console.log("✅ Données envoyées à Airtable")
    }
  }, [])

  return { envoyerVersAirtable }
}
