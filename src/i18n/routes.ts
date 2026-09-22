/**
 * Mapa de rutas localizadas. Está declarado una sola vez porque lo usan
 * tres cosas a la vez: el Navbar, el selector de idioma (que necesita saber
 * a qué página equivalente saltar) y los `hreflang` de cada página.
 *
 * Los paths llevan barra final a propósito: `trailingSlash: true` en
 * next.config.ts, y así se evita un redirect en GitHub Pages.
 */

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export type PageKey = "home" | "services" | "gallery" | "about";

export const pageKeys: readonly PageKey[] = ["home", "services", "gallery", "about"];

const paths: Record<PageKey, Record<Locale, string>> = {
  home: { es: "/", en: "/en/" },
  services: { es: "/servicios/", en: "/en/services/" },
  gallery: { es: "/galeria/", en: "/en/gallery/" },
  about: { es: "/nosotros/", en: "/en/about/" },
};

/** Ruta de una página en un idioma. */
export function path(page: PageKey, locale: Locale): string {
  return paths[page][locale];
}

/** Todas las variantes de una página, para los `hreflang`. */
export function alternatePaths(page: PageKey): Record<Locale, string> {
  return paths[page];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

/**
 * Resuelve qué página está abierta a partir del pathname del navegador,
 * para que el selector de idioma mantenga al visitante en la misma página
 * en vez de devolverlo al home.
 */
export function pageKeyFromPathname(pathname: string): PageKey {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;

  for (const key of pageKeys) {
    for (const locale of locales) {
      if (paths[key][locale] === normalized) return key;
    }
  }

  return "home";
}
