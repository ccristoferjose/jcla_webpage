import "./globals.css";
import type { Metadata } from "next";
import { site } from "@/data/site";
import { getDictionary, path } from "@/i18n";
import { whatsappUrl } from "@/lib/whatsapp";
import { SiteShell } from "@/components/layout/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { Ruler } from "@/components/ui/Ruler";

/**
 * 404 global. Vive en la raíz de `app/` y no dentro de un route group
 * porque Next solo toma de ahí la página de "no encontrado"; y como el
 * proyecto no tiene `app/layout.tsx` (son dos layouts raíz, uno por
 * idioma), esta página emite su propio documento a través de `SiteShell`.
 *
 * Se exporta como `out/404.html`, que es lo que sirve GitHub Pages ante
 * cualquier ruta desconocida. Va en español por ser el idioma base.
 */
/* No hereda metadatos de ningún layout, así que los declara por su cuenta. */
export const metadata: Metadata = {
  title: `${getDictionary("es").notFound.title} | ${site.name}`,
  robots: { index: false, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export default function NotFound() {
  const dict = getDictionary("es");

  return (
    <SiteShell locale="es">
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="font-display text-7xl font-bold text-brand-200">404</span>
        <h1 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {dict.notFound.title}
        </h1>
        <Ruler className="mt-6 w-40" />
        <p className="mt-6 max-w-md leading-relaxed text-ink-soft">{dict.notFound.body}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={path("home", "es")} icon="arrowRight" iconAfter>
            {dict.notFound.home}
          </ButtonLink>
          <ButtonLink href={whatsappUrl(dict.whatsapp.generic)} variant="outline" icon="whatsapp">
            {dict.finalCta.button}
          </ButtonLink>
        </div>
      </section>
    </SiteShell>
  );
}
