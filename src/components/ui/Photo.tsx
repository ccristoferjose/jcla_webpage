/* eslint-disable @next/next/no-img-element */
import type { ImageAsset } from "@/data/gallery";
import { cn } from "@/lib/utils";

/**
 * Imagen responsiva.
 *
 * Usa `<img>` y no `next/image` a propósito: con `output: "export"` el
 * optimizador de Next queda desactivado (`unoptimized: true`) y `next/image`
 * emite un `<img>` de un solo tamaño, sin `srcSet`. Aquí sí se declaran los
 * dos anchos que produjo `npm run images`, así que el navegador descarga el
 * que corresponde al viewport.
 *
 * `width`/`height` van siempre para que el navegador reserve el espacio y
 * no se mueva el layout al cargar.
 */
interface PhotoProps {
  asset: ImageAsset;
  alt: string;
  /** Ancho que ocupará la imagen, en sintaxis de `sizes`. */
  sizes: string;
  /** Para la imagen del hero: carga inmediata y prioridad alta. */
  priority?: boolean;
  /**
   * Carga inmediata sin reclamar prioridad. Para las primeras fotos de un
   * carrusel: `loading="lazy"` no las trae hasta que entran al viewport, y
   * en un contenedor horizontal eso significa que aparecen en blanco al
   * pulsar la flecha.
   */
  eager?: boolean;
  className?: string;
}

export function Photo({
  asset,
  alt,
  sizes,
  priority = false,
  eager = false,
  className,
}: PhotoProps) {
  return (
    <img
      src={asset.src}
      srcSet={`${asset.srcSmall} ${asset.widthSmall}w, ${asset.src} ${asset.width}w`}
      sizes={sizes}
      width={asset.width}
      height={asset.height}
      alt={alt}
      loading={priority || eager ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      className={cn("block", className)}
    />
  );
}
