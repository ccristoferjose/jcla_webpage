import type { Locale } from "@/i18n";
import { faqSchema, localBusinessSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GallerySection } from "@/components/sections/GallerySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd data={localBusinessSchema(locale)} />
      <JsonLd data={faqSchema(locale)} />

      <Hero locale={locale} />
      <TrustBar locale={locale} />
      <ServicesSection locale={locale} />
      <HowItWorks locale={locale} />
      <GallerySection locale={locale} />
      <AboutSection locale={locale} />
      <Testimonials locale={locale} />
      <FaqSection locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
