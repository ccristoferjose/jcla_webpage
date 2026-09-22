import type { MetadataRoute } from "next";
import { locales, pageKeys } from "@/i18n";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap con alternates por idioma: cada URL declara sus dos versiones,
 * que es como Google descubre las traducciones desde el sitemap además de
 * los `hreflang` del `<head>`.
 */
/* El export estático necesita que la ruta se declare estática de forma explícita. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = (page: (typeof pageKeys)[number]) =>
    Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(page, locale)]));

  return pageKeys.flatMap((page) =>
    locales.map((locale) => ({
      url: absoluteUrl(page, locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "home" ? 1 : 0.8,
      alternates: { languages: languages(page) },
    })),
  );
}
