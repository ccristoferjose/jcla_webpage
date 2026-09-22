import type { SVGProps } from "react";

/**
 * Set de iconos inline. Van dibujados aquí en vez de traer una librería
 * porque cuatro de ellos (zipper, ruedo, reducción, medida) no existen en
 * los sets genéricos y son justamente los servicios del taller.
 */

export type IconName =
  | "scissors"
  | "zipper"
  | "resize"
  | "hem"
  | "measure"
  | "whatsapp"
  | "instagram"
  | "arrowRight"
  | "arrowLeft"
  | "arrowUp"
  | "check"
  | "menu"
  | "close"
  | "chevronDown"
  | "clock"
  | "pin"
  | "home";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

/** WhatsApp es un logotipo: va relleno y con su trazado oficial. */
const FILLED: Partial<Record<IconName, string>> = {
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488",
};

/** El resto son iconos de trazo, a 24×24 y con el mismo grosor. */
const STROKED: Record<string, React.ReactNode> = {
  scissors: (
    <>
      <circle cx="6" cy="6" r="2.6" />
      <circle cx="6" cy="18" r="2.6" />
      <path d="M8.2 7.6 20 18M20 6 8.2 16.4" />
    </>
  ),
  /* Cierre: parte cerrada con dientes, corredera, y las dos cintas
     abriéndose hacia abajo. */
  zipper: (
    <>
      <path d="M12 2.8v9.2" />
      <path d="M10.3 4.8h3.4M10.3 7.2h3.4M10.3 9.6h3.4" />
      <rect x="9.7" y="12" width="4.6" height="4.2" rx="1.4" />
      <path d="M10.6 16.2 8.8 21.2M13.4 16.2l1.8 5" />
    </>
  ),
  /* Reducción de tallas: dos flechas cerrándose hacia el centro. */
  resize: (
    <>
      <path d="M3.5 4.5v15M20.5 4.5v15" />
      <path d="M6.6 12h4M13.4 12h4" />
      <path d="m8.6 9.5 2.4 2.5-2.4 2.5" />
      <path d="m15.4 9.5-2.4 2.5 2.4 2.5" />
    </>
  ),
  /* Ruedo: boca de pantalón vista de frente, con la línea de pespunte
     por encima del borde. Más específico que un doblez genérico. */
  hem: (
    <>
      <path d="M7.6 3.4h8.8l1.7 17.2H5.9L7.6 3.4Z" />
      <path d="M6.5 16.4h2.2M10.9 16.4h2.2M15.3 16.4h2.2" />
    </>
  ),
  measure: (
    <>
      <rect x="2.5" y="7.4" width="19" height="9.2" rx="2.2" />
      <path d="M7 7.4v3.4M11.75 7.4v4.8M16.5 7.4v3.4" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  arrowRight: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowLeft: <path d="M20 12H5m6-6-6 6 6 6" />,
  arrowUp: <path d="M12 20V5m-6 6 6-6 6 6" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />,
  chevronDown: <path d="m5 9 7 7 7-7" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.8V12l3.4 2.2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s7-6.1 7-11.2A7 7 0 0 0 5 10.3c0 5.1 7 11.2 7 11.2Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  home: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1Z" />,
};

export function Icon({ name, size = 24, ...props }: IconProps) {
  const filled = FILLED[name];

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...(filled
        ? { fill: "currentColor" }
        : {
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 1.6,
            strokeLinecap: "round" as const,
            strokeLinejoin: "round" as const,
          })}
      {...props}
    >
      {filled ? <path d={filled} /> : STROKED[name]}
    </svg>
  );
}
