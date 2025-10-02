// app/api/calcom/slots/route.js
export const runtime = 'nodejs'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const range = parseInt(searchParams.get('range') || '14', 10)
    const EVENT_TYPE_ID = {
      appel: '2283473',
      visio: '2283484',
      patrimonial: '2283489'
    }[type]
    if (!EVENT_TYPE_ID) {
      return NextResponse.json({ error: 'Type invalide' }, { status: 400 })
    }

    const now = new Date()
    const startTime = now.toISOString()
    const endTime = new Date(now.getTime() + range * 24 * 60 * 60 * 1000).toISOString()
    const url = new URL('https://api.cal.com/v1/slots')
    url.searchParams.set('apiKey', process.env.CAL_COM_TOKEN)
    url.searchParams.set('eventTypeId', EVENT_TYPE_ID)
    url.searchParams.set('startTime', startTime)
    url.searchParams.set('endTime', endTime)
    url.searchParams.set('timeZone', 'Europe/Paris')

    const res = await fetch(url.toString(), { method: 'GET' })
    const json = await res.json()

    // Reformate la structure reçue pour ton front
    const slotsByDate = {}
    if (json.slots && typeof json.slots === 'object') {
      Object.entries(json.slots).forEach(([date, slotArr]) => {
        slotsByDate[date] = slotArr.map(s => {
          // On veut l'heure en HH:MM
          const d = s.time || s.dateTime || s.datetime || ''
          return d.slice(11, 16)
        }).filter(Boolean)
      })
    }

    // Retourne pour RDVTunnel.jsx : [{ date, hours }]
    const result = Object.entries(slotsByDate)
      .map(([date, hours]) => ({ date, hours }))

    return NextResponse.json(result)
  } catch (err) {
    console.error('Erreur slots/route:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
