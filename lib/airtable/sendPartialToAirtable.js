import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_CRM_API_KEY }).base(process.env.AIRTABLE_CRM_BASE_ID)
const tableName = process.env.AIRTABLE_CRM_TABLE_NAME

export async function sendPartialToAirtable(data) {
  const created = await base(tableName).create([{ fields: data }])
  return created[0].id
}
