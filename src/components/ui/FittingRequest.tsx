"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { getDictionary, type Locale } from "@/i18n";
import { fittingMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

/**
 * El CTA principal del sitio.
 *
 * No es un formulario: no hay backend y no se envía nada. Las tres
 * selecciones solo construyen un enlace `wa.me` con el mensaje ya
 * redactado, así que el visitante llega a WhatsApp con todo escrito y el
 * taller recibe la consulta estructurada sin tener que repreguntar.
 *
 * Como el componente se prerenderiza, el enlace ya viene en el HTML con
 * los valores por defecto: aunque el JavaScript no cargue, el botón sirve.
 */
export function FittingRequest({ locale, className }: { locale: Locale; className?: string }) {
  const dict = getDictionary(locale);
  const serviceNames = services.map((service) => dict.services.items[service.id].title);

  const [service, setService] = useState(serviceNames[0]);
  const [garment, setGarment] = useState(dict.fitting.garments[0]);
  const [mode, setMode] = useState<"studio" | "home">("studio");

  const href = whatsappUrl(
    fittingMessage(dict, { service, garment, mode: dict.fitting.modes[mode] }),
  );

  const fieldClass =
    "h-12 w-full appearance-none rounded-xl border border-brand-700/20 bg-white px-4 " +
    "pr-11 text-[0.95rem] text-ink transition-colors hover:border-brand-700/35 " +
    "focus:border-brand-600";

  const labelClass = "mb-2 block font-display text-sm font-medium text-ink";

  return (
    <div
      className={cn(
        "rounded-3xl border border-brand-700/12 bg-cream-50 p-6 shadow-sm sm:p-8",
        className,
      )}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fitting-service" className={labelClass}>
            {dict.fitting.serviceLabel}
          </label>
          <div className="relative">
            <select
              id="fitting-service"
              value={service}
              onChange={(event) => setService(event.target.value)}
              className={fieldClass}
            >
              {serviceNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <Icon
              name="chevronDown"
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="fitting-garment" className={labelClass}>
            {dict.fitting.garmentLabel}
          </label>
          <div className="relative">
            <select
              id="fitting-garment"
              value={garment}
              onChange={(event) => setGarment(event.target.value)}
              className={fieldClass}
            >
              {dict.fitting.garments.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <Icon
              name="chevronDown"
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-600"
            />
          </div>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className={labelClass}>{dict.fitting.modeLabel}</legend>
        <div className="grid grid-cols-2 gap-3">
          {(["studio", "home"] as const).map((option) => {
            const active = mode === option;

            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setMode(option)}
                className={cn(
                  "flex h-12 items-center justify-center gap-2 rounded-xl border text-[0.95rem] font-medium transition-colors",
                  active
                    ? "border-brand-700 bg-brand-700 text-cream-50"
                    : "border-brand-700/20 bg-white text-ink-soft hover:border-brand-700/40 hover:text-ink",
                )}
              >
                <Icon name={option === "studio" ? "scissors" : "home"} size={18} />
                {dict.fitting.modes[option]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={
          "mt-6 flex h-14 w-full items-center justify-center gap-2.5 rounded-full " +
          "bg-brand-700 font-display text-base font-medium text-cream-50 shadow-sm " +
          "transition-all duration-200 hover:bg-brand-800 hover:shadow-md " +
          "motion-safe:hover:-translate-y-0.5 sm:text-lg"
        }
      >
        <Icon name="whatsapp" size={22} />
        {dict.fitting.submit}
      </a>

      <p className="mt-4 text-center text-sm leading-relaxed text-ink-faint">
        {dict.fitting.note}
      </p>
    </div>
  );
}
