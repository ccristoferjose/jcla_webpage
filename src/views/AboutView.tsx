import type { Locale } from "@/i18n";
import { localBusinessSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { AboutSection } from "@/components/sections/AboutSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { GallerySection } from "@/components/sections/GallerySection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export function AboutView({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd data={localBusinessSchema(locale)} />

      <AboutSection locale={locale} variant="full" as="h1" />
      <TrustBar locale={locale} />
      <GallerySection locale={locale} />
      <Testimonials locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
