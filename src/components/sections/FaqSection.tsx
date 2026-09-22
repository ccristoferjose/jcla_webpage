import { getDictionary, type Locale } from "@/i18n";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

/**
 * Preguntas frecuentes.
 *
 * Construida sobre `<details>`/`<summary>` nativos: se abre y cierra sin
 * JavaScript, ya viene con la semántica accesible correcta, y el texto
 * queda en el HTML aunque esté plegado, que es lo que indexa Google.
 */
export function FaqSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <Section id="faq" tone="sand">
      <SectionTitle eyebrow={dict.faq.eyebrow} title={dict.faq.title} />

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-brand-700/12 border-y border-brand-700/12">
        {dict.faq.items.map((item) => (
          <details key={item.q} className="group py-2">
            <summary
              className={
                "flex cursor-pointer list-none items-center justify-between gap-6 py-4 " +
                "font-display text-lg font-medium text-ink transition-colors hover:text-brand-700 " +
                "[&::-webkit-details-marker]:hidden"
              }
            >
              {item.q}
              <Icon
                name="chevronDown"
                size={20}
                className="shrink-0 text-brand-600 transition-transform duration-300 group-open:rotate-180"
              />
            </summary>
            <p className="pb-5 pr-10 leading-relaxed text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
