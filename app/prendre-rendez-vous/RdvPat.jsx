/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react
  
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react"; // Added useState
import { couleurs } from "@/styles/generated-colors.mjs";

export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"rdv-patrimonial"}); // Ensure correct namespace

      // Register the event listener for successful bookings
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: (e) => {
          console.log("Cal.com bookingSuccessfulV2 event (patrimonial):", e.detail);
          if (e.detail && e.detail.data) {
            handleBookingSuccessful(e.detail.data);
          } else {
            console.error("bookingSuccessfulV2 event (patrimonial) did not contain e.detail.data", e);
          }
        }
      });

      // Configuration de l’UI via l’API
      cal("ui", {
        cssVarsPerTheme:{
            light:{
                "cal-brand":couleurs.ivoire
            },
            dark:{
                "cal-brand":couleurs.acier
        }},
        hideEventTypeDetails:false,
        layout:"month_view"
    });
    })();
  }, [])
  return <Cal namespace="rdv-patrimonial"
    calLink="alforis/rdv-patrimonial"
    style={{width:"100%",height:"100%",overflow:"scroll"}}
    config={{"layout":"month_view"}}
    
    
  />;
};
  