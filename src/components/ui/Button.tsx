import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "outline" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-cream-50 hover:bg-brand-800 active:bg-brand-900 shadow-sm hover:shadow-md",
  outline:
    "border border-brand-700/25 text-brand-800 bg-transparent hover:bg-brand-50 hover:border-brand-700/45",
  ghost: "text-brand-800 hover:bg-brand-50",
  /* Verde de marca de WhatsApp: se usa solo donde el canal debe reconocerse
     de inmediato, como el botón flotante. */
  whatsapp: "bg-[#25D366] text-[#0b3d20] hover:bg-[#1eb855] shadow-md hover:shadow-lg",
};

/* 48px de alto en `md`, dentro del rango de 44–56px que recomiendan las
   guías de CTA y cómodo como objetivo táctil. */
const SIZES: Record<Size, string> = {
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base sm:text-lg",
};

const BASE =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-medium " +
  "font-display tracking-tight transition-all duration-200 " +
  "motion-safe:hover:-translate-y-0.5 whitespace-nowrap";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  /** Coloca el icono después del texto en vez de antes. */
  iconAfter?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

interface LinkProps extends CommonProps {
  href: string;
  /** Fuerza `target="_blank"`; por defecto se infiere de la URL. */
  external?: boolean;
}

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

function classesFor({ variant = "primary", size = "md", fullWidth, className }: CommonProps) {
  return cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && "w-full", className);
}

function content({ icon, iconAfter, children }: CommonProps) {
  const glyph = icon ? <Icon name={icon} size={20} className="shrink-0" /> : null;

  return (
    <>
      {!iconAfter && glyph}
      <span>{children}</span>
      {iconAfter && glyph}
    </>
  );
}

export function ButtonLink({ href, external, ...props }: LinkProps) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classesFor(props)}
      >
        {content(props)}
      </a>
    );
  }

  return (
    <Link href={href} className={classesFor(props)}>
      {content(props)}
    </Link>
  );
}

export function Button({
  variant,
  size,
  icon,
  iconAfter,
  fullWidth,
  className,
  children,
  ...rest
}: NativeButtonProps) {
  const props = { variant, size, icon, iconAfter, fullWidth, className, children };

  return (
    <button className={classesFor(props)} {...rest}>
      {content(props)}
    </button>
  );
}
