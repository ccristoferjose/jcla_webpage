import manifest from "./images.manifest.json";
import type { Locale } from "@/i18n";

/**
 * Portafolio. Las dimensiones vienen del manifiesto que genera
 * `npm run images`, para que el grid reserve el alto exacto y no haya
 * layout shift mientras cargan las fotos.
 *
 * Los textos viven aquí, junto a la imagen, en vez de en el diccionario:
 * son metadato de la foto y se editan cuando se cambia la foto.
 */

export interface ImageAsset {
  src: string;
  srcSmall: string;
  width: number;
  height: number;
  /** Ancho real de la variante pequeña, para construir el `srcSet`. */
  widthSmall: number;
}

export interface GalleryItem extends ImageAsset {
  slug: string;
  /** Pie de imagen del carrusel: dos o tres palabras. */
  title: Record<Locale, string>;
  /** Descripción larga para lectores de pantalla. */
  alt: Record<Locale, string>;
}

type ManifestKey = keyof typeof manifest;

/** Busca una imagen por slug. Lanza en build si el slug no existe. */
export function image(slug: string): ImageAsset {
  const asset = manifest[slug as ManifestKey];
  if (!asset) {
    throw new Error(
      `Imagen "${slug}" no está en images.manifest.json. Corre \`npm run images\`.`,
    );
  }
  return asset;
}

const items: Array<Omit<GalleryItem, keyof ImageAsset>> = [
  {
    slug: "bomber-negro",
    title: { es: "Bomber de raso", en: "Satin bomber" },
    alt: {
      es: "Chaqueta bomber negra con forro naranja y puños tejidos, confeccionada en el taller",
      en: "Black bomber jacket with orange lining and ribbed cuffs, made in the workshop",
    },
  },
  {
    slug: "bomber-denim",
    title: { es: "Bomber de mezclilla", en: "Denim bomber" },
    alt: {
      es: "Chaqueta bomber armada con paneles de jeans reutilizados y puños negros",
      en: "Bomber jacket built from reclaimed denim panels with black ribbing",
    },
  },
  {
    slug: "bomber-denim-frente",
    title: { es: "Bomber de mezclilla, frente", en: "Denim bomber, front" },
    alt: {
      es: "Vista frontal de la chaqueta bomber de mezclilla reconstruida",
      en: "Front view of the reconstructed denim bomber jacket",
    },
  },
  {
    slug: "bomber-denim-detalle",
    title: { es: "Bomber de mezclilla, detalle", en: "Denim bomber, detail" },
    alt: {
      es: "Detalle de las costuras y bolsillos reaprovechados en la chaqueta de mezclilla",
      en: "Detail of the seams and repurposed pockets on the denim jacket",
    },
  },
  {
    slug: "chaqueta-warren",
    title: { es: "Chaqueta de cuello alto", en: "Funnel-neck jacket" },
    alt: {
      es: "Chaqueta beige de cuello alto con cordón y cierre metálico",
      en: "Beige funnel-neck jacket with drawcord and metal zipper",
    },
  },
  {
    slug: "bomber-mujer",
    title: { es: "Bomber corta", en: "Cropped bomber" },
    alt: {
      es: "Bomber corta de raso negro con mangas fruncidas, confeccionada a medida",
      en: "Cropped black satin bomber with gathered sleeves, made to measure",
    },
  },
  {
    slug: "chaqueta-lozano",
    title: { es: "Cortavientos con capucha", en: "Hooded windbreaker" },
    alt: {
      es: "Cortavientos azul con capucha y cierre de contraste en amarillo",
      en: "Blue hooded windbreaker with a contrasting yellow zipper",
    },
  },
  {
    slug: "camisa-seda",
    title: { es: "Camisa de seda", en: "Silk shirt" },
    alt: {
      es: "Camisa de seda manga corta con cuello camisero abierto",
      en: "Short-sleeved silk shirt with an open camp collar",
    },
  },
  {
    slug: "camisa-manga-larga",
    title: { es: "Camisa manga larga", en: "Long-sleeved shirt" },
    alt: {
      es: "Camisa de manga larga confeccionada en el taller",
      en: "Long-sleeved shirt made in the workshop",
    },
  },
  {
    slug: "falda-short",
    title: { es: "Falda short de malla", en: "Mesh skort" },
    alt: {
      es: "Falda short de malla azul marino con salpicado de pintura",
      en: "Navy mesh skort with paint-splatter finish",
    },
  },
  {
    slug: "cargo-frente",
    title: { es: "Pantalón cargo, frente", en: "Cargo trousers, front" },
    alt: {
      es: "Pantalón cargo confeccionado a medida, vista frontal",
      en: "Made-to-measure cargo trousers, front view",
    },
  },
  {
    slug: "cargo-espalda",
    title: { es: "Pantalón cargo, espalda", en: "Cargo trousers, back" },
    alt: {
      es: "Pantalón cargo confeccionado a medida, vista posterior",
      en: "Made-to-measure cargo trousers, back view",
    },
  },
  {
    slug: "pantalon-cinco-bolsas",
    title: { es: "Pantalón cinco bolsas", en: "Five-pocket trousers" },
    alt: {
      es: "Pantalón de cinco bolsas, vista frontal",
      en: "Five-pocket trousers, front view",
    },
  },
  {
    slug: "pantalon-cinco-bolsas-espalda",
    title: { es: "Pantalón cinco bolsas, espalda", en: "Five-pocket trousers, back" },
    alt: {
      es: "Pantalón de cinco bolsas, vista posterior",
      en: "Five-pocket trousers, back view",
    },
  },
  {
    slug: "pantalon-carpintero",
    title: { es: "Pantalón carpintero de pana", en: "Corduroy carpenter trousers" },
    alt: {
      es: "Pantalón carpintero de pana azul marino con presilla lateral para martillo",
      en: "Navy corduroy carpenter trousers with a side hammer loop",
    },
  },
  {
    slug: "short-nylon",
    title: { es: "Short de nylon", en: "Nylon shorts" },
    alt: {
      es: "Short de nylon azul con cordón y estampado geométrico",
      en: "Blue nylon shorts with a drawstring and geometric print",
    },
  },
];

export const gallery: GalleryItem[] = items.map((item) => ({
  ...item,
  ...image(item.slug),
}));

/** Subconjunto que se muestra en el home; el resto vive en /galeria. */
export const galleryHighlights: GalleryItem[] = gallery.slice(0, 8);
