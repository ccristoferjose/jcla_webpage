import "../globals.css";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";

/**
 * Layout raíz del español. El sitio tiene dos layouts raíz (este y el de
 * `(en)/en`) y ningún `app/layout.tsx`, que es como Next.js permite que
 * cada idioma emita su propio `<html lang>` sin middleware — imprescindible
 * porque el export estático no ejecuta middleware.
 */
export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="es">{children}</SiteShell>;
}
