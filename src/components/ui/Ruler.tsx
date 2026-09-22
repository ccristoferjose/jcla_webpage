import { cn } from "@/lib/utils";

/**
 * El motivo de regla 0–10 del flyer, reutilizado como separador.
 * Es el único elemento gráfico de la identidad que se puede reproducir
 * fielmente sin tener el logo vectorial.
 */
export function Ruler({ className }: { className?: string }) {
  const ticks = Array.from({ length: 21 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 200 14"
      className={cn("h-3.5 w-48 text-brand-700/45", className)}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    >
      <path d="M2 2h196" />
      {ticks.map((i) => (
        <path
          key={i}
          d={`M${2 + i * 9.8} 2v${i % 2 === 0 ? 7 : 4}`}
        />
      ))}
    </svg>
  );
}
