"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, otherLocale, pageKeyFromPathname, path, type Locale } from "@/i18n";

/**
 * Cambia de idioma manteniendo al visitante en la misma página: resuelve
 * qué página está abierta a partir del pathname y salta a su equivalente,
 * en vez de devolverlo siempre al home.
 */
export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dict = getDictionary(locale);
  const target = otherLocale(locale);

  return (
    <Link
      href={path(pageKeyFromPathname(pathname ?? "/"), target)}
      hrefLang={target}
      aria-label={dict.locale.switchLabel}
      className={
        "inline-flex h-11 items-center rounded-full px-3 font-display text-sm " +
        "font-medium uppercase tracking-wide text-ink-soft transition-colors " +
        "hover:bg-brand-50 hover:text-brand-800"
      }
    >
      {target}
    </Link>
  );
}
