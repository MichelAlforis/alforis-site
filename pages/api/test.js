export default function handler(req, res) {
    res.status(200).json({ key: process.env.AIRTABLE_API_KEY ?? 'MISSING' });
  }
  