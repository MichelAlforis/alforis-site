// Premièrement, installez bien le package si ce n’est pas déjà fait :
// npm install @calcom/embed-react
// ou
// yarn add @calcom/embed-react

import Cal from "@calcom/embed-react";
import { useState } from "react";
import { couleurs } from "@/styles/generated-colors.mjs";

export default function MyApp() {
  const [bookingStatus, setBookingStatus] = useState("");

  /**
   * Cette fonction est appelée quand Cal.com émet l’événement `bookingSuccessfulV2`.
   * Elle reçoit directement l’objet `data` (et non pas `e.detail.data`).
   */
  async function handleBookingSuccessful(data) {
    console.log(
      "Cal.com bookingSuccessfulV2 event data (raw) :",
      JSON.parse(JSON.stringify(data || {}))
    );
    setBookingStatus("Processing…");

    try {
      // 1. On détermine le type fixe (vous aviez mis "patrimonial")
      const type = "patrimonial";

      // 2. On récupère startTime (ISO string) pour calculer la date et l’heure
      const startTimeISO = data.startTime;
      const bookingDate = new Date(startTimeISO);
      const date = bookingDate.toISOString().split("T")[0];
      const time = bookingDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // 3. Extraction de l’email (plusieurs cas possibles selon la structure reçue)
      let extractedEmail = "";
      if (data.user?.email) {
        extractedEmail = data.user.email;
      } else if (data.organizer?.email) {
        extractedEmail = data.organizer.email;
      } else if (data.attendees?.[0]?.email) {
        extractedEmail = data.attendees[0].email;
      } else if (data.email) {
        extractedEmail = data.email;
      } else if (
        typeof data.responses?.email === "string" &&
        data.responses.email
      ) {
        extractedEmail = data.responses.email;
      }

      if (!extractedEmail) {
        console.warn(
          "Cal.com Handler : impossible d’extraire un email valide. L’API backend pourrait échouer si l’email est requis."
        );
      }

      // 4. Extraction du numéro de téléphone (cas similaires)
      let extractedNumeroTelephone = "";
      if (data.user?.phone) {
        extractedNumeroTelephone = String(data.user.phone);
      } else if (data.organizer?.phone) {
        extractedNumeroTelephone = String(data.organizer.phone);
      } else if (data.attendees?.[0]?.phone) {
        extractedNumeroTelephone = String(data.attendees[0].phone);
      } else if (data.phone) {
        extractedNumeroTelephone = String(data.phone);
      } else if (
        typeof data.responses?.phone === "string" &&
        data.responses.phone
      ) {
        extractedNumeroTelephone = String(data.responses.phone);
      } else if (
        typeof data.responses?.tel === "string" &&
        data.responses.tel
      ) {
        extractedNumeroTelephone = String(data.responses.tel);
      }
      // Toujours s’assurer que c’est une string, même si vide
      extractedNumeroTelephone = String(extractedNumeroTelephone || "");

      // 5. Extraction du nom complet puis découpage en prénom / nom
      let fullName = "";
      if (data.user?.name) {
        fullName = data.user.name;
      } else if (data.organizer?.name) {
        fullName = data.organizer.name;
      } else if (data.attendees?.[0]?.name) {
        fullName = data.attendees[0].name;
      } else if (
        typeof data.responses?.name === "string" &&
        data.responses.name
      ) {
        fullName = data.responses.name;
      }

      let extractedNom = "";
      let extractedPrenom = "";
      if (fullName) {
        const parts = fullName.split(" ");
        extractedPrenom = parts.shift() || "";
        extractedNom = parts.join(" ") || "";
        // Si on n’a qu’un seul mot, on le met dans nom, en laissant prenom vide
        if (!extractedNom && extractedPrenom) {
          extractedNom = extractedPrenom;
          extractedPrenom = "";
        }
      }

      // 6. UID du booking Cal.com
      const calBookingUid = data.uid || null;

      // 7. Construction du payload à envoyer à votre endpoint Next.js
      const payload = {
        type,
        date,
        time,
        Nom: extractedNom,
        Prenom: extractedPrenom,
        Email: extractedEmail,
        NumeroTelephone: extractedNumeroTelephone,
        calBookingUid,
      };

      console.log("Payload pour /api/rdv-confirm :", payload);

      // 8. Appel à votre API Next.js pour enregistrer dans Airtable + envoyer mails
      const response = await fetch("/api/rdv-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Backend OK :", responseData);
        setBookingStatus("Confirmed ! 🎉");
      } else {
        const errorText = await response.text();
        console.error(
          "Échec backend (> /api/rdv-confirm) :",
          response.status,
          errorText
        );
        setBookingStatus(`Error ${response.status}`);
      }
    } catch (err) {
      console.error("Erreur dans handleBookingSuccessful :", err);
      setBookingStatus("Erreur réseau ou interne.");
    }
  }

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Affichez éventuellement un indicateur de statut */}
      {bookingStatus && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            padding: "6px 12px",
            backgroundColor: "#fafafa",
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: 14,
          }}
        >
          {bookingStatus}
        </div>
      )}

      {/* Intégration du composant Cal.com */}
      <Cal
        calLink="alforis/rdv-patrimonial"
        // Le namespace doit correspondre à celui configuré dans votre compte Cal.com,
        // mais ici on peut le laisser vide ou ne pas le préciser s’il n’est pas nécessaire.
        // namespace="rdv-patrimonial"
        style={{ width: "100%", height: "100%", overflow: "auto" }}
        config={{
          layout: "month_view",
          hideEventTypeDetails: false,
          cssVarsPerTheme: {
            light: { "cal-brand": couleurs.ivoire },
            dark: { "cal-brand": couleurs.acier },
          },
        }}
        /**
         * ATTENTION : onEvent reçoit un objet { action, data }.
         * Quand action === 'bookingSuccessfulV2', on appelle handleBookingSuccessful(data).
         */
        onEvent={({ action, data }) => {
          if (action === "bookingSuccessfulV2") {
            console.log("Cal.com bookingSuccessfulV2 (patrimonial) :", data);
            handleBookingSuccessful(data);
          }
        }}
      />
    </div>
  );
}
