/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react
  
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { couleurs } from "@/styles/generated-colors.mjs";

export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"visio"});

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
  