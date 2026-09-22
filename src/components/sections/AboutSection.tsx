import { image } from "@/data/gallery";
import { site } from "@/data/site";
import { getDictionary, type Locale } from "@/i18n";
import { whatsappUrl } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Ruler } from "@/components/ui/Ruler";
import { Section } from "@/components/ui/Section";

interface AboutSectionProps {
  locale: Locale;
  /** En /nosotros se muestra el texto completo; en el home, resumido. */
  variant?: "summary" | "full";
  as?: "h1" | "h2";
}

export function AboutSection({ locale, variant = "summary", as = "h2" }: AboutSectionProps) {
  const dict = getDictionary(locale);
  const Heading = as;
  const paragraphs = variant === "full" ? dict.about.body : dict.about.body.slice(0, 2);

  return (
    <Section id="nosotros" tone="white">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 gap-4">
            <Photo
              asset={image("confeccion")}
              alt={dict.about.lead}
              sizes="(min-width: 1024px) 23vw, 46vw"
              className="aspect-[3/4] w-full rounded-2xl object-cover ring-1 ring-brand-900/8"
            />
            <Photo
              asset={image("patronaje")}
              alt={dict.services.items.medida.title}
              sizes="(min-width: 1024px) 23vw, 46vw"
              className="mt-8 aspect-[3/4] w-full rounded-2xl object-cover ring-1 ring-brand-900/8"
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            {dict.about.eyebrow}
          </span>

          <Heading className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.6rem]">
            {dict.about.title}
          </Heading>

          <Ruler className="mt-5 w-36" />

          <p className="mt-6 font-display text-lg font-medium text-brand-800">{dict.about.lead}</p>

          <div className="mt-4 space-y-4">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5 border-t border-brand-700/12 pt-7">
            <div>
              <dt className="font-display text-3xl font-bold text-brand-700">
                +{site.experienceYears}
              </dt>
              <dd className="mt-1 text-sm text-ink-faint">{dict.about.stats.years}</dd>
            </div>
            <div>
              <dt className="font-display text-3xl font-bold text-brand-700">100%</dt>
              <dd className="mt-1 text-sm text-ink-faint">{dict.about.stats.handmade}</dd>
            </div>
          </dl>

          <ButtonLink
            href={whatsappUrl(dict.whatsapp.generic)}
            icon="whatsapp"
            variant="outline"
            className="mt-8"
          >
            {dict.about.cta}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
