import type { Locale } from "@/i18n";

/**
 * Reseñas de clientes. Vacío a propósito: se llena con reseñas reales de
 * Guatemala. La sección no se renderiza mientras el arreglo esté vacío,
 * así que no hace falta tocar los componentes para activarla.
 */

export interface Testimonial {
  name: string;
  /** Contexto corto: "Vestido de novia", "Cliente desde 2019". */
  context: Record<Locale, string>;
  quote: Record<Locale, string>;
}

export const testimonials: Testimonial[] = [];
