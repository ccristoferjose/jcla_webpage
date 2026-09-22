import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Nivel del encabezado: la página solo debe tener un h1. */
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Heading = "h2",
  className,
  children,
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
          {eyebrow}
        </span>
      )}

      <Heading
        className={cn(
          "font-semibold text-ink",
          Heading === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-[2.75rem]",
        )}
      >
        {title}
      </Heading>

      {subtitle && (
        <p className={cn("max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg", centered && "mx-auto")}>
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
}
