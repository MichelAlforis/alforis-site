import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req) {
  const { date, time, email } = await req.json()
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'no-reply@alforis.fr',
    to: 'michel.marques@alforis.fr',
    subject: `⛔️ Demande d'annulation de RDV`,
    html: `<p>Le client <b>${email}</b> demande l'annulation du RDV du ${date} à ${time}.</p>`
  })
  return NextResponse.json({ ok: true })
}
