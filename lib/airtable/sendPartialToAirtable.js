import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const tableName = process.env.AIRTABLE_TABLE_NAME

export async function sendPartialToAirtable(data) {
  const created = await base(tableName).create([{ fields: data }])
  return created[0].id
}
