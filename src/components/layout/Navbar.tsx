"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getDictionary,
  pageKeyFromPathname,
  path,
  type Locale,
  type PageKey,
} from "@/i18n";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Ruler } from "@/components/ui/Ruler";
import { LocaleSwitcher } from "./LocaleSwitcher";

const NAV_PAGES: Array<{
  key: PageKey;
  label: keyof ReturnType<typeof getDictionary>["nav"];
}> = [
  { key: "home", label: "home" },
  { key: "services", label: "services" },
  { key: "gallery", label: "gallery" },
  { key: "about", label: "about" },
];

export function Navbar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const current = pageKeyFromPathname(pathname ?? "/");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Con el menú móvil abierto el fondo no debe poder desplazarse. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ctaHref = whatsappUrl(dict.whatsapp.generic);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 h-[var(--header-height)] transition-shadow duration-300",
          /* Sin desenfoque con el menú abierto: backdrop-filter convertiría al header
             en bloque contenedor del panel fijo y lo dejaría sin altura. */
          open ? "bg-cream-100" : "bg-cream-100/85 backdrop-blur-md",
          scrolled ? "shadow-[0_1px_0_0_rgba(107,31,36,0.12)]" : "shadow-none",
        )}
      >
        <div className="container-page flex h-full items-center justify-between gap-6">
          <Link
            href={path("home", locale)}
            className="group flex shrink-0 flex-col gap-1"
            onClick={() => setOpen(false)}
          >
            {/* TODO: sustituir por el logo vectorial cuando esté disponible. */}
            <span className="font-display text-xl font-bold leading-none tracking-tight text-brand-700 sm:text-[1.35rem]">
              JC Atelier
            </span>
            <Ruler className="h-2 w-[5.5rem] opacity-70 transition-opacity group-hover:opacity-100" />
          </Link>

          <nav
            aria-label={dict.nav.menu}
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_PAGES.map(({ key, label }) => (
              <Link
                key={key}
                href={path(key, locale)}
                aria-current={current === key ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.95rem] transition-colors",
                  current === key
                    ? "font-medium text-brand-700"
                    : "text-ink-soft hover:bg-brand-50 hover:text-brand-800",
                )}
              >
                {dict.nav[label]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LocaleSwitcher locale={locale} />

            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "hidden h-11 items-center gap-2 rounded-full bg-brand-700 px-5 font-display " +
                "text-[0.9rem] font-medium text-cream-50 transition-colors hover:bg-brand-800 sm:inline-flex"
              }
            >
              <Icon name="whatsapp" size={18} />
              {dict.nav.cta}
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? dict.nav.close : dict.nav.openMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-800 transition-colors hover:bg-brand-50 lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil: panel completo bajo el header, fuera de él para que
          `fixed` se resuelva contra el viewport. */}
      <div
        className={cn(
          "fixed inset-x-0 top-[var(--header-height)] bottom-0 z-40 overflow-y-auto bg-cream-100 lg:hidden",
          "transition-[opacity,transform] duration-300 motion-reduce:transition-none",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
        {...(open ? {} : { inert: "" as unknown as boolean })}
      >
        <nav
          aria-label={dict.nav.menu}
          className="container-page flex flex-col py-6"
        >
          {NAV_PAGES.map(({ key, label }) => (
            <Link
              key={key}
              href={path(key, locale)}
              onClick={() => setOpen(false)}
              aria-current={current === key ? "page" : undefined}
              className={cn(
                "flex items-center justify-between border-b border-brand-700/10 py-5 font-display text-2xl",
                current === key ? "font-semibold text-brand-700" : "text-ink",
              )}
            >
              {dict.nav[label]}
              <Icon name="arrowRight" size={20} className="text-brand-600" />
            </Link>
          ))}

          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-brand-700 font-display text-lg font-medium text-cream-50"
          >
            <Icon name="whatsapp" size={22} />
            {dict.nav.cta}
          </a>
        </nav>
      </div>
    </>
  );
}
