"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { GalleryItem } from "@/data/gallery";
import { getDictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

/**
 * Carrusel del portafolio.
 *
 * El desplazamiento es scroll nativo con `scroll-snap`, no un carrusel
 * gobernado por JavaScript: así el arrastre con el dedo, la rueda del ratón
 * horizontal, el trackpad y la navegación por teclado funcionan solos, y si
 * el JavaScript no carga las fotos siguen siendo desplazables. Las flechas
 * y la barra de progreso son una capa encima que solo lee y empuja ese
 * scroll.
 *
 * Las tarjetas tienen alto fijo y ancho automático: como las prendas están
 * fotografiadas sobre fondo blanco con relaciones de aspecto distintas, así
 * se alinean por la base sin recortar ninguna.
 */

/**
 * Recorre `scrollLeft` hasta `to`.
 *
 * Se anima a mano en vez de usar `scrollBy({ behavior: "smooth" })` para
 * poder aterrizar en una posición calculada —el borde exacto de una
 * tarjeta— en lugar de en un desplazamiento en píxeles que el snap después
 * corrige a tirones.
 *
 * El snap se desactiva durante el recorrido: si no, cada asignación
 * intermedia de `scrollLeft` sería reajustada al punto de anclaje más
 * cercano y la animación avanzaría a saltos.
 */
function animateScrollTo(
  track: HTMLElement,
  to: number,
  animation: { current: number | null },
) {
  if (animation.current !== null) cancelAnimationFrame(animation.current);

  const from = track.scrollLeft;
  const distance = to - from;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Con la página oculta no llegan frames de animación, así que se salta
     directo al destino en vez de quedarse a medias. */
  if (reduced || document.visibilityState === "hidden" || Math.abs(distance) < 2) {
    track.scrollLeft = to;
    return;
  }

  const snap = track.style.scrollSnapType;
  track.style.scrollSnapType = "none";

  const start = performance.now();
  const DURATION = 450;
  const easeOut = (t: number) => 1 - (1 - t) ** 3;

  const frame = (now: number) => {
    const progress = Math.min(1, (now - start) / DURATION);
    track.scrollLeft = from + distance * easeOut(progress);

    if (progress < 1) {
      animation.current = requestAnimationFrame(frame);
    } else {
      animation.current = null;
      track.style.scrollSnapType = snap;
    }
  };

  animation.current = requestAnimationFrame(frame);
}

interface GalleryCarouselProps {
  items: GalleryItem[];
  locale: Locale;
  /** Encabezado de la sección; se coloca a la izquierda de las flechas. */
  children: ReactNode;
}

export function GalleryCarousel({ items, locale, children }: GalleryCarouselProps) {
  const dict = getDictionary(locale).gallery;

  const trackRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    },
    [],
  );

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  /** `ratio` es cuánto se ha recorrido; `thumb`, qué fracción se ve. */
  const [progress, setProgress] = useState({ ratio: 0, thumb: 1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const syncScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const travel = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= travel - 4);
    setProgress({
      ratio: travel > 0 ? track.scrollLeft / travel : 0,
      thumb: track.scrollWidth > 0 ? track.clientWidth / track.scrollWidth : 1,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", syncScrollState, { passive: true });

    /* ResizeObserver dispara una primera vez al observar, así que de paso
       resuelve la medición inicial sin tener que llamarla a mano. */
    const observer = new ResizeObserver(syncScrollState);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", syncScrollState);
      observer.disconnect();
    };
  }, [syncScrollState]);

  /**
   * Avanza o retrocede algo menos de un ancho de pantalla, pero sin cortar
   * ninguna foto: busca el borde de tarjeta más cercano a ese destino.
   */
  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const padLeft = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const origin = track.getBoundingClientRect().left - track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;

    /* Posición de scroll que deja cada tarjeta pegada al margen. */
    const stops = Array.from(track.children).map(
      (card) => (card as HTMLElement).getBoundingClientRect().left - origin - padLeft,
    );

    const desired = track.scrollLeft + direction * track.clientWidth * 0.85;
    const ahead = stops.filter((stop) =>
      direction > 0 ? stop > track.scrollLeft + 8 : stop < track.scrollLeft - 8,
    );

    const target = ahead.length
      ? ahead.reduce((best, stop) =>
          Math.abs(stop - desired) < Math.abs(best - desired) ? stop : best,
        )
      : direction > 0
        ? maxScroll
        : 0;

    animateScrollTo(track, Math.max(0, Math.min(target, maxScroll)), animationRef);
  };

  // — Visor ampliado ———————————————————————————————————————

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (openIndex !== null && !dialog.open) dialog.showModal();
    else if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  /* `showModal()` deja el fondo inerte pero no impide que se desplace. */
  useEffect(() => {
    if (openIndex === null) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [openIndex]);

  const step = (delta: number) =>
    setOpenIndex((current) =>
      current === null ? null : (current + delta + items.length) % items.length,
    );

  const open = openIndex === null ? null : items[openIndex];

  const arrowClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border " +
    "border-brand-700/20 text-brand-800 transition-colors " +
    "hover:border-brand-700/45 hover:bg-brand-50 " +
    "disabled:cursor-default disabled:opacity-30 disabled:hover:border-brand-700/20 " +
    "disabled:hover:bg-transparent";

  return (
    <>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
        {children}

        <div className="flex shrink-0 gap-2.5">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={atStart}
            aria-label={dict.prev}
            className={arrowClass}
          >
            <Icon name="arrowLeft" size={20} />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={atEnd}
            aria-label={dict.next}
            className={arrowClass}
          >
            <Icon name="arrowRight" size={20} />
          </button>
        </div>
      </div>

      {/* Márgenes negativos para que la tira llegue al borde de la pantalla
          y se asome la siguiente foto: señala que hay más que ver. */}
      <ul
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label={dict.region}
        className={cn(
          "-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto",
          "px-4 pb-1 sm:-mx-8 sm:gap-5 sm:px-8",
          /* Sin `scroll-padding` el snap ignoraría el margen lateral y la
             primera tarjeta quedaría pegada al borde de la pantalla. */
          "scroll-pl-4 sm:scroll-pl-8",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
        /* Difuminado en los extremos: suaviza la tarjeta que entra y la que
           sale, y de paso señala que la tira sigue. Se retira en cada punta
           cuando ya no hay nada más hacia ese lado, para no velar la
           primera ni la última foto. */
        style={{
          maskImage:
            `linear-gradient(to right, transparent 0, #000 ${atStart ? "0px" : "56px"},` +
            ` #000 calc(100% - ${atEnd ? "0px" : "56px"}), transparent 100%)`,
        }}
      >
        {items.map((item, index) => (
          <li key={item.slug} className="shrink-0 snap-start">
            <figure>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={dict.zoom(item.title[locale])}
                className={cn(
                  "group block cursor-zoom-in overflow-hidden rounded-2xl bg-white p-4",
                  "ring-1 ring-brand-900/8 transition-shadow duration-300 hover:shadow-lg",
                )}
              >
                <Photo
                  asset={item}
                  alt={item.alt[locale]}
                  /* Las primeras llenan el ancho inicial y la siguiente
                     pantalla; el resto se cargan al acercarse. */
                  eager={index < 5}
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 350px, 280px"
                  className={cn(
                    "h-[248px] w-auto object-contain transition-transform duration-500",
                    "sm:h-[320px] lg:h-[380px] motion-safe:group-hover:scale-[1.03]",
                  )}
                />
              </button>

              <figcaption className="mt-3.5 px-1 font-display text-sm text-ink-soft">
                {item.title[locale]}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/* Barra de progreso: el ancho refleja qué parte de la tira se ve. */}
      <div className="mt-7 h-[3px] w-full overflow-hidden rounded-full bg-brand-900/10">
        <div
          className="h-full rounded-full bg-brand-600 transition-transform duration-150 ease-out"
          style={{
            width: `${progress.thumb * 100}%`,
            transform: `translateX(${
              progress.thumb > 0 ? (progress.ratio * (1 - progress.thumb) * 100) / progress.thumb : 0
            }%)`,
          }}
        />
      </div>

      <p className="mt-3 text-center text-xs text-ink-faint sm:hidden">{dict.scrollHint}</p>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => {
          // Clic en el fondo (fuera del contenido) cierra el visor.
          if (event.target === dialogRef.current) setOpenIndex(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
        className={cn(
          "m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0",
          "backdrop:bg-ink/92 backdrop:backdrop-blur-sm",
        )}
      >
        {open && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
              <span className="font-display text-sm tabular-nums text-cream-100/70">
                {dict.counter((openIndex ?? 0) + 1, items.length)}
              </span>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label={dict.close}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cream-100/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon name="close" size={24} />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center gap-2 px-2 sm:gap-6 sm:px-6">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={dict.prev}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-cream-100/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon name="arrowLeft" size={24} />
              </button>

              {/* La zona de la foto se encoge (`min-h-0 flex-1`) y el pie
                  conserva su alto (`shrink-0`): si no, la imagen se come
                  todo el alto y empuja el texto fuera de la pantalla. */}
              <figure className="flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-5 py-2">
                <div className="flex min-h-0 w-full flex-1 items-center justify-center">
                  <Photo
                    asset={open}
                    alt={open.alt[locale]}
                    sizes="(min-width: 640px) 78vw, 90vw"
                    className="max-h-full w-auto max-w-full rounded-xl bg-white object-contain"
                  />
                </div>

                <figcaption className="max-w-xl shrink-0 px-4 text-center text-sm leading-relaxed text-cream-100/70">
                  <span className="mb-1 block font-display text-base text-cream-50">
                    {open.title[locale]}
                  </span>
                  {open.alt[locale]}
                </figcaption>
              </figure>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label={dict.next}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-cream-100/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon name="arrowRight" size={24} />
              </button>
            </div>

            <div className="h-6 shrink-0" />
          </div>
        )}
      </dialog>
    </>
  );
}
