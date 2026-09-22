import { getDictionary, type Locale } from "@/i18n";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

/**
 * Los tres pasos del proceso.
 *
 * Es la sección que más fricción quita en este rubro: la objeción
 * frecuente no es el precio, es no saber cómo empieza el trámite ni si
 * hay que ir al taller para preguntar.
 */
export function HowItWorks({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <Section tone="sand">
      <SectionTitle
        eyebrow={dict.how.eyebrow}
        title={dict.how.title}
        subtitle={dict.how.subtitle}
      />

      <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
        {dict.how.steps.map((step, index) => (
          <li key={step.title} className="relative">
            {/* Línea que conecta los pasos en escritorio. */}
            {index < dict.how.steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-14 right-0 top-7 hidden h-px bg-brand-700/18 md:block"
              />
            )}

            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 font-display text-xl font-semibold text-cream-50">
              {index + 1}
            </div>

            <h3 className="mt-6 font-display text-xl font-semibold text-ink">{step.title}</h3>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
