import { testimonials } from "@/data/testimonials";
import { getDictionary, type Locale } from "@/i18n";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

/**
 * Reseñas de clientes.
 *
 * Si `testimonials` está vacío la sección no se renderiza: es preferible
 * no mostrarla a llenarla con testimonios inventados. Se activa sola en
 * cuanto se agregue la primera reseña real en `src/data/testimonials.ts`.
 */
export function Testimonials({ locale }: { locale: Locale }) {
  if (testimonials.length === 0) return null;

  const dict = getDictionary(locale);

  return (
    <Section tone="white">
      <SectionTitle eyebrow={dict.testimonials.eyebrow} title={dict.testimonials.title} />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex flex-col rounded-2xl border border-brand-700/12 bg-cream-50 p-7"
          >
            <blockquote className="flex-1 leading-relaxed text-ink-soft">
              “{testimonial.quote[locale]}”
            </blockquote>
            <figcaption className="mt-6 border-t border-brand-700/10 pt-4">
              <span className="font-display font-semibold text-ink">{testimonial.name}</span>
              <span className="mt-0.5 block text-sm text-ink-faint">
                {testimonial.context[locale]}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
