import { NextResponse } from 'next/server'

export const runtime = 'nodejs' // pas d'Edge pour cet appel

export async function GET() {
  try {
    const baseId = process.env.AIRTABLE_B2B_BASE_ID
    const tableName = process.env.AIRTABLE_B2B_TABLE_NAME
    const token = process.env.AIRTABLE_B2B_API_KEY // => PAT avec schema.bases:read + accès à la base

    const url = `https://api.airtable.com/v0/meta/bases/${baseId}/tables`
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      const txt = await res.text()
      return NextResponse.json(
        { success: false, step: 'meta_fetch', error: txt },
        { status: res.status }
      )
    }

    const meta = await res.json()
    const table = meta.tables.find(t => t.name === tableName || t.id === tableName)
    const fields = table ? table.fields.map(f => f.name) : []

    return NextResponse.json({
      success: true,
      table: table?.name ?? tableName,
      fields,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, step: 'exception', error: String(error) },
      { status: 500 }
    )
  }
}
