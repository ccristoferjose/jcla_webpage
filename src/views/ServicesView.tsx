import type { Locale } from "@/i18n";
import { faqSchema, localBusinessSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrustBar } from "@/components/sections/TrustBar";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

export function ServicesView({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd data={localBusinessSchema(locale)} />
      <JsonLd data={faqSchema(locale)} />

      <ServicesSection locale={locale} detailed as="h1" tone="cream" />
      <TrustBar locale={locale} />
      <HowItWorks locale={locale} />
      <FaqSection locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
