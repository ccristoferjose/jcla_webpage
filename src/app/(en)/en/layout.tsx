import "../../globals.css";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";

/** Layout raíz del inglés. Ver la nota en `(es)/layout.tsx`. */
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
