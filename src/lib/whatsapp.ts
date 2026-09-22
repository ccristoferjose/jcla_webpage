import { site } from "@/data/site";
import type { Dictionary } from "@/i18n";

/**
 * Constructor de enlaces click-to-chat.
 *
 * `wa.me` exige el número en E.164 sin símbolos y el texto URL-encoded;
 * los saltos de línea viajan como %0A, que es lo que le da estructura al
 * mensaje cuando llega al teléfono.
 */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsapp.raw}?text=${encodeURIComponent(message)}`;
}

export interface FittingRequestFields {
  service: string;
  garment: string;
  mode: string;
}

/**
 * Arma el mensaje del fitting en primera persona del cliente: "quiero
 * agendar" convierte bastante mejor que un texto redactado desde el
 * negocio, y además llega estructurado para poder atenderlo sin repreguntar.
 */
export function fittingMessage(dict: Dictionary, fields: FittingRequestFields): string {
  const { whatsapp } = dict;

  return [
    whatsapp.fittingIntro,
    `${whatsapp.serviceField}: ${fields.service}`,
    `${whatsapp.garmentField}: ${fields.garment}`,
    `${whatsapp.modeField}: ${fields.mode}`,
  ].join("\n");
}

export function instagramUrl(): string {
  return `https://instagram.com/${site.instagram}`;
}
