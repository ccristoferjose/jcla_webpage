import type { Locale } from "@/i18n";
import { localBusinessSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { GallerySection } from "@/components/sections/GallerySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FinalCta } from "@/components/sections/FinalCta";

export function GalleryView({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd data={localBusinessSchema(locale)} />

      <GallerySection locale={locale} variant="full" as="h1" />
      <AboutSection locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
