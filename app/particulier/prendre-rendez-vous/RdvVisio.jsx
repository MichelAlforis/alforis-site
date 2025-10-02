// Assurez-vous d’avoir installé le package :
// yarn add @calcom/embed-react
// ou
// npm install @calcom/embed-react

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { couleurs } from "@/styles/generated-colors.mjs";

export default function MyApp() {
  const [bookingStatus, setBookingStatus] = useState("");

  /**
   * Cette fonction est appelée lorsqu’un rendez-vous est confirmé (« bookingSuccessfulV2 »).
   * Elle reçoit directement l’objet `data` contenant les informations minimales.
   */
  async function handleBookingSuccessful(eventDetail) {
    console.log(
      "✅ Cal.com bookingSuccessfulV2 event data (visio) :",
      JSON.parse(JSON.stringify(eventDetail || {}))
    );
    setBookingStatus("Processing…");

    try {
      // 1. Le type de rendez-vous est fixé à "visio"
      const type = "visio";

      // 2. On récupère l’UID Cal.com
      const calBookingUid = eventDetail?.uid || null;

      // 3. On tente d’extraire startTime pour calculer date et heure
      const startTimeISO = eventDetail?.startTime || null;
      let date = "";
      let time = "";
      if (startTimeISO) {
        const bookingDate = new Date(startTimeISO);
        date = bookingDate.toISOString().split("T")[0];
        time = bookingDate.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      } else {
        console.warn(
          "Cal.com Handler : startTime est manquant dans eventDetail. Date et heure ne peuvent pas être dérivées."
        );
      }

      // 4. Extraction des nouveaux champs minimaux si présents
      const title = eventDetail?.title || "";
      const eventTypeId = eventDetail?.eventTypeId || null;
      const endTimeISO = eventDetail?.endTime || null;

      // 5. Construction du payload UID + horaire + titres
      const payload = {
        type,
        date,
        time,
        calBookingUid,
        title,
        eventTypeId,
        startTimeISO,
        endTimeISO,
      };

      console.log("📤 Payload pour /api/rdv-confirm :", payload);

      // 6. Envoi au backend Next.js (/api/rdv-confirm)
      const response = await fetch("/api/rdv-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("✅ Backend OK :", responseData);
        setBookingStatus("Confirmed !");
      } else {
        const errorText = await response.text();
        console.error(
          "❌ Échec du backend (POST /api/rdv-confirm) :",
          response.status,
          errorText
        );
        setBookingStatus(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Erreur dans handleBookingSuccessful :", error);
      setBookingStatus("Network error or other issue.");
    }
  }

  useEffect(() => {
    (async () => {
      // 7. On récupère l’API Cal.com pour le namespace "visio"
      const cal = await getCalApi({ namespace: "visio" });

      // 8. Enregistrement du listener sur l’événement bookingSuccessfulV2
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: (e) => {
          console.log("⚡ bookingSuccessfulV2 reçu (visio) :", e.detail);
          if (e.detail && e.detail.data) {
            handleBookingSuccessful(e.detail.data);
          } else {
            console.error(
              "bookingSuccessfulV2 event (visio) n’a pas fourni e.detail.data",
              e
            );
          }
        },
      });

      // 9. Configuration visuelle du widget Cal.com
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": couleurs.ivoire },
          dark: { "cal-brand": couleurs.acier },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Affichage facultatif du statut de réservation */}
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

      {/* Widget Cal.com pour le namespace "visio" et le lien de réservation */}
      <Cal
        namespace="visio"
        calLink="alforis/visio"
        style={{ width: "100%", height: "100%", overflow: "auto" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
