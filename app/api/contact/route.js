// app/api/contact/route.js
export async function POST(req) {
  try {
    const data = await req.formData()
    // Exemple: tu récupères les champs
    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')
    // Ici tu traites (envoi email, stocke, etc.)

    // Réponse succès
    return Response.json({ success: true })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
