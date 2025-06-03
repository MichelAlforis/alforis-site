// app/api/rdv-confirm/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { saveRDV } from '../../../lib/airtable/saveRDV.js';
import { notifyAdminRDV, sendClientMailRDV } from '../../../lib/airtable/EmailServiceRDV.js';

export async function POST(req) {
  let data;
  try {
    data = await req.json();

    // Vérification des champs obligatoires envoyés par Cal.com
    const missingFields = [];
    if (!data.type)          missingFields.push('type');
    if (!data.date)          missingFields.push('date');
    if (!data.time)          missingFields.push('time');
    if (!data.calBookingUid) missingFields.push('calBookingUid');
    if (!data.startTimeISO)  missingFields.push('startTimeISO');

    if (missingFields.length > 0) {
      console.error('❌ Champs obligatoires manquants :', missingFields);
      return NextResponse.json(
        { error: `Champs manquants : ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
  } catch (e) {
    console.error('❌ JSON invalide :', e);
    return NextResponse.json({ error: 'Payload JSON invalide' }, { status: 400 });
  }

  // On construit la chaîne « RDV » telle que définie dans votre table Airtable
  const rdvString = `${data.type} - ${data.date} ${data.time}`;

  // Ne renseigne que les deux colonnes existantes : RDV et CALBOOKINGID
  const fieldsForAirtable = {
    RDV:           rdvString,
    CALBOOKINGID:  data.calBookingUid
  };

  // Enregistrement dans Airtable
  try {
    await saveRDV(fieldsForAirtable);
  } catch (airtableError) {
    console.error('❌ Erreur lors de la sauvegarde dans Airtable :', airtableError);
    // Si vous voulez que l’échec d’Airtable renvoie une 500, décommentez la ligne suivante :
    // return NextResponse.json({ success: false, error: 'Échec de la sauvegarde Airtable.' }, { status: 500 });
  }

  // Envoi des emails (admin + client), même si aucun PII n’est dans la table
  try {
    await notifyAdminRDV({ fields: data });
  } catch (adminEmailError) {
    console.error('❌ Erreur lors de l’envoi de la notification admin :', adminEmailError);
  }

  try {
    await sendClientMailRDV({ fields: data });
  } catch (clientEmailError) {
    console.error('❌ Erreur lors de l’envoi de l’email client :', clientEmailError);
  }

  // Réponse au frontend
  return NextResponse.json({
    success: true,
    message: 'Données de rendez-vous reçues et traitées.'
  });
}
