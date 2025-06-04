// Assurez-vous d’avoir installé le package :
// yarn add @calcom/embed-react
// ou
// npm install @calcom/embed-react

import Cal from "@calcom/embed-react";
import { useState, useEffect } from "react";
import { couleurs } from "@/styles/generated-colors.mjs";

export default function MyApp() {
  const [bookingStatus, setBookingStatus] = useState("");

  /**
   * Cette fonction est appelée lorsqu’un rendez-vous est confirmé (« bookingSuccessfulV2 »).
   * Elle reçoit directement l’objet `data` et non pas `e.detail.data`.
   */
  async function handleBookingSuccessful(data) {
    console.log(
      "✅ Cal.com bookingSuccessfulV2 event data (raw) :",
      JSON.parse(JSON.stringify(data || {}))
    );
    setBookingStatus("Processing…");

    try {
      // 1. Le type de rendez-vous
      const type = "appel";

      // 2. On récupère startTime (ISO string) pour en extraire date + heure
      const startTimeISO = data.startTime;
      const bookingDate = new Date(startTimeISO);
      const date = bookingDate.toISOString().split("T")[0];
      const time = bookingDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // 3. Extraction de l’email (plusieurs cas possibles)
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
          "Cal.com Handler : Impossible d’extraire un email. L’API back risque d’échouer si l’email est requis."
        );
      }

      // 4. Extraction du numéro de téléphone (plusieurs cas possibles)
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
        // Si un seul mot, on le met dans NOM
        if (!extractedNom && extractedPrenom) {
          extractedNom = extractedPrenom;
          extractedPrenom = "";
        }
      }

      // 6. UID du booking Cal.com
      const calBookingUid = data.uid || null;

      // 7. Construction du payload à envoyer au backend Next.js
      const payload = {
        type,
        date,
        time,
        Nom: extractedNom || "",
        Prenom: extractedPrenom || "",
        Email: extractedEmail || "",
        NumeroTelephone: extractedNumeroTelephone || "",
        calBookingUid,
      };

      console.log("📤 Payload pour /api/rdv-confirm :", payload);

      // 8. Appel à l’API Next.js pour enregistrer en base + envoyer emails
      const response = await fetch("/api/rdv-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("✅ Backend OK :", responseData);
        setBookingStatus("Confirmed ! 🎉");
      } else {
        const errorText = await response.text();
        console.error(
          "❌ Échec du backend (POST /api/rdv-confirm) :",
          response.status,
          errorText
        );
        setBookingStatus(`Error : ${response.status}`);
      }
    } catch (err) {
      console.error("❌ Erreur dans handleBookingSuccessful :", err);
      setBookingStatus("Erreur réseau ou interne.");
    }
  }

    useEffect(() => {
    function listener(e) {
      const { event, payload } = e.data || {};
      if (event === "bookingSuccessful") {
        console.log("⚡ bookingSuccessful reçu via window.message :", payload);
        handleBookingSuccessful(payload);
      }
    }

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

 return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
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

      <Cal
        calLink="alforis/appel"
        style={{ width: "100%", height: "100%", overflow: "auto" }}
        config={{
          layout: "month_view",
          hideEventTypeDetails: false,
          cssVarsPerTheme: {
            light: { "cal-brand": couleurs.ivoire },
            dark: { "cal-brand": couleurs.acier },
          },
        }}
      />
    </div>
  );
}
