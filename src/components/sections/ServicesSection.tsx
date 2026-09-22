import { image } from "@/data/gallery";
import { services } from "@/data/services";
import { getDictionary, type Locale } from "@/i18n";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface ServicesSectionProps {
  locale: Locale;
  /** En /servicios se muestra la descripción larga y los bullets. */
  detailed?: boolean;
  as?: "h1" | "h2";
  tone?: "cream" | "white" | "sand";
}

export function ServicesSection({
  locale,
  detailed = false,
  as = "h2",
  tone = "white",
}: ServicesSectionProps) {
  const dict = getDictionary(locale);

  return (
    <Section id="servicios" tone={tone}>
      <SectionTitle
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        subtitle={dict.services.subtitle}
        as={as}
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const copy = dict.services.items[service.id];
          /* Los dos servicios con foto ocupan la fila completa. Además de
             darles jerarquía —son los de ticket más alto— hace que los
             cinco servicios llenen el grid sin dejar huecos: una fila
             completa, una fila de tres, y otra fila completa. */
          const wide = detailed && service.featured;

          return (
            <article
              key={service.id}
              className={cn(
                "group flex flex-col overflow-hidden rounded-2xl border border-brand-700/12 bg-cream-50",
                "transition-shadow duration-300 hover:shadow-md",
                wide && "lg:col-span-3 lg:flex-row",
              )}
            >
              {wide && service.image && (
                <div className="lg:w-[38%] lg:shrink-0">
                  <Photo
                    asset={image(service.image)}
                    alt={copy.title}
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="h-52 w-full object-cover sm:h-64 lg:h-full"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                  <Icon name={service.icon} size={24} />
                </span>

                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{copy.title}</h3>

                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                  {detailed ? copy.description : copy.short}
                </p>

                {detailed && (
                  <ul className="mt-5 space-y-2">
                    {copy.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand-600" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={whatsappUrl(dict.whatsapp.serviceInquiry(copy.title.toLowerCase()))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 self-start font-display text-sm font-medium text-brand-700 transition-colors hover:text-brand-900"
                >
                  <Icon name="whatsapp" size={17} />
                  {dict.services.ctaCard}
                  <Icon
                    name="arrowRight"
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
