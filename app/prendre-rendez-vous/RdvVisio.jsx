/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react
  
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react"; // Added useState
import { couleurs } from "@/styles/generated-colors.mjs";

export default function MyApp() {
  const [bookingStatus, setBookingStatus] = useState(''); // Added bookingStatus state

  // Define handleBookingSuccessful function
  async function handleBookingSuccessful(eventDetail) {
    console.log('Cal.com bookingSuccessfulV2 event data:', JSON.parse(JSON.stringify(eventDetail || {})));
    setBookingStatus('Processing...');
    // console.log("handleBookingSuccessful called with eventDetail:", eventDetail); // Original log

    try {
      const type = "visio"; // Changed type to "visio"
      const startTimeISO = eventDetail.startTime;
      const bookingDate = new Date(startTimeISO);
      const date = bookingDate.toISOString().split('T')[0];
      const time = bookingDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false });

      // Refined Email Extraction Logic
      let extractedEmail = '';
      if (eventDetail?.user?.email) {
        extractedEmail = eventDetail.user.email;
      } else if (eventDetail?.organizer?.email) {
        extractedEmail = eventDetail.organizer.email;
      } else if (eventDetail?.attendees?.[0]?.email) {
        extractedEmail = eventDetail.attendees[0].email;
      } else if (eventDetail?.email) {
        extractedEmail = eventDetail.email;
      } else if (typeof eventDetail?.responses?.email === 'string' && eventDetail.responses.email) {
        extractedEmail = eventDetail.responses.email;
      }

      if (!extractedEmail) {
        console.warn('Cal.com Handler: Could not extract a valid attendee email from the bookingSuccessfulV2 event data. Booking via backend might fail if email is required by Cal.com API.');
      }

      // Refined Phone Number Extraction Logic
      let extractedNumeroTelephone = '';
      if (eventDetail?.user?.phone) {
        extractedNumeroTelephone = String(eventDetail.user.phone);
      } else if (eventDetail?.organizer?.phone) {
        extractedNumeroTelephone = String(eventDetail.organizer.phone);
      } else if (eventDetail?.attendees?.[0]?.phone) {
        extractedNumeroTelephone = String(eventDetail.attendees[0].phone);
      } else if (eventDetail?.phone) {
        extractedNumeroTelephone = String(eventDetail.phone);
      } else if (typeof eventDetail?.responses?.phone === 'string' && eventDetail.responses.phone) {
        extractedNumeroTelephone = String(eventDetail.responses.phone);
      } else if (typeof eventDetail?.responses?.tel === 'string' && eventDetail.responses.tel) {
        extractedNumeroTelephone = String(eventDetail.responses.tel);
      }
      extractedNumeroTelephone = String(extractedNumeroTelephone || ''); // Ensure it's always a string

      // Refined Name Extraction (Nom, Prenom)
      let fullName = '';
      if (eventDetail?.user?.name) {
        fullName = eventDetail.user.name;
      } else if (eventDetail?.organizer?.name) {
        fullName = eventDetail.organizer.name;
      } else if (eventDetail?.attendees?.[0]?.name) {
        fullName = eventDetail.attendees[0].name;
      } else if (typeof eventDetail?.responses?.name === 'string' && eventDetail.responses.name) {
        fullName = eventDetail.responses.name;
      }

      let extractedNom = '';
      let extractedPrenom = '';
      if (fullName) {
        const nameParts = fullName.split(' ');
        extractedPrenom = nameParts.shift() || '';
        extractedNom = nameParts.join(' ') || '';
        if (!extractedNom && extractedPrenom) { // If only one name part, assign to Nom
          extractedNom = extractedPrenom;
          extractedPrenom = '';
        }
      }

      const calBookingUid = eventDetail?.uid || null;

      const payload = {
        type,
        date,
        time,
        Nom: extractedNom || '',
        Prenom: extractedPrenom || '',
        Email: extractedEmail || '',
        NumeroTelephone: extractedNumeroTelephone || '',
        calBookingUid: calBookingUid
      };

      console.log("Payload for /api/rdv-confirm:", payload);

      const response = await fetch('/api/rdv-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Booking confirmed with backend:', responseData);
        setBookingStatus('Confirmed!');
      } else {
        const errorText = await response.text();
        console.error('Backend confirmation failed:', response.status, errorText);
        setBookingStatus(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error in handleBookingSuccessful:', error);
      setBookingStatus('Network error or other issue.');
    }
  }

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"visio"});

      // Register the event listener for successful bookings
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: (e) => {
          console.log("Cal.com bookingSuccessfulV2 event (visio):", e.detail);
          if (e.detail && e.detail.data) {
            handleBookingSuccessful(e.detail.data);
          } else {
            console.error("bookingSuccessfulV2 event (visio) did not contain e.detail.data", e);
          }
        }
      });

      cal("ui", {
        cssVarsPerTheme:{
            light:{
                "cal-brand":couleurs.ivoire
            },
            dark:{
                "cal-brand":couleurs.acier}
        },
        hideEventTypeDetails:false,
        layout:"month_view"
    });
    })();
  }, [])
  return <Cal namespace="visio"
    calLink="alforis/visio"
    style={{width:"100%",height:"100%",overflow:"scroll"}}
    config={{"layout":"month_view"}}
    
    
  />;
};
  