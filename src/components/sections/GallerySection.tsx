import { gallery, galleryHighlights, type GalleryItem } from "@/data/gallery";
import { getDictionary, path, type Locale } from "@/i18n";
import { whatsappUrl } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { GalleryCarousel } from "@/components/ui/GalleryCarousel";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface GallerySectionProps {
  locale: Locale;
  /** `full` muestra todo el portafolio; si no, solo los destacados. */
  variant?: "highlights" | "full";
  as?: "h1" | "h2";
}

export function GallerySection({
  locale,
  variant = "highlights",
  as = "h2",
}: GallerySectionProps) {
  const dict = getDictionary(locale);
  const items: GalleryItem[] = variant === "full" ? gallery : galleryHighlights;

  return (
    <Section id="galeria" tone="cream">
      {/* El encabezado va alineado a la izquierda, no centrado: comparte
          fila con las flechas del carrusel. */}
      <GalleryCarousel items={items} locale={locale}>
        <SectionTitle
          eyebrow={dict.gallery.eyebrow}
          title={dict.gallery.title}
          subtitle={dict.gallery.subtitle}
          align="left"
          as={as}
        />
      </GalleryCarousel>

      <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <ButtonLink
          href={whatsappUrl(dict.whatsapp.galleryInquiry)}
          icon="whatsapp"
          className="w-full sm:w-auto"
        >
          {dict.gallery.cta}
        </ButtonLink>

        {variant === "highlights" && (
          <ButtonLink
            href={path("gallery", locale)}
            variant="outline"
            icon="arrowRight"
            iconAfter
            className="w-full sm:w-auto"
          >
            {dict.gallery.viewAll}
          </ButtonLink>
        )}
      </div>
    </Section>
  );
}
