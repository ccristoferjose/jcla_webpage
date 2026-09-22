import { site } from "@/data/site";
import { getDictionary, type Locale } from "@/i18n";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Banda de confianza justo bajo el hero. Las guías de CRO piden prueba
 * social a menos de un scroll del CTA; mientras no haya reseñas reales,
 * estos tres hechos verificables cumplen esa función.
 */
export function TrustBar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const items: Array<{ icon: IconName; title: string; note: string }> = [
    {
      icon: "measure",
      title: `+${site.experienceYears} ${dict.trust.experience}`,
      note: dict.trust.handmadeNote,
    },
    { icon: "home", title: dict.trust.homeService, note: dict.trust.homeServiceNote },
    { icon: "whatsapp", title: dict.trust.whatsapp, note: dict.trust.whatsappNote },
  ];

  return (
    <section className="border-y border-brand-700/10 bg-white">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-3 sm:gap-6 sm:py-12">
        {items.map(({ icon, title, note }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Icon name={icon} size={21} />
            </span>
            <div>
              <p className="font-display font-semibold leading-snug text-ink">{title}</p>
              <p className="mt-0.5 text-sm text-ink-faint">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
