import { NextResponse } from 'next/server'

export async function GET(req) {
  console.log('🔑 CAL_COM_TOKEN =', process.env.CAL_COM_TOKEN)
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    // IDs Cal.com récupérés via /v1/event-types
    const EVENT_TYPE_ID = {
      appel: '2283473',           // Appel téléphonique
      visio: '2283484',           // Visio
      patrimonial: '2283489'      // RDV Patrimonial
    }[type]

    if (!EVENT_TYPE_ID) {
      return NextResponse.json({ error: 'Type invalide' }, { status: 400 })
    }

    // Période : semaine courante
    const now = new Date()
    const startTime = now.toISOString()
    const endTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()

    // Endpoint REST v1 de Cal.com pour récupérer les créneaux
    const url = new URL('https://api.cal.com/v1/slots')
    url.searchParams.set('apiKey', process.env.CAL_COM_TOKEN)
    url.searchParams.set('eventTypeId', EVENT_TYPE_ID)
    url.searchParams.set('startTime', startTime)
    url.searchParams.set('endTime', endTime)
    url.searchParams.set('timeZone', 'Europe/Paris')

    const res = await fetch(url.toString(), { method: 'GET' })
    if (!res.ok) {
      throw new Error(`Cal.com HTTP ${res.status}`)
    }
    const json = await res.json()
    // Support both array response and object with slots key
    const data = Array.isArray(json)
      ? json
      : (Array.isArray(json.slots) ? json.slots : [])

    // Regroupe par date pour ton tunnel
    const slotsByDate = {}
    data.forEach(slot => {
      // slot.dateTime ou slot.datetime selon clé renvoyée
      const dateTime = slot.dateTime || slot.datetime || ''
      const d = dateTime.slice(0, 10)  // YYYY-MM-DD
      const t = dateTime.slice(11, 16) // HH:MM
      slotsByDate[d] = slotsByDate[d] || []
      if (!slotsByDate[d].includes(t)) slotsByDate[d].push(t)
    })
    const result = Object.entries(slotsByDate).map(([date, hours]) => ({ date, hours }))
    return NextResponse.json(result)
  } catch (err) {
    console.error('Erreur slots/route:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}