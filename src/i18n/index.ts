import { en } from "./en";
import { es, type Dictionary } from "./es";
import type { Locale } from "./routes";

const dictionaries: Record<Locale, Dictionary> = { es, en };

/**
 * Síncrona a propósito: no hay import dinámico ni carga en runtime, todo
 * queda resuelto en build y por eso funciona con `output: "export"`.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from "./routes";
