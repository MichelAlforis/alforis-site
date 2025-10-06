import { NextResponse } from 'next/server'
import { saveRDV_B2B } from '@/lib/airtable/saveRDV_B2B'
import { notifyAdminB2B, sendClientMailB2B } from '@/lib/airtable/EmailServiceRDV_B2B'

export const runtime = 'nodejs'

function normalizeType(t) {
  const x = (t || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
  if (x.includes('part')) return 'partenariat'
  if (x.includes('decou')) return 'decouverte'
  return 'info'
}

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      type,
      date,
      heure,
      nom,
      prenom,
      email,
      telephone,
      entreprise,
      fonction,
      calbookingid
    } = body || {}

    // Validation
    if (!type || !date || !heure || !nom || !email) {
      return NextResponse.json(
        { success: false, error: 'Champs obligatoires manquants' },
        { status: 400 }
      )
    }

    // Normalisation de la date au format ISO YYYY-MM-DD
    const dateISO = new Date(date).toISOString().split('T')[0]

    // Sauvegarde Airtable
    const record = await saveRDV_B2B({
      nom,
      prenom: prenom || '',
      telephone: telephone || '',
      email,
      entreprise: entreprise || '',
      fonction: fonction || '',
      type: normalizeType(type),
      date: dateISO,
      heure,
      calbookingid: calbookingid || null
    })

    // Envoi des emails (non-bloquant)
    const mailPayload = {
      nom,
      prenom,
      email,
      telephone,
      entreprise,
      fonction,
      type: normalizeType(type),
      date: dateISO,
      heure
    }

    Promise.all([
      notifyAdminB2B(mailPayload),
      sendClientMailB2B(mailPayload)
    ]).catch(err => console.error('Erreur envoi emails:', err))

    return NextResponse.json({
      success: true,
      recordId: record?.id || null,
      message: 'RDV enregistré avec succès'
    })

  } catch (err) {
    console.error('❌ Erreur API RDV B2B:', err)
    return NextResponse.json(
      { 
        success: false, 
        error: err.message || 'Erreur lors de l\'enregistrement'
      },
      { status: 500 }
    )
  }
}