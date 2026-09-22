import type { Metadata } from "next";
import { site } from "@/data/site";
import { alternatePaths, getDictionary, path, type Locale, type PageKey } from "@/i18n";

const OG_IMAGE = "/og.jpg";

/**
 * Metadatos de una página. Centralizado porque los `hreflang` tienen que
 * ser recíprocos: cada versión debe apuntar a todas las demás, incluida
 * ella misma, o Google ignora el conjunto.
 */
export function buildMetadata(locale: Locale, page: PageKey): Metadata {
  const dict = getDictionary(locale);
  const { title, description } = dict.meta[page];
  const alts = alternatePaths(page);

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: alts[locale],
      languages: {
        es: alts.es,
        en: alts.en,
        "x-default": alts.es,
      },
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "es" ? "es_GT" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_GT",
      url: alts[locale],
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

/** Días en el formato que espera schema.org. */
const SCHEMA_DAYS: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

/**
 * JSON-LD del negocio. `ClothingStore` es el tipo más específico de
 * schema.org que cubre un taller de costura de cara al público, y hereda
 * de LocalBusiness, que es lo que lee Google para resultados locales.
 */
export function localBusinessSchema(locale: Locale) {
  const dict = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": `${site.url}#business`,
    name: site.name,
    description: dict.meta.home.description,
    url: site.url,
    telephone: site.whatsapp.displayIntl,
    image: `${site.url}${OG_IMAGE}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    areaServed: site.location.serviceArea.map((name) => ({
      "@type": "City",
      name,
    })),
    sameAs: [`https://instagram.com/${site.instagram}`],
    openingHoursSpecification: site.hours
      .filter((entry) => entry.open !== null)
      .map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${SCHEMA_DAYS[entry.day]}`,
        opens: entry.open,
        closes: entry.close,
      })),
    makesOffer: Object.values(dict.services.items).map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.short,
      },
    })),
  };
}

/** Las preguntas frecuentes, que Google puede mostrar como rich result. */
export function faqSchema(locale: Locale) {
  const dict = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** URL absoluta de una página, para sitemap y canónicas. */
export function absoluteUrl(page: PageKey, locale: Locale): string {
  return `${site.url}${path(page, locale)}`;
}
