import { Inter, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import { getDictionary, type Locale } from "@/i18n";
import { Analytics } from "@/components/Analytics";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";

/* `next/font` descarga y auto-hospeda las fuentes en build, así que
   funcionan en el export estático sin pedirle nada a Google en runtime. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Estructura común a los dos idiomas. Existe porque el sitio tiene dos
 * layouts raíz —uno por idioma, cada uno con su `<html lang>`— y todo lo
 * demás es idéntico entre ellos.
 */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${poppins.variable} ${inter.variable}`}>
      <body id="top" className="min-h-dvh antialiased">
        <a
          href="#contenido"
          className={
            "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] " +
            "focus:rounded-full focus:bg-brand-700 focus:px-5 focus:py-3 focus:text-cream-50"
          }
        >
          {dict.nav.skipToContent}
        </a>

        <Navbar locale={locale} />
        <main id="contenido">{children}</main>
        <Footer locale={locale} />
        <WhatsAppFab locale={locale} />
        <Analytics />
      </body>
    </html>
  );
}
