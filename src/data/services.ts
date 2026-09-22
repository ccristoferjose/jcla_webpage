import type { Dictionary } from "@/i18n";

/**
 * Datos estructurales de los servicios. Los textos viven en el diccionario
 * (`services.items.<id>`), así que aquí solo va lo que no se traduce:
 * el orden, el icono y la imagen.
 */

export type ServiceId = keyof Dictionary["services"]["items"];

export type IconName = "scissors" | "zipper" | "resize" | "hem" | "measure";

export interface Service {
  id: ServiceId;
  icon: IconName;
  /** Slug del manifiesto de imágenes; puede faltar. */
  image?: string;
  /** Destacado: ocupa el doble de ancho en el grid. */
  featured?: boolean;
}

export const services: Service[] = [
  { id: "alteraciones", icon: "scissors", image: "alteraciones", featured: true },
  { id: "zippers", icon: "zipper" },
  { id: "tallas", icon: "resize" },
  { id: "ruedos", icon: "hem" },
  { id: "medida", icon: "measure", image: "patronaje", featured: true },
];
