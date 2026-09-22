import Script from "next/script";
import { site } from "@/data/site";

/**
 * Google Analytics. El id vive en `src/data/site.ts` y se puede sobrescribir
 * con `NEXT_PUBLIC_GA_ID`; si queda vacío, no se carga nada.
 */
export function Analytics() {
  const id = site.analytics.gaId;
  if (!id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
