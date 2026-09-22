import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  /** Fondo de la sección; alternarlos da ritmo vertical a la página. */
  tone?: "cream" | "white" | "brand" | "sand";
  className?: string;
  children: ReactNode;
}

const TONES = {
  cream: "bg-cream-100 text-ink",
  white: "bg-white text-ink",
  sand: "bg-cream-200 text-ink",
  brand: "bg-brand-700 text-cream-50",
} as const;

export function Section({ id, tone = "cream", className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-24 lg:py-28", TONES[tone], className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}
