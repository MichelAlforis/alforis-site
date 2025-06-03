/* Assurez-vous d’avoir installé le package :
   yarn add @calcom/embed-react
   ou
   npm install @calcom/embed-react
*/

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react"; // Added useState
import { couleurs } from "@/styles/generated-colors.mjs";

export default function MyApp() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "appel" });

      // Configuration de l’UI via l’API
      cal("ui", {
        cssVarsPerTheme: {
          light: {
            "cal-brand": couleurs.ivoire,
          },
          dark: {
            "cal-brand": couleurs.acier,
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      namespace="appel"
      calLink="alforis/appel"
      style={{ width: "100%", height: "100%", overflow: "auto" }}
      config={{ layout: "month_view" }}
    />
  );
}
