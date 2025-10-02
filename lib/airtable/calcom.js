// lib/calcom.js
const API_BASE = 'https://api.cal.com/v1'

/**
 * Obtient la clé API depuis l'environnement et vérifie sa présence.
 * Supporte CALCOM_API_KEY, CAL_COM_TOKEN ou CAL_API_KEY.
 * @returns {string} La clé API Cal.com
 */
function getApiKey() {
  // Priorité : CALCOM_API_KEY > CAL_COM_TOKEN > CAL_API_KEY
  const key = process.env.CAL_COM_TOKEN || process.env.CAL_API_KEY
  console.log('Cal.com API key used:', key && key.substring(0, 8) + '…')
  if (!key) {
    throw new Error('Missing CAL_COM_TOKEN, or CAL_API_KEY')
  }
  return key
}

/**
 * Récupère la disponibilité des créneaux pour un eventType donné.
 * @param {{ eventTypeId: string, start: string, end: string, timeZone: string }} params
 * @returns {Promise<Response>} Response brute, à parser dans l'API route.
 */
export async function getAvailability({ eventTypeId, start, end, timeZone }) {
  const apiKey = getApiKey()
  const url = new URL(`${API_BASE}/availability`)
  url.searchParams.set('eventTypeId', eventTypeId)
  url.searchParams.set('start', start)
  url.searchParams.set('end', end)
  url.searchParams.set('timeZone', timeZone)

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  if (!res.ok) {
    const text = await res.text()
    console.error(`Cal.com availability error ${res.status}:`, text)
    throw new Error(`Cal.com availability error: ${res.status} – ${text}`)
  }
  return res
}

/**
 * Crée une réservation Cal.com
 * @param {{ eventTypeId: string, start: string, invitee: { name: string, email: string, phone?: string }, timeZone: string }} params
 * @returns {Promise<Response>} Response brute, à gérer (409, 200...) par la route.
 */
export async function createCalBooking({ eventTypeId, start, invitee, timeZone }) {
  const apiKey = getApiKey()
  const payload = { eventTypeId, start, invitee, timeZone }
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  })

  if (res.status === 401) {
    console.error('Unauthorized booking request:', payload)
    throw new Error('Unauthorized: invalid Cal.com API key')
  }

  return res
}
