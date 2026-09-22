import { site } from "@/data/site";
import { getDictionary, type Locale } from "@/i18n";
import { instagramUrl, whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";
import { FittingRequest } from "@/components/ui/FittingRequest";
import { Ruler } from "@/components/ui/Ruler";

/**
 * Cierre de página: el CTA principal del sitio.
 *
 * Va sobre el vino de la marca para separarse del resto y concentra las
 * dos formas de empezar: el armador de fitting, para quien ya sabe qué
 * necesita, y el WhatsApp directo, para quien solo quiere preguntar.
 */
export function FinalCta({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section id="contacto" className="bg-brand-700 py-20 text-cream-50 sm:py-24 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/60">
            {dict.finalCta.eyebrow}
          </span>

          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.6rem]">
            {dict.finalCta.title}
          </h2>

          <Ruler className="mt-6 w-40 text-cream-100/40" />

          <p className="mt-6 max-w-md text-lg leading-relaxed text-cream-100/80">
            {dict.finalCta.body}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappUrl(dict.whatsapp.generic)}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "inline-flex h-14 items-center justify-center gap-2.5 whitespace-nowrap " +
                "rounded-full bg-cream-50 px-8 font-display text-base font-medium " +
                "text-brand-800 transition-all duration-200 hover:bg-white " +
                "motion-safe:hover:-translate-y-0.5"
              }
            >
              <Icon name="whatsapp" size={22} />
              {site.whatsapp.display}
            </a>

            <a
              href={instagramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-cream-100/30 px-7 font-display text-base transition-colors hover:border-cream-100/70 hover:bg-white/5"
            >
              <Icon name="instagram" size={20} />
              {dict.finalCta.instagram}
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="mb-6 lg:mb-7">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/60">
              {dict.fitting.eyebrow}
            </span>
            <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
              {dict.fitting.title}
            </h3>
            <p className="mt-2 text-cream-100/75">{dict.fitting.subtitle}</p>
          </div>

          <FittingRequest locale={locale} />
        </div>
      </div>
    </section>
  );
}
